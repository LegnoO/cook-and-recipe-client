const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background">
      <div className="flex items-center gap-6">
        <span className="duration-1750 h-4 w-4 animate-ping rounded-full bg-primary opacity-75" />
        <span className="duration-1750 h-4 w-4 animate-ping rounded-full bg-primary opacity-75 delay-150" />
        <span className="duration-1750 h-4 w-4 animate-ping rounded-full bg-primary opacity-75 delay-300" />
      </div>
    </div>
  );
};

export default Loading;
