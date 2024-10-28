import Image from "next/image";
// ** Components
import { Logo } from "@/components/ui/Icons";

// ** Images
import WaveAnimationGif from "@/assets/wave.gif";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <Logo className="animate-wavePulse" size={60} />
      <Image
        className="absolute-center"
        width="300"
        height="300"
        src={WaveAnimationGif}
        alt="loading gif"
        priority
        quality={100}
      />
    </div>
  );
};

export default LoadingScreen;
