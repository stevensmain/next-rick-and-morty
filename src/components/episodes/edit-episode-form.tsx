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
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { useEffect } from "react";
import { EditEpisodePayload } from "@/types/episodes";
import useEpisode from "@/hooks/useEpisodes";
import modalsStore from "@/store/modals";

export function EditEpisodeForm() {
  const { toast } = useToast();
  const { editEpisode, setEpisode, currentEpisode } = useEpisode();
  const { closeModal } = modalsStore();

  const form = useForm<EditEpisodePayload>({
    defaultValues: {
      name: "",
      episode: "",
      air_date: "",
    },
  });

  useEffect(() => {
    if (currentEpisode) {
      form.setValue("episode", currentEpisode?.episode);
      form.setValue("name", currentEpisode?.name);
      form.setValue("air_date", currentEpisode?.air_date);
    }
  }, [currentEpisode, form]);

  const onSubmit: SubmitHandler<EditEpisodePayload> = (data) => {
    if (!currentEpisode) return;
    editEpisode(currentEpisode?.id, data);
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
          name="episode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Episode</FormLabel>
              <FormControl>
                <Input onChange={field.onChange} defaultValue={field.value} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="air_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Air Date</FormLabel>
              <FormControl>
                <Input onChange={field.onChange} defaultValue={field.value} />
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
