import { releaseProduct } from "@/api/product-api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@clerk/clerk-react";
import { Upload } from "lucide-react";
import { useState } from "react";

type ReleaseProductProps = {
  onSuccess?: () => void;
  productId: string;
};

const ReleaseProduct = ({ productId, onSuccess }: ReleaseProductProps) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  //   const panelUserId = user?.id!;
  const panelUserId = "user_326mElfuD1HFBGuB9ZzYI5q3DNd";

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await releaseProduct(productId, panelUserId);
      console.log("Product released");
      onSuccess?.();
      setOpen(true);
    } catch (error) {
      console.log("Error releasing product", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer justify-between focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-neutral-200">
          Release
          <Upload />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-xl font-semibold">
          Release Product
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to release this product to customers?
        </DialogDescription>
        <DialogFooter className="flex justify-between items-center w-full">
          <div />
          <div className="flex justify-start items-center lg:gap-x-4 lg:mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {loading ? <Spinner /> : "Release"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReleaseProduct;
