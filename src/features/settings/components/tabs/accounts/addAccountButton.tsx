import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RealDebridDialogContent from "@/features/realDebrid/components/realDebridDialogContent";
import TorBoxDialogContent from "@/features/realDebrid/components/torBoxDialogContent";
import { useAccountServices } from "@/stores/account-services";
import { useState } from "react";

const AddAccountButton = () => {
  const [isRealDebridDialogOpen, setIsRealDebridDialogOpen] = useState(false);
  const [isTorBoxDialogOpen, setIsTorBoxDialogOpen] = useState(false);
  const { realDebrid, torBox } = useAccountServices();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Add Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Choose an account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => setIsRealDebridDialogOpen(true)}
          disabled={!!realDebrid}
        >
          Real Debrid ({realDebrid ? "Connected" : "Not Connected"})
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => setIsTorBoxDialogOpen(true)}
          disabled={!!torBox}
        >
          TorBox ({torBox ? "Connected" : "Not Connected"})
        </DropdownMenuItem>
      </DropdownMenuContent>

      {/* Real Debrid Dialog */}
      <Dialog
        open={isRealDebridDialogOpen}
        onOpenChange={setIsRealDebridDialogOpen}
      >
        <RealDebridDialogContent
          setOpen={setIsRealDebridDialogOpen}
          open={isRealDebridDialogOpen}
        />
      </Dialog>

      {/* TorBox Dialog */}
      <Dialog open={isTorBoxDialogOpen} onOpenChange={setIsTorBoxDialogOpen}>
        <TorBoxDialogContent
          setOpen={setIsTorBoxDialogOpen}
          open={isTorBoxDialogOpen}
        />
      </Dialog>
    </DropdownMenu>
  );
};

export default AddAccountButton;
