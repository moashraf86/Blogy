/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { RiCloseLine, RiUploadLine } from "@remixicon/react";
import { useState } from "react";
import { isValidImageUrl } from "../../utils/isValidImageUrl";

export const AddCoverModal = ({
  onCancel,
  showModal,
  handleChange,
  handleSubmitUrl,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  /**
   * Handle the form submission
   * @param {Event} e
   * @returns void
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!imageUrl) {
      return;
    } else {
      isValidImageUrl(imageUrl).then((isValid) => {
        if (!isValid) {
          console.log("Invalid image URL");

          return;
        }
      });
    }

    handleSubmitUrl({
      target: {
        name: "image",
        value: {
          src: imageUrl,
          alt: "Cover Image",
          isInset: true,
        },
      },
    });

    setImageUrl("");
    onCancel();
  };
  return (
    <AlertDialog open={showModal}>
      <AlertDialogContent>
        <AlertDialogTitle className="mb-4 font-semibold text-primary">
          Add Cover Image
        </AlertDialogTitle>
        <div className="flex flex-col items-stretch gap-2">
          <Button
            asChild
            size="lg"
            variant="default"
            className="md:text-base flex gap-[10px] h-11 cursor-pointer"
            label="Upload from Device"
            aria-label="Upload from Device"
          >
            <label
              htmlFor="addImage"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  document.getElementById("image").click();
                }
              }}
            >
              <RiUploadLine size={18} />
              Upload from Device
              <input
                id="addImage"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "image",
                      value: {
                        src: e.target.files[0],
                        alt: e.target.files[0].name,
                        isInset: true,
                      },
                    },
                  })
                }
                hidden
              />
            </label>
          </Button>
          <span className="text-center text-muted-foreground">OR</span>
          <form
            onSubmit={handleSubmit}
            className="flex flex-co items-center gap-2"
          >
            <input
              type="url"
              placeholder="Paste Image URL"
              className="w-full h-11 px-4 text-sm border border-input rounded-md"
              name="image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              pattern="https://.*"
              title="Enter a valid URL"
            />
            <Button
              type="submit"
              size="lg"
              variant="default"
              className="md:text-base cursor-pointer"
              label="Embed Image URL"
              aria-label="Embed Image URL"
              disabled={!imageUrl}
            >
              Embed
            </Button>
          </form>
        </div>
        <AlertDialogCancel
          className="size-10 absolute top-6 right-6 p-0"
          onClick={onCancel}
        >
          <RiCloseLine size={20} />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};
