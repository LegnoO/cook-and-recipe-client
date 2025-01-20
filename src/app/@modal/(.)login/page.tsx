// ** Components
import { Scroll } from "@/components/Scroll";
import Modal from "@/components/Modal";
import LoginForm from "@/app/login/_components/LoginForm";

export default function LoginModal() {
  return (
    <Modal>
      <Scroll>
        <div className="max-h-[calc(100dvh-30px)]">
          <LoginForm isModal={false} />
        </div>
      </Scroll>
    </Modal>
  );
}
