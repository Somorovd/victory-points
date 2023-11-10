"use client";

import axios from "axios";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Lobby } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "name is required",
  }),
  password: z.string(),
});

const CreateLobbyModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const isModalOpen = isOpen && type === "createLobby";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  useEffect(() => {
    form.setValue("name", `${user?.username}'s lobby`);
  }, [user, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const lobby = (await axios
        .post("/api/lobbies", {
          gameId: data?.game?.id as string,
          ...values,
        })
        // what about bad requests or errors?
        .then((res) => res.data)) as Lobby;

      onClose();
      form.reset();
      router.push(`${pathname}/${lobby.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={handleClose}
    >
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create a New {data?.game?.name} Lobby
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-600">
            Give your lobby a name and specify your prefered game settings
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold">
                      Lobby Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="value for x"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button
                disabled={isLoading}
                variant="primary"
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLobbyModal;
