import { NextApiRequest, NextApiResponse } from 'next';

const uploadedFilesData = [
  { id: '1', name: 'uploadedFile1.txt', ownerId: '1' },
  { id: '2', name: 'uploadedFile2.txt', ownerId: '1' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end(); 
  }

  const { userId } = req.query;

  const userUploadedFiles = uploadedFilesData.filter(file => file.ownerId === userId);

  res.status(200).json(userUploadedFiles);
}
