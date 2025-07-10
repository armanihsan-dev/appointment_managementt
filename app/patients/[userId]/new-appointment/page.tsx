import AppointmentForm from '@/components/forms/AppointmentForm';

import Image from 'next/image';

import React from 'react';
import { getPatient } from '@/lib/actions/patient.action';

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-fit">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between ">
          <Image
            src={'/icons/logo-name.svg'}
            width={100}
            height={0}
            alt="logoName"
            className="mb-12 h-10 w-fit"
          />
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient?.$id}
          />
          <p className="justify-items-end text-dark-600 xl:text- mt-10 py-12 copyright">
            © {new Date().getFullYear()} HealthMeet
          </p>
        </div>
      </section>
      <Image
        src="/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px] bg-bottom  "
      />
    </div>
  );
};

export default NewAppointment;
