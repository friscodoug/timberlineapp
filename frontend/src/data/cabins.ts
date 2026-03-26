export interface Cabin {
  id: string;
  name: string;
  slug: string;
  image: string;
  guidebookUrl: string;
}

export const CABINS: Cabin[] = [
  {
    id: '1',
    name: "Bigfoot's Tinyhouse",
    slug: 'bigfoot',
    image: 'https://customer-assets.emergentagent.com/job_937b1701-e091-472c-bea4-8ba39c7f7d7d/artifacts/2sn67a4f_IMG_3270.JPG',
    guidebookUrl: 'https://v2.hostfully.com/bigfoot',
  },
  {
    id: '2',
    name: 'The Incredi-dome',
    slug: 'incredi-dome',
    image: 'https://customer-assets.emergentagent.com/job_937b1701-e091-472c-bea4-8ba39c7f7d7d/artifacts/hqp3ck81_IMG_3278.JPG',
    guidebookUrl: 'https://v2.hostfully.com/incredi-dome',
  },
];

export const LOGO_URL = 'https://customer-assets.emergentagent.com/job_937b1701-e091-472c-bea4-8ba39c7f7d7d/artifacts/5waxvh9h_Pine%20acres%20square%20logo.png';

export const CONTACT = {
  phone: '214-430-3956',
  name: 'Douglas Rice',
  email: 'doug@hibernationhollowcabins.com',
  instagram: 'https://www.instagram.com/pineacresglamping/',
  facebook: 'https://www.facebook.com/pineacresglamping/',
  website: 'https://www.pineacresglamping.com',
  mailchimpUrl: 'https://mailchi.mp/hibernationhollowcabins/5lrqskfq6o',
};
