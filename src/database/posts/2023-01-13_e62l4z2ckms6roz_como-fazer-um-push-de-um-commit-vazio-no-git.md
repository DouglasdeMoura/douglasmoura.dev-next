---
id: e62l4z2ckms6roz
locale: pt-BR
title: Como fazer um push de um commit vazio no Git
created: 2023-01-13 20:58:55.955Z
updated: 2023-01-13 21:04:57.659Z
tags: Git
translates: 
---
Voê já teve que rodar, novamente, uma [pipeline de CI/CD](https://www.redhat.com/pt-br/topics/devops/what-cicd-pipeline) que é iniciada por um commit no repositório, quando não há nenhuma alteração no código fonte para ser "commitada"?

Ora, é só usar o comando abaixo:

```bash
git commit --allow-empty -m "ci: aciona pipeline com um commit vazio"
```

E agora, só precisa fazer o push para o repositório remoto:

```bash
git push
```

