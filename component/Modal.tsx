import React from "react";

interface Props {
  open: boolean;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<Props> = ({ open, children, className }) => {
  if (!open) return null;

  return (
    <div
      className={`${className} fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-5xl transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
        <div className="bg-white p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
