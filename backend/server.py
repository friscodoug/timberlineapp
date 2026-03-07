from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Hibernation Hollow Guest Portal API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class MaintenanceRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    cabin: str
    issue: str
    status: str = "pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class MaintenanceRequestCreate(BaseModel):
    name: str
    cabin: str
    issue: str

class NewsletterSignup(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    first_name: str
    email: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class NewsletterSignupCreate(BaseModel):
    first_name: str
    email: str

# Routes
@api_router.get("/")
async def root():
    return {"message": "Hibernation Hollow Guest Portal API", "status": "active"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Hibernation Hollow Guest Portal"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Maintenance Issue Endpoints
@api_router.post("/maintenance", response_model=MaintenanceRequest)
async def create_maintenance_request(request: MaintenanceRequestCreate):
    """
    Submit a maintenance issue report.
    This saves to database and would send email notification to host.
    """
    maintenance_dict = request.dict()
    maintenance_obj = MaintenanceRequest(**maintenance_dict)
    
    # Save to database
    await db.maintenance_requests.insert_one(maintenance_obj.dict())
    
    # Log the maintenance request (email would be sent in production)
    logger.info(f"Maintenance request received: {maintenance_obj.cabin} - {maintenance_obj.issue[:50]}...")
    
    return maintenance_obj

@api_router.get("/maintenance", response_model=List[MaintenanceRequest])
async def get_maintenance_requests():
    """Get all maintenance requests"""
    requests = await db.maintenance_requests.find().sort("created_at", -1).to_list(100)
    return [MaintenanceRequest(**req) for req in requests]

@api_router.get("/maintenance/{request_id}", response_model=MaintenanceRequest)
async def get_maintenance_request(request_id: str):
    """Get a specific maintenance request by ID"""
    request = await db.maintenance_requests.find_one({"id": request_id})
    if not request:
        raise HTTPException(status_code=404, detail="Maintenance request not found")
    return MaintenanceRequest(**request)

# Newsletter Endpoints
@api_router.post("/newsletter", response_model=NewsletterSignup)
async def create_newsletter_signup(signup: NewsletterSignupCreate):
    """
    Save newsletter signup to database.
    Note: Actual Mailchimp integration happens on frontend via external link.
    """
    signup_dict = signup.dict()
    signup_obj = NewsletterSignup(**signup_dict)
    
    # Check if email already exists
    existing = await db.newsletter_signups.find_one({"email": signup_obj.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already subscribed")
    
    await db.newsletter_signups.insert_one(signup_obj.dict())
    logger.info(f"Newsletter signup: {signup_obj.email}")
    
    return signup_obj

@api_router.get("/newsletter", response_model=List[NewsletterSignup])
async def get_newsletter_signups():
    """Get all newsletter signups"""
    signups = await db.newsletter_signups.find().sort("created_at", -1).to_list(1000)
    return [NewsletterSignup(**signup) for signup in signups]

# Cabin Data Endpoint (for potential future dynamic loading)
@api_router.get("/cabins")
async def get_cabins():
    """Return cabin information"""
    cabins = [
        {
            "id": "1",
            "name": "Honeydome",
            "slug": "honeydome",
            "guidebookUrl": "https://v2.hostfully.com/gjvmtqg",
        },
        {
            "id": "2", 
            "name": "Bear Hug",
            "slug": "bear-hug",
            "guidebookUrl": "https://v2.hostfully.com/bearhug",
        },
        {
            "id": "3",
            "name": "Little Bear Tinyhouse",
            "slug": "little-bear",
            "guidebookUrl": "https://v2.hostfully.com/littlebear",
        },
    ]
    return {"cabins": cabins}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
