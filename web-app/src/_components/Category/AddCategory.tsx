import { createCategory } from "@/api/category-api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import type { AddProps } from "@/types/add-prop-type";
import type { AddCategoryType } from "@/types/category-types";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const AddCategory = ({ onSuccess }: AddProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const handlSubmit = async () => {
    setLoading(true);
    try {
      const payload: AddCategoryType = {
        title,
        description,
        image,
        panelUserId: user?.id!,
      };
      await createCategory(payload);
      console.log("New category added");
      onSuccess?.();
      setTitle("");
      setDescription("");
      setImage("");
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Add Category <PlusCircle className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add category</DialogTitle>
          <DialogDescription>
            Make changes to your category here. Click submit when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Router"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label>Description</Label>
            <Input
              type="text"
              placeholder="Router with 302.1f range"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label>Image</Label>
            <img
              src={image}
              alt={title}
              width={150}
              height={150}
              className={!image ? "hidden" : "block"}
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => setImage(reader.result as string); // Base64 string
                reader.readAsDataURL(file);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handlSubmit}>
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
