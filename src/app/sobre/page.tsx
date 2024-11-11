import img from "next/image";
import Link from "next/link";
import { FaEnvelope, FaGithub } from "react-icons/fa";

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="max-w-4xl mx-auto px-8 space-y-16">
        {/* Seção Sobre o Projeto */}
        <section className="bg-white p-10 rounded-lg border border-gray-300">
          <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
            Sobre o Projeto
          </h1>
          <div className="flex justify-center mb-6">
            <img
              src="https://nova-escola-producao.s3.amazonaws.com/pdPYYjAXjAraVTRCQ3mpyTQG2S8vCyrQPpqer6mFRPDxgmM27t7ErSr5eTkp/conexaoeducativa04jun20box002-aprendizagemprojetos-c1-estudiokiwi-texto.jpg"
              alt="Imagem do Projeto"
              className="rounded-lg shadow-md w-40 h-40 object-cover"
            />
          </div>
          <p className="text-lg text-gray-800 text-justify leading-relaxed">
            Este site foi desenvolvido para fornecer recursos didáticos
            inovadores para o ensino de Ciências da Natureza. A plataforma
            oferece atividades interativas, como experimentos, jogos e
            dinâmicas, que tornam o aprendizado mais acessível, lúdico e eficaz.
            O objetivo é promover uma educação mais envolvente, onde a teoria se
            conecta com a prática de forma divertida e significativa.
          </p>
        </section>

        {/* Seção História do Projeto */}
        <section className="bg-white p-10 rounded-lg border border-gray-300">
          <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
            A História por Trás do Projeto
          </h2>
          <p className="text-lg text-gray-800 text-justify leading-relaxed">
            O projeto nasceu como parte de uma pesquisa de anteprojeto de
            mestrado em Ciências e matematica, com o objetivo de explorar novas
            abordagens pedagógicas que utilizam recursos digitais interativos.
            Durante a pesquisa, percebi a necessidade de ferramentas que
            incentivem a aprendizagem ativa e tornem o ensino mais envolvente
            para os estudantes. Entretanto, durante o processo de seleção do
            mestrado não fui adiante. Mas mesmo assim, criei esta plataforma
            para centralizar recursos educativos e tornar o ensino de Ciências
            mais acessível e dinâmico.
          </p>
        </section>

        {/* Seção Colaborador */}
        <section className="bg-white p-10 rounded-lg border border-gray-300">
          <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
            Colaborador
          </h2>
          <div className="flex justify-center mb-6">
            <img
              src="https://avatars.githubusercontent.com/u/67835741?v=4"
              alt="Foto do Colaborador"
              className="rounded-full shadow-md w-40 h-40 object-cover"
            />
          </div>
          <p className="text-lg text-gray-800 text-justify leading-relaxed">
            Sou o único colaborador deste projeto, e tenho a missão de
            proporcionar ferramentas educacionais de alta qualidade para tornar
            o aprendizado de Ciências mais acessível e envolvente. Com um forte
            interesse por educação e pedagogia digital, criei este site como uma
            extensão, com o propósito de transformar a forma como o conhecimento
            científico é transmitido e compreendido pelos estudantes.
          </p>
        </section>

        {/* Seção Contato */}
        <section className="bg-white p-10 rounded-lg border border-gray-300">
          <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
            Contato e Feedback
          </h2>
          <p className="text-lg text-center text-gray-800 mb-6">
            Caso tenha dúvidas ou queira compartilhar suas sugestões, entre em
            contato! Estamos abertos a feedbacks para melhorar continuamente a
            plataforma.
          </p>
          <div className="flex justify-center gap-8">
            <div className="flex items-center gap-2 text-gray-800">
              <FaEnvelope size={24} className="text-blue-600" />
              <span className="font-semibold">E-mail:</span>
              <a
                href="mailto:contato@projeto.com"
                className="text-blue-600 hover:underline"
              >
                contato@projeto.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-800">
              <FaGithub size={24} className="text-blue-600" />
              <span className="font-semibold">GitHub:</span>
              <a
                href="https://github.com/repositorio-do-projeto"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                github.com/repositorio-do-projeto
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
