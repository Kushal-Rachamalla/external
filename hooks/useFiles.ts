
import { useContext } from 'react';
import { FileContext } from '../context/FileContext';

export const useFiles = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
};
