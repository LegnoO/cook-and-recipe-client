// ** Components
import { Scroll } from "@/components/Scroll";
import Modal from "@/components/Modal";
import ForgotPasswordForm from "@/app/forgot-password/ForgotPasswordForm";

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
