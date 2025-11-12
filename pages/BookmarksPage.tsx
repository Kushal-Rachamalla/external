import React, { useMemo, useState } from 'react';
import { useFiles } from '../hooks/useFiles';
import { FileData, ViewType } from '../types';
import FileCard from '../components/FileCard';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { formatFileSize } from '../utils/helpers';

const BookmarksPage: React.FC = () => {
    const { files, bookmarks } = useFiles();
    const [view, setView] = useState<ViewType>('list');
    const [previewFile, setPreviewFile] = useState<FileData | null>(null);

    const bookmarkedFiles = useMemo(() => {
        return files.filter(file => bookmarks.includes(file.id))
             .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
    }, [files, bookmarks]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white [text-shadow:1px_1px_3px_rgba(0,0,0,0.5)]">My Bookmarks</h1>
                <div className="flex items-center space-x-2 p-1 bg-gray-200 rounded-lg">
                    <button onClick={() => setView('grid')} className={`p-2 rounded-md ${view === 'grid' ? 'bg-white shadow' : ''}`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg></button>
                    <button onClick={() => setView('list')} className={`p-2 rounded-md ${view === 'list' ? 'bg-white shadow' : ''}`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg></button>
                </div>
            </div>

            {bookmarkedFiles.length > 0 ? (
                <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
                    {bookmarkedFiles.map(file => (
                        <FileCard key={file.id} file={file} view={view} onPreview={setPreviewFile} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-md">
                    <p className="text-gray-500 text-lg">You have no bookmarked files yet.</p>
                    <p className="text-gray-400 mt-2">Click the bookmark icon on any file to save it here.</p>
                </div>
            )}

            {previewFile && (
                <Modal title={previewFile.title} isOpen={!!previewFile} onClose={() => setPreviewFile(null)}>
                    {previewFile.type === 'img' && <img src={previewFile.url} alt={previewFile.title} className="max-w-full h-auto rounded-lg mx-auto" />}
                    {previewFile.type === 'pdf' && <iframe src={previewFile.url} title={previewFile.title} className="w-full h-[60vh] border-0"></iframe>}
                    {previewFile.type !== 'img' && previewFile.type !== 'pdf' && (
                        <div className="text-center space-y-4">
                            <p>Preview is not available for this file type.</p>
                             <p className="text-sm text-gray-500">Filename: {previewFile.filename}</p>
                             <p className="text-sm text-gray-500">Size: {formatFileSize(previewFile.size)}</p>
                             <Button onClick={() => window.open(previewFile.url, '_blank')}>Download File</Button>
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
};

export default BookmarksPage;
