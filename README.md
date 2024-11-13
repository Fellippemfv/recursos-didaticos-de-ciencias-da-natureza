# Descrição Completa - Como Baixar e Rodar o Projeto Localmente

Este é um projeto desenvolvido com **Next.js** e **Tailwind CSS**, utilizando a estrutura do `create-next-app` para facilitar a inicialização e configuração do ambiente de desenvolvimento.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes pré-requisitos instalados em seu computador:

1. **Node.js** - O Node.js é necessário para gerenciar pacotes e rodar o servidor de desenvolvimento. Você pode baixar a versão mais recente do Node.js [aqui](https://nodejs.org/).
2. **VS Code (ou outro editor de código)** - Recomendamos o uso do Visual Studio Code (VS Code) para editar o código-fonte. Baixe o VS Code [aqui](https://code.visualstudio.com/).
3. **Git** - Para clonar o repositório, é necessário ter o Git instalado. Baixe o Git [aqui](https://git-scm.com/).

## Como Baixar e rodar o Projeto

1. **Clone o repositório**: Para baixar o projeto para o seu computador, abra o terminal e use o comando abaixo para clonar o repositório do GitHub.

```bash
   git clone <URL_DO_REPOSITORIO>
```

2. **Instale as dependências**: Para conseguir rodar o projeto em sua maquina, você deve instalar as dependências utilizando algum dos comandos abaixo.

```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install

```

3. **Rodar o servidor de desenvolvimento**: Para rodar o website em sua maquina, você deve iniciar o servidor de desenvolvimento utilizando algum dos comandos abaixo.

```bash
  npm run dev
  # ou
  yarn dev
  # ou
  pnpm dev

```

# Páginas presentes no website

Abaixo uma descrição detalhada de todas as páginas presentes em nosso projeto.

## Páginas de acesso ao público

### Página Inicial (Home)

A página inicial do site é o ponto de partida para os usuários. Nesta página, são apresentados:

- **Banner**: Uma imagem ou mensagem de boas-vindas para introduzir o propósito da plataforma.
- **Atividades em Destaque**: Uma seção que mostra atividades populares ou sugeridas, facilitando o acesso rápido a recursos selecionados.
- **Dados sobre Atividades**: Informações gerais sobre a quantidade de tipos de atividades disponíveis, oferecendo uma visão do conteúdo e diversidade dos recursos oferecidos.

> **Imagem da Página Inicial**

---

### Página Sobre

A página **Sobre** fornece uma apresentação detalhada do projeto. Aqui, o usuário pode entender melhor o objetivo da plataforma, os valores e as motivações por trás de seu desenvolvimento. É uma página dedicada a esclarecer o propósito e o público-alvo do site, além de oferecer uma visão dos benefícios educacionais pretendidos.

> **Imagem da Página Sobre**

---

### Página de Filtragem de Atividades

A página de filtragem permite aos usuários **buscar e filtrar** atividades e recursos didáticos conforme suas necessidades específicas. A interface de filtragem ajuda a personalizar a busca com base em temas, tipos de atividades, nível educacional e outras características. É uma página essencial para encontrar rapidamente recursos que correspondam ao objetivo de ensino e aprendizagem.

> **Imagem da Página de Filtragem**

---

### Página Específica de Atividade

Cada recurso possui uma **página específica** dedicada aos seus detalhes. Nesta página, o usuário encontra:

- **Descrição Completa da Atividade**: Informações detalhadas sobre o recurso, objetivos educacionais e instruções de uso.
- **Características e Categorias**: Dados específicos como temas, disciplinas e nível de ensino para ajudar na contextualização do recurso.
- **Links e Downloads**: Acesso direto a materiais ou links adicionais, facilitando o uso do recurso na prática educacional.

> **Imagem da Página Específica de Atividade**

## Página de Acesso Restrito a Desenvolvedores

Esta seção descreve a página exclusiva para desenvolvedores, permitindo o envio direto de atividades para o repositório do projeto através de um formulário integrado e automação de commits e pull requests.

---

### Página de Enviar Atividade

A página de **Enviar Atividade** foi desenvolvida para facilitar o processo de contribuição de atividades e recursos diretamente no repositório do projeto. Esta página é restrita a desenvolvedores e apresenta um formulário extenso com os seguintes elementos:

- **Formulário Completo de Inserção de Dados**: Contém campos para preenchimento de diversas informações necessárias sobre cada atividade, como título, descrição, objetivos educacionais, categorias, nível educacional, e links de recursos adicionais.
- **Botão de Envio Automatizado**: Ao final do formulário, um botão permite o envio da atividade. Utilizando a API do GitHub, ao clicar neste botão, um commit é criado automaticamente, seguido pela criação de um pull request para revisão.

> **Imagem da Página de Enviar Atividade**

---

### Funcionalidade de Envio via GitHub API

A integração com a GitHub API permite que o processo de submissão seja automático, incluindo:

1. **Criação de Commit Automático**: O sistema cria automaticamente um commit com as mudanças submetidas no formulário.
2. **Pull Request Automático**: Após o commit, uma pull request é gerada e enviada ao repositório principal para revisão e aprovação dos mantenedores do projeto.

Esta funcionalidade foi desenvolvida para agilizar o processo de contribuição, garantindo um fluxo organizado e eficiente de novas atividades.

---

### Orientações para Enviar Atividade Localmente

Siga os passos abaixo para enviar uma atividade localmente para o repositório, utilizando a página de **Enviar Atividade**:

1. **Verifique a Branch Atual**:

   - Acesse o repositório localmente em seu computador.
   - Certifique-se de estar na branch `add-new-resource`. Se necessário, troque para essa branch com o comando:
     ```bash
     git checkout add-new-resource
     ```

2. **Atualize a Branch**:

   - Verifique se a branch `add-new-resource` está atualizada com as últimas alterações do repositório remoto. Para isso, execute o seguinte comando para obter as atualizações:
     ```bash
     git pull origin add-new-resource
     ```

3. **Acesse a Página Localmente**:
   - Abra o terminal no diretório do projeto e inicie o servidor de desenvolvimento com o comando:

     ```bash
     npm run dev

     ```

   - Após o servidor iniciar, acesse a página de envio no navegador: [http://localhost:3000/send-teaching-resource](http://localhost:3000/send-teaching-resource)

> **Imagem da Página de Envio Local**

4. **Busque e Adicione o TOKEN da API do GitHub**

   Nesta seção, você aprenderá como buscar e adicionar o **TOKEN de acesso pessoal** (Classic) da API do GitHub. Esse token é necessário para permitir que o sistema interaja com o repositório de forma segura e automatizada.

   #### Passo a Passo para Obter o Token

   **A**. **Acesse o GitHub e Vá para as Configurações de Token**:

   - Primeiramente, acesse o [GitHub](https://github.com) e faça login na sua conta.
   - No canto superior direito da página inicial, clique na sua foto de perfil e depois em **Settings** (Configurações).

   > **Imagem 1: Acesse as Configurações do GitHub**

   **B**. **Navegue até a Seção de Tokens de Acesso**:

   - No menu lateral esquerdo, procure e clique em **Developer settings** (Configurações do desenvolvedor).
   - Em seguida, clique em **Personal access tokens** (Tokens de acesso pessoal) e, depois, em **Tokens (classic)**.

   > **Imagem 2: Acesse Tokens de Acesso Pessoal**

   **C**. **Gere um Novo Token**:

   - Clique no botão **Generate new token** (Gerar novo token).
   - Preencha os campos conforme necessário. Em **Note**, você pode adicionar uma descrição para lembrar o propósito do token (por exemplo, "Token para Enviar Atividades ao Repositório").
   - Defina a **Data de Expiração** (opcional) e selecione os **Escopos** (permissões) para o token. Para o processo de envio de atividades, você precisará garantir que as permissões **repo** (acesso completo ao repositório) e **workflow** (para automação de workflows) estejam selecionadas.

   > **Imagem 3: Gerar Novo Token de Acesso**

   **D**. **Copie o Token Gerado**:

   - Após gerar o token, copie-o para a área de transferência. **Lembre-se de que este token é mostrado apenas uma vez**, então é importante guardá-lo em um local seguro.

   > **Imagem 4: Token Gerado**

   **E**. Adicionando o Token no Sistema

   - **Acesse o Campo 'Adicionar Token do GitHub'**:
   - No sistema, vá até a página onde você irá inserir o token. Procure o campo denominado **'Adicionar Token do GitHub'**.

   - **Cole o Token Copiado**:
   - No campo indicado, cole o token que você copiou do GitHub.

   > **Imagem 5: Adicionando token de acesso**

   5. **Preencha o Formulário**: Preencha todos os campos obrigatórios do formulário, incluindo:

   - Título da atividade
   - Descrição detalhada
   - Objetivos educacionais
   - Categorias da atividade
   - Nível educacional
   - Links de recursos adicionais
   - Certifique-se de fornecer informações completas e precisas para cada campo.

   > **Imagem da Página de Envio Local**

   6. **Envio da Atividade**:

   - Após preencher o formulário, clique no botão **Enviar** para submeter a atividade.
   - O sistema criará automaticamente um commit com as informações enviadas e, em seguida, gerará uma pull request para revisão e integração no repositório principal.

   > **Imagem da Página de Envio Local**

   7. **Acompanhe o Status da Pull Request**:

   - Após o envio, uma pull request será gerada automaticamente. Você poderá acompanhar o status da pull request através do GitHub.
   - Se necessário, entre em contato com os mantenedores do projeto para mais detalhes ou para discutir alterações. Você pode fazer isso por e-mail ou acessando o link da pull request diretamente no GitHub.

   > **Imagem da Página de Envio Local**

   Seguindo esses passos, você poderá enviar atividades e recursos para o projeto de forma eficiente, utilizando a automação do GitHub para agilizar o processo de contribuição.

# Padrão de Mensagens de Commit

Abaixo estão diretrizes e exemplos de mensagens de commit para cada tipo de mudança no projeto. Use um estilo conciso e direto, com verbos no infinitivo (ex.: "Adicionar", "Atualizar") para facilitar o entendimento.

## Estrutura Geral da Mensagem de Commit

Use este formato para criar mensagens de commit:

### Tipos de Commit

1. **Adição de Novos Recursos ou Funcionalidades**

   - **Padrão**: `Adicionar: [descrição da funcionalidade]`
   - **Exemplo**: `Adicionar: Filtro por categoria na página de recursos`
   - **Descrição (opcional)**: Explique detalhes sobre a nova funcionalidade, se necessário.

2. **Atualizações ou Melhorias em Funcionalidades Existentes**

   - **Padrão**: `Atualizar: [descrição da atualização]`
   - **Exemplo**: `Atualizar: Layout do banner da página inicial`
   - **Descrição (opcional)**: Inclua mudanças relevantes, como melhoria de desempenho ou ajuste no design.

3. **Correção de Bugs**

   - **Padrão**: `Fix: [descrição do bug corrigido]`
   - **Exemplo**: `Fix: Erro na exibição de atividades filtradas`
   - **Descrição (opcional)**: Descreva o problema e como ele foi corrigido, se for uma correção significativa.

4. **Refatoração de Código**

   - **Padrão**: `Refatorar: [descrição do código refatorado]`
   - **Exemplo**: `Refatorar: Componentes da página de filtragem`
   - **Descrição (opcional)**: Indique as razões para a refatoração, como melhoria de legibilidade ou simplificação de lógica.

5. **Atualização de Documentação**

   - **Padrão**: `Docs: [descrição da atualização]`
   - **Exemplo**: `Docs: Adicionar instruções de instalação no README`
   - **Descrição (opcional)**: Detalhe mudanças na documentação, especialmente se incluir novos exemplos ou instruções.

6. **Alterações em Arquivos de Configuração**

   - **Padrão**: `Chore: [descrição da alteração na configuração]`
   - **Exemplo**: `Chore: Atualizar dependências no package.json`
   - **Descrição (opcional)**: Especifique por que foi necessária a mudança de configuração.

7. **Outras Melhorias ou Ajustes Não Funcionais**
   - **Padrão**: `Melhoria: [descrição da melhoria]`
   - **Exemplo**: `Melhoria: Melhorar acessibilidade dos botões`
   - **Descrição (opcional)**: Explicite a motivação da melhoria, especialmente se ela impacta a experiência do usuário.

## Dicas para Boas Mensagens de Commit

- **Seja claro e objetivo**: Descreva a mudança de forma que qualquer pessoa consiga entender.
- **Limite o resumo a 50 caracteres**: Use uma descrição curta e objetiva.
- **Adicione contexto na descrição**: Se a mudança for complexa, explique o motivo na descrição adicional.
- **Use uma linguagem consistente**: Opte pelo infinitivo e um tom direto.

# Como Propagar Atualizações da Branch `master` para Outras Branches

Este guia explica como atualizar branches secundárias (`add-new-resource` e `styles`) com mudanças feitas na branch `master`. Esse processo garante que alterações principais realizadas em `master` estejam disponíveis em outras branches de desenvolvimento.

## Passo 1: Comitar as Mudanças na Branch `master`

Antes de tudo, verifique se todas as alterações feitas na branch `master` foram salvas e comitadas.

```bash
git add .

git commit -m "Descrição das mudanças feitas na branch master"

git push origin master

```

## Passo 2: Fazer o merge e commit a Branch `add-new-resource`

Primeiro, altere para a branch `add-new-resource`. Depois mescle as mudanças da Branch master na Branch Atual. E por último enviar as atualizações para o repositório remoto.

```bash
git checkout add-new-resource

git merge master

git push origin add-new-resource
```

## Passo 3: Fazer o merge e commit a Branch `styles`

Primeiro, altere para a branch `styles`. Depois mescle as mudanças da Branch master na Branch Atual. E por último enviar as atualizações para o repositório remoto.

```bash
git checkout styles

git merge master

git push origin styles
```

---

# Como Propagar Atualizações da Branch `styles` para Outras Branches

Este guia explica como atualizar branches (`add-new-resource` e `master`) com mudanças feitas na branch `styles`. Esse processo é útil quando você realiza alterações na branch `styles` e deseja garantir que essas mudanças sejam refletidas nas outras branches de desenvolvimento.

## Passo 1: Comitar as Mudanças na Branch `styles`

Antes de tudo, verifique se todas as alterações feitas na branch `styles` foram salvas e comitadas.

```bash
git add .

git commit -m "Descrição das mudanças feitas na branch styles"

git push origin styles

```

## Passo 2: Fazer o merge e commit a Branch `add-new-resource`

Primeiro, altere para a branch `add-new-resource`. Depois mescle as mudanças da Branch styles na Branch Atual. E por último enviar as atualizações para o repositório remoto.

```bash
git checkout add-new-resource

git merge styles

git push origin add-new-resource
```

## Passo 3: Fazer o merge e commit a Branch `master`

Primeiro, altere para a branch `master`. Depois mescle as mudanças da Branch styles na Branch Atual. E por último enviar as atualizações para o repositório remoto.

```bash
git checkout master

git merge styles

git push origin master
```

---

# Como Propagar Atualizações da Branch `add-new-resource` para Outras Branches

Este guia explica como atualizar as branches `master` e `styles` com mudanças feitas na branch `add-new-resource`. Esse processo é útil quando você realiza alterações na branch `add-new-resource` e deseja garantir que essas mudanças sejam refletidas nas outras branches de desenvolvimento.

## Passo 1: Comitar as Mudanças na Branch `add-new-resource`

Antes de tudo, verifique se todas as alterações feitas na branch `add-new-resource` foram salvas e comitadas.

```bash
git add .

git commit -m "Descrição das mudanças feitas na branch add-new-resource"

git push origin add-new-resource

```

## Passo 2: Fazer o merge e commit a Branch `styles`

Primeiro, altere para a branch `styles`. Depois mescle as mudanças da Branch add-new-resource na Branch Atual. E por último enviar as atualizações para o repositório remoto.

```bash
git checkout styles

git merge add-new-resource

git push origin styles
```

## Passo 3: Fazer o merge e commit a Branch `master`

Primeiro, altere para a branch `master`. Depois mescle as mudanças da Branch add-new-resource na Branch Atual. E por último enviar as atualizações para o repositório remoto.

```bash
git checkout master

git merge add-new-resource

git push origin master
```

---

# Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
