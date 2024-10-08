import { Skeleton } from "../ui/skeleton";

export const PostSkeleton = () => {
  return (
    <div className="flex flex-col rounded-md p-4 max-w-4xl mx-auto px-6 md:px-10">
      <Skeleton className="w-16 h-6 rounded-full mb-3" />
      <Skeleton className="w-full h-8 mb-6" />
      <div className="flex flex-col gap-2 mb-6">
        <Skeleton className="w-3/4 h-3" />
        <Skeleton className="w-1/2 h-3" />
      </div>
      <div className="flex items-center gap-3 py-3 mb-6">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-24 h-3" />
          <Skeleton className="w-32 h-2" />
        </div>
      </div>
      <Skeleton className="w-full h-96 mb-6 rounded-xl" />
      <div className="flex flex-col gap-2 mb-6">
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-3/4 h-3" />
        <Skeleton className="w-1/2 h-3" />
      </div>
      <div className="flex flex-col gap-2 mb-6">
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-3/4 h-3" />
        <Skeleton className="w-1/2 h-3" />
      </div>
    </div>
  );
};
