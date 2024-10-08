import { Skeleton } from "../ui/skeleton";

export const EditPostSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8 px-6 md:px-16">
      <div className="flex flex-col gap-6 rounded-md p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="w-16 h-8 rounded-full" />
          <Skeleton className="w-24 h-10 rounded-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-3/4 h-6" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-3/4 h-3" />
          <Skeleton className="w-1/2 h-3" />
        </div>
        <Skeleton className="w-full h-96 mb-4" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-3 rounded-sm" />
          <Skeleton className="w-3/4 h-3  rounded-sm" />
          <Skeleton className="w-1/2 h-3  rounded-sm" />
        </div>{" "}
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-3 rounded-sm" />
          <Skeleton className="w-3/4 h-3 rounded-sm" />
          <Skeleton className="w-1/2 h-3 rounded-sm" />
        </div>
      </div>
    </div>
  );
};
