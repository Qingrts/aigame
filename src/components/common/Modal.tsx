/**
 * 通用模态框组件
 */

import { ModalHTMLAttributes, forwardRef } from 'react';
import { Button } from './Button';

interface ModalProps extends ModalHTMLAttributes<HTMLDialogElement> {
  title: string;
  children: React.ReactNode;
  showClose?: boolean;
  onClose?: () => void;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ title, children, showClose = true, onClose, ...props }, ref) => {
    return (
      <dialog
        ref={ref}
        className="fixed inset-0 z-50 p-4 bg-black/50 backdrop-blur-sm flex items-center justify-center"
        {...props}
      >
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            {showClose && (
              <Button variant="secondary" size="sm" onClick={onClose}>
                ✕
              </Button>
            )}
          </div>
          <div>{children}</div>
        </div>
      </dialog>
    );
  }
);

Modal.displayName = 'Modal';

export { Modal };
