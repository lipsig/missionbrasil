"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";

export default function Home() {

  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Desafio Mission Brasil</h1>
      <div className="flex justify-center mww">
      <Button 
      variant='secondary'  
      onClick={() => router.push(session ? '/panel' : '/login')} 
      className="mb-4 group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-1/2 mx-2"
      >
        Ir Para o painel
      </Button>
      <Button 
        variant='secondary'  
        onClick={() => router.push('/listProducts')} 
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Ver Produtos
      </Button>
      </div>
    </div>
  )
}