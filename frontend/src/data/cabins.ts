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
    name: 'Honeydome',
    slug: 'honeydome',
    image: 'https://customer-assets.emergentagent.com/job_9548fa8e-ba19-4435-b9f5-e400e160c6c7/artifacts/7yjce6m0_Dome%20Cover%20final.jpg',
    guidebookUrl: 'https://v2.hostfully.com/gjvmtqg',
  },
  {
    id: '2',
    name: 'Bear Hug',
    slug: 'bear-hug',
    image: 'https://customer-assets.emergentagent.com/job_9548fa8e-ba19-4435-b9f5-e400e160c6c7/artifacts/4hzkny8c_117-web-or-mls-dt3.jpg',
    guidebookUrl: 'https://v2.hostfully.com/bearhug',
  },
  {
    id: '3',
    name: 'Little Bear Tinyhouse',
    slug: 'little-bear',
    image: 'https://customer-assets.emergentagent.com/job_9548fa8e-ba19-4435-b9f5-e400e160c6c7/artifacts/yq4fdn9c_118-web-or-mls-dt4.jpg',
    guidebookUrl: 'https://v2.hostfully.com/littlebear',
  },
];

export const LOGO_URL = 'https://customer-assets.emergentagent.com/job_9548fa8e-ba19-4435-b9f5-e400e160c6c7/artifacts/n9bd9ko0_HH%20Logo.png';

export const CONTACT = {
  phone: '214-430-3956',
  name: 'Douglas Rice',
  email: 'doug@hibernationhollowcabins.com',
  instagram: 'https://www.instagram.com/hibernationhollowcabins/',
  facebook: 'https://www.facebook.com/hibernationhollowcabins/',
  website: 'https://www.hibernationhollowcabins.com',
  mailchimpUrl: 'https://mailchi.mp/hibernationhollowcabins/5lrqskfq6o',
};
