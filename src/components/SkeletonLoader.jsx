const SkeletonLoader = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  );
};

export const AnimeCardSkeleton = () => (
  <div className="relative overflow-hidden rounded-xl shadow-lg dark:shadow-black/20">
    <SkeletonLoader className="w-full h-64 bg-gray-300 dark:bg-gray-700" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    <div className="absolute inset-x-0 bottom-0 p-4">
      <SkeletonLoader className="h-4 w-3/4 mb-2 bg-white/20" />
      <SkeletonLoader className="h-3 w-1/2 bg-white/20" />
    </div>
  </div>
);

export const AnimeDetailSkeleton = () => (
  <div className="flex flex-col md:flex-row gap-8">
    <SkeletonLoader className="w-40 sm:w-48 md:w-56 h-64 rounded-lg" />
    <div className="flex-grow pt-4">
      <SkeletonLoader className="h-8 w-3/4 mb-4" />
      <SkeletonLoader className="h-4 w-1/2 mb-4" />
      <SkeletonLoader className="h-4 w-full mb-2" />
      <SkeletonLoader className="h-4 w-full mb-2" />
      <SkeletonLoader className="h-4 w-3/4 mb-4" />
      <div className="flex gap-3">
        <SkeletonLoader className="h-12 w-32 rounded-lg" />
        <SkeletonLoader className="h-12 w-32 rounded-lg" />
      </div>
    </div>
  </div>
);

export default SkeletonLoader;
