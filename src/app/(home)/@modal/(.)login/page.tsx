"use client";

import LoginFrame from "@/components/LoginFrame";
import Modal from "@/components/Modal";
import { useAuth } from "@/hooks/useAuth";

export default function ModalLogin() {

  return (
    <Modal>
      <LoginFrame />
    </Modal>
  );
  
}
