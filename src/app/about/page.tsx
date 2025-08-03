import img from "next/image";
import Link from "next/link";
import { FaEnvelope, FaGithub } from "react-icons/fa";

import {
  FaLiraSign
} from "react-icons/fa";

export default function About() {

const timeline = [
  {
    year: "2022",
    title: "O Início",
    description:
      "Tudo teve início a partir de uma pergunta fundamental: como a tecnologia pode ser utilizada para auxiliar professores de Ciências na organização de aulas com diferentes recursos didáticos?",
    color: "bg-blue-50",
    badgeColor: "bg-blue-200 text-blue-800",
    dotColor: "bg-blue-500",
  },
  {
    year: "2023",
    title: "O Desenvolvimento",
    description:
      "Com a ideia inicial consolidada, deu-se início ao desenvolvimento do site por meio da integração entre o GitHub e a Vercel, utilizando o framework Next.js.",
    color: "bg-purple-50",
    badgeColor: "bg-purple-200 text-purple-800",
    dotColor: "bg-purple-500",
  },
  {
    year: "2024",
    title: "Inclusão de Recursos Didáticos",
    description:
      "Após o website ficar estruturado, iniciou-se a inclusão de recursos didáticos de Ciências, abrangendo uma variedade de temas e formatos. Para isso, foi criada uma página exclusiva destinada a facilitar essa organização.",
    color: "bg-green-50",
    badgeColor: "bg-green-200 text-green-800",
    dotColor: "bg-green-500",
  },
  {
    year: "2025",
    title: "A Partir de 2025",
    description:
      "Com o site consolidado e os recursos sendo progressivamente adicionados, definiu-se como meta utilizar os experimentos presentes na plataforma para promover o trabalho docente em diferentes redes sociais, buscando assim fortalecer o ensino de Ciências.",
    color: "bg-blue-50",
    badgeColor: "bg-blue-200 text-blue-800",
    dotColor: "bg-blue-500",
  },
];


  return (
    <section className="bg-[#f9fbfc] py-20 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Sobre o{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            Projeto
          </span>
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Conheça a história em relação ao surgimento e desenvolvimento deste site.
        </p>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10 flex flex-col md:flex-row gap-10 items-center">
        {/* Texto */}
        <div className="md:w-1/2">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500 text-white p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            <h3 className="text-xl font-semibold">Sobre o Projeto</h3>
          </div>
<p className="text-gray-700 mb-4">
  Este projeto surgiu da necessidade de desenvolver soluções voltadas aos professores de Ciências, especialmente no que se refere aos recursos didáticos, os quais, muitas vezes, encontram-se excessivamente dispersos em livros, vídeos e sites educacionais.
</p>
<p className="text-gray-700">
  Unimos inovação, design e funcionalidade com o objetivo de centralizar e facilitar, por meio deste site, a busca e a organização de diferentes recursos didáticos para o ensino de Ciências, de forma gratuita.
</p>


          {/* Indicadores */}
          <div className="mt-8 flex gap-6">
            <div className="bg-blue-50 px-6 py-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-600">100%</div>
              <p className="text-sm text-gray-600">Mais rápido a filtração de recursos</p>
            </div>
            <div className="bg-purple-50 px-6 py-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <p className="text-sm text-gray-600">Mais rápido a organização de atividades</p>
            </div>
          </div>
        </div>

        {/* Ícone decorativo */}
        <div className="md:w-1/2 relative flex justify-center items-center">
          <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-xl p-20 relative">
            <FaLiraSign className="w-12 h-12 text-blue-500" />
            {/* Círculos decorativos */}
            <span className="absolute top-0 left-0 w-10 h-10 bg-teal-100 rounded-full opacity-60 -translate-x-1/2 -translate-y-1/2"></span>
            <span className="absolute bottom-0 right-0 w-12 h-12 bg-orange-100 rounded-full opacity-60 translate-x-1/2 translate-y-1/2"></span>
          </div>
        </div>
      </div>

        <div className="mt-8 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10">
        {/* Título */}
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-purple-600 text-white p-2 rounded-lg">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Cronologia do Projeto</h2>
        </div>

        {/* Linha do tempo */}
        <div className=" relative pl-6 border-l-2 border-gradient-to-b from-blue-500 to-green-400">
          {timeline.map((item, index) => (
            <div key={index} className="mb-12 relative">
              {/* Ponto da linha */}
              <span
                className={`absolute -left-[1.86rem] top-1.5 w-3 h-3 rounded-full ${item.dotColor}`}
              ></span>

              <div className={`p-6 rounded-xl ${item.color}`}>
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-2 ${item.badgeColor}`}
                >
                  {item.year}
                </span>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

       <div className="mt-8 max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg text-center px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Quer ver o código do projeto?
        </h2>
        <p className="text-lg mb-8">
          Acesse o repositório no GitHub e descubra como tudo foi desenvolvido.
        </p>
        <a
          href="https://github.com/Fellippemfv/recursos-didaticos-de-ciencias-da-natureza" // 🔁 Substitua pela URL real
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-50 transition"
        >
          Acessar Projeto no GitHub
        </a>
      </div>
    </section>

  
  );
}
