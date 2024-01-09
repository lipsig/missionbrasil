import { NextResponse } from "next/server";

export async function GET() {

    const response = await fetch('https://api.jsonbin.io/v3/b/659d0338dc746540188f2308', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': "$2b$10$Z.fvNCWS8Og5.NLT/7vGyuFvEUkQmoUz02Yd3p71lwviEqiHkooh6"
        },
    });

    // If the response is not ok, throw an error
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    
    const data = await response.json();
    return NextResponse.json(data);

}