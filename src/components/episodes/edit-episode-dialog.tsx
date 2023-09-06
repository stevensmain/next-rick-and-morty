import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import modalsStore from "@/store/modals";
import { Modal } from "@/types/modals";
import { EditEpisodeForm } from "./edit-episode-form";

export function EditEpisodeDialog() {
  const { show, showModal } = modalsStore();

  return (
    <Dialog
      open={show === Modal.EDIT_EPISODE}
      onOpenChange={(val) => !val && showModal(Modal.NONE)}
    >
      <DialogContent className="sm:max-w-[425px] bg-slate-800">
        <DialogHeader>
          <DialogTitle>Edit Episode</DialogTitle>
        </DialogHeader>
        <EditEpisodeForm />
      </DialogContent>
    </Dialog>
  );
}
