'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import AppointmentForm from '@/components/forms/AppointmentForm';
import { Appointment } from '@/Types/appwrite.types';

const AppointmentModel = ({
  type,
  patientId,
  userId,
  appointment,
}: {
  type: 'schedule' | 'cancel';
  patientId: string;
  userId: string;
  appointment?: Appointment;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${type === 'schedule' && 'text-green-500'} `}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md shadow-[0_1px_10px_rgba(0.2,0.1,0,0.1)]">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the following details to {type} an appointment.
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          userId={userId}
          patientId={patientId}
          type={type}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
export default AppointmentModel;
