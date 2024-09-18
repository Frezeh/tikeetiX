import { usePagination, DOTS } from "@/hooks/use-pagination";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  onNext: () => void;
  onPrevious: () => void;
  onPageChange: (page: number) => void;
};

const Pagination = (props: PaginationProps) => {
  const {
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    onNext,
    onPrevious,
    onPageChange,
  } = props;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (
    currentPage === 0 ||
    (paginationRange !== undefined && paginationRange.length < 2)
  ) {
    return null;
  }

  let lastPage =
    paginationRange !== undefined &&
    paginationRange[paginationRange.length - 1];
  return (
    <div className="flex items-center gap-2">
      <button
        aria-haspopup="true"
        className="w-9 h-9 rounded-[6px] flex items-center justify-center border border-[#D0D5DD] bg-white"
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        <ChevronLeft color="#13191C" size={25} />
        <span className="sr-only">Navigation control</span>
      </button>

      {paginationRange !== undefined &&
        paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <p
                className="w-9 h-9 rounded-[6px] flex items-center justify-center bg-white"
                key={index}
              >
                &#8230;
              </p>
            );
          }

          return (
            <button
              className={cn(
                "w-9 h-9 rounded-[6px] flex items-center justify-center bg-white",
                pageNumber === currentPage && "border border-[#13191C]"
              )}
              onClick={() => onPageChange(Number(pageNumber))}
              key={index}
            >
              <p
                className={cn(
                  "text-[#667185] text-sm",
                  pageNumber === currentPage && "text-[#13191C] font-medium"
                )}
              >
                {pageNumber}
              </p>
            </button>
          );
        })}

      <button
        aria-haspopup="true"
        className="w-9 h-9 rounded-[6px] flex items-center justify-center border border-[#D0D5DD] bg-white"
        disabled={currentPage === lastPage}
        onClick={onNext}
      >
        <ChevronRight color="#13191C" size={25} />
        <span className="sr-only">Navigation control</span>
      </button>
    </div>
  );
};

export default Pagination;
