import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { Doctors } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Success = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || '';
  const appointmentDetails = await getAppointment(appointmentId);

  const { primaryPhysician } = appointmentDetails;

  const doctor = Doctors.find((doctor) => doctor.name === primaryPhysician);
  console.log(appointmentDetails);

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/icons/logo-name.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p className="text-gray-600">
            We&apos;ll be in touch shortly to confirm.
          </p>
        </section>
        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image
              src={`${doctor?.image ?? '/icons/doctor.svg'}`}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointmentDetails.schedule).dateTime}</p>
          </div>
        </section>
        <Button variant="outline" className="shad-primary-btn w-fit" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
        <p className="copyright">© {new Date().getFullYear()} HealthMeet</p>
      </div>
    </div>
  );
};
export default Success;
