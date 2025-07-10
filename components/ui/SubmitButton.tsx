import React from 'react';
interface SubmitButtonProps {
  isLoading: boolean;
  className?: string;
  children?: React.ReactNode;
}
const SubmitButton = ({
  isLoading,
  className,
  children,
}: SubmitButtonProps) => {
  return (
    <button
      className={className ?? 'shad-primary-btn'}
      type={'submit'}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="mx-auto">
          <p className="animate-pulse">Loading ....</p>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
export default SubmitButton;
