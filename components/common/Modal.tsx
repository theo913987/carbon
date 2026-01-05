
import React, { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer, size = 'md', className = '' }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    'full': 'w-[calc(100%-2rem)] mx-4'
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
       <div 
         className={`bg-white rounded-xl shadow-2xl w-full ${sizeClasses[size]} flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 border border-slate-100 ${className}`}
         onClick={(e) => e.stopPropagation()}
       >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-100 flex-shrink-0 bg-white rounded-t-xl">
             <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
             <button 
                onClick={onClose} 
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-full transition-all"
             >
                <X size={20} />
             </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto">
             {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 flex-shrink-0 bg-slate-50/50 rounded-b-xl">
               {footer}
            </div>
          )}
       </div>
    </div>
  );
};
