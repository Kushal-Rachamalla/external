
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

export const getFileType = (filename: string): 'pdf' | 'doc' | 'xls' | 'img' | 'other' => {
  const extension = getFileExtension(filename).toLowerCase();
  if (extension === 'pdf') return 'pdf';
  if (['doc', 'docx'].includes(extension)) return 'doc';
  if (['xls', 'xlsx'].includes(extension)) return 'xls';
  if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'img';
  return 'other';
};
