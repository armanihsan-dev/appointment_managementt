'use server';

import { ID, Query } from 'node-appwrite';
import {
  APPWRITE_DATABASE_ID,
  BUCKET_ID,
  databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from '@/lib/appwrite.config';
import { parseStringify } from '../utils';
import { InputFile } from 'node-appwrite/file';
export const createUser = async (user: CreateUserParams) => {
  try {
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return parseStringify(newuser);
  } catch (error: any) {
    if (error && error.code === 409) {
      const existingUser = await users.list([
        Query.equal('email', [user.email]),
      ]);
      return existingUser?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error: any) {
    console.log(error);
  }
};
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      APPWRITE_DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    );
    return parseStringify(patients.documents[0]);
  } catch (error: any) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  treatmentConsent,
  disclosureConsent,
  privacyConsent,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument.get('blobFile') as Blob,
        identificationDocument.get('fileName') as string
      );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const fileId = file?.$id;

    console.log({
      identificationDocument: fileId || null,
      identificationDocumentUrl: fileId
        ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`
        : null,
    });

    const newPatient = await databases.createDocument(
      APPWRITE_DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        // Save only if your Appwrite schema has this field
        identificationDocumentUrl: fileId
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`
          : null,

        // Convert boolean consents to string if Appwrite expects string
        treatmentConsent: String(treatmentConsent),
        disclosureConsent: String(disclosureConsent),
        privacyConsent,

        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error('❌ registerPatient error:', error);
    throw error;
  }
};
