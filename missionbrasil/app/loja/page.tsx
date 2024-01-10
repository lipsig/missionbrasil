"use client";

import { useEffect, useState, useRef } from 'react';
import { getProducts } from '../components/fakeApi';
import { Button } from "@/components/ui/button";
import SearchField from "../components/searchField"


import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

type Product = {
    id: string;
    name: string;
    description: string;
    price: string;
};


const Loja = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // Adicione um estado para o termo de pesquisa

    const drawerTriggerRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (isDrawerOpen && drawerTriggerRef.current) {
            drawerTriggerRef.current.click();
        }
    }, [isDrawerOpen]);


    useEffect(() => {
        const products = getProducts();
        setProducts(products);
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ); 

    const addToCart = (product:any) => {
        const productExistsInCart = cart.some(cartProduct => cartProduct.id === product.id);

        if (!productExistsInCart) {
            setCart([...cart, product]);
        } else {
            const updatedCart = cart.map(cartProduct => cartProduct.id === product.id ? product : cartProduct);
            setCart(updatedCart);
        }

        setIsDrawerOpen(true);
    };

    const removeFromCart = (productId:any) => {
        setCart(cart.filter(product => product.id !== productId));
    };

    if (!products.length) {
        return <p className="text-center text-xl">Cadastrar produto no painel admin</p>;
    }

    return (
        <div>
            <div className="flex justify-center mt-10">
                <SearchField setSearchTerm={setSearchTerm} />
            </div>
            <div className="grid grid-cols-3 gap-4 p-4 mt-20 mb-20">
                {filteredProducts.map(product => (
                    <div key={product.id} className="bg-gray-200 p-4 rounded shadow m-4">
                        <div className="h-64 bg-gray-400 mb-4"></div>
                        <h2 className="text-xl font-bold mb-2 overflow-hidden whitespace-nowrap overflow-ellipsis">{product.name}</h2>
                        <p className="text-gray-700 mb-2 overflow-hidden whitespace-nowrap overflow-ellipsis">{product.description}</p>
                        <p className="text-lg font-bold mb-4">{`R$ ${Number(product.price).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</p>
                        <Button onClick={() => addToCart(product)} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Adicionar ao carrinho</Button>
                    </div>
                ))}
            </div>
            {isDrawerOpen && (
                <Drawer>
                    <DrawerTrigger ref={drawerTriggerRef}></DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Mini Cart</DrawerTitle>
                            <DrawerDescription>Esse são os seus produtos</DrawerDescription>
                        </DrawerHeader>
                        <div className="flex flex-wrap">
                            {cart.map((product) => (
                                <div key={product.id} className="bg-gray-200 p-4 rounded shadow m-4 flex-none w-1/2 md:w-1/4 lg:w-1/6">
                                    <div className="h-32 bg-gray-400 mb-4"></div>
                                    <h2 className="text-xl font-bold mb-2 overflow-hidden whitespace-nowrap overflow-ellipsis">{product.name}</h2>
                                    <p className="text-gray-700 mb-2 overflow-hidden whitespace-nowrap overflow-ellipsis">{product.description}</p>
                                    <p className="text-lg font-bold mb-4">{`R$ ${Number(product.price).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</p>
                                    <Button onClick={() => removeFromCart(product.id)} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remover do carrinho</Button>
                                </div>
                            ))}
                        </div>
                        <DrawerFooter>
                            <Button>Checkout</Button>
                            <DrawerClose>
                                <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            )}
        </div>
    );
};

export default Loja;