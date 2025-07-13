'use client';

import { ColumnDef } from '@tanstack/react-table';

import StatusBadge from '@/components/StatusBadge';
import { formatDateTime } from '@/lib/utils';
import { Doctors } from '@/constants';
import Image from 'next/image';
import AppointmentModel from '@/components/AppointmentModel';
import { Appointment } from '@/Types/appwrite.types';

const columns: ColumnDef<Appointment>[] = [
  {
    header: 'ID',
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.original.patient.name}</p>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={row.original.status} />
        </div>
      );
    },
  },
  {
    accessorKey: 'schedule',
    header: 'Appointment',
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: 'primaryPhysician',
    header: 'Doctor',
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doctor) => doctor.name === row.original.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image}
            alt={'doctor'}
            width={100}
            height={100}
            className="size-7"
          />
          <p>{doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModel
            type="schedule"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
          />
          <AppointmentModel
            type="cancel"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
          />
        </div>
      );
    },
  },
];

export default columns;
