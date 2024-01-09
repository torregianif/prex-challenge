import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/utils/useAuth';
import Navbar from '@/components/NavBar';
import styles from '../styles/ViewDashboard.module.css';

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
    <>
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.title}>Dashboard</h1>

      <h2>Uploaded Files</h2>
      <ul className={styles.fileList}>
        {uploadedFiles.length > 0 && uploadedFiles.map((file) => (
          <li key={file.id} className={styles.fileItem}>
            <span className={styles.fileName}>{file.name}</span>
            <button
              onClick={() => handleDeleteFile(file.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2>Shared Files</h2>
      <ul className={styles.fileList}>
        {sharedFiles.map((file) => (
          <li key={file.id} className={styles.fileItem}>
            <span className={styles.fileName}>{file.name}</span>
            {file.ownerId === user?.id && (
              <button
                onClick={() => handleDeleteFile(file.id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  
    </>
  );
};

export default myFiles;
