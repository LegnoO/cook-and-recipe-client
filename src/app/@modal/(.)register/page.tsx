// ** Components
import RegisterForm from "@/app/register/RegisterForm";
import Modal from "@/components/Modal";
import { Scroll } from "@/components/Scroll";

export default function RegisterModal() {
  return (
    <Modal>
      <Scroll>
        <div className="max-h-[calc(100dvh-30px)]">
          <RegisterForm />
        </div>
      </Scroll>
    </Modal>
  );
}
