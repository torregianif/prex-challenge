import { NextApiRequest, NextApiResponse } from 'next';

// Mocked users data
const users = [
  { id: '1', username: 'John' },
  { id: '2', username: 'Peter' },
  { id: '3', username: 'Jenna' },
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
