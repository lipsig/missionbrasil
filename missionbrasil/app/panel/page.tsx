"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"



export default function Panel() {

    const { data: session } = useSession();
    const [products, setProducts] = useState([]);
useEffect(() => {
         const fetchProducts = async () => {
        const res = await fetch('http://localhost:3000/api/products');
        const data = await res.json();
        console.log(data.record.products)
        setProducts(data.record.products);
    };

    fetchProducts();
}, []);

    if (!session) { return false }


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
                    <div className="grid grid-cols-3 gap-4">
                        {products.length > 0 ? (
                            products.map((product: any) => (
                                <div key={product.id} className="border p-4 rounded-lg">
                                    <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                                    <p className="mb-2">{product.description}</p>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Add to cart
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No products found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};