import { NextApiRequest, NextApiResponse } from 'next';

const sharedFilesData = [
  { id: '1', name: 'sharedFile1.txt', ownerId: 1 },
  { id: '2', name: 'sharedFile2.txt', ownerId: 1 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { userId } = req.query;


  const userSharedFiles = sharedFilesData.filter(file => file.ownerId === parseInt(userId));

  res.status(200).json(userSharedFiles);
}
