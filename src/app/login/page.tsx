// ** Components
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="flex-center bg-home min-h-screen flex-col">
      <div className="my-10 w-full max-w-md">
        <LoginForm isModal />
      </div>
    </div>
  );
}
