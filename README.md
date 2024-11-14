<h1 align="center">Recursos didáticos de ciências da natureza</h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Fellippemfv/nest-prisma-swagger-docker-base-project">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Fellippemfv/nest-prisma-swagger-docker-base-project?color=red">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/Fellippemfv/nest-prisma-swagger-docker-base-project?color=yellow">
  
  <a href="https://github.com/Fellippemfv/nest-prisma-swagger-docker-base-project/commits/master">
   <img alt="last-commit" src="https://img.shields.io/github/last-commit/Fellippemfv/nest-prisma-swagger-docker-base-project">
  </a>

  <a href="https://github.com/Fellippemfv/nest-prisma-swagger-docker-base-project/blob/master/LICENSE.md">
   <img alt="GitHub/license" src="https://img.shields.io/github/license/Fellippemfv/nest-prisma-swagger-docker-base-project">
  </a>
</p>

## 📑 Sumário

- [Sobre o projeto](#round_pushpin-sobre-o-projeto)
- [Tecnologias utilizadas](#rocket-tecnologias-utilizadas)
- [Como usar](#information_source-como-usar)
- [Páginas presentes no website](#page_facing_up-páginas-presentes-no-website)
- [Orientações para enviar atividade por email](#email-orientações-para-enviar-atividade-por-email)
- [Orientações para enviar atividade localmente](#computer-orientações-para-enviar-atividade-localmente)
- [Funcionamento de envio via GitHub API](#hammer_and_wrench-funcionamento-de-envio-via-github-api)
- [Como Propagar Atualizações da Branch master para Outras Branches](#arrows_clockwise-como-propagar-atualizações-da-branch-master-para-outras-branches)
- [Como Propagar Atualizações da Branch styles para Outras Branches](#arrows_clockwise-como-propagar-atualizações-da-branch-styles-para-outras-branches)
- [Como Propagar Atualizações da Branch add-new-resource para Outras Branches](#arrows_clockwise-como-propagar-atualizações-da-branch-add-new-resource-para-outras-branches)
- [Deploy na Vercel](#globe_with_meridians-deploy-na-vercel)
- [Licença](#memo-licença)

## :round_pushpin: Sobre o projeto

<p align="justify">
 Este projeto foi desenvolvido para fornecer informações sobre recursos didáticos para o ensino de Ciências da Natureza (Física, Química e Biologia). A plataforma organizou e centralizou atividades interativas, como Dinâmicas (Participação em dupla ou em grupo), Experimentos (Demonstrativos e Investigativos), Jogos educativos (Tabuleiros e Lúdicos), Modelos físicos (Maquetes e Protótipos) e Aplicativos Educativos (Apps e Sites Interativos) e o disponibiliza de forma gratuita. O objetivo é fornecer um local para que o professor de forma rápida consiga escolher alguma atividade diferente do comum para realizar em sala de aula, deste modo, promovendo uma educação mais envolvente, onde a teoria se conecta com a prática de forma divertida e significativa. As atividade e recursos demonstrados foram pegos de diversas fontes: Internet, livros, artigos. Todos os créditos foram indicados na aba "Referências" na página especifica da atividade. Este projeto NÃO TEM CARÁTER COMERCIAL.
</p>

## :rocket: Tecnologias utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/): Ambiente de execução para desenvolvimento do lado do servidor em JavaScript.
- [Next.js](https://nextjs.org): Framework para criação da interface do usuário, com suporte a renderização no servidor e funcionalidades otimizadas para o frontend.
- [Tailwind CSS](https://tailwindcss.com): Biblioteca de estilização para construir interfaces responsivas e altamente personalizáveis.
- [TypeScript](https://www.typescriptlang.org): Superconjunto de JavaScript que adiciona tipagem estática, melhorando a qualidade e manutenção do código.
- [ESLint](https://eslint.org): Ferramenta para análise de código, garantindo conformidade com padrões de estilo e reduzindo erros.
- [Prettier](https://prettier.io): Formatação automática do código para manter uma padronização visual.
- [JSON](https://www.json.org/json-en.html): Formato de armazenamento de dados estruturados utilizado para gerenciar configurações e dados do projeto.

### Funções de cada tecnologia

- **Interface e Estilo:**

  - **Next.js**: Framework para construção de páginas e renderização.
  - **Tailwind CSS**: Estilização rápida e responsiva das interfaces.
    &nbsp;

- **Ambiente de Desenvolvimento e Manutenção do Código:**

  - **Node.js**: Execução do JavaScript fora do navegador, especialmente para ferramentas de desenvolvimento.
  - **TypeScript**: Melhoria na qualidade e escalabilidade do código com tipagem.
  - **ESLint** e **Prettier**: Manutenção e padronização do código.
    &nbsp;

- **Armazenamento de Dados e Configurações:**
  - **JSON**: Utilizado para gerenciar dados de configuração e armazenamento estruturado.

## :information_source: Como usar

### Pré-requisitos

Antes de começar, certifique-se de ter os seguintes pré-requisitos instalados em seu computador:

1. **Node.js** - O Node.js é necessário para gerenciar pacotes e rodar o servidor de desenvolvimento. Você pode baixar a versão mais recente do Node.js [aqui](https://nodejs.org/).
2. **VS Code (ou outro editor de código)** - Recomendamos o uso do Visual Studio Code (VS Code) para editar o código-fonte. Baixe o VS Code [aqui](https://code.visualstudio.com/).
3. **Git** - Para clonar o repositório, é necessário ter o Git instalado. Baixe o Git [aqui](https://git-scm.com/).

### Como Baixar e rodar o Projeto

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

## :page_facing_up: Páginas presentes no website

Abaixo uma descrição detalhada de todas as páginas presentes em nosso projeto.

### Páginas de acesso ao público

---

#### Página Inicial (Home)

A página inicial do site é o ponto de partida para os usuários. Nesta página, são apresentados:

- **Banner**: Uma imagem ou mensagem de boas-vindas para introduzir o propósito da plataforma.
- **Atividades em Destaque**: Uma seção que mostra atividades populares ou sugeridas, facilitando o acesso rápido a recursos selecionados.
- **Dados sobre Atividades**: Informações gerais sobre a quantidade de tipos de atividades disponíveis, oferecendo uma visão do conteúdo e diversidade dos recursos oferecidos.

> **Imagem da Página Inicial**

---

#### Página Sobre

A página **Sobre** fornece uma apresentação detalhada do projeto. Aqui, o usuário pode entender melhor o objetivo da plataforma, os valores e as motivações por trás de seu desenvolvimento. É uma página dedicada a esclarecer o propósito e o público-alvo do site, além de oferecer uma visão dos benefícios educacionais pretendidos.

> **Imagem da Página Sobre**

---

#### Página de Filtragem de Atividades

A página de filtragem permite aos usuários **buscar e filtrar** atividades e recursos didáticos conforme suas necessidades específicas. A interface de filtragem ajuda a personalizar a busca com base em temas, tipos de atividades, nível educacional e outras características. É uma página essencial para encontrar rapidamente recursos que correspondam ao objetivo de ensino e aprendizagem.

> **Imagem da Página de Filtragem**

---

#### Página Específica de Atividade

Cada recurso possui uma **página específica** dedicada aos seus detalhes. Nesta página, o usuário encontra:

- **Descrição Completa da Atividade**: Informações detalhadas sobre o recurso, objetivos educacionais e instruções de uso.
- **Características e Categorias**: Dados específicos como temas, disciplinas e nível de ensino para ajudar na contextualização do recurso.
- **Links e Downloads**: Acesso direto a materiais ou links adicionais, facilitando o uso do recurso na prática educacional.

> **Imagem da Página Específica de Atividade**

### Página de Acesso Restrito a Desenvolvedores

Esta seção descreve a página exclusiva para desenvolvedores, permitindo o envio direto de atividades para o repositório do projeto através de um formulário integrado e automação de commits e pull requests.

---

#### Página de Enviar Atividade

A página de **Enviar Atividade** foi desenvolvida para facilitar o processo de contribuição de atividades e recursos diretamente no repositório do projeto. Esta página é restrita a desenvolvedores e apresenta um formulário extenso com os seguintes elementos:

- **Formulário Completo de Inserção de Dados**: Contém campos para preenchimento de diversas informações necessárias sobre cada atividade, como título, descrição, objetivos educacionais, categorias, nível educacional, e links de recursos adicionais.
- **Botão de Envio Automatizado**: Ao final do formulário, um botão permite o envio da atividade. Utilizando a API do GitHub, ao clicar neste botão, um commit é criado automaticamente, seguido pela criação de um pull request para revisão.

## :email: Orientações para enviar atividade por email

Para garantir que sua atividade seja enviada corretamente e que todas as informações necessárias sejam incluídas, siga as orientações abaixo:

1. **Prepare os Arquivos**

   - Certifique-se de que todos os arquivos relacionados à atividade estão completos e organizados.

2. **Nomeação dos Arquivos**

   - Se a atividade incluir vários arquivos (documentos e imagens), tome cuidado para os arquivos NÃO TEREM O MESMO NOME, caso contrário vai ocorrer erro ao enviar.

### 3. **Corpo do Email**

No corpo do e-mail, inclua o máximo possível das seguintes informações para facilitar a identificação e avaliação da atividade:

- **Nome do autor/da autora**: Seu nome completo, para que o responsável possa facilmente identificar o criador da atividade.
- **Tópico geral**: Identifique a área de conhecimento à qual a atividade pertence, como Biologia, Física ou Química.
- **Tipo de Recurso Didático**: Informe o tipo de recurso utilizado na atividade. As opções incluem:
  - **Dinâmicas** (Participação em dupla ou em grupo)
  - **Experimentos** (Demonstrativos e Investigativos)
  - **Jogos Educativos** (Tabuleiros e Lúdicos)
  - **Modelos Físicos** (Maquetes e Protótipos)
  - **Aplicativos Educativos** (Apps e Sites Interativos)
- **Título da Atividade**: Forneça um título claro e específico para a atividade, que resuma seu propósito.
- **Imagem de Preview**: Anexe uma imagem que ofereça uma prévia visual da atividade.
- **Descrição Detalhada**: Inclua uma descrição completa da atividade, explicando seu contexto e finalidade.
- **Objetivos Educacionais**: Explique quais habilidades ou conhecimentos a atividade busca desenvolver nos estudantes.
- **Materiais Necessários**: Liste todos os materiais que serão usados para executar a atividade.
- **Etapa/Passo a Passo**: Detalhe cada passo necessário para realizar a atividade, desde a preparação até a finalização. Caso as etapas tenha imagens adicione. (modelo de nome: metodologia-nome_da_imagem)
- **Referências**: Inclua referências para qualquer material de apoio ou fonte que tenha sido consultada na elaboração da atividade.

Além destes campos, os seguintes são opcionais e podem ser incluídos conforme necessário:

- **Tópico Específico**: Detalhe o assunto mais específico abordado dentro do tópico geral, se aplicável.
- **Arquivos Adicionais para Download**: Inclua arquivos adicionais, se houver, nos formatos ".docx" ou ".pptx" (tamanho máximo de 1 MB).
- **Resultados Esperados**: Descreva os resultados que se espera que os estudantes alcancem ao concluir a atividade.
- **Explicação Científica**: Adicione uma explicação científica para ajudar os estudantes a entenderem os conceitos teóricos relacionados à atividade.

## :computer: Orientações para enviar atividade localmente

Primeiro baixe o projeto seguindo as orientações iniciais. Depois siga os passos abaixo para enviar uma atividade localmente para o repositório, utilizando a página de **Enviar Atividade**:

**1. Verifique a Branch Atual**:

- Acesse o repositório localmente em seu computador.
- Certifique-se de estar na branch `add-new-resource`. Se necessário, troque para essa branch com o comando:

```bash
git checkout add-new-resource
```

**2. Atualize a Branch**:

- Verifique se a branch `add-new-resource` está atualizada com as últimas alterações do repositório remoto. Para isso, execute o seguinte comando para obter as atualizações:

```bash
git pull origin add-new-resource
```

**3. Acesse a Página Localmente**:

- Abra o terminal no diretório do projeto e inicie o servidor de desenvolvimento com o comando:

```bash
npm run dev

```

- Após o servidor iniciar, acesse a página de envio no navegador: [http://localhost:3000/send-teaching-resource](http://localhost:3000/send-teaching-resource)

- Depois de acessar, espere todos os campos carregarem. Devido aos diversos scripts pode demorar um pouco.

**4. Busque e Adicione o TOKEN da API do GitHub:**

- Nesta seção, você aprenderá como buscar e adicionar o **TOKEN de acesso pessoal** (Classic) da API do GitHub. Esse token é necessário para permitir que o sistema interaja com o repositório de forma segura e automatizada.

**4.1**. **Acesse o GitHub e Vá para as Configurações de Token**:

- Primeiramente, acesse o [GitHub](https://github.com) e faça login na sua conta.
- No canto superior direito da página inicial, clique na sua foto de perfil e depois em **Settings** (Configurações).
  ![token-1](https://github.com/user-attachments/assets/e5442461-e06b-4c53-a9cd-dca7c8b0f660)
  **4.2**. **Navegue até a Seção de Tokens de Acesso**:

- No menu lateral esquerdo, procure e clique em **Developer settings** (Configurações do desenvolvedor).
  ![token-2](https://github.com/user-attachments/assets/37e8ad69-5d22-4119-81c4-799740521eec)
- Em seguida, clique em **Personal access tokens** (Tokens de acesso pessoal) e, depois, em **Tokens (classic)**.
  ![token-3](https://github.com/user-attachments/assets/156ad9fe-4191-4e95-87b3-0ad58dae1315)
- Clique no botão **Generate new token** (Gerar novo token).
- Clique no botão **Generate new token (classic)** (Gerar novo token clássico).
  ![token-4](https://github.com/user-attachments/assets/8b291179-62fb-4bd6-92cd-6cabecca8cb5)
- Preencha os campos conforme necessário. Em **Note**, você pode adicionar uma descrição para lembrar o propósito do token (por exemplo, "Token para Enviar Atividades ao Repositório").
- Defina a **Data de Expiração** (opcional) e selecione os **Escopos** (permissões) para o token. Para o processo de envio de atividades, você precisará garantir que as permissões **repo** (acesso completo ao repositório) e **workflow** (para automação de workflows) estejam selecionadas.
- Selecione os escopos, ou seja, as permissões. Recomendo marcar TODOS, por isso cuidado com o seu token, com altas permissões alguém malicioso pode utilizar para fins maléficos.
  ![token-5](https://github.com/user-attachments/assets/6ecda35f-8b3e-465f-b072-6a4afb2d7a7b)
- E por fim clique em "Generate token", ao final da página.
  **4.4**. **Copie o Token Gerado**:

- Após gerar o token, copie-o para a área de transferência. **Lembre-se de que este token é mostrado apenas uma vez**, então é importante guardá-lo em um local seguro.
  ![token-6](https://github.com/user-attachments/assets/4a940bf9-38a6-4004-ad16-a3a832b29881)

**4.5**. Adicionando o Token no Sistema

- No sistema, vá até a página onde você irá inserir o token ([http://localhost:3000/send-teaching-resource](http://localhost:3000/send-teaching-resource)). Procure o campo denominado **'Chave da API do GitHub'**. Clique em **Editar código**. Cole o Token Copiado e clique em **Concluir**.
  ![token-7](https://github.com/user-attachments/assets/4500f7f8-30f1-4bf3-a63a-6cc7a9ece022)
- Após adicionar, vai aparecer um botão chamado "Testar", clicando nele ele verifica se o seu token é valido, se for válido vai aparecer seu nome do github, caso contrário vai aparecer um erro.
  **5. Preencha o Formulário**: Preencha todos os campos obrigatórios do formulário, Certifique-se de fornecer informações completas e precisas para cada campo. Os campos obrigatórios são:
  **Observação importante**: Se a atividade incluir vários arquivos (documentos e imagens), tome cuidado para os arquivos NÃO TEREM O MESMO NOME.
- **Nome do autor/da autora**: Seu nome completo, para que o responsável possa facilmente identificar o criador da atividade.
- **Tópico geral**: Identifique a área de conhecimento à qual a atividade pertence, como Biologia, Física ou Química.
- **Tipo de Recurso Didático**: Informe o tipo de recurso utilizado na atividade. As opções incluem:
  - **Dinâmicas** (Participação em dupla ou em grupo)
  - **Experimentos** (Demonstrativos e Investigativos)
  - **Jogos Educativos** (Tabuleiros e Lúdicos)
  - **Modelos Físicos** (Maquetes e Protótipos)
  - **Aplicativos Educativos** (Apps e Sites Interativos)
- **Título da Atividade**: Forneça um título claro e específico para a atividade, que resuma seu propósito.
- **Imagem de Preview**: Anexe uma imagem que ofereça uma prévia visual da atividade.
- **Descrição Detalhada**: Inclua uma descrição completa da atividade, explicando seu contexto e finalidade.
- **Objetivos Educacionais**: Explique quais habilidades ou conhecimentos a atividade busca desenvolver nos estudantes.
- **Materiais Necessários**: Liste todos os materiais que serão usados para executar a atividade.
- **Etapa/Passo a Passo**: Detalhe cada passo necessário para realizar a atividade, desde a preparação até a finalização. Caso as etapas tenha imagens adicione. (modelo de nome: metodologia-nome_da_imagem)
- **Referências**: Inclua referências para qualquer material de apoio ou fonte que tenha sido consultada na elaboração da atividade.
  &nbsp;

Além destes campos, temos alguns campos opcionais:

- **Tópico Específico**: Detalhe o assunto mais específico abordado dentro do tópico geral, se aplicável.
- **Arquivos Adicionais para Download**: Inclua arquivos adicionais, se houver, nos formatos ".docx" ou ".pptx" (tamanho máximo de 1 MB).
- **Resultados Esperados**: Descreva os resultados que se espera que os estudantes alcancem ao concluir a atividade.
- **Explicação Científica**: Adicione uma explicação científica para ajudar os estudantes a entenderem os conceitos teóricos relacionados à atividade.
  &nbsp;

E alguns campos com preenchimento automático:

- ID Único: Número gerado para diferenciar as ativiades, sua ausência causaria problemas na filtragem de atividades.
- Data de postagem: A data que foi enviada a atividade, para identificar quando foi enviado.
  &nbsp;

**6. Envio da Atividade**:

- Após preencher o formulário, clique no botão **Enviar** para submeter a atividade.
- O sistema criará automaticamente um commit com as informações enviadas e, em seguida, gerará uma pull request para revisão e integração no repositório principal.
  &nbsp;

**7. Acompanhe o Status da Pull Request**:

- Após o envio, uma pull request será gerada automaticamente. Você poderá acompanhar o status da pull request através do GitHub.
- Se necessário, entre em contato com os mantenedores do projeto para mais detalhes ou para discutir alterações. Você pode fazer isso por e-mail ou acessando o link da pull request diretamente no GitHub.
  &nbsp;

Seguindo esses passos, você poderá enviar atividades e recursos para o projeto de forma eficiente, utilizando a automação do GitHub para agilizar o processo de contribuição.

## :hammer_and_wrench: Funcionamento de envio via GitHub API

A integração com a GitHub API permite que o processo de submissão seja automático, incluindo:

1. **Criação de Commit Automático**: O sistema cria automaticamente um commit com as mudanças submetidas no formulário.
2. **Pull Request Automático**: Após o commit, uma pull request é gerada e enviada ao repositório principal para revisão e aprovação dos mantenedores do projeto.

Esta funcionalidade foi desenvolvida para agilizar o processo de contribuição, garantindo um fluxo organizado e eficiente de novas atividades. O diagrama desta etapa pode ser visto na imagem abaixo:

![diagrama-2](https://github.com/user-attachments/assets/34e9251c-8573-4cf7-af46-5f70d2fd68db)

## :writing_hand: Padrão de Mensagens de Commit

Abaixo estão diretrizes e exemplos de mensagens de commit para cada tipo de mudança no projeto. Use um estilo conciso e direto, com verbos no infinitivo (ex.: "Adicionar", "Atualizar") para facilitar o entendimento.

### Estrutura Geral da Mensagem de Commit

Use este formato para criar mensagens de commit:

#### Tipos de Commit

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

### Dicas para Boas Mensagens de Commit

- **Seja claro e objetivo**: Descreva a mudança de forma que qualquer pessoa consiga entender.
- **Limite o resumo a 50 caracteres**: Use uma descrição curta e objetiva.
- **Adicione contexto na descrição**: Se a mudança for complexa, explique o motivo na descrição adicional.
- **Use uma linguagem consistente**: Opte pelo infinitivo e um tom direto.

## :arrows_clockwise: Como Propagar Atualizações da Branch `master` para Outras Branches

Este guia explica como atualizar branches secundárias (`add-new-resource` e `styles`) com mudanças feitas na branch `master`. Esse processo garante que alterações principais realizadas em `master` estejam disponíveis em outras branches de desenvolvimento.

### Passo 1: Comitar as Mudanças na Branch `master`

Antes de tudo, verifique se todas as alterações feitas na branch `master` foram salvas e comitadas.

```bash
git add .

git commit -m "Descrição das mudanças feitas na branch master"

git push origin master

```

### Passo 2: Fazer o merge e commit a Branch `add-new-resource`

Primeiro, altere para a branch `add-new-resource`. Depois mescle as mudanças da Branch master na Branch Atual. E por último enviar as atualizações para o repositório remoto.

```bash
git checkout add-new-resource

git merge master

git push origin add-new-resource
```

### Passo 3: Fazer o merge e commit a Branch `styles`

Primeiro, altere para a branch `styles`. Depois mescle as mudanças da Branch master na Branch Atual. E por último enviar as atualizações para o repositório remoto.

```bash
git checkout styles

git merge master

git push origin styles
```

---

## :arrows_clockwise: Como Propagar Atualizações da Branch `styles` para Outras Branches

Este guia explica como atualizar branches (`add-new-resource` e `master`) com mudanças feitas na branch `styles`. Esse processo é útil quando você realiza alterações na branch `styles` e deseja garantir que essas mudanças sejam refletidas nas outras branches de desenvolvimento.

### Passo 1: Comitar as Mudanças na Branch `styles`

Antes de tudo, verifique se todas as alterações feitas na branch `styles` foram salvas e comitadas.

```bash
git add .

git commit -m "Descrição das mudanças feitas na branch styles"

git push origin styles

```

### Passo 2: Fazer o merge e commit a Branch `add-new-resource`

Primeiro, altere para a branch `add-new-resource`. Depois mescle as mudanças da Branch styles na Branch Atual. E por último enviar as atualizações para o repositório remoto.

```bash
git checkout add-new-resource

git merge styles

git push origin add-new-resource
```

### Passo 3: Fazer o merge e commit a Branch `master`

Primeiro, altere para a branch `master`. Depois mescle as mudanças da Branch styles na Branch Atual. E por último enviar as atualizações para o repositório remoto.

```bash
git checkout master

git merge styles

git push origin master
```

---

## :arrows_clockwise: Como Propagar Atualizações da Branch `add-new-resource` para Outras Branches

Este guia explica como atualizar as branches `master` e `styles` com mudanças feitas na branch `add-new-resource`. Esse processo é útil quando você realiza alterações na branch `add-new-resource` e deseja garantir que essas mudanças sejam refletidas nas outras branches de desenvolvimento.

### Passo 1: Comitar as Mudanças na Branch `add-new-resource`

Antes de tudo, verifique se todas as alterações feitas na branch `add-new-resource` foram salvas e comitadas.

```bash
git add .

git commit -m "Descrição das mudanças feitas na branch add-new-resource"

git push origin add-new-resource

```

### Passo 2: Fazer o merge e commit a Branch `styles`

Primeiro, altere para a branch `styles`. Depois mescle as mudanças da Branch add-new-resource na Branch Atual. E por último enviar as atualizações para o repositório remoto.

```bash
git checkout styles

git merge add-new-resource

git push origin styles
```

### Passo 3: Fazer o merge e commit a Branch `master`

Primeiro, altere para a branch `master`. Depois mescle as mudanças da Branch add-new-resource na Branch Atual. E por último enviar as atualizações para o repositório remoto.

```bash
git checkout master

git merge add-new-resource

git push origin master
```

---

## :globe_with_meridians: Deploy na Vercel

Este projeto está disponível para acesso através da plataforma [Vercel](https://vercel.com/), que oferece uma solução prática e eficiente para o deploy de aplicações Next.js. A escolha da Vercel deve-se à sua integração direta com o GitHub, permitindo que qualquer alteração no repositório seja automaticamente atualizada no ambiente de produção da Vercel. Isso facilita a manutenção e garante que as atualizações estejam sempre sincronizadas.

Confira o projeto em funcionamento [aqui](https://link-ficticio-da-vercel.com).

## :memo: Licença

Este projeto utiliza a MIT license. Veja em [Licença](https://github.com/Fellippemfv/nest-prisma-project-concepts/blob/master/LICENSE.md) para mais informação.
