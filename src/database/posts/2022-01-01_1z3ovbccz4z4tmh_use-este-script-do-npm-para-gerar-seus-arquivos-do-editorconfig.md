---
id: 1z3ovbccz4z4tmh
locale: pt-BR
title: 'Use este script do NPM para gerar seus arquivos do EditorConfig'
created: 2022-01-01 15:00:00.000Z
updated: 2022-12-29 14:52:01.854Z
tags: javascript, html
translates: 
---
Você já precisou criar um EditorConfig nos seus projetos de programação, mas
nunca consegue lembrar de todas as opções que pode usar? Seus problemas
acabaram: apenas digite npx create-editorconfig -y no seu terminal e tenha um
EditorConfig gerado para você. Essas são as opções definidas por padrão:

```
# editorconfig.org
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
```

E se você desejar customizar estas configurações ou até mesmo adicionar mais
configurações para um grupo de arquivo diferente (definindo um padrão [glob](https://en.wikipedia.org/wiki/Glob_(programming))),
apenas omita o parâmetro -y no terminal e responda às questões que aparecerão
no terminal.

## O que é o EditorConfig?

EditorConfig é um formato de arquivo (o próprio .editorconfig) que serve para
definir os estilos que um editor de código (como o [VS Code](https://code.visualstudio.com/)) deve aplicar nos
arquivos. Você pode até definir um conjunto diferente de regras para os arquivos
presentes no seu projeto de acordo com suas respectivas extensões ou diretórios,
utilizando um [padrão glob](https://en.wikipedia.org/wiki/Glob_(programming)).

## Meu editor de código não está aplicando as configurações do EditorConfig

Para aplicar as regras do seu .editorconfig, o seu editor de código deve ter um
plugin ou ter implementado, nativamente, a aplicação das regras do EditorConfig
(se você estiver usando o VS Code, você deve instalar [esta extensão](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)).

## Como posso contribuir com o create-editorconfig?

Por favor, vá ao [repositório oficial do GitHub](https://github.com/DouglasdeMoura/create-editorconfig) e abra uma nova issue.
