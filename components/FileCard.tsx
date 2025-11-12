
import React from 'react';
import { FileData, ViewType } from '../types';
import { formatFileSize } from '../utils/helpers';
import FileIcon from './ui/FileIcon';
import { useFiles } from '../hooks/useFiles';
import Button from './ui/Button';

interface FileCardProps {
  file: FileData;
  view: ViewType;
  onPreview: (file: FileData) => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, view, onPreview }) => {
    const { isBookmarked, toggleBookmark, addDownload } = useFiles();
    
    const handleDownload = () => {
        addDownload(file.id);
        // In a real app, you would trigger the file download here
        // For this mock, we'll just open the file url.
        window.open(file.url, '_blank');
    };

    if (view === 'grid') {
        return (
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-200">
                <div className="p-4 flex-grow">
                    <div className="flex items-start justify-between">
                         <FileIcon type={file.type} className="w-10 h-10" />
                         <button onClick={() => toggleBookmark(file.id)} className="text-gray-400 hover:text-yellow-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${isBookmarked(file.id) ? 'text-yellow-400 fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                         </button>
                    </div>
                    <h3 className="mt-4 font-bold text-lg text-primary truncate" title={file.title}>{file.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{file.subject}</p>
                    <p className="text-xs text-gray-400 mt-2">by {file.uploaderName}</p>
                </div>
                <div className="p-4 bg-gray-50 border-t flex justify-between items-center text-sm">
                    <span>{formatFileSize(file.size)}</span>
                    <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
                </div>
                <div className="p-2 grid grid-cols-2 gap-2">
                    <Button size="sm" variant="secondary" onClick={() => onPreview(file)}>Preview</Button>
                    <Button size="sm" onClick={handleDownload}>Download</Button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center space-x-4 w-full border border-gray-200">
            <FileIcon type={file.type} className="w-8 h-8 flex-shrink-0" />
            <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="col-span-1">
                    <p className="font-semibold text-primary truncate" title={file.title}>{file.title}</p>
                    <p className="text-sm text-gray-500">{file.subject}</p>
                </div>
                <p className="text-sm text-gray-600 hidden md:block">{file.uploaderName}</p>
                <p className="text-sm text-gray-600 hidden md:block">{new Date(file.uploadDate).toLocaleDateString()}</p>
                 <p className="text-sm text-gray-600 hidden md:block text-right">{formatFileSize(file.size)}</p>
            </div>
            <div className="flex items-center space-x-2 flex-shrink-0">
                <Button size="sm" variant="secondary" onClick={() => onPreview(file)}>Preview</Button>
                <Button size="sm" onClick={handleDownload}>Download</Button>
                 <button onClick={() => toggleBookmark(file.id)} className="text-gray-400 hover:text-yellow-500 transition-colors p-2 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${isBookmarked(file.id) ? 'text-yellow-400 fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                 </button>
            </div>
        </div>
    );
};

export default FileCard;
