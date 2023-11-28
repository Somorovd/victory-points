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
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Lobby } from "@prisma/client";
import { useSocket } from "../providers/socket-provider";

const CreateLobbyModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { socket } = useSocket();

  const isModalOpen = isOpen && type === "createLobby";
  const [minPlayers, setMinPlayers] = useState(0);
  const [maxPlayers, setMaxPlayers] = useState(0);

  const formSchema = z.object({
    name: z
      .string()
      .min(1, {
        message: "name is required",
      })
      .max(20, {
        message: "Lobby name cannot be more than 20 characters",
      }),
    password: z.string().max(30, {
      message: "Password cannot be more than 30 characters",
    }),
    capacity: z.number().gte(minPlayers).lte(maxPlayers),
  });

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

  useEffect(() => {
    setMinPlayers(data.game?.minPlayers || 0);
    setMaxPlayers(data.game?.maxPlayers || 0);
    form.setValue("capacity", data.game?.minPlayers || 0);
  }, [data]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const lobby = (await axios
        .post("/api/socket/lobbies/new", {
          gameName: data?.game?.filename as string,
          socketId: socket.id,
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
            <div className="space-y-2 px-6">
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
                        placeholder="Lobby name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <FormLabel className="uppercase text-xs font-bold">
                        Number of Players
                      </FormLabel>
                      <span className="ml-4">{field.value}</span>
                    </div>
                    {minPlayers !== maxPlayers && (
                      <FormControl>
                        <Slider
                          defaultValue={[minPlayers]}
                          min={minPlayers}
                          max={maxPlayers}
                          step={1}
                        />
                      </FormControl>
                    )}
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
