import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fileId, userIds } = req.body;
    res.status(200).json({ message: 'File uploaded successfully!', file:{id:1} });
  } else {
    res.status(405).end();
  }
}
