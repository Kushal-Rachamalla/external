import React, { useMemo } from 'react';
import { useFiles } from '../hooks/useFiles';
import { Link } from 'react-router-dom';
import FileIcon from '../components/ui/FileIcon';
import { formatFileSize } from '../utils/helpers';

const DownloadsPage: React.FC = () => {
    const { files, downloads } = useFiles();
    
    const downloadedFiles = useMemo(() => {
        return files.filter(file => downloads.includes(file.id))
            .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
    }, [files, downloads]);
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-white [text-shadow:1px_1px_3px_rgba(0,0,0,0.5)] mb-6">My Downloads</h1>
            
            {downloadedFiles.length > 0 ? (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                             <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploader</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {downloadedFiles.map((file) => (
                                    <tr key={file.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <FileIcon type={file.type} className="w-6 h-6 mr-3" />
                                                <span className="text-sm font-medium text-gray-900">{file.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.subject}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.uploaderName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(file.uploadDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatFileSize(file.size)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                 <div className="text-center py-16 bg-white rounded-lg shadow-md">
                    <p className="text-gray-500 text-lg">You haven't downloaded any files yet.</p>
                    <p className="text-gray-400 mt-2">
                        <Link to="/dashboard" className="text-accent hover:underline">Browse files</Link> to get started.
                    </p>
                </div>
            )}
        </div>
    );
};

export default DownloadsPage;
