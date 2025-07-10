'use client';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

import { convertFileToUrl } from '@/lib/utils';

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};
const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload text-gray-300">
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          alt={'uploaded image'}
          className="max-h-[400px] overflow-hidden object-cover"
          width={100}
          height={100}
        />
      ) : (
        <>
          <Image
            src="/icons/upload.svg"
            width={40}
            height={40}
            alt={'upload image'}
          />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500">Click to upload</span> or drag
              and drop
            </p>
            <p>SVG, JPG, PNG or GIF (max 800*400).</p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
