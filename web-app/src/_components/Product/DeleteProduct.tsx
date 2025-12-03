import { deleteProduct } from "@/api/product-api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@clerk/clerk-react";
import { Trash } from "lucide-react";
import { useState } from "react";

type DeleteProductProps = {
  onSuccess?: () => void;
  productId: string;
};

const DeleteProduct = ({ productId, onSuccess }: DeleteProductProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { user } = useUser();

  //   const panelUserId = user?.id!;
  const panelUserId = "user_326mElfuD1HFBGuB9ZzYI5q3DNd";

  const handleDelete = async () => {
    setLoading(true);
    console.log("Delete was pressed");
    console.log({ productId, panelUserId });
    try {
      await deleteProduct(productId, panelUserId);
      console.log("Product deleted");
      onSuccess?.();
      setOpen(false);
    } catch (error) {
      console.error("Error deleting product", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <span className="cursor-pointer justify-between focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-neutral-200">
          <p>Delete</p>
          <Trash />
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            product from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700"
          >
            {loading ? <Spinner /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProduct;
