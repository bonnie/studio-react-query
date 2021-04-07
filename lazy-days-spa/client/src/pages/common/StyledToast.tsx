import { ReactElement, useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';

interface StyledToastProps {
  title: string | null;
  message: string;
  isOpen: boolean;
}

export function StyledToast({
  title,
  message,
  isOpen,
}: StyledToastProps): ReactElement {
  const [open, setOpen] = useState(isOpen);

  // be sure to update state when prop updates
  useEffect(() => setOpen(isOpen), [isOpen]);

  return (
    <div
      className="p-3 my-2 rounded"
      style={{
        position: 'absolute',
        bottom: '20px',
        minWidth: '400px',
        zIndex: 1000,
      }}
    >
      <Toast onClose={() => setOpen(false)} show={open} autohide>
        <Toast.Header className="bg-danger text-white" closeButton>
          <strong className="mr-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body className="text-danger">{message}</Toast.Body>
      </Toast>
    </div>
  );
}
