"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import useCharacter from "@/hooks/useCharacter";
import modalsStore from "@/store/modals";
import { EditCharacterPayload } from "@/types/characters";
import { useEffect } from "react";

export function EditCharacterForm() {
  const { toast } = useToast();
  const { editCharacter, currentCharacter } = useCharacter();
  const { closeModal } = modalsStore();

  const form = useForm<EditCharacterPayload>({
    defaultValues: {
      name: "",
      status: "",
    },
  });

  useEffect(() => {
    if (currentCharacter) {
      form.setValue("name", currentCharacter?.name);
      form.setValue("status", currentCharacter?.status);
    }
  }, [currentCharacter, form]);

  const onSubmit: SubmitHandler<EditCharacterPayload> = (data) => {
    if (!currentCharacter) return;

    editCharacter(currentCharacter?.id, data);
    closeModal();
    toast({
      title: "You submitted the following values:",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input onChange={field.onChange} defaultValue={field.value} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Alive">Alive</SelectItem>
                  <SelectItem value="Dead">Dead</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button className="mt-3" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
