"use client"

import * as z from "zod";
import axios from "axios";
import Heading from "@/components/Heading";
import { Divide, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./contants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import OpenAI from 'openai';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { NextResponse } from 'next/server';
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/User-Avatar";
import { BotAvatar } from "@/components/Bot-Avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "react-hot-toast";


const ConversationPage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [messages, setMessages] = useState<OpenAI.Chat.Completions.CreateChatCompletionRequestMessage[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
        const userMessage: OpenAI.Chat.Completions.CreateChatCompletionRequestMessage =
        {
          role: 'user',
          content: values.prompt,
        };
        const newMessages = [...messages, userMessage];

        const response = await axios.post("/api/conversation", {
            messages: newMessages,
        });

        setMessages((current) => [...current, userMessage, response.data])

        form.reset()

        } catch (error: any) {
            if (error?.response?.status === 403){
                proModal.onOpen();
            } else {
                toast.error("Something went wrong")
            }
            
        } finally {
            router.refresh();
        }
        
    }

    return (
        <div>
            <Heading 
            title="Conversation"
            description="advanced conversation model"
            icon={MessageSquare}
            iconColor="text-violet-500"
            bgColor="bg-violet-500/10"/>
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg border bg-white w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input 
                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                        disabled={isLoading} placeholder="How do I calculate the radius of a circle?"
                                        {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div 
                                key={message.content}
                                className={cn("p-8 w-full flex items-start gap-x-8 reounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}>
                                    {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                    <p className="text-sm">
                                    {message.content}
                                    </p>  
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConversationPage;