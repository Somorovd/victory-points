"use client";

import axios, { AxiosError } from "axios";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
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
import { useRouter, usePathname } from "next/navigation";
import { useSocket } from "../providers/socket-provider";

const JoinLobbyModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const pathname = usePathname();
  const { socket } = useSocket();

  const isModalOpen = isOpen && type === "joinLobby";

  const formSchema = z
    .object({
      password: z.string().max(30),
      passwordMatch: z.boolean(),
    })
    .refine((formData) => formData.passwordMatch, {
      message: "Invalid password",
      path: ["password"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordMatch: true,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const lobbyId = data?.lobby?.id as string;
      await axios
        .post(`/api/socket/lobbies/join`, {
          lobbyId,
          socketId: socket.id,
          ...values,
        })
        .then(() => {
          onClose();
          form.reset();
          router.push(`${pathname}/${lobbyId}`);
        })
        .catch((error: AxiosError) => {
          const resData = error.response?.data as z.infer<typeof formSchema>;
          if (resData.password) {
            form.setError("password", { message: resData.password });
          }
        });
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
            Join {data?.lobby?.name} <br />
            by {data.lobby?.host.username}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="space-y-2 px-6">
              {data.lobby?.password && (
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
              )}
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button
                disabled={isLoading}
                variant="primary"
              >
                Join
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinLobbyModal;
