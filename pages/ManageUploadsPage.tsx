import React, { useMemo, useState } from 'react';
import { useFiles } from '../hooks/useFiles';
import { useAuth } from '../hooks/useAuth';
import { FileData } from '../types';
import FileIcon from '../components/ui/FileIcon';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { useForm } from 'react-hook-form';
import { useToast } from '../hooks/useToast';
import { formatFileSize } from '../utils/helpers';

const ManageUploadsPage: React.FC = () => {
    const { files, updateFile, deleteFile } = useFiles();
    const { user } = useAuth();
    const { addToast } = useToast();
    const [editingFile, setEditingFile] = useState<FileData | null>(null);
    const [deletingFile, setDeletingFile] = useState<FileData | null>(null);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    
    const myUploads = useMemo(() => {
        return files.filter(file => file.uploaderId === user?.id)
            .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
    }, [files, user]);

    const handleEditClick = (file: FileData) => {
        setEditingFile(file);
        setValue('title', file.title);
        setValue('subject', file.subject);
        setValue('tags', file.tags.join(', '));
    };
    
    const handleEditSubmit = (data: any) => {
        if (!editingFile) return;
        const metadata: Partial<FileData> = {
            title: data.title,
            subject: data.subject,
            tags: data.tags.split(',').map((t:string) => t.trim()).filter(Boolean),
        };
        updateFile(editingFile.id, metadata);
        addToast("File updated successfully!", "success");
        setEditingFile(null);
    };
    
    const handleDeleteConfirm = async () => {
        if (!deletingFile) return;
        try {
            await deleteFile(deletingFile.id);
            addToast("File deleted successfully", "success");
        } catch (e) {
            addToast("Failed to delete file", "error");
        } finally {
            setDeletingFile(null);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white [text-shadow:1px_1px_3px_rgba(0,0,0,0.5)] mb-6">Manage My Uploads</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {myUploads.length > 0 ? myUploads.map((file) => (
                                <tr key={file.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <FileIcon type={file.type} className="w-6 h-6 mr-3" />
                                            <div className="text-sm font-medium text-gray-900">{file.title}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(file.uploadDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatFileSize(file.size)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                        <Button variant="secondary" size="sm" onClick={() => handleEditClick(file)}>Edit</Button>
                                        <Button variant="danger" size="sm" onClick={() => setDeletingFile(file)}>Delete</Button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={5} className="text-center py-8 text-gray-500">You have not uploaded any files.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            <Modal isOpen={!!editingFile} onClose={() => setEditingFile(null)} title="Edit File Details">
                <form onSubmit={handleSubmit(handleEditSubmit)} className="space-y-4">
                     <Input id="title" label="File Title" {...register('title', { required: true })} error={errors.title ? 'Title is required' : ''} />
                     <Input id="subject" label="Subject" {...register('subject', { required: true })} error={errors.subject ? 'Subject is required' : ''} />
                     <Input id="tags" label="Tags (comma-separated)" {...register('tags')} />
                     <div className="flex justify-end space-x-2 pt-4">
                        <Button type="button" variant="secondary" onClick={() => setEditingFile(null)}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                     </div>
                </form>
            </Modal>
            
            {/* Delete Confirmation Modal */}
            <Modal isOpen={!!deletingFile} onClose={() => setDeletingFile(null)} title="Confirm Deletion">
                <p>Are you sure you want to delete the file "<strong>{deletingFile?.title}</strong>"? This action cannot be undone.</p>
                <div className="flex justify-end space-x-2 pt-6">
                    <Button variant="secondary" onClick={() => setDeletingFile(null)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
                </div>
            </Modal>
        </div>
    );
};

export default ManageUploadsPage;
