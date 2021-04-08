import { ReactElement, useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';

interface StyledToastProps {
  message: string | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void; // communicate back to hook when open status changes
}

export function StyledToast({
  message,
  isOpen,
  setIsOpen,
}: StyledToastProps): ReactElement | null {
  // don't show anything if there's no message
  if (!message) return null;

  return (
    <div
      className="p-3 my-2 rounded"
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        minWidth: '400px',
        zIndex: 1000,
      }}
    >
      <Toast onClose={() => setIsOpen(false)} show={isOpen} autohide>
        <Toast.Header className="bg-green text-white" closeButton>
          <span className="mr-auto" />
        </Toast.Header>
        <Toast.Body className="text-green">{message}</Toast.Body>
      </Toast>
    </div>
  );
}
