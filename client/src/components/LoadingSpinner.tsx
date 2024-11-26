import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Loader2 className="size-10 animate-spin text-muted-foreground" />
    </div>
  );
};

export default LoadingSpinner;
