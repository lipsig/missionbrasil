"use client";

import { useEffect } from 'react';
import { SessionProvider } from "next-auth/react"




const Provider = ({children}) =>{

  useEffect(() => {
    //initial products
    const products = [
        {
            "id": '1',
            "name": "Teste produto 1",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
            "price": "29,9"
          },
          {
            "id": '2',
            "name": "Teste produto 2",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing eserunt.",
            "price": "19,9"
          },
          {
            "id": '3',
            "name": "Teste produto 3",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing eia.",
            "price": "9,9"
          }
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