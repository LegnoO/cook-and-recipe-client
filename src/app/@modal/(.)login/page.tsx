// ** Components
import { Scroll } from "@/components/Scroll";
import LoginForm from "@/app/login/LoginForm";
import Modal from "@/components/Modal";

export default function LoginModal() {
  return (
    <Modal>
      <Scroll>
        <div className="max-h-[calc(100dvh-30px)]">
          <LoginForm />
        </div>
      </Scroll>
    </Modal>
  );
}
