import React from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export default function Drawer({ open, onOpenChange, title, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white z-50 shadow-lg p-6 overflow-y-auto transition-all">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={() => onOpenChange(false)}>
              <X size={20} />
            </button>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
