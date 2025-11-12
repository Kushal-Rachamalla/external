import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useFiles } from '../hooks/useFiles';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { mockFiles } from '../services/mockApi';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_BYTES } from '../constants';
import { formatFileSize, getFileType } from '../utils/helpers';
import { FileData } from '../types';
import { useNavigate } from 'react-router-dom';


const UploadPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const { addFile } = useFiles();
    const { user } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
        if (fileRejections.length > 0) {
            fileRejections[0].errors.forEach((err: any) => {
                if (err.code === 'file-too-large') {
                    addToast(`Error: File is larger than ${formatFileSize(MAX_FILE_SIZE_BYTES)}`, 'error');
                }
                if (err.code === 'file-invalid-type') {
                    addToast('Error: Invalid file type.', 'error');
                }
            });
            return;
        }
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
        }
    }, [addToast]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        maxSize: MAX_FILE_SIZE_BYTES,
        accept: ALLOWED_FILE_TYPES.reduce((acc, type) => ({ ...acc, [type]: [] }), {})
    });

    const onSubmit = async (data: any) => {
        if (!file || !user) {
            addToast('Please select a file to upload.', 'error');
            return;
        }

        setIsUploading(true);
        
        // TODO: Replace with actual file upload API call
        const newFile: Omit<FileData, 'id' | 'uploadDate' | 'url'> = {
            title: data.title,
            subject: data.subject,
            tags: data.tags.split(',').map((t:string) => t.trim()).filter(Boolean),
            filename: file.name,
            size: file.size,
            type: getFileType(file.name),
            uploaderId: user.id,
            uploaderName: user.fullName,
        };
        
        try {
            // Simulate upload progress
            const interval = setInterval(() => {
                setUploadProgress(prev => {
                    const next = prev + 10;
                    if (next >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return next;
                });
            }, 200);

            const uploadedFile = await mockFiles.upload(file, newFile);
            
            clearInterval(interval);
            setUploadProgress(100);
            
            addFile(uploadedFile);
            addToast('File uploaded successfully!', 'success');
            reset();
            setFile(null);
            setUploadProgress(0);
            navigate('/dashboard');

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            addToast(errorMessage, 'error');
        } finally {
            setIsUploading(false);
        }
    };
    
    return (
        <div>
            <h1 className="text-3xl font-bold text-white [text-shadow:1px_1px_3px_rgba(0,0,0,0.5)] mb-6">Upload New File</h1>
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div
                        {...getRootProps()}
                        className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive ? 'border-accent bg-blue-50' : 'border-gray-300 hover:border-accent'}`}
                    >
                        <input {...getInputProps()} />
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {isDragActive ? (
                            <p className="mt-2 text-accent">Drop the file here ...</p>
                        ) : (
                            <p className="mt-2 text-gray-600">Drag & drop a file here, or click to select a file</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Max file size: {formatFileSize(MAX_FILE_SIZE_BYTES)}</p>
                    </div>

                    {file && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-md text-sm">
                            <p><strong>Selected file:</strong> {file.name} ({formatFileSize(file.size)})</p>
                        </div>
                    )}
                    
                    <Input
                        id="title"
                        label="File Title"
                        error={errors.title?.message as string}
                        {...register('title', { required: 'Title is required' })}
                    />
                    <Input
                        id="subject"
                        label="Subject"
                        error={errors.subject?.message as string}
                        {...register('subject', { required: 'Subject is required' })}
                    />
                    <Input
                        id="tags"
                        label="Tags (comma-separated)"
                        placeholder="e.g. notes, unit2, important"
                        {...register('tags')}
                    />

                    {isUploading && (
                        <div className="w-full bg-gray-200 rounded-full">
                            <div className="bg-accent text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${uploadProgress}%` }}>
                                {uploadProgress}%
                            </div>
                        </div>
                    )}
                    
                    <div className="text-right">
                        <Button type="submit" disabled={isUploading || !file}>
                            {isUploading ? 'Uploading...' : 'Upload File'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadPage;
