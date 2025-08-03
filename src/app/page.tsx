import Image from "next/image";
import { FaSearch, FaUpload } from "react-icons/fa";
import imageHomePage from "../../public/exp-home-page.png";

import img1 from "../../public/1732045035433/images/imagem_2024-11-19_154004676.png";

export default function Home() {

  const cardData = [
  {
    imageSrc: "/1732223166403/images/imagem_2024-11-21_170748613.png",
    tag: "Química",
    tagColor: "bg-purple-100 text-purple-800",
    date: "21/11/2024",
    title: "Verificando se alimentos possuem amido utilizando iodo",
    description: "Nesta atividade, exploraremos a presença de amido em diversos alimentos, como arroz, batata-doce, ovo e frango. O experimento permite identificar o amido como uma fonte de energia.",
    link: "/teaching-resource/verificando-se-alimentos-possuem-amido-utilizando-iodo",
  },
  {
    imageSrc: "/1732020130194/images/imagem_2024-11-19_084450144.png",
    tag: "Química",
    tagColor: "bg-green-100 text-green-800",
    date: "19/11/2024",
    title: "Ácidos e bases utilizando vários líquidos",
    description: "Neste experimento, os estudantes terão a oportunidade de identificar substâncias ácidas e básicas por meio de um indicador natural de pH, o suco de repolho roxo.",
    link: "/teaching-resource/acidos-e-bases-utilizando-varios-liquidos",
  },
  {
    imageSrc: "/1732037843852/images/Web_Photo_Editor.jpg",
    tag: "Física",
    tagColor: "bg-yellow-100 text-yellow-800",
    date: "20/11/2024",
    title: "Demonstrando uma reação exotérmica com um sinalizador de fumaça",
    description: "Neste experimento, vamos observar na prática uma reação exotérmica, que libera calor durante a sua ocorrência. O objetivo é demonstrar o conceito de reação exotérmica.",
    link: "/teaching-resource/demonstrando-uma-reacao-exotermica-com-um-sinalizador-de-fumaca",
  },
];

  return (
    <div className="max-w-5xl mx-auto mb-12 mt-2">
      {/* Banner Informativo Reformulado e Responsivo */}
{/*
  PRINCIPAIS ALTERAÇÕES PARA RESPONSIVIDADE:
  - O layout base é 'flex-col' (mobile-first).
  - 'lg:flex-row' ativa o layout lado a lado apenas em telas grandes (a partir de 1024px).
  - 'lg:max-h-[40rem]' aplica a restrição de altura apenas no layout de desktop. Em telas menores, a altura é automática.
*/}
<div className="flex flex-col lg:flex-row bg-gray-100 mt-4 lg:max-h-[40rem] overflow-hidden">
  
  {/* Coluna da Imagem (Esquerda) */}
  {/*
    - Em mobile, ocupa a largura total ('w-full').
    - Em desktop ('lg:'), ocupa metade da largura e 100% da altura do container.
  */}
  <div className="w-full lg:w-1/2 lg:h-full flex flex-col">
    {/*
      ALTERAÇÕES NAS IMAGENS:
      - 'h-64': Define uma altura fixa de 256px para as imagens em telas pequenas, evitando que fiquem muito grandes.
      - 'sm:h-80': Em telas um pouco maiores (small), aumenta um pouco a altura.
      - 'lg:h-1/2': Em telas grandes, cada imagem volta a ocupar metade da altura da coluna.
      - 'object-cover' e 'w-full' são mantidos para garantir o corte e preenchimento corretos em todos os tamanhos.
    */}
    <img
      src="https://img.freepik.com/fotos-premium/quadro-de-arte-infantil-com-laptop-vazio-de-papel-e-suprimentos-para-fazer-criativos_494619-306.jpg?semt=ais_hybrid&w=740"
      alt="Mesa de estudos com materiais de arte e um laptop, representando um ambiente de aprendizado criativo."
      className="w-full h-64 sm:h-80 lg:h-1/2 object-cover"
    />
    <img
      src="https://img.freepik.com/fotos-gratis/postura-plana-do-caderno-com-material-escolar_23-2148756594.jpg?semt=ais_hybrid&w=740"
      alt="Mesa de estudos com materiais de arte e um laptop, representando um ambiente de aprendizado criativo."
      className="w-full h-64 sm:h-80 lg:h-1/2 object-cover"
    />
  </div>

  {/* Coluna de Conteúdo (Direita) */}
  {/*
    - 'justify-center' centraliza o conteúdo verticalmente.
    - O padding foi ajustado para ser menor em telas pequenas e maior em telas grandes ('p-6 lg:p-12').
    - 'overflow-y-auto' é mantido para o caso de o conteúdo de texto ser muito grande na visão de desktop.
  */}
  <div className="w-full lg:w-1/2 bg-teal-900 text-white flex flex-col justify-center p-6 lg:p-12 overflow-y-auto">
    {/* O container interno agora usa 'mx-auto' para centralizar e 'lg:mx-0' para alinhar à esquerda em desktop */}
    <div className="max-w-md mx-auto lg:mx-0">
      {/* Logo ou Nome da Plataforma */}
      <div className="text-2xl font-bold mb-6 text-center lg:text-left">
        <span className="text-cyan-400">Ciência</span><span>Blog</span>
      </div>

      {/* Título Principal
        - Tamanho da fonte ajustado para diferentes telas para melhor legibilidade.
        - Texto centralizado em mobile e alinhado à esquerda em desktop.
      */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white text-center lg:text-left">
        Recursos didáticos para impulsionar o ensino de <span className="text-cyan-400">ciências</span>.
      </h1>

      <p className="mt-4 text-lg text-teal-200 text-center lg:text-left">
        Explore atividades interativas para despertar a curiosidade científica em seus alunos.
      </p>

      {/* Botões
        - Centralizados em telas pequenas e alinhados à esquerda em telas médias e grandes.
      */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center lg:justify-start">
        <a
          href="/search"
          className="bg-teal-600 text-white font-medium py-3 px-6 text-center rounded-xl shadow-md hover:bg-teal-500 transition-transform transform hover:scale-105"
          role="button"
        >
          Explorar Atividades
        </a>
        <a

          href="/about"
          className="bg-white text-teal-700 font-medium py-3 px-6 text-center rounded-xl shadow-md border-2 border-teal-600 hover:bg-teal-50 transition-transform transform hover:scale-105"
          role="button"
        >
          Sobre a Plataforma
        </a>
      </div>
    </div>
  </div>
</div>

    <section className="mt-16 bg-teal-900 py-16 px-4 text-white">
  <div className="max-w-6xl mx-auto text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Explore por <span className="text-cyan-300">Categoria</span>
    </h2>
    <p className="text-cyan-100 text-lg">
      Selecione uma área da ciência e descubra atividades didáticas incríveis
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
    {/* Categoria 1 */}
    <a
      href="#"
      className="bg-white/10 hover:bg-white/20 transition rounded-2xl p-6 text-center shadow-md backdrop-blur-sm"
    >
      <div className="bg-cyan-200 text-cyan-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        {/* Ícone Química */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      </div>
      <h3 className="font-semibold text-white text-lg">Química</h3>
    </a>

    {/* Categoria 2 */}
    <a
      href="#"
      className="bg-white/10 hover:bg-white/20 transition rounded-2xl p-6 text-center shadow-md backdrop-blur-sm"
    >
      <div className="bg-green-200 text-green-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        {/* Ícone Biologia */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </div>
      <h3 className="font-semibold text-white text-lg">Biologia</h3>
    </a>

    {/* Categoria 3 */}
    <a
      href="#"
      className="bg-white/10 hover:bg-white/20 transition rounded-2xl p-6 text-center shadow-md backdrop-blur-sm"
    >
      <div className="bg-purple-200 text-purple-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        {/* Ícone Física */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>
      <h3 className="font-semibold text-white text-lg">Física</h3>
    </a>

    {/* Categoria 4 */}
    <a
      href="#"
      className="bg-white/10 hover:bg-white/20 transition rounded-2xl p-6 text-center shadow-md backdrop-blur-sm"
    >
      <div className="bg-yellow-200 text-yellow-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        {/* Ícone Astronomia */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </div>
      <h3 className="font-semibold text-white text-lg">Outros</h3>
    </a>
  </div>
</section>

  
    <section className="container mx-auto px-4 py-12">
  <div className="flex justify-between items-center mb-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
      Atividades em Destaque
    </h2>
    <a
      href="/teaching-resource"
      className="text-teal-900 hover:text-teal-800 font-medium flex items-center"
    >
      Ver todos
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 ml-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
  {cardData.map((card, index) => (
    <div
      key={index}
      className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 hover:shadow-lg flex flex-col h-full"
    >
      {/* IMAGEM FIXA NO TOPO */}
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <img
          src={card.imageSrc}
          alt={card.title} // É bom usar o título como alt text
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTEÚDO: flex-grow para ocupar o meio */}
      <div className="flex flex-col flex-grow justify-between p-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${card.tagColor}`}>
              {card.tag}
            </span>
            <span className="text-sm text-gray-500">
              {card.date}
            </span>
          </div>

          <h3 className="text-xl font-bold mb-3 text-gray-800">
            {card.title}
          </h3>

          <p className="text-gray-600 mb-6">
            {card.description}
          </p>
        </div>

        {/* BOTÃO SEMPRE EMBAIXO */}
        <a
        target="_blank"
          href={card.link}
          className="mt-auto block w-full bg-teal-900 hover:bg-teal-800 text-white py-2 rounded-lg text-center transition-colors"
        >
          Ver detalhes
        </a>
      </div>
    </div>
  ))}
</div>
</section>


    </div>
  );
}
