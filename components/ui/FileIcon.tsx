
import React from 'react';
import { FileData } from '../../types';

interface FileIconProps {
  type: FileData['type'];
  className?: string;
}

const FileIcon: React.FC<FileIconProps> = ({ type, className = 'w-6 h-6' }) => {
  const iconData = {
    pdf: {
      color: 'text-red-500',
      path: "M4 4v16h16V4H4zm10 4v1.5c0 1.38-1.12 2.5-2.5 2.5S9 10.88 9 9.5V8H7v1.5c0 2.48 2.02 4.5 4.5 4.5S16 11.98 16 9.5V8h-2zm-3-3h2v2h-2V5z"
    },
    doc: {
      color: 'text-blue-500',
      path: "M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"
    },
    xls: {
      color: 'text-green-500',
      path: "M4 4v16h16V4H4zm14 14h-4v-4h4v4zm0-6h-4V8h4v4zm-6 6H8v-4h4v4zm0-6H8V8h4v4z"
    },
    img: {
      color: 'text-purple-500',
      path: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
    },
    other: {
      color: 'text-gray-500',
      path: "M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"
    }
  };

  const { color, path } = iconData[type] || iconData.other;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`${className} ${color} fill-current`}>
      <path d={path}></path>
    </svg>
  );
};

export default FileIcon;
