
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

interface DropZoneProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const DropZone = ({ id, children, className }: DropZoneProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'min-h-[200px] transition-all duration-200 rounded-lg',
        isOver && 'bg-mck-blue-50 border-2 border-dashed border-mck-blue-300',
        className
      )}
    >
      {children}
      {isOver && (
        <div className="flex items-center justify-center p-4 text-mck-blue-600 font-medium">
          Déposez le candidat ici
        </div>
      )}
    </div>
  );
};

export default DropZone;
