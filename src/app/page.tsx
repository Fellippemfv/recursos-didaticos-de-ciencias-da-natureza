import Image from "next/image";
import { FaSearch, FaUpload } from "react-icons/fa";
import imageHomePage from "../../public/exp-home-page.png";

import img1 from "../../public/1732045035433/images/imagem_2024-11-19_154004676.png";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Banner Informativo */}
      <div className="bg-blue-100 text-gray-800 p-8 rounded-xl mb-8 text-center flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
        {/* Imagem no Banner */}
        <img
          src="/1732045035433/images/imagem_2024-11-19_154004676.png"
          alt="Imagem ilustrativa de recursos didáticos"
          className="w-full md:w-1/3 rounded-xl shadow-md object-cover"
        />

        {/* Texto e Botão no Banner */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-4 leading-tight">
            Bem-vindo ao Portal de Recursos Didáticos de Ciências da Natureza
          </h1>
          <p className="text-lg leading-relaxed text-gray-700">
            Descubra atividades escolares incríveis como: dinâmicas,
            experimentos, jogos educativos, modelos físicos e aplicativos
            interativos. Inspire seus alunos e transforme o aprendizado!
          </p>
          {/* Botões Responsivos */}
          <div className="flex flex-col md:flex-row gap-4 mt-6 w-full md:justify-start">
            <a
              href="/search"
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-500 transition transform hover:scale-105"
            >
              Explorar Atividades
            </a>
            <a
              href="/about"
              className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-lg border border-blue-600 hover:bg-blue-50 transition transform hover:scale-105"
            >
              Sobre a Plataforma
            </a>
          </div>
        </div>
      </div>

      {/* Destaques */}
      <section className="mb-12">
        <h3 className="text-xl font-bold mb-4">Atividades em Destaque</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/*1 */}
          <a
            href="/teaching-resource/verificando-se-alimentos-possuem-amido-utilizando-iodo"
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <img
              src="/1732223166403/images/imagem_2024-11-21_170748613.png"
              alt="Experimento"
              width={500}
              height={500}
              className="w-full h-48 object-cover rounded-md"
            />
            <h4 className="mt-4 font-semibold text-lg">
              Verificando se alimentos possuem amido utilizando iodo
            </h4>
            <p>
              Nesta atividade, exploraremos a presença de amido em diversos
              alimentos, como arroz, batata-doce, ovo e frango. O experimento
              permite identificar o amido como uma fonte de energia.
            </p>
          </a>

          {/* 2 */}
          <a
            href="/acidos-e-bases-utilizando-varios-liquidos"
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <img
              src="/1732020130194/images/imagem_2024-11-19_084450144.png"
              alt="Jogos Educativos"
              width={500}
              height={500}
              className="w-full h-48 object-cover rounded-md"
            />
            <h4 className="mt-4 font-semibold text-lg">
              Ácidos e bases utilizando vários líquidos
            </h4>
            <p>
              Neste experimento, os estudantes terão a oportunidade de
              identificar substâncias ácidas e básicas por meio de um indicador
              natural de pH, o suco de repolho roxo.
            </p>
          </a>

          {/* 3 */}
          <a
            className="bg-white p-4 rounded-lg shadow-md"
            href="/demonstrando-uma-reacao-exotermica-com-um-sinalizador-de-fumaca"
          >
            <img
              src="/1732037843852/images/Web_Photo_Editor.jpg"
              alt="Dinâmicas de Grupo"
              width={500}
              height={500}
              className="w-full h-48 object-cover rounded-md"
            />
            <h4 className="mt-4 font-semibold text-lg">
              Demonstrando uma reação exotérmica com um sinalizador de fumaça
            </h4>
            <p>
              Neste experimento, vamos observar na prática uma reação
              exotérmica, que libera calor durante a sua ocorrência. O objetivo
              é demonstrar o conceito de reação exotérmica.
            </p>
          </a>
        </div>
      </section>
    </div>
  );
}
