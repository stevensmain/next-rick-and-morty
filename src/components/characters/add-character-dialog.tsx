import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddCharacterForm } from "./add-form-character";
import modalsStore from "@/store/modals";
import { Modal } from "@/types/modals";

export function AddCharacterDialog() {
  const { show, showModal } = modalsStore();

  return (
    <Dialog
      open={show === Modal.ADD_CHARACTER}
      onOpenChange={(val) => !val && showModal(Modal.NONE)}
    >
      <DialogTrigger onClick={() => showModal(Modal.ADD_CHARACTER)}>
        <Button>Add Character</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-slate-800">
        <DialogHeader>
          <DialogTitle>Add Character</DialogTitle>
        </DialogHeader>
        <AddCharacterForm />
      </DialogContent>
    </Dialog>
  );
}
