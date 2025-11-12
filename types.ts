
export enum UserRole {
  Student = 'Student',
  Faculty = 'Faculty',
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  section: 'CSE-DS';
  profilePicture?: string;
}

export interface FileData {
  id: string;
  title: string;
  filename: string;
  type: 'pdf' | 'doc' | 'xls' | 'img' | 'other';
  subject: string;
  uploaderId: string;
  uploaderName: string;
  uploadDate: string;
  tags: string[];
  size: number; // in bytes
  url: string;
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning';
}

export type ViewType = 'grid' | 'list';
