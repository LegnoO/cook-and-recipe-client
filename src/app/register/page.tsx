// ** Components
import RegisterForm from "./RegisterForm";

export default function Login() {
  return (
    <div className="flex-center min-h-screen flex-col bg-home">
      <div className="my-10 w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}
