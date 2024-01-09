import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fileId, userIds } = req.body;

    //Call to the database

    res.status(200).json({ message: 'File shared successfully!' });
  } else {
    res.status(405).end();
  }
}
