import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    res.status(200).json({ message: 'User registered successfully!', user: {username, name: 'Felipe'} });
  } else {
    res.status(405).end();
  }
}
