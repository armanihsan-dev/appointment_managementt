import PatientForm from '@/components/forms/PatientForm';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <div className="flex h-screen max-h-fit">
      {/* Todo : OTP VERIFICATION | passkey model */}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[460px] ">
          <Image
            src={'/icons/logo-name.svg'}
            width={100}
            height={0}
            alt="logoName"
            className="mb-12 h-10 w-fit"
          />
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © {new Date().getFullYear()} HealthMeet
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]  "
      />
    </div>
  );
};

export default Home;
