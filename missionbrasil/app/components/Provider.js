"use client";

import { useEffect } from 'react';
import { SessionProvider } from "next-auth/react"




const Provider = ({children}) =>{

  useEffect(() => {
    
    //initialization products
    const products = [

    ];

    if (!localStorage.getItem('products')) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, []);
    
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default Provider;