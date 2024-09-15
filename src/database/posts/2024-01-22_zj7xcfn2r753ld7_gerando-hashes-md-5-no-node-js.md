---
id: zj7xcfn2r753ld7
locale: pt-BR
title: 'Gerando hashes MD5 no Node.js'
created: 2024-01-22 20:36:58.299Z
updated: 2024-01-23 13:20:20.671Z
tags: javascript, Node.js
translates: bdwhaei947bfrx4
---
Você pode criar _hashes_ com Node.js sem a necessidade instalar nenhuma biblioteca externa. Normalmente eu crio a seguinte função utilitária nos projetos em que trabalho:

```javascript
/**
 * Cria um hash MD5 para a string dada
 *
 * @param {string} str
 * @returns {string}
 */
export const md5 = (str) => createHash('md5').update(str).digest('hex')
```

E a uso para substituir a biblioteca [md5](https://www.npmjs.com/package/md5) sempre que encontro.

Note que você pode criar _hashes_ para qualquer algoritmo suportado pela versão do OpenSSL da sua plataforma. No Linux e no Mac, você pode ver quais os algoritmos disponíveis com o comando `openssl list -digest-algorithms`.
