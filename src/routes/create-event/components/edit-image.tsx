import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounceEffect } from "@/hooks/use-debounce-effect";
import { canvasPreview } from "@/lib/image-preview";
import { generateRandomId } from "@/lib/utils";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type Props = {
  openEditImage: boolean;
  setOpenEditImage: Dispatch<SetStateAction<boolean>>;
  setPoster: Dispatch<SetStateAction<File | undefined>>;
  cropPoster: (name: string) => void;
  croppedPoster: File | undefined;
};

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function EditImage(props: Props) {
  const {
    openEditImage,
    setOpenEditImage,
    setPoster,
    cropPoster,
    croppedPoster,
  } = props;

  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, _] = useState<number | undefined>(16 / 9);

  useEffect(() => {
    if (croppedPoster) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(croppedPoster);
    }
  }, [croppedPoster]);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.

      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function convertToBlob() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });

    return blob;
  }

  async function onDownloadCropClick() {
    const blob = await convertToBlob();

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = URL.createObjectURL(blob);

    if (hiddenAnchorRef.current) {
      hiddenAnchorRef.current.href = blobUrlRef.current;
      hiddenAnchorRef.current.click();
    }
  }

  async function uploadloadCropClick() {
    const blob = await convertToBlob();

    if (blob === undefined) return;
    const target = new File(
      [blob],
      croppedPoster?.name || `poster-${generateRandomId()}`,
      {
        type: blob.type || "image/png",
      }
    );

    if (target === undefined) return;

    cropPoster(target.name);
    setPoster(target);
    setOpenEditImage(false);
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  // function handleToggleAspectClick() {
  //   if (aspect) {
  //     setAspect(undefined);
  //   } else {
  //     setAspect(16 / 9);

  //     if (imgRef.current) {
  //       const { width, height } = imgRef.current;
  //       const newCrop = centerAspectCrop(width, height, 16 / 9);
  //       setCrop(newCrop);
  //       // Updates the preview
  //       setCompletedCrop(convertToPixelCrop(newCrop, width, height));
  //     }
  //   }
  // }

  const percentage = (Number(rotate) / Number(180)) * 100;
  const backgroundStyle = {
    background: `linear-gradient(to right, #133205 ${percentage}%, #d0d5dd ${percentage}%)`,
  };

  return (
    <Dialog open={openEditImage} onOpenChange={setOpenEditImage}>
      <DialogTitle>Image cropper</DialogTitle>
      <DialogContent
        className="rounded-[8px] p-0 m-0"
        closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-45px] top-0 flex justify-center items-center rounded-[8px] border-[#E4E7EC]"
      >
        <DialogHeader className="h-12 justify-center border-b border-b-[#D0D5DD] bg-[#F0F2F5] rounded-t-[8px] px-4 text-sm text-[#13191C] font-medium">
          Edit image
        </DialogHeader>
        <DialogDescription className="space-y-4 px-2 flex flex-col justify-center items-center self-center gap-5 max-h-[80vh] overflow-y-scroll no-scrollbar">
          <ReactCrop
            className="rounded-[12px] overflow-hidden inline-flex self-center focus-visible:outline-none"
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            //aspect={aspect}
            minHeight={100}
            ruleOfThirds
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              onLoad={onImageLoad}
            />
          </ReactCrop>

          <div className="flex items-center justify-between gap-1">
            <div
              role="button"
              className="cursor-pointer flex items-center justify-center w-6 h-6"
              onClick={() => setScale((scale) => scale - 0.1)}
            >
              <ZoomOut size={20} color="#13191C" />
            </div>
            <Label
              htmlFor="rotate-input"
              className="outline-none focus:bg-none"
            >
              <input
                id="rotate-input"
                type="range"
                value={rotate}
                disabled={!imgSrc}
                onChange={(e) =>
                  setRotate(
                    Math.min(180, Math.max(-180, Number(e.target.value)))
                  )
                }
                min={0}
                max={180}
                step={1}
                className={`w-[315px] h-[6px] appearance-none cursor-pointer border-none rounded-lg focus-visible:outline-none slider`}
                style={backgroundStyle}
              />
              {/* <input
                id="default-range"
                type="range"
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                min={0.1}
                max={10}
                step={0.1}
                className={`w-[315px] h-[6px] appearance-none cursor-pointer border-none rounded-lg focus-visible:outline-none slider`}
                style={backgroundStyle}
              /> */}
            </Label>
            <div
              role="button"
              className="cursor-pointer flex items-center justify-center w-6 h-6"
              onClick={() => setScale((scale) => scale + 0.1)}
            >
              <ZoomIn size={20} color="#13191C" />
            </div>
          </div>
        </DialogDescription>

        <DialogFooter className="justify-center border-t border-t-[#D0D5DD] bg-[#F0F2F5] rounded-b-[8px] py-[10px] px-2 space-x-1">
          <Label
            htmlFor="image-file"
            className="cursor-pointer flex items-center justify-center bg-white border border-[#E4E7EC] text-[#667185] text-sm h-9 w-[138.5px] rounded-[8px]"
          >
            Re-upload
            <div className="hidden">
              <Input
                id="image-file"
                type="file"
                accept=".png,.jpeg,.jpg"
                onChange={onSelectFile}
              />
            </div>
          </Label>

          <Button
            className="h-9 w-[138.5px] rounded-[8px] text-sm"
            onClick={uploadloadCropClick}
          >
            Apply image
          </Button>
        </DialogFooter>
        {!!completedCrop && (
          <div className="hidden">
            <div>
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: "1px solid black",
                  objectFit: "contain",
                  width: completedCrop.width,
                  height: completedCrop.height,
                }}
              />
            </div>
            <div>
              <button onClick={onDownloadCropClick}>Download Crop</button>
              <a
                href="#hidden"
                ref={hiddenAnchorRef}
                download
                style={{
                  position: "absolute",
                  top: "-200vh",
                  visibility: "hidden",
                }}
              >
                Hidden download
              </a>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
