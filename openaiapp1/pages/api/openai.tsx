import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 if (req.method === 'POST') {
   if (!req.body || typeof req.body.prompt !== 'string') {
     res.status(400).json({ error: 'Invalid input' });
     return;
   }

   const { prompt } = req.body;

   const apiKey = process.env.OPENAI_API_KEY;
   if (!apiKey) {
     console.error('OpenAI API key not found. Make sure to set the OPENAI_API_KEY environment variable.');
     res.status(500).json({ error: 'Missing OpenAI API key' });
     return;
   }

   try {
     const response = await axios.post(
       'https://api.openai.com/v1/engines/davinci/completions',
       {
         prompt,
         max_tokens: 50,
       },
       {
         headers: {
           'Authorization': `Bearer ${apiKey}`,
         },
       }
     );

     const { data } = response;
     res.status(200).json(data.choices[0].text);
   } catch (error) {
     console.error('Something went wrong with OpenAI API:', error);
     res.status(500).json({ error: 'API request failed', details: error });
   }
 } else {
   res.status(405).end(); // Method Not Allowed
 }
}

export const config = {
 api: {
   responseLimit: false,
 },
};
