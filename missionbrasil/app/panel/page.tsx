"use client";

import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"
import { createProduct, getProducts, updateProduct, deleteProduct } from '../components/fakeApi';

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


type Product = {
    id: string;
    name: string;
    description: string;
    price: string;
};

export default function Panel() {


    const [products, setProducts] = useState<Product[]>([]);
    const [newProductName, setNewProductName] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');    
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const router = useRouter();

    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login');
        }
    });


    const handlerDeleteProduct = async (id: string) => {
        const updatedProducts = products.filter((product) => product.id !== id);

        try {
            deleteProduct(id);
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting products:', error);
        }

    }

    const handlerEditProduct = async (id: string) => {
        setIsEditing(true);
        const product = products.find((product) => product.id === id);
    
        if (!product) {
            alert('Produto não encontrado!');
            return;
        }
    
        setCurrentProduct(product);
        setNewProductName(product.name);
        setNewProductDescription(product.description);
        setNewProductPrice(product.price);
    }
    
    const handlerUpdateProduct = async () => {
        if (!newProductName || !newProductDescription || !newProductPrice) {
            alert('Todos os campos são obrigatórios!');
            return;
        }
    
        const updatedProduct = {
            id: currentProduct.id,
            name: newProductName,
            description: newProductDescription,
            price: newProductPrice
        };
    
        try {
            updateProduct(updatedProduct);
    
            const updatedProducts = products.map((product) => 
                product.id === currentProduct.id ? updatedProduct : product
            );
    
            setProducts(updatedProducts);
            setIsEditing(false);
            setCurrentProduct(null);
            setNewProductName('');
            setNewProductDescription('');
            setNewProductPrice('');
        } catch (error) {
            console.error('Error updating products:', error);
        }
    };
    

    const handlerAddProduct = async () => {

        if (!newProductName || !newProductDescription || !newProductPrice) {
            alert('Todos os campos são obrigatórios!');
            return;
        }
        

        const newProduct = {
            id: Math.floor(Math.random() * 1000000).toString(), // Random number
            name: newProductName,
            description: newProductDescription,
            price: newProductPrice
        };

        const updatedProducts = [...products, newProduct];

        try {
            createProduct(newProduct);

            setProducts(updatedProducts);
            setNewProductName('');
            setNewProductDescription('');
            setNewProductPrice('');
        } catch (error) {
            console.error('Error updating products:', error);
        }
    };

    useEffect(() => {
        setProducts(getProducts());
    }, []);

    if (!session) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                        Painel - Registro de Produto
                    </h2>
                    <div className="flex flex-col items-center text-center mb-6">
                        <h3 className="mb-4">Autenticado com Google:</h3>

                        <div className="mb-4 flex items-center">
                            <Avatar className="mr-4">
                                <AvatarImage src={session.user?.image!} alt="avatar" />
                                <AvatarFallback>User</AvatarFallback>
                            </Avatar>
                            <div>
                                <span className="text-xl font-bold mb-2">User: {session.user?.name}</span>
                                <br />
                                <span className="text-xl font-bold">Email: ({session.user?.email})</span>
                            </div>
                        </div>
                        <Button onClick={() => signOut()}
                            className="mb-4 group relative w-1/2 flex justify-center py-1 px-2 border border-transparent text-sm font-light rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-2"
                        >
                            Logout
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-6 mb-6">
                        <h3 className="text-left text-2xl font-extrabold text-gray-900 mb-6">
                            Adicionar um novo Produto a loja:
                        </h3>

                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Nome do Produto"
                            value={newProductName}
                            onChange={(e) => setNewProductName(e.target.value)}
                            required
                        />
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Descrição do Produto"
                            value={newProductDescription}
                            onChange={(e) => setNewProductDescription(e.target.value)}
                            required
                        />
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="number"
                            placeholder="Preço do Produto"
                            value={newProductPrice}
                            onChange={(e) => setNewProductPrice(e.target.value)}
                            required
                        />
                        <Button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={isEditing ? handlerUpdateProduct : handlerAddProduct}
                            >
                                {isEditing ? 'Editar' : 'Salvar'}
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-5">
                        {products.length > 0 ? (
                            <Table className="min-w-full divide-y divide-gray-200">
                                <TableCaption className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produtos Cadastrados</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</TableHead>
                                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</TableHead>
                                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</TableHead>
                                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</TableHead>
                                        <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Deletar</TableHead>
                                        <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Editar</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="bg-white divide-y divide-gray-200">
                                    {products.map((product: any) => (
                                        <TableRow key={product.id}>
                                            <TableCell className="px-6 py-4 whitespace-nowrap">{product.id}</TableCell>
                                            <TableCell className="px-6 py-4 whitespace-nowrap">{product.name}</TableCell>
                                            <TableCell className="px-6 py-4 whitespace-nowrap">{product.description}</TableCell>
                                            <TableCell className="px-6 py-4 whitespace-nowrap">{`R$ ${Number(product.price).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}</TableCell>
                                            <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Button onClick={() => {
                                                    handlerDeleteProduct(product.id);
                                                }} className="bg-red-600 hover:bg-red-700">
                                                    Deletar
                                                </Button>                                      
                                            </TableCell>
                                            <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Button onClick={() => {
                                                    handlerEditProduct(product.id);
                                                }} className="bg-gray-600 hover:bg-gray-700">
                                                    Editar
                                                </Button>
                                                </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="px-6 py-4 whitespace-nowrap">Nenhum Produto</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};