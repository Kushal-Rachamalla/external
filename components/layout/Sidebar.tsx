import React from 'react';
// FIX: Import `Link` from `react-router-dom` as it is used for navigation in the sidebar.
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{ to: string, icon: React.ReactNode, children: React.ReactNode, onClick: () => void }> = ({ to, icon, children, onClick }) => {
    const navLinkClasses = "flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors";
    const activeClass = "bg-accent text-white";
    const inactiveClass = "text-gray-600 hover:bg-gray-200 hover:text-primary";

    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) => `${navLinkClasses} ${isActive ? activeClass : inactiveClass}`}
        >
            <span className="mr-3">{icon}</span>
            {children}
        </NavLink>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const { user } = useAuth();

    const facultyLinks = [
        { to: '/upload', label: 'Upload Files', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg> },
        { to: '/manage', label: 'Manage Uploads', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> },
    ];
    
    const commonLinks = [
        { to: '/dashboard', label: 'Dashboard', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> },
        { to: '/search', label: 'Search Files', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> },
        { to: '/bookmarks', label: 'Bookmarks', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg> },
        { to: '/downloads', label: 'My Downloads', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> },
        { to: '/profile', label: 'Profile', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> },
    ];

    const handleClose = () => setIsOpen(false);

    const sidebarContent = (
        <div className="flex flex-col h-full">
            <div className="p-6">
                <Link to="/dashboard" className="flex items-center space-x-2" onClick={handleClose}>
                     <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                     <span className="font-bold text-3xl text-primary">Note Nest</span>
                </Link>
            </div>
            <nav className="flex-grow px-6 space-y-2">
                {commonLinks.map(link => <NavItem key={link.to} to={link.to} icon={link.icon} onClick={handleClose}>{link.label}</NavItem>)}
                {user?.role === UserRole.Faculty && facultyLinks.map(link => <NavItem key={link.to} to={link.to} icon={link.icon} onClick={handleClose}>{link.label}</NavItem>)}
            </nav>
        </div>
    );
    
    return (
        <>
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 flex z-50 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleClose}></div>
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-background">
                    {sidebarContent}
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-72">
                    <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
                       {sidebarContent}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;