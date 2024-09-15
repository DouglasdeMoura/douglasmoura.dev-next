---
id: ii9colsinjxkx1s
locale: pt-BR
title: 'Aliases do Git que uso diariamente'
created: 2024-07-31 17:24:35.964Z
updated: 2024-07-31 17:38:59.555Z
tags: Linux, Terminal
translates: 
---
Eu gosto de sempre ter um terminal aberto enquanto estou trabalhando e, por conta disso, acabo interagindo com o Git no terminal com muito mais frequência do que através da GUI da IDE. Por conta disso, sempre configuro os seguintes aliases para facilitar o uso dos comandos que mais utilizo:

```bash
alias g=git
alias ga='git add'
alias gaa='git add --all'
alias gb='git branch'
alias gc='git commit'
alias gac='git commit -ac'
alias gca='git commit --amend'
alias gca!='git commit --amend --no-verify'
alias gcm='git commit -m'
alias gco='git checkout'
alias gcb='git checkout -b'
alias gp='git pull -p'
alias gpo='git push origin'
alias gpo!='git push origin --force-with-lease'
```

Se você usa o Linux, MacOS ou WSL, basta copiar os _aliases_ acima para o arquivo de configuração do seu shell (`~/.bashrc` para [Bash](https://www.gnu.org/software/bash/), `~/.zshrc` para [ZSH](https://www.zsh.org/), `~/config/fish/config.fish` para [Fish](https://fishshell.com/)). Caso você utilize o PoweShell, adicione as seguintes funções ao seu arquivo `Microsoft.PowerShell_profile.ps1` (para editar com o VS Code, execute `code $PROFILE` no PowerShell):

```pwsh
function ga { git add $args }
function gaa { git add --all $args }
function gb { git branch $args }
function gc { git commit $args }
function gac {git commit -a -c $args }
function gca { git commit --amend $args }
function gca! { git commit --amend --no-verify $args }
function gcm { git commit -m $args }
function gco { git checkout $args }
function gcb { git checkout -b $args }
function gp { git pull -p $args }
function gpo { git push origin $args }
function gpo! { git push origin --force-with-lease $args }
```
