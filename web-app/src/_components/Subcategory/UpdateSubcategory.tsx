import { fetchAllCategories } from "@/api/category-api";
import {
  fetchSingleSubcategory,
  updateSubcategory,
} from "@/api/subcategory-api";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import type { FetchCategoryInterface } from "@/types/category-types";
import type {
  AddSubcategoryType,
  FetchSubcategoryInterface,
} from "@/types/subcategory-types";
import { useUser } from "@clerk/clerk-react";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";

type UpdateSubcategoryProps = {
  subcategoryId: string;
  onSuccess?: () => void;
};

const UpdateSubcategory = ({
  subcategoryId,
  onSuccess,
}: UpdateSubcategoryProps) => {
  const [subcategory, setSubcategory] =
    useState<FetchSubcategoryInterface | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [categoryData, setCategoryData] = useState<FetchCategoryInterface[]>(
    []
  );
  const [categoryId, setCategoryId] = useState("");
  const [_categoryTitle, setCategoryTitle] = useState("");

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await fetchAllCategories();
        console.log(response.data.data);
        setCategoryData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllCategories();
  }, []);

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    const getSubcategory = async () => {
      try {
        const response = await fetchSingleSubcategory(subcategoryId);
        const data = response.data.data;
        setSubcategory(data);
        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
      } catch (error) {
        console.log("Error fetching category", error);
      }
    };

    getSubcategory();
  }, []);

  const handleUpdate = async () => {
    if (!categoryId) {
      console.log("Select Category ID");
    }
    setLoading(true);
    const payload: AddSubcategoryType = {
      title,
      description,
      image,
      panelUserId: user?.id!,
      categoryId,
    };
    try {
      await updateSubcategory(subcategoryId, payload);
      console.log("Category updated");
      onSuccess?.();
      setOpen(false);
    } catch (error) {
      console.log("Error updating category", error);
    } finally {
      setLoading(false);
      console.log(payload);
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
      {!subcategory ? (
        <DialogContent className="flex justify-center items-center w-full text-red-500">
          Error fetching subcategory
        </DialogContent>
      ) : (
        <DialogContent className="overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit subcategory</DialogTitle>
            <DialogDescription>
              Make changes to your subcategory here. Click save when you&apos;re
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
            <div className="grid grid-3">
              <Label className="mb-3">Category</Label>
              <Select
                value={categoryId}
                onValueChange={(value) => {
                  setCategoryId(value);
                  const selected = categoryData.find((cat) => cat.id === value);
                  setCategoryTitle(selected?.title || "");
                }}
              >
                <SelectTrigger className="lg:w-[450px] rounded">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryData.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.title}
                    </SelectItem>
                  ))}
                  {categoryData.length === 0 && (
                    <SelectItem value="null">
                      No available categories
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
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

export default UpdateSubcategory;
