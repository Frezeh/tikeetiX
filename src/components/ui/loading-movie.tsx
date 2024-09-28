import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export const LoadingMovieGrid = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mr-10 ml-5">
      {[
        new Array(4)
          .fill(null)
          .map((_, index) => (
            <Skeleton
              className="w-full h-[350px] rounded-[12px] bg-gray-200"
              key={index}
            />
          )),
      ]}
    </div>
  );
};

export const LoadingMovieList = () => {
  return (
    <TableBody className="[&_tr:last-child]:border-1">
      {new Array(4).fill(null).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-12 w-12 rounded-md bg-gray-200" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-12 w-full rounded-full bg-gray-200" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-12 w-full rounded-full bg-gray-200" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-12 w-full rounded-full bg-gray-200" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
