// ** Components
import ForgotPasswordForm from "@/app/(default-layout)/forgot-password/ForgotPasswordForm";
import Modal from "@/components/Modal";
import { Scroll } from "@/components/Scroll";

export default function ForgotPasswordModal() {
  return (
    <Modal>
      <Scroll>
        <div className="max-h-[calc(100dvh-30px)]">
          <ForgotPasswordForm />
        </div>
      </Scroll>
    </Modal>
  );
}
