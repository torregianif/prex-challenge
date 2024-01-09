import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/utils/useAuth';
import Navbar from '@/components/NavBar';

interface File {
  id: string;
  name: string;
  ownerId: string;
}

const myFiles: React.FC = () => {
	const { user } = useAuth();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [sharedFiles, setSharedFiles] = useState<File[]>([]);


  useEffect(() => {
    // Fetch uploaded files for the logged-in user
    if(user){
      axios.get(`/api/getUploadedFiles?userId=${user?.id}`).then((response) => {
        console.log("response.data",response.data);
        
        setUploadedFiles(response.data);
      });
    

      // Fetch files shared with the logged-in user
      axios.get(`/api/getSharedFiles?userId=${user?.id}`).then((response) => {
        setSharedFiles(response.data);
      });
    }
  }, [user]);

  const handleDeleteFile = async (fileId: string) => {
    try {
      await axios.delete(`/api/deleteFile?fileId=${fileId}`);
      setUploadedFiles(uploadedFiles.filter((file) => file.id !== fileId));
      setSharedFiles(sharedFiles.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error('File deletion error:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>

      <h2>Uploaded Files</h2>
      <ul>
        {uploadedFiles.length >0 && uploadedFiles.map((file) => (
          <li key={file.id}>
            {file.name}
            <button onClick={() => handleDeleteFile(file.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Shared Files</h2>
      <ul>
        {sharedFiles.map((file) => (
          <li key={file.id}>
            {file.name}
            {file.ownerId === user?.id && (
              <button onClick={() => handleDeleteFile(file.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default myFiles;
