import { disapproveOwner } from "@/api/customer-api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { ArrowBigDownDash } from "lucide-react";
import { useState } from "react";

type DisapproveDealerProps = {
  onSuccess?: () => void;
  email: string;
};

const DisapproveDealer = ({ onSuccess, email }: DisapproveDealerProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDisapprove = async () => {
    setLoading(true);
    try {
      await disapproveOwner(email);
      onSuccess?.();
      console.log("Dealer has been disapproved");
    } catch (error) {
      console.log("Error disapproving dealer", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="cursor-pointer justify-between focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-neutral-200">
          <p>Dispprove</p> <ArrowBigDownDash />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="lg:text-xl font-semibold">
          Disapprove Business Owner
        </DialogHeader>
        <DialogDescription>
          This will disapprove the business account of the following user. Doing
          so will not let users to access the mobile application.
        </DialogDescription>
        <div className="flex justify-between items-center w-full lg:mt-10">
          <div />
          <div className="flex justify-start items-center lg:gap-x-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDisapprove}>
              {loading ? <Spinner /> : "Disapprove"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DisapproveDealer;
