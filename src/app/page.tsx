import Image from "next/image";
import { FaSearch, FaUpload } from "react-icons/fa";
import Link from "next/link";
import imageHomePage from "../../public/exp-home-page.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Banner Informativo */}
      <div className="bg-blue-600 text-white p-8 rounded-lg mb-8 text-center flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Imagem no Banner */}
        <img
          src="https://cdn.awsli.com.br/2500x2500/1158/1158247/produto/210083649/sem-foro-diy-c05f1dt8fu.jpg"
          alt="Imagem ilustrativa de recursos didáticos"
          className="w-full md:w-1/3 rounded-lg shadow-md"
        />

        {/* Texto e Botão no Banner */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">
            Bem-vindo ao Portal de Recursos Didáticos
          </h1>
          <p className="text-lg mb-4">
            Explore uma variedade de atividades escolares, como experimentos,
            jogos educativos e dinâmicas para facilitar o aprendizado.
          </p>
          {/* Botões Responsivos */}
          <div className="flex flex-col md:flex-row gap-4 mt-4 w-full md:justify-around">
            <a
              href="/search"
              className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              Explorar Atividades
            </a>
            <a
              href="/about"
              className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              Sobre a plataforma
            </a>
          </div>
        </div>
      </div>

      {/* Destaques */}
      <section className="mb-12">
        <h3 className="text-xl font-bold mb-4">Atividades em Destaque</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src="https://www.nta.ufscar.br/projetos/recursos-didaticos-1/circulo_trigonometrico.png"
              alt="Experimento"
              width={500}
              height={500}
              className="w-full h-48 object-cover rounded-md"
            />
            <h4 className="mt-4 font-semibold text-lg">
              Experimentos Científicos
            </h4>
            <p>
              Explore atividades práticas que ajudam a demonstrar conceitos
              científicos.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src="https://www.nta.ufscar.br/projetos/recursos-didaticos-1/circulo_trigonometrico.png"
              alt="Jogos Educativos"
              width={500}
              height={500}
              className="w-full h-48 object-cover rounded-md"
            />
            <h4 className="mt-4 font-semibold text-lg">Jogos Educativos</h4>
            <p>
              Aprenda ciências de forma divertida com quizzes e simulações
              interativas.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img
              src="https://www.nta.ufscar.br/projetos/recursos-didaticos-1/circulo_trigonometrico.png"
              alt="Dinâmicas de Grupo"
              width={500}
              height={500}
              className="w-full h-48 object-cover rounded-md"
            />
            <h4 className="mt-4 font-semibold text-lg">Dinâmicas de Grupo</h4>
            <p>
              Atividades colaborativas para envolver os estudantes e incentivar
              o trabalho em equipe.
            </p>
          </div>
        </div>
      </section>

      {/* Resumo das Atividades Disponíveis */}
      <section>
        <h3 className="text-xl font-bold mb-4">
          Resumo das Atividades Disponíveis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h4 className="font-semibold text-lg">Experimentos</h4>
            <p className="text-3xl font-bold text-blue-600">55</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h4 className="font-semibold text-lg">Jogos Educativos</h4>
            <p className="text-3xl font-bold text-blue-600">48</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h4 className="font-semibold text-lg">Dinâmicas</h4>
            <p className="text-3xl font-bold text-blue-600">60</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h4 className="font-semibold text-lg">Modelos físicos</h4>
            <p className="text-3xl font-bold text-blue-600">30</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h4 className="font-semibold text-lg">Aplicativos Educativos</h4>
            <p className="text-3xl font-bold text-blue-600">30</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h4 className="font-semibold text-lg">Felicidade</h4>
            <p className="text-3xl font-bold text-blue-600">1000</p>
          </div>
        </div>
      </section>
    </div>
  );
}
