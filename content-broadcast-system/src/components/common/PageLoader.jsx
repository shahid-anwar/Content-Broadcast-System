import { LoaderCircle } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-transparent p-6 rounded-full shadow-lg">
        <LoaderCircle className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    </div>
  );
};

export default PageLoader;
