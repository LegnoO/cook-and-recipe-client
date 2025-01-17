// ** Next Imports
import Image from "next/image";

// ** Components
import { Logo } from "@/components/ui/icons";

// ** Images
import WaveAnimationGif from "@/assets/wave.gif";

const LoadingScreen = () => {
  return (
    <div className="loading-screen z-hightest fixed inset-0 flex items-center justify-center bg-background">
      <Logo className="animate-wavePulse" size={60} />
      <Image
        className="absolute-center"
        width="300"
        height="300"
        src={WaveAnimationGif}
        alt="loading gif"
        priority
        quality={100}
        unoptimized
      />
    </div>
  );
};

export default LoadingScreen;
