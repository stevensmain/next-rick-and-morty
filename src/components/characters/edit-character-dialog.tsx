import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import modalsStore from "@/store/modals";
import { Modal } from "@/types/modals";
import { EditCharacterForm } from "./edit-character-form";

export function EditCharacterDialog() {
  const { show, showModal } = modalsStore();

  return (
    <Dialog
      open={show === Modal.EDIT_CHARACTER}
      onOpenChange={(val) => !val && showModal(Modal.NONE)}
    >
      <DialogContent className="sm:max-w-[425px] bg-slate-800">
        <DialogHeader>
          <DialogTitle>Edit Character</DialogTitle>
        </DialogHeader>
        <EditCharacterForm />
      </DialogContent>
    </Dialog>
  );
}
