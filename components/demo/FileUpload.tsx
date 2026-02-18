'use client';

import { useState, useCallback, useRef } from 'react';
import { Upload, Image, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
}

export default function FileUpload({ onFileSelect, accept = 'image/*' }: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    setFileName(file.name);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
    onFileSelect(file);
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const clear = () => {
    setPreview(null);
    setFileName('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
        dragOver ? 'border-amber-500 bg-amber-500/10' : 'border-white/20 hover:border-white/40'
      }`}
    >
      <input ref={inputRef} type='file' accept={accept} onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} className='hidden' />
      {preview ? (
        <div className='space-y-3'>
          <img src={preview} alt='Preview' className='max-h-48 mx-auto rounded-lg' />
          <p className='text-sm text-gray-400'>{fileName}</p>
          <button onClick={(e) => { e.stopPropagation(); clear(); }} className='text-xs text-red-400 hover:text-red-300 flex items-center gap-1 mx-auto'>
            <X size={12} /> クリア
          </button>
        </div>
      ) : (
        <div className='space-y-3'>
          <Upload size={40} className='mx-auto text-gray-500' />
          <p className='text-gray-400'>ドラッグ&ドロップ または クリックして選択</p>
          <p className='text-xs text-gray-600'>PNG, JPG, PDF対応</p>
        </div>
      )}
    </div>
  );
}
