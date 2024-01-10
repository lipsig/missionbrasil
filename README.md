# missionbrasil

## Stack
Esta aplicação foi construída usando as seguintes tecnologias:
- Next.js 14
- NextAuth para autenticação
- Tailwind CSS para estilização
- Shadcn para componentes específicos
- App Router para roteamento

## Autenticação
A aplicação usa o Google Provider do NextAuth para autenticação. A rota para o painel de registro de produtos é protegida por autenticação. Se o usuário não estiver logado, ele é redirecionado para a página de login, e vice-versa.

## Armazenamento de Dados
A aplicação usa o Local Storage para armazenamento de dados. No entanto, rotas foram criadas dentro da pasta auth para simular uma aplicação em produção que usaria um banco de dados.

## Frontend
As principais páginas da aplicação são:
- Home: Localizada em `missionbrasil\app\page.tsx`
- Login: Localizada em `missionbrasil\app\login\page.tsx`
- Loja: Localizada em `missionbrasil\app\loja\page.tsx`
- Painel: Localizada em `missionbrasil\app\painel\page.tsx`

Na rota do Painel, é possível realizar operações completas de CRUD com os produtos: ler, editar, deletar e adicionar.

Na rota da Loja, é possível visualizar os produtos registrados e simular a adição deles ao carrinho, e filtrar/buscar produtos digitando na barra de pesquisa

## Implantação
A aplicação está implantada na Vercel

https://missionbrasil-felipelourenzi.vercel.app/


Desenvolvido por Felipe Lourenzi