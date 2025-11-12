import { User, UserRole, FileData } from '../types';
import { sleep, getFileType } from '../utils/helpers';
import { v4 as uuidv4 } from 'uuid';

// --- SEED DATA ---
const seedUsers: User[] = [
    { id: 'u001', fullName: 'Alice Student', email: 'student@test.com', role: UserRole.Student, section: 'CSE-DS', profilePicture: 'https://picsum.photos/seed/u001/150/150' },
    { id: 'u002', fullName: 'Dr. Bob Faculty', email: 'faculty@test.com', role: UserRole.Faculty, section: 'CSE-DS', profilePicture: 'https://picsum.photos/seed/u002/150/150' },
];

const seedFiles: FileData[] = [
    { id: 'f001', title: 'DBMS Notes - Unit 2', filename: 'dbms_unit2.pdf', type: 'pdf', subject: 'DBMS', uploaderId: 'u002', uploaderName: 'Dr. Bob Faculty', uploadDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), tags: ['notes', 'unit2'], size: 123456, url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 'f002', title: 'OS Concepts Diagram', filename: 'os_concepts.png', type: 'img', subject: 'Operating Systems', uploaderId: 'u002', uploaderName: 'Dr. Bob Faculty', uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), tags: ['diagram'], size: 87654, url: 'https://picsum.photos/800/600' },
    { id: 'f003', title: 'Data Structures Cheatsheet', filename: 'ds_cheatsheet.docx', type: 'doc', subject: 'Data Structures', uploaderId: 'u002', uploaderName: 'Dr. Bob Faculty', uploadDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), tags: ['cheatsheet', 'quick-ref'], size: 45000, url: '#' },
];

// --- LOCALSTORAGE HELPERS ---
const getFromStorage = <T,>(key: string, defaultValue: T): T => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
};

const saveToStorage = <T,>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// Initialize storage with seed data if it's empty
if (!localStorage.getItem('users')) {
    saveToStorage('users', seedUsers);
}
if (!localStorage.getItem('files')) {
    saveToStorage('files', seedFiles);
}

// --- MOCK API IMPLEMENTATION ---
// A simple in-memory cache to avoid reading from localStorage on every call
let usersCache: User[] = getFromStorage('users', []);
let filesCache: FileData[] = getFromStorage('files', []);

const LATENCY = 500; // ms

// TODO: Replace mockAuth with real API calls to your authentication service.
export const mockAuth = {
    login: async (email: string, password: string): Promise<User> => {
        await sleep(LATENCY);
        const user = usersCache.find(u => u.email === email);
        if (user && password) { // Mock password check
            return Promise.resolve(user);
        }
        return Promise.reject(new Error('Invalid email or password'));
    },
    signup: async (userData: Omit<User, 'id'>): Promise<User> => {
        await sleep(LATENCY);
        if (usersCache.some(u => u.email === userData.email)) {
            return Promise.reject(new Error('User with this email already exists'));
        }
        const newUser: User = { ...userData, id: uuidv4() };
        usersCache.push(newUser);
        saveToStorage('users', usersCache);
        return Promise.resolve(newUser);
    },
    logout: () => {
        // In a real app, this would invalidate a token on the server.
        console.log('User logged out');
    },
};

// TODO: Replace mockFiles with real API calls to your file management service.
export const mockFiles = {
    list: async (filters: any): Promise<FileData[]> => {
        await sleep(LATENCY);
        // Here you would apply filters from the 'filters' object
        return Promise.resolve([...filesCache].sort((a,b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()));
    },

    upload: async (file: File, metadata: Omit<FileData, 'id'|'uploadDate'|'url'>): Promise<FileData> => {
        await sleep(LATENCY * 2); // Simulate longer upload time
        
        // In a real app, you'd upload the file to cloud storage and get a URL back.
        // For this mock, we'll use a placeholder URL.
        const newFile: FileData = {
            ...metadata,
            id: uuidv4(),
            uploadDate: new Date().toISOString(),
            url: URL.createObjectURL(file), 
        };
        
        filesCache.unshift(newFile);
        saveToStorage('files', filesCache);
        return Promise.resolve(newFile);
    },
    
    edit: async(fileId: string, metadata: Partial<FileData>): Promise<FileData> => {
        await sleep(LATENCY);
        const fileIndex = filesCache.findIndex(f => f.id === fileId);
        if (fileIndex === -1) {
            return Promise.reject(new Error("File not found"));
        }
        filesCache[fileIndex] = { ...filesCache[fileIndex], ...metadata };
        saveToStorage('files', filesCache);
        return Promise.resolve(filesCache[fileIndex]);
    },
    
    delete: async (fileId: string): Promise<void> => {
        await sleep(LATENCY);
        const initialLength = filesCache.length;
        filesCache = filesCache.filter(f => f.id !== fileId);
        if (filesCache.length === initialLength) {
            return Promise.reject(new Error("File not found"));
        }
        saveToStorage('files', filesCache);
        return Promise.resolve();
    }
};