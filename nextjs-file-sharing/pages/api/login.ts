import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    res.status(200).json({ message: 'Login successful!', user: {username, name: 'Felipe', id: 1} });
  } else {
    res.status(405).end();
  }
}
