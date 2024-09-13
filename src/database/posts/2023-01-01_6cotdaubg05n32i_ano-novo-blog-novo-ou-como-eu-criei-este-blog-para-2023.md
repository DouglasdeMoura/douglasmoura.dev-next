---
id: 6cotdaubg05n32i
locale: pt-BR
title: Ano novo, blog novo (ou como eu criei este blog para 2023)
created: 2023-01-01 16:34:44.490Z
updated: 2023-08-12 13:34:51.667Z
tags: webdev, programming, designsystem
translates: 
---
Ano novo, blog novo! Depois de adiar por um tempão a publicação do meu blog,
finalmente terminei de desenvolvê-lo, usando [Next.js](https://nextjs.org/),
[PocketBase](https://pocketbase.io/) e [Mantine](https://mantine.dev/).
Quer saber o porquê eu escolhi estas ferramentas? Então, continue a leitura aqui comigo.

Eu crio blogs há muito tempo (desde 2007). Comecei com o [Blogger](https://www.blogger.com),
mas depois migrei para o [WordPress](https://wordpress.org/). E foi aí que
comecei a me interessar por Linux e programação. Eu passava um bocado de tempo
criando temas, customizando plugins, lendo a documentação e traduzindo temas e
plugins do WordPress. E, apesar do WordPress ser um CMS excelente para quem quer
apenas publicar um site da maneira mais rápida possível, dessa vez eu queria algo
mais personalizado, contendo todos os recursos que eu gostaria de ter e nada mais.
A partir daí, comecei a pesquisar.

Experimentei vários CMSs ([Directus](https://directus.io/), [KeystoneJS](https://keystonejs.com/),
[Strapi](https://strapi.io/) e [Cockpit](https://getcockpit.com/)), mas o que eu achei mais simples para atender a minha necessidade foi o [PocketBase](https://pocketbase.io/), principalmente porquê eu tinha 
intenção de auto-hospedar a minha solução. Os outros CMSs são ótimos, mas quando
você é uma equipe de um homem só, deve escolher as ferramentas adequadas.
E o que é mais fácil de uma pessoa só gerenciar do que um banco de dados SQLite?
O Pocketbase já expõe as atualizações do banco de dados em tempo real com SSE,
provê autenticação e gerenciamento de arquivos (com integração ao S3), SDK para
JavaScript e Flutter e ainda pode ser usado como um framework. Tudo isso dentro
de um pequeno binário escrito em [Go](https://go.dev/) (se você quer saber mais sobre o PocketBase,
leia a [documentação](https://pocketbase.io/docs/) e veja este [vídeo do FireShip](https://www.youtube.com/watch?v=Wqy3PBEglXQ), onde
ele mostra como criar um sistema de chat em tempo real com o PocketBase). E por fim,
a fim de ter backups em tempo real do meu banco de dados SQLite e mandá-los para o S3, utilizo o
[Litestream](https://litestream.io/). Bom, feita a escolha no backend, vamos ao frontend.

Experimentei o [Astro](https://astro.build/) (que é excelente!) e o [Remix](https://remix.run/),
mas acabei optando pelo [Next.js](https://nextjs.org/), pricipalmente por conta
da biblioteca de geração de imagens da [Vercel](https://vercel.com/), que eu uso para gerar as imagens do post,
como essa aqui:

<img src="https://douglasmoura.dev/api/v1/og?ok" alt="O trabalho que nunca começou é o que leva mais tempo para terminar" />

E aqui chegamos à escolha do que eu utilizaria para criar os estilos do blog.
Nos últimos anos, estilizei aplicações em React com [CSS Modules](https://github.com/css-modules/css-modules),
[Styled Components](https://styled-components.com/), [Stitches](https://stitches.dev/),
[Tailwind](https://tailwindcss.com/) e [Chakra UI](https://chakra-ui.com/).
Eu até comecei a criar um design system com Stitches e Tailwind, mas
criar um design system sozinho levaria muito tempo, decidi optar por uma caminho mais fácil.
Experimentei vários DS até encontrar o [Mantine](https://mantine.dev/), que é uma
biblioteca excelente que tem tudo o que eu já tinha em mente e gostaria de usar.
A partir daí, o trabalho consistiu em implementar o blog com as features iniciais básicas:

- [ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) dos posts;
- Validação de formulários com [Zod](https://github.com/colinhacks/zod);
- Sistema de comentários aninhados com verificação anti-spam provida pelo [Akismet](https://akismet.com/);
- Exibição de avatares dos comentaristas com o [Gravatar](http://pt.gravatar.com/);
- Favicon em SVG com modo claro/escuro;
- Multilinguagem (português e inglês).

Com tudo isso pronto, alterei as URLs canônicas dos meus artigos no [Dev.to](https://dev.to/douglasdemoura)
para apontarem para as novas URLs e finalmente, publiquei meu blog.

Claro, se você está lendo isso no meu blog agora, vai ver que ainda falta uma feature importante:
a pesquisa. Vou estudar possíveis soluções para isso nos próximos dias, mas já
adianto que você pode ter uma prévia da funcionalidade apertando a tecla <kbd>/</kbd> em
qualquer página.

E, para finalizar, no dia 21 de janeiro eu vou mostrar como criar um design system
com React e Tailwind na [Conferência CSS Brasil](https://conferenciacssbrasil.com.br/).
Então, se você estiver por lá, te convido a tomar uma cerveja comigo depois do evento :)

Feliz 2023 a todos 🎉.
