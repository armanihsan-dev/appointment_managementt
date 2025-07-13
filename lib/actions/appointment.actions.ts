'use server';
import {
  APPOINTMENT_COLLECTION_ID,
  APPWRITE_DATABASE_ID,
  databases,
  messaging,
  PATIENT_COLLECTION_ID,
} from '@/lib/appwrite.config';
import { ID, Query } from 'node-appwrite';
import { formatDateTime, parseStringify } from '@/lib/utils';
import { Appointment } from '@/Types/appwrite.types';
import { revalidatePath } from 'next/cache';
import twilio from 'twilio';

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      APPWRITE_DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      APPWRITE_DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    if (!userId || userId.length > 36 || userId.startsWith('_')) {
      throw new Error(`Invalid Appwrite userId: ${userId}`);
    }

    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );

    return parseStringify(message);
  } catch (error) {
    console.error('An error occurred while sending SMS:', error);
  }
};

export const getRecentAppointments = async () => {
  try {
    const appointments = await databases.listDocuments(
      APPWRITE_DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc('$createdAt')]
    );
    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };
    const counts = (appointments.documents as Appointment[]).reduce(
      (acc: any, appointment: any) => {
        if (appointment.status === 'scheduled') {
          acc.scheduledCount += 1;
        } else if (appointment.status === 'pending') {
          acc.pendingCount += 1;
        } else if (appointment.status === 'cancelled') {
          acc.cancelledCount += 1;
        }
        return acc;
      },
      initialCounts
    );
    const data = {
      total: appointments.total,
      ...counts,
      documents: appointments.documents,
    };
    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  userId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      APPWRITE_DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    const smsMessage = `Greetings from HealthMeet. ${type === 'schedule' ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule!, timeZone).dateTime} with Dr. ${appointment.primaryPhysician}` : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule!, timeZone).dateTime} is cancelled. Reason:  ${appointment.cancellationReason}`}.`;

    await sendSMSNotification(userId, smsMessage);

    revalidatePath('/admin');
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error('An error occurred while scheduling an appointment:', error);
  }
};
