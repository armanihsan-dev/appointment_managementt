/* eslint-disable no-unused-vars */

import { Appointment } from '@/Types/appwrite.types';

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = 'male' | 'female' | 'other';
declare type Status = 'pending' | 'scheduled' | 'cancelled';

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  treatmentConsent: string;
  disclosureConsent: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

declare type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string | undefined;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

export declare type UpdateAppointmentParams = {
  appointmentId: string | undefined;
  userId: string;
  timeZone?: string;
  appointment: Partial<Appointment>;
  type: string;
};
