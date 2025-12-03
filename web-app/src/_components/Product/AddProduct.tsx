import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import {
  ListsToggle,
  MDXEditor,
  listsPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import { useEffect, useState } from "react";
import { createProduct } from "@/api/product-api";
import type { FetchSubcategoryInterface } from "@/types/subcategory-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/clerk-react";
import type { AddProductType } from "@/types/product-types";
import { Spinner } from "@/components/ui/spinner";
import { fetchAllSubcategories } from "@/api/subcategory-api";

type AddProductProps = {
  onSuccess?: () => void;
};

const AddProduct = ({ onSuccess }: AddProductProps) => {
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState({ body: "" });
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");

  const [subcategoryData, setSubcategoryData] = useState<
    FetchSubcategoryInterface[]
  >([]);
  const [subcategoryId, setSubcategoryId] = useState("");
  const [_subcategoryTitle, setSubcategoryTitle] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllSubcategories = async () => {
      try {
        const response = await fetchAllSubcategories();
        console.log(response.data.data);
        setSubcategoryData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllSubcategories();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const payload: AddProductType = {
      title,
      description,
      price: Number(price),
      quantity: Number(quantity),
      img1,
      img2,
      img3,
      img4,
      panelUserId: user?.id!,
      subcategoryId,
    };
    try {
      await createProduct(payload);
      console.log("Product added");
      onSuccess?.();
      setImg1("");
      setImg2("");
      setImg3("");
      setImg4("");
      setDescription({ body: "" });
      setTitle("");
      setPrice("");
      setQuantity("");
    } catch (error) {
      console.log("Error adding product", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Add Product <PlusCircle className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl h-[600px] p-6 overflow-y-auto flex flex-col gap-y-6">
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click submit when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-start items-start flex-col gap-y-6 w-full">
          <div className="flex justify-start items-start flex-col gap-y-2">
            <Label>Title</Label>
            <Input
              placeholder="ARISS Router"
              className="w-[300px]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-start items-start flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              placeholder="2000"
              className="w-[300px]"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex justify-start items-start flex-col gap-y-2">
            <Label>Quantity</Label>
            <Input
              placeholder="10"
              className="w-[300px]"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <div className="flex justify-start items-start flex-col gap-y-2">
              <Label>Subcategory</Label>
              <Select
                value={subcategoryId}
                onValueChange={(value) => {
                  setSubcategoryId(value);
                  const selected = subcategoryData.find(
                    (sub) => sub.id === value
                  );
                  setSubcategoryTitle(selected?.title || "");
                }}
              >
                <SelectTrigger className="w-[300px] rounded">
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {subcategoryData.map((sub) => (
                    <SelectItem key={sub.id} value={sub.id}>
                      {sub.title}
                    </SelectItem>
                  ))}
                  {subcategoryData.length === 0 && (
                    <SelectItem value="null">
                      No available subcategories
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <Label>Description</Label>
            <MDXEditor
              markdown={description.body}
              onChange={(value) => setDescription({ body: value })}
              className="w-full h-full prose border p-2 rounded"
              plugins={[
                listsPlugin(),
                toolbarPlugin({
                  toolbarClassName: "my-classname",
                  toolbarContents: () => (
                    <>
                      {/* <UndoRedo /> */}
                      <ListsToggle />
                    </>
                  ),
                }),
              ]}
            />
          </div>

          <div className="flex justify-start items-start flex-col gap-y-2">
            <Label>Image 1</Label>
            <Input
              type="file"
              className="w-[300px]"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => setImg1(reader.result as string); // Base64 string
                reader.readAsDataURL(file);
              }}
            />
          </div>
          <div className="flex justify-start items-start flex-col gap-y-2">
            <Label>Image 2</Label>
            <Input
              type="file"
              className="w-[300px]"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => setImg2(reader.result as string); // Base64 string
                reader.readAsDataURL(file);
              }}
            />
          </div>
          <div className="flex justify-start items-start flex-col gap-y-2">
            <Label>Image 3</Label>
            <Input
              type="file"
              className="w-[300px]"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => setImg3(reader.result as string); // Base64 string
                reader.readAsDataURL(file);
              }}
            />
          </div>
          <div className="flex justify-start items-start flex-col gap-y-2">
            <Label>Image 4</Label>
            <Input
              type="file"
              className="w-[300px]"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onloadend = () => setImg4(reader.result as string); // Base64 string
                reader.readAsDataURL(file);
              }}
            />
          </div>
          <div className="flex justify-start items-center w-full gap-x-4 overflow-x-auto">
            {img1 && <img src={img1} alt={title} width={120} height={120} />}
            {img2 && <img src={img2} alt={title} width={120} height={120} />}
            {img3 && <img src={img3} alt={title} width={120} height={120} />}
            {img4 && <img src={img4} alt={title} width={120} height={120} />}
          </div>
        </div>
        <Button onClick={handleSubmit}>
          {loading ? <Spinner /> : "Submit"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
