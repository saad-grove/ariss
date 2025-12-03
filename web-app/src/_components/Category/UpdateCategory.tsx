import { fetchSingleCategory, updateCategory } from "@/api/category-api";
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
import type {
  AddCategoryType,
  FetchCategoryInterface,
} from "@/types/category-types";
import { useUser } from "@clerk/clerk-react";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";

type UpdateCategoryProps = {
  categoryId: string;
  onSuccess?: () => void;
};

const UpdateCategory = ({ categoryId, onSuccess }: UpdateCategoryProps) => {
  const [category, setCategory] = useState<FetchCategoryInterface | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await fetchSingleCategory(categoryId);
        const data = response.data.data;
        setCategory(data);
        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
      } catch (error) {
        console.log("Error fetching category", error);
      }
    };

    getCategory();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const payload: AddCategoryType = {
        title,
        description,
        image,
        panelUserId: user?.id!,
      };
      await updateCategory(categoryId, payload);
      console.log("Category updated");
      onSuccess?.();
      setOpen(false);
    } catch (error) {
      console.log("Error updating category", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer justify-between focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-neutral-200">
          <p>Update</p>
          <Pen />
        </span>
      </DialogTrigger>
      {!category ? (
        <DialogContent className="flex justify-center items-center w-full text-red-500">
          Error fetching category
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[425px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit category</DialogTitle>
            <DialogDescription>
              Make changes to your category here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Title</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Description</Label>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Image</Label>
              <img src={image} alt={title} width={150} height={150} />
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
            <Button onClick={handleUpdate}>
              {loading ? <Spinner /> : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default UpdateCategory;
