import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/patient.action';

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-fit">
      {/* Todo : OTP VERIFICATION | passkey model */}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[496px]">
          <Image
            src={'/icons/logo-name.svg'}
            width={100}
            height={100}
            alt="logoName"
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user} />

          <p className="copyright py-12">
            © {new Date().getFullYear()} HealthMeet
          </p>
        </div>
      </section>
      <Image
        src="/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};
export default Register;
