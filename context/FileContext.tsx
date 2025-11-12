
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { FileData } from '../types';
import { mockFiles } from '../services/mockApi';
import useLocalStorage from '../hooks/useLocalStorage';
import { useAuth } from '../hooks/useAuth';

interface FileContextType {
    files: FileData[];
    loading: boolean;
    error: Error | null;
    bookmarks: string[];
    downloads: string[];
    fetchFiles: () => Promise<void>;
    addFile: (file: FileData) => void;
    updateFile: (fileId: string, metadata: Partial<FileData>) => void;
    deleteFile: (fileId: string) => Promise<void>;
    toggleBookmark: (fileId: string) => void;
    addDownload: (fileId: string) => void;
    isBookmarked: (fileId: string) => boolean;
}

export const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>('bookmarks', []);
  const [downloads, setDownloads] = useLocalStorage<string[]>('downloads', []);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedFiles = await mockFiles.list({});
      setFiles(fetchedFiles);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch files'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchFiles();
    } else {
      setFiles([]);
    }
  }, [isAuthenticated, fetchFiles]);
  
  const addFile = (file: FileData) => {
    setFiles(prev => [file, ...prev]);
  };
  
  const updateFile = (fileId: string, metadata: Partial<FileData>) => {
    setFiles(prev => prev.map(f => f.id === fileId ? {...f, ...metadata} : f));
    mockFiles.edit(fileId, metadata); // fire and forget for mock
  };

  const deleteFile = async (fileId: string) => {
    await mockFiles.delete(fileId);
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const toggleBookmark = (fileId: string) => {
    setBookmarks(prev => 
      prev.includes(fileId) ? prev.filter(id => id !== fileId) : [...prev, fileId]
    );
  };
  
  const addDownload = (fileId: string) => {
    setDownloads(prev => 
      prev.includes(fileId) ? prev : [...prev, fileId]
    );
  };
  
  const isBookmarked = (fileId: string) => bookmarks.includes(fileId);

  return (
    <FileContext.Provider value={{ files, loading, error, bookmarks, downloads, fetchFiles, addFile, updateFile, deleteFile, toggleBookmark, addDownload, isBookmarked }}>
      {children}
    </FileContext.Provider>
  );
};
