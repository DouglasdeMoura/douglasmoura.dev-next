---
id: qky4tlh4sx84esg
locale: pt-BR
title: "Como criar um indicador de carregamento perfeito para seus web apps"
created: 2021-03-03 15:00:00.000Z
updated: 2023-08-12 13:45:55.590Z
tags: html, javascript
translates:
---

Web apps são complexos e, mantê-los acessíveis para pessoas com necessidades
especiais exige um bom conhecimento das suas [espeficações](https://w3c.github.io/html-aria/).
Mas não se preocupe, pois neste artigo, eu vou mostrar como criar o indicadores
de carregamento acessíveis e bonitos para suas aplicações.

<aside className="aside-info">
Neste artigo, você aprender aprender para que servem os atributos <code> aria-live</code>,
 <code> aria-busy</code>, <code> aria-control </code> e <code>role</code>.
Além disso, aprenderá como adicionar um ícone de carregamento feito somente com CSS.
</aside>

Usamos indicadores de carregamento sempre que é necessário recuperar dados de maneira
assíncrona em nossas aplicações, normalmente relacionadas à alguma interação do
usuário: envio de formulários, requisições à <abbr title="Application Programming Interface">API</abbr>s
externas, upload de arquivos, etc. Para executarmos estas ações, é necessário que
forneçamos alguma identificação visual para que o usuário possa identificar que
a nossa aplicação está esperando algum dado ou retorno externo.

Vamos começar com um exemplo simples, onde uma região da tela será atualizada quando
um usuário selecionar um planeta da lista:

```html
<!-- Utilizaremos este formulário para selecionar um planeta -->
<fieldset>
  <legend>Informação do planeta</legend>
  <label for="planetasSelect">Planeta:</label>

  <!--
    O atributo aria-controls aponta para o ID do elemento da página este formulário controla
  -->
  <select id="planetasSelect" aria-controls="planetaInformacoes">
    <option value="">Selecione um planeta:</option>
    <option value="mercurio">Mercúrio</option>
    <option value="venus">Vênus</option>
    <option value="terra">Terra</option>
    <option value="marte">Marte</option>
  </select>
</fieldset>

<!--
  O atributo role="region" define que a div a seguir é um ponto de destaque na
  página, facilitando o acesso à região através do teclado.

  Observe que o ID da div a seguir é o mesmo definido no atributo aria-controls
  do select acima.

  Definimos o aria-live como igual a polite. Desse modo, os leitores de
  tela não interromperam a leitura da página quando o conteúdo dessa div for alterado.

  Por fim, definimos o aria-busy para informar aos leitores de tela ou outras
  tecnologias assistivas quando a região está aguardando um novo conteúdo.
-->
<div role="region" id="planetaInformacoes" aria-live="polite" aria-busy="false">
  <h2 id="planetaNome">Nenhum planeta selecionado</h2>
  <p id="planetaDescricao">Selecione um planeta para ver sua descrição</p>
</div>

<p>
  <small>
    Com informações da
    <a href="https://en.wikipedia.org/wiki/Solar_System#Inner_Solar_System"
      >Wikipedia</a
    >
  </small>
</p>
```

Agora, precisamos dizer para o leitores de telas ou qualquer outra tecnologia assistiva
que o parte do conteúdo exibido na tela é dinâmico. Para fazermos isso, usamos o
atributo `aria-live`<sup>[1](#aria-live-regions)</sup>, o qual pode receber um dos três argumentos:

1. `off`: atributo padrão para todos os elementos da página. Normalmente, você
   não precisa definir este atributo de maneira explícita;
2. `assertive`: interrompe a leitura da tecnologia assistiva de maneira abrupta.
   Só deve ser utilizado para notificações críticas ou que requeiram a atenção imediata
   do usuário;
3. `polite`: indica que a uma região da página foi atualizada, mas não requer a
   atenção imediata do usuário. É o atributo utilizado com mais frequência.

Também utilizamos o atributo `aria-busy` para informar aos leitores de tela que
a região está aguardando uma atualiação. Este atributo só aceita valores _booleanos_:
`true` ou `false`.

Se você leu o código acima com atenção, verá que definimos outros atributos:
`aria-controls`<sup>[2](#using-aria)</sup> (linha 9) e `role`<sup>[3](#aria-region-role)</sup> (linha 32).
O primeiro indica qual elemento o formulário controla, enquanto o segundo facilita
o acesso à região para pessoas que só podem utilizar o teclado para navegar na página.

Agora, vamos adicionar um pouco de JavaScript para selecionar os dados dos
planetas selecionados em nosso formulário:

```javascript
const PLANETAS = {
  mercurio: {
    nome: "Mercúrio",
    descricao:
      "Mercúrio é o menor e mais interno planeta do Sistema Solar. Tem o nome da divindade romana Mercúrio, o mensageiro dos deuses.",
  },
  venus: {
    nome: "Vênus",
    descricao:
      "Vênus é o segundo planeta depois do Sol. Foi nomeado em homenamgem à deusa romana do amor e da beleza.",
  },
  terra: {
    nome: "Terra",
    descricao:
      "A Terra é o terceiro planeta depois do Sol e o único planeta conhecido capaz de suportar a vida.",
  },
  marte: {
    nome: "Marte",
    descricao:
      'Marte é o quarto planeta depois do Sol e o segundo menor planeta do Sistema Solar. Seu nome é uma homenagem ao deus romano da Guerra. Também é conhecido com o "Planeta Vermelho".',
  },
};

function renderizaInformacoesDoPlaneta(planeta) {
  const planetaInformacoes = document.getElementById("planetaInformacoes");
  const planetaNome = document.getElementById("planetaNome");
  const planetaDescricao = document.getElementById("planetaDescricao");

  planetaInformacoes.setAttribute("aria-busy", "true");

  setTimeout(() => {
    if (planeta in PLANETAS) {
      planetaNome.textContent = PLANETAS[planeta].nome;
      planetaDescricao.textContent = PLANETAS[planeta].descricao;
    } else {
      planetaNome.textContent = "Nenhum planeta selecionado";
      planetaDescricao.textContent =
        "Selecione um planeta para ver sua descrição";
    }

    planetaInformacoes.setAttribute("aria-busy", "false");
  }, 1100);
}

document
  .getElementById("planetasSelect")
  .addEventListener("change", (event) => {
    renderizaInformacoesDoPlaneta(event.target.value);
  });
```

Perceba que utilizamos a função [`setTimeout`](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals)
(linha 27) para simular o acesso à uma API externa.

E para finalizar, adicionaremos um indicador de carregamento utilizando CSS. Sempre
que algum elemento da página (`div`, `aside`, `main`, etc.) tiver um atributo `aria-busy`
que seja igual a `true`, diminuiremos a opacidade do elemento e adicionaremos um
ícone de carregamento sobre o elemento em questão.

```css
[aria-busy] {
  transition: opacity 0.2s linear;
  position: relative;
}

[aria-busy="true"] * {
  opacity: 0.7;
}

[aria-busy="true"]:before {
  content: "";
  display: block;
  border: 6px solid transparent;
  border-top-color: purple;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  animation: spin 1.2s infinite linear;
  position: absolute;
  left: calc(50% - 18px);
  top: calc(50% - 18px);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
```

Depois de tudo isso, podemos ver o nosso exemplo em ação:

<iframe height="350" style="width: 100%" scrolling="no" title="Exemplo de loading acessível" src="https://codepen.io/douglasdemoura/embed/poNqmYq?default-tab=" frameBorder="no" loading="lazy"></iframe>

Experimente utilizar um leitor de tela no exemplo que acabamos de construir e veja
como os atributos que adicionados ao nosso exemplo fornecem uma boa experiência de
uso para usuários com necessidades especiais. Claro que podemos chegar ao mesmo
resultado de diversas outras formas, mas é importante sempre levarmos em consideração
se a nossa aplicação é acessível.

<p><small>
  <abbr title="Post scriptum">P.S.</abbr>: interaja e edite o código deste exemplo no <a href="https://codepen.io/douglasdemoura/pen/poNqmYq" target="_blank">CodePen</a>.
</small></p>

<footer className="footnotes">
  <h4>Referências</h4>

  <ol>
    <li id="aria-live-regions">
      <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions" target="_blank">ARIA live regions</a>
    </li>
    <li id="using-aria">
      <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques" target="_blank">Using ARIA: Roles, states, and properties</a>
    </li>
    <li id="aria-region-role">
      <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Region_role" target="_blank">ARIA: Region role</a>
    </li>
  </ol>
</footer>
