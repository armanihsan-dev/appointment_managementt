import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StatCard from '@/components/StatCard';
import { getRecentAppointments } from '@/lib/actions/appointment.actions';
import { DataTable } from '@/components/Table/DataTable';
import columns from '@/components/Table/columns';

const Admin = async () => {
  const appointments = await getRecentAppointments();

  return (
    <div className="mx-auto  flex max-w-7xl flex-col space-y-4">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/icons/logo-name.svg"
            width={32}
            height={162}
            alt={'logo'}
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p>Start the day with managing new appointments</p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduledCount}
            label="Scheduled appointments"
            icon="/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon="/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointments"
            icon="/icons/cancelled.svg"
          />
        </section>
        <DataTable data={appointments.documents} columns={columns} />
      </main>
    </div>
  );
};
export default Admin;
