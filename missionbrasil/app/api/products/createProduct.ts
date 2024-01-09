export default async function handler(req:any, res:any) {
    if (req.method === 'POST') {
      const response = await fetch('https://api.jsonbin.io/v3/b/659d0338dc746540188f2308', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': "$2b$10$Z.fvNCWS8Og5.NLT/7vGyuFvEUkQmoUz02Yd3p71lwviEqiHkooh6" 
      },
        body: JSON.stringify(req.body)
      });
  
      const data = await response.json();
      return res.status(200).json(data);
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }