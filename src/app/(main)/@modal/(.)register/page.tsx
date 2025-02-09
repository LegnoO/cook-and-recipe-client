// ** Components
import { Scroll } from "@/components/Scroll";
import Modal from "@/components/Modal";
import RegisterForm from "../../register/_components/RegisterForm";

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
