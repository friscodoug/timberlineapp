import React, { useEffect, useState } from 'react';
import { CloudSun, Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, Thermometer } from 'lucide-react';
import BackButton from '../components/BackButton';
import Card from '../components/Card';
import { COLORS } from '../styles/theme';
import './Weather.css';

interface DayForecast {
  date: string;
  dayName: string;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
}

const getWeatherIcon = (code: number) => {
  if (code === 0) return Sun;
  if (code <= 3) return Cloud;
  if (code >= 51 && code <= 67) return CloudRain;
  if (code >= 71 && code <= 77) return CloudSnow;
  if (code >= 80 && code <= 82) return CloudRain;
  if (code >= 85 && code <= 86) return CloudSnow;
  return Cloud;
};

const getConditionText = (code: number) => {
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Partly Cloudy';
  if (code >= 51 && code <= 55) return 'Drizzle';
  if (code >= 61 && code <= 65) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Showers';
  if (code >= 95) return 'Thunderstorm';
  return 'Cloudy';
};

export default function Weather() {
  const [forecast, setForecast] = useState<DayForecast[]>([]);
  const [current, setCurrent] = useState<{ temp: number; condition: string; humidity: number; wind: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Hochatown, OK coordinates
        const lat = 34.17;
        const lon = -94.76;
        
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=America/Chicago&forecast_days=5`
        );
        
        if (!response.ok) throw new Error('Failed to fetch weather');
        
        const data = await response.json();
        
        // Set current weather
        setCurrent({
          temp: Math.round(data.current.temperature_2m),
          condition: getConditionText(data.current.weather_code),
          humidity: data.current.relative_humidity_2m,
          wind: Math.round(data.current.wind_speed_10m),
        });
        
        // Set 5-day forecast
        const days = data.daily.time.map((date: string, i: number) => {
          const d = new Date(date + 'T12:00:00');
          return {
            date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            dayName: i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' }),
            high: Math.round(data.daily.temperature_2m_max[i]),
            low: Math.round(data.daily.temperature_2m_min[i]),
            condition: getConditionText(data.daily.weather_code[i]),
            precipitation: data.daily.precipitation_probability_max[i],
          };
        });
        
        setForecast(days);
        setLoading(false);
      } catch (err) {
        setError('Unable to load weather data');
        setLoading(false);
      }
    };
    
    fetchWeather();
  }, []);

  return (
    <div className="page-container">
      <BackButton />

      <div className="header-center">
        <CloudSun size={48} color={COLORS.primary} />
        <h1 className="page-title center">Weather in Hochatown</h1>
        <p className="header-subtext">Plan your outdoor adventures</p>
      </div>

      {loading ? (
        <Card className="weather-card">
          <div className="loading-state">Loading weather...</div>
        </Card>
      ) : error ? (
        <Card className="weather-card">
          <div className="error-state">{error}</div>
        </Card>
      ) : (
        <>
          {/* Current Weather */}
          {current && (
            <Card className="current-weather-card">
              <div className="current-main">
                <Sun size={56} color={COLORS.secondary} />
                <div className="current-temp">{current.temp}°F</div>
              </div>
              <p className="current-condition">{current.condition}</p>
              <div className="current-details">
                <div className="detail-item">
                  <Droplets size={18} color={COLORS.primary} />
                  <span>{current.humidity}%</span>
                </div>
                <div className="detail-item">
                  <Wind size={18} color={COLORS.primary} />
                  <span>{current.wind} mph</span>
                </div>
              </div>
            </Card>
          )}

          {/* 5-Day Forecast */}
          <Card className="forecast-card">
            <h2 className="forecast-title">5-Day Forecast</h2>
            <div className="forecast-list">
              {forecast.map((day, index) => {
                const IconComponent = getWeatherIcon(index === 0 ? 0 : 1);
                return (
                  <div key={day.date} className="forecast-day">
                    <div className="day-name">{day.dayName}</div>
                    <IconComponent size={24} color={COLORS.secondary} />
                    <div className="day-temps">
                      <span className="temp-high">{day.high}°</span>
                      <span className="temp-low">{day.low}°</span>
                    </div>
                    {day.precipitation > 0 && (
                      <div className="precipitation">
                        <Droplets size={12} color="#64748b" />
                        <span>{day.precipitation}%</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </>
      )}

      <Card className="tips-card">
        <h2 className="tips-title">Weather Tips for Your Stay</h2>
        <div className="tip-item">
          <span className="tip-icon">🌡️</span>
          <p>Oklahoma weather can change quickly - pack layers!</p>
        </div>
        <div className="tip-item">
          <span className="tip-icon">🌧️</span>
          <p>Rainy days are perfect for the hot tub or a cozy fire.</p>
        </div>
        <div className="tip-item">
          <span className="tip-icon">☀️</span>
          <p>Sunny forecast? Hit the hiking trails at Beavers Bend!</p>
        </div>
        <div className="tip-item">
          <span className="tip-icon">🌙</span>
          <p>Clear nights offer amazing stargazing opportunities.</p>
        </div>
      </Card>
    </div>
  );
}
