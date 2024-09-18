import BinIcon from "@/assets/icons/bin-icon";
import PencilIcon from "@/assets/icons/pencil-icon";
import VisibleIcon from "@/assets/icons/visible-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Movie } from "@/services/models/movies";
import { MoreVertical } from "lucide-react";
import { Dispatch, SetStateAction, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  setSelectedMovie: Dispatch<SetStateAction<Movie>>;
  movie: any;
  setOpenRemove: Dispatch<SetStateAction<boolean>>;
};

function MovieActions(props: Props) {
  const { setSelectedMovie, movie, setOpenRemove } = props;
  const navigate = useNavigate();

  const deleteTicket = useCallback(() => {
    setSelectedMovie(movie);
    setOpenRemove(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-haspopup="true"
          className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center border border-[#E4E7EC] bg-white"
        >
          <MoreVertical className="h-4 w-4" color="#98A2B3" />
          <span className="sr-only">Toggle menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-[7px] p-0 ">
        <DropdownMenuItem
          className="px-3 py-2"
          onClick={() => navigate(`/movie-details/${movie.id}`)}
        >
          <span className="flex items-center gap-[10px] text-[#13191C] text-xs">
            <VisibleIcon fill="#98A2B3" /> View ticket
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="px-3 py-2"
          onClick={() => navigate(`/edit-movie/${movie.id}`)}
        >
          <span className="flex items-center gap-[10px] text-[#13191C] text-xs">
            <PencilIcon fill="#98A2B3" width={20} height={20} /> Edit ticket
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-[#e7211329] rounded-none px-3 py-2 focus:bg-[#e7211329]"
          onClick={deleteTicket}
        >
          <span className="flex items-center gap-[10px] text-[#BD1B0F] text-xs">
            <BinIcon fill="#BD1B0F" width={20} height={20} /> Delete ticket
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(MovieActions);
