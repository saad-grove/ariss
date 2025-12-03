import { fetchAllCategories } from "@/api/category-api";
import { createSubcategory } from "@/api/subcategory-api";
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
import type { AddProps } from "@/types/add-prop-type";
import type { FetchCategoryInterface } from "@/types/category-types";
import type { AddSubcategoryType } from "@/types/subcategory-types";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

const AddSubcategory = ({ onSuccess }: AddProps) => {
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

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const handleSubmit = async () => {
    setLoading(true);
    const payload: AddSubcategoryType = {
      title,
      description,
      image,
      panelUserId: user?.id!,
      categoryId,
    };
    try {
      await createSubcategory(payload);
      console.log("New subcategory added");
      onSuccess?.();
      setTitle("");
      setDescription("");
      setImage("");
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      console.log(payload.image);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Add Subcategory <PlusCircle className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add subcategory</DialogTitle>
          <DialogDescription>
            Make changes to your subcategory here. Click submit when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="FTTH Cable"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label>Description</Label>
            <Input
              type="text"
              placeholder="Fibre with extended range"
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
                  <SelectItem value="null">No available categories</SelectItem>
                )}
              </SelectContent>
            </Select>
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
          <Button onClick={handleSubmit}>
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubcategory;
