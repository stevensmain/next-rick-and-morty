import useEpisode from "@/hooks/useEpisodes";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Episode } from "@/types/episodes";
import modalsStore from "@/store/modals";
import { Modal } from "@/types/modals";
import { EditEpisodeDialog } from "./edit-episode-dialog";

interface EpisodeTableProps {
  episodes: Episode[];
}

export function EpisodesTable({ episodes }: EpisodeTableProps) {
  const { deleteEpisode, setEpisode } = useEpisode();
  const { showModal } = modalsStore();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Episode</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Air Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {episodes.map((episode) => (
            <TableRow key={episode.id}>
              <TableCell>{episode.episode}</TableCell>
              <TableCell>{episode.name}</TableCell>
              <TableCell>{episode.air_date}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    showModal(Modal.EDIT_EPISODE);
                    setEpisode(episode);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="ml-2"
                  onClick={() => deleteEpisode(episode.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditEpisodeDialog />
    </>
  );
}
