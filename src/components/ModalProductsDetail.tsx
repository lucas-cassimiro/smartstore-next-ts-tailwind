"use client";

import useModal from "@/hooks/useModal";

interface ModalProps {
  children: React.ReactNode;
}

export default function ModalProductsDetail({ children }: ModalProps) {
  const { onClick, overlay, wrapper } = useModal();

  return (
    <div
      ref={overlay}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/40 scrollbar overflow-y-auto cursor-pointer"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 tabletgrande:w-1/2 cursor-default"
      >
        {children}
      </div>
    </div>
  );
}
