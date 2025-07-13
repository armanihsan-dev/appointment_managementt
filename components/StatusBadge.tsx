import React from 'react';
import { clsx } from 'clsx';
import Image from 'next/image';
import { StatusIcon } from '@/constants';

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx('status-badge', {
        'bg-green-50 backdrop-blur-2xl': status === 'scheduled',
        'bg-blue-50': status === 'pending',
        'bg-red-50': status === 'cancelled',
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt={status}
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx('text-12-semibold', {
          'text-green-500': status === 'scheduled',
          'text-blue-500': status === 'pending',
          'text-red-500': status === 'cancelled',
        })}
      >
        {status}
      </p>
    </div>
  );
};
export default StatusBadge;
