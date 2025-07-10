'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import CustomFormField from '../ui/CustomFormField';
import SubmitButton from '@/components/ui/SubmitButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormFieldType } from './PatientForm';
import { SelectItem } from '../ui/select';
import { Doctors } from '@/constants';
import Image from 'next/image';
import { createAppointment } from '@/lib/actions/appointment.actions';
import { getAppointmentSchema } from '@/lib/validation';

const AppointmentForm = ({
  userId,
  patientId,
  type,
}: {
  userId: string;
  patientId: string;
  type: 'create' | 'cancel' | 'schedule';
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const AppointmentFormValidation = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: '',
      schedule: new Date(),
      reason: '',
      note: '',
      cancellationReason: '',
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);
    let status;
    switch (type) {
      case 'cancel':
        status = 'cancelled';
        break;
      case 'schedule':
        status = 'scheduled';
        break;
      default:
        status = 'pending';
        break;
    }
    try {
      if (type === 'create' && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason,
          note: values.note,
          status: status as Status,
        };
        const appointment = await createAppointment(appointmentData);
        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  let buttonLabel;
  switch (type) {
    case 'cancel':
      buttonLabel = 'Cancel Appointment';
      break;
    case 'create':
      buttonLabel = 'Create Appointment';
      break;
    case 'schedule':
      buttonLabel = 'Schedule Appointment';
      break;
    default:
      break;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment </h1>
          <p>Request a new appointment in 10 seconds.</p>
        </section>

        {type !== 'cancel' && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name={'schedule'}
              fieldType={FormFieldType.DATE_PICKER}
              label="Expected appointment date"
              showTimeSelect
              dateFormat={'MM/dd/yyyy - HH:mm aa'}
            />
            <div className="flex gap-6 flex-col lg:flex-row  justify-between">
              <div className="lg:w-[50%]">
                <CustomFormField
                  control={form.control}
                  name={'reason'}
                  fieldType={FormFieldType.TEXTAREA}
                  label="Reason for appointment"
                  placeholder="Please provide a reason for your appointment"
                />
              </div>
              <div className="lg:w-[50%]">
                <CustomFormField
                  control={form.control}
                  name={'note'}
                  fieldType={FormFieldType.TEXTAREA}
                  label="Additional notes"
                  placeholder="Please provide any additional notes"
                />
              </div>
            </div>
          </>
        )}

        {type === 'cancel' && (
          <>
            <CustomFormField
              control={form.control}
              name={'cancellationReason'}
              fieldType={FormFieldType.TEXTAREA}
              label="Reason for cancellation"
              placeholder="Please provide a reason for your cancellation"
            />
          </>
        )}
        <SubmitButton
          isLoading={isLoading}
          className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} px-12`}
        >
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
