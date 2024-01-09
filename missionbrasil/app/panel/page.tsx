"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"



export default function Panel() {

    const { data: session } = useSession();

    if (!session) { return false}

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Painel - Registro de Produto
                    </h2>
                </div>
                <div>
                    <div className="flex flex-col items-center text-center">
                        <h3>Logado como:</h3>
                        <Avatar className="mb-4">
                            <AvatarImage src={session.user?.image!} alt="avatar" />
                            <AvatarFallback>User</AvatarFallback>
                        </Avatar>
                        <span className="text-xl font-bold mb-2">usuario: {session.user?.name}</span>
                        <span className="text-xl font-bold mb-4">email: ({session.user?.email})</span>

                        <Button onClick={() => signOut()}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Logout
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
};