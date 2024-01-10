"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input"

const SearchField = ({ setSearchTerm }) => {
    const [localSearchTerm, setLocalSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setLocalSearchTerm(event.target.value);
        setSearchTerm(event.target.value);
    };

    return (
        <Input type="text" value={localSearchTerm} onChange={handleSearchChange} placeholder="Pesquisar Produto..." />
    );
};

export default SearchField;