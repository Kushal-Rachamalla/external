import React, { useState, useMemo } from 'react';
import { useFiles } from '../hooks/useFiles';
import { FileData, ViewType } from '../types';
import Input from '../components/ui/Input';
import FileCard from '../components/FileCard';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { formatFileSize } from '../utils/helpers';

const SearchPage: React.FC = () => {
    const { files, loading } = useFiles();
    const [searchTerm, setSearchTerm] = useState('');
    const [subjectFilter, setSubjectFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [view, setView] = useState<ViewType>('list');
    const [previewFile, setPreviewFile] = useState<FileData | null>(null);

    const subjects = useMemo(() => {
        const subjectSet = new Set(files.map(f => f.subject));
        return Array.from(subjectSet).sort();
    }, [files]);
    
    const filteredFiles = useMemo(() => {
        let result = files;
        
        // Search term
        if (searchTerm) {
            result = result.filter(file => 
                file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                file.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                file.uploaderName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Subject filter
        if (subjectFilter) {
            result = result.filter(file => file.subject === subjectFilter);
        }
        
        // Date filter
        if (dateFilter !== 'all') {
            const now = new Date();
            let cutoffDate = new Date();
            if (dateFilter === 'week') cutoffDate.setDate(now.getDate() - 7);
            if (dateFilter === 'month') cutoffDate.setMonth(now.getMonth() - 1);
            if (dateFilter === '3months') cutoffDate.setMonth(now.getMonth() - 3);
            result = result.filter(file => new Date(file.uploadDate) >= cutoffDate);
        }
        
        return result.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
    }, [files, searchTerm, subjectFilter, dateFilter]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-white [text-shadow:1px_1px_3px_rgba(0,0,0,0.5)] mb-6">Search Files</h1>
            
            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <Input
                    label="Search by keyword"
                    placeholder="e.g. DBMS, Unit 2, Dr. Meena..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                 <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select id="subject" value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm">
                        <option value="">All Subjects</option>
                        {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <select id="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm">
                        <option value="all">All Time</option>
                        <option value="week">Past Week</option>
                        <option value="month">Past Month</option>
                        <option value="3months">Past 3 Months</option>
                    </select>
                </div>
            </div>

            {/* View Toggle */}
            <div className="flex justify-end items-center mb-4">
                 <div className="flex items-center space-x-2 p-1 bg-gray-200 rounded-lg">
                    <button onClick={() => setView('grid')} className={`p-2 rounded-md ${view === 'grid' ? 'bg-white shadow' : ''}`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg></button>
                    <button onClick={() => setView('list')} className={`p-2 rounded-md ${view === 'list' ? 'bg-white shadow' : ''}`}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg></button>
                </div>
            </div>

            {/* Results */}
            {loading ? <p>Loading...</p> : (
                filteredFiles.length > 0 ? (
                    <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
                        {filteredFiles.map(file => (
                            <FileCard key={file.id} file={file} view={view} onPreview={setPreviewFile} />
                        ))}
                    </div>
                ) : <div className="text-center py-16 bg-white rounded-lg shadow-md"><p className="text-gray-500">No files match your search criteria.</p></div>
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

export default SearchPage;
