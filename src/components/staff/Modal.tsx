import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
            <div
                className="w-1/3 bg-white h-full shadow-lg transform transition-transform duration-300"
                style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
            >
                <button
                    className="absolute top-2 right-2 text-red-500"
                    onClick={onClose}
                >
                    Close
                </button>
                <div className="p-4">{children}</div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;