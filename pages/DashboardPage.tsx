import React, { useState, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFiles } from '../hooks/useFiles';
import { FileData, UserRole, ViewType } from '../types';
import FileCard from '../components/FileCard';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { formatFileSize } from '../utils/helpers';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ title: string, value: string | number, icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className="bg-accent/10 text-accent rounded-full p-3">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-primary">{value}</p>
        </div>
    </div>
);

const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const { files, loading, downloads } = useFiles();
    const [view, setView] = useState<ViewType>('grid');
    const [previewFile, setPreviewFile] = useState<FileData | null>(null);

    const facultyStats = useMemo(() => {
        if (user?.role !== UserRole.Faculty) return null;
        const uploadedFiles = files.filter(f => f.uploaderId === user.id);
        const totalDownloads = downloads.filter(downloadId => uploadedFiles.some(f => f.id === downloadId)).length;
        const lastUpload = uploadedFiles.length > 0 ? new Date(uploadedFiles[0].uploadDate).toLocaleDateString() : 'N/A';
        return {
            uploads: uploadedFiles.length,
            downloads: totalDownloads,
            lastUpload: lastUpload,
        };
    }, [files, downloads, user]);

    const studentStats = useMemo(() => {
        if (user?.role !== UserRole.Student) return null;
        return {
            totalFiles: files.length,
            downloads: downloads.length,
        }
    }, [files, downloads, user]);

    const recentFiles = useMemo(() => [...files].sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()).slice(0, 10), [files]);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white [text-shadow:1px_1px_3px_rgba(0,0,0,0.5)] mb-6">Welcome, {user?.fullName}!</h1>

            {/* Stats Section */}
            <section>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {user?.role === UserRole.Faculty && facultyStats && (
                        <>
                             <StatCard title="Total Files Uploaded" value={facultyStats.uploads} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>} />
                             <StatCard title="Total Downloads" value={facultyStats.downloads} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>} />
                             <StatCard title="Last Upload" value={facultyStats.lastUpload} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>} />
                        </>
                    )}
                     {user?.role === UserRole.Student && studentStats && (
                        <>
                             <StatCard title="Total Available Files" value={studentStats.totalFiles} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>} />
                             <StatCard title="Your Downloads" value={studentStats.downloads} icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>} />
                             <Link to="/search" className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center text-accent hover:bg-gray-50 transition">
                                <div className="text-center">
                                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    <p className="mt-2 font-bold">Search All Files</p>
                                </div>
                             </Link>
                        </>
                    )}
                </div>
            </section>
            
            {/* Recent Files Section */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white [text-shadow:1px_1px_3px_rgba(0,0,0,0.5)]">Recently Added Files</h2>
                    <div className="flex items-center space-x-2 p-1 bg-gray-200 rounded-lg">
                        <button onClick={() => setView('grid')} className={`p-2 rounded-md ${view === 'grid' ? 'bg-white shadow' : ''}`}>
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        </button>
                        <button onClick={() => setView('list')} className={`p-2 rounded-md ${view === 'list' ? 'bg-white shadow' : ''}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
                        </button>
                    </div>
                </div>

                {loading ? <p>Loading files...</p> : (
                    recentFiles.length > 0 ? (
                        <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
                            {recentFiles.map(file => (
                                <FileCard key={file.id} file={file} view={view} onPreview={setPreviewFile} />
                            ))}
                        </div>
                    ) : <p className="text-center text-gray-500 py-8">No files have been uploaded yet.</p>
                )}
            </section>
            
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

export default DashboardPage;
