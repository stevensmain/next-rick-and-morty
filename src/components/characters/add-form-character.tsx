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
import { AddCharacterPayload, Character } from "@/types/characters";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import useCharacter from "@/hooks/useCharacter";
import modalsStore from "@/store/modals";

export function AddCharacterForm() {
  const { toast } = useToast();
  const { addCharacter } = useCharacter();
  const { closeModal } = modalsStore();

  const form = useForm<AddCharacterPayload>({
    defaultValues: {
      name: "",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      image: "",
    },
  });

  const onSubmit: SubmitHandler<AddCharacterPayload> = (data) => {
    addCharacter(data);
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
                <Input onChange={field.onChange} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <FormField
          control={form.control}
          name="species"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specie</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Human">Human</SelectItem>
                  <SelectItem value="Alien">Alien</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input onChange={field.onChange} type="url" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input onChange={field.onChange} />
              </FormControl>
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
