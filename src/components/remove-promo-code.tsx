import RemoveIcon from "@/assets/icons/remove-icon";
import { PROMOCODE } from "@/routes/create-event/create-event";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";

type Props = {
  openRemove: boolean;
  setOpenRemove: Dispatch<SetStateAction<boolean>>;
  removePromoCode: (level: PROMOCODE) => void;
  selectedPromoCode: PROMOCODE;
};

export default function RemovePromoCode({
  openRemove,
  setOpenRemove,
  removePromoCode,
  selectedPromoCode,
}: Props) {
  return (
    <Dialog open={openRemove} onOpenChange={setOpenRemove}>
      <DialogContent
        className="w-3/4 sm:max-w-[400px] flex flex-col justify-center items-center gap-2 rounded-[8px] px-5 py-[15px] space-y-2"
        closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-10%] top-[-8px] flex justify-center items-center rounded-[8px]"
      >
        <DialogHeader className="self-center">
          <div className="w-full flex items-center justify-center self-center">
            <RemoveIcon />
          </div>
        </DialogHeader>
        <DialogDescription className="text-center text-[#13191C] text-lg font-medium">
          Remove promo code
        </DialogDescription>

        <DialogFooter className="flex justify-between items-center pt-2">
          <Button
            className="h-9 w-[178px]"
            variant="ghost"
            onClick={() => setOpenRemove(false)}
          >
            No, cancel
          </Button>
          <Button
            className="h-9 w-[178px]"
            variant="destructive"
            onClick={() => {
              removePromoCode(selectedPromoCode);
              setOpenRemove(false);
            }}
          >
            {"Yes, remove"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
