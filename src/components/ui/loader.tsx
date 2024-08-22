import { Skeleton } from "./skeleton";

export default function Loader() {
  return (
    <>
      <div className="flex items-center space-x-4 p-10">
        <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] sm:w-[1024px] bg-gray-200" />
          <Skeleton className="h-4 w-[200px] sm:w-[900px] bg-gray-200" />
        </div>
      </div>
      <div className="flex items-center space-x-4 p-10">
        <Skeleton className="h-12 w-12 rounded-full bg-gray-200" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] sm:w-[1024px] bg-gray-200" />
          <Skeleton className="h-4 w-[200px] sm:w-[900px] bg-gray-200" />
        </div>
      </div>
    </>
  );
}
