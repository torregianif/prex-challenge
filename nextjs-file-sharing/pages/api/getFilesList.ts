import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const files = ['file1.txt', 'file2.jpg'];
    res.status(200).json(files);
  } else {
    res.status(405).end();
  }
}
