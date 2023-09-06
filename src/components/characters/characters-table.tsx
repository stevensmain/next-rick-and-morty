import { Character } from "@/types/characters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { Button } from "../ui/button";
import useCharacter from "@/hooks/useCharacter";
import { EditCharacterDialog } from "./edit-character-dialog";
import modalsStore from "@/store/modals";
import { Modal } from "@/types/modals";

interface CharactersListProps {
  characters: Character[];
}

export function CharactersTable({ characters }: CharactersListProps) {
  const { deleteCharacter, setCharacter } = useCharacter();
  const { showModal } = modalsStore();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Specie</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {characters.map((character) => (
            <TableRow key={character.id}>
              <TableCell>
                <Image
                  src={character.image}
                  alt={character.name}
                  width={60}
                  height={60}
                />
              </TableCell>
              <TableCell>{character.name}</TableCell>
              <TableCell>{character.status}</TableCell>
              <TableCell>{character.gender}</TableCell>
              <TableCell>{character.species}</TableCell>
              <TableCell>{character.type}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    showModal(Modal.EDIT_CHARACTER);
                    setCharacter(character);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="ml-2"
                  onClick={() => deleteCharacter(character.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditCharacterDialog />
    </>
  );
}
