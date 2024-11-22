import img from "next/image";
import Link from "next/link";
import { FaEnvelope, FaGithub } from "react-icons/fa";

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="max-w-6xl mx-auto px-8 space-y-16">
        {/* Seção Sobre o Projeto */}
        <section className="bg-white p-10 rounded-lg border border-gray-300 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 order-2 md:order-1">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">
              Sobre o Projeto
            </h1>
            <p className="text-lg text-gray-800 text-justify leading-relaxed">
              Este site foi desenvolvido para oferecer recursos didáticos
              voltados ao ensino de Ciências da Natureza, incluindo Física,
              Química e Biologia. A plataforma organiza atividades interativas,
              como dinâmicas, experimentos, jogos educativos, modelos físicos e
              aplicativos educacionais, disponibilizando-as de forma gratuita. O
              objetivo é proporcionar aos professores ferramentas que tornem as
              aulas mais dinâmicas, conectando teoria e prática de maneira
              envolvente e significativa. Todas as atividades possuem as devidas
              referências na seção apropriada. Ressalta-se que este projeto é
              exclusivamente educacional, sem fins lucrativos.
            </p>
          </div>
          <div className="md:w-1/2 order-1 md:order-2">
            <img
              src="https://nova-escola-producao.s3.amazonaws.com/pdPYYjAXjAraVTRCQ3mpyTQG2S8vCyrQPpqer6mFRPDxgmM27t7ErSr5eTkp/conexaoeducativa04jun20box002-aprendizagemprojetos-c1-estudiokiwi-texto.jpg"
              alt="Imagem do Projeto"
              className="rounded-lg shadow-md w-full object-cover"
            />
          </div>
        </section>

        {/* Seção História do Projeto */}
        <section className="bg-white p-10 rounded-lg border border-gray-300 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img
              src="https://educacaopublica.cecierj.edu.br/092020/cd33feace8fae56753599be1d0531374.jpg"
              alt="História do Projeto"
              className="rounded-lg shadow-md w-full object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
              História do Projeto
            </h2>
            <p className="text-lg text-gray-800 text-justify leading-relaxed">
              Este projeto surgiu como uma solução prática para as dificuldades
              enfrentadas por professores ao planejar aulas utilizando recursos
              didáticos. Inicialmente, foi uma iniciativa pessoal, motivada pela
              necessidade de integrar atividades interativas ao ensino. Ao longo
              do tempo, evoluiu para uma plataforma abrangente, organizada e
              acessível, que visa otimizar o tempo de planejamento e facilitar a
              implementação de práticas pedagógicas inovadoras. Professores
              interessados podem contribuir com atividades por meio de e-mail ou
              GitHub.
            </p>
          </div>
        </section>

        {/* Seção Colaborador */}
        <section className="bg-white p-10 rounded-lg border border-gray-300 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 order-2 md:order-1">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
              Professor/Desenvolvedor
            </h2>
            <p className="text-lg text-gray-800 text-justify leading-relaxed">
              Sou Fellippe, professor de Ciências e idealizador deste projeto.
              Com um forte interesse em pedagogia digital, desenvolvi esta
              plataforma para centralizar e organizar recursos educacionais que
              facilitem o ensino de Ciências da Natureza. O projeto reflete
              minha dedicação em promover uma educação mais acessível e
              envolvente. Para saber mais sobre meu trabalho, visite meu
              currículo Lattes:
              <a
                href="https://lattes.cnpq.br/6921925564951567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                https://lattes.cnpq.br/6921925564951567
              </a>
            </p>
          </div>
          <div className="md:w-1/2 order-1 md:order-2">
            <img
              src="https://avatars.githubusercontent.com/u/67835741?v=4"
              alt="Professor Desenvolvedor"
              className="rounded-full shadow-md w-full max-w-[300px] h-auto object-cover mx-auto"
            />
          </div>
        </section>

        {/* Seção Contato */}
        <section className="bg-white p-10 rounded-lg border border-gray-300 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img
              src="https://coodesh.com/blog/wp-content/uploads/2022/06/cultura-de-feedback-scaled.jpg"
              alt="Contato e Feedback"
              className="rounded-lg shadow-md w-full object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">
              Contato e Feedback
            </h2>
            <p className="text-lg text-gray-800 text-justify leading-relaxed mb-4">
              Para contato profissional ou em caso de dúvidas, entre em contato
              por e-mail.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-gray-800">
                <FaEnvelope size={24} className="text-blue-600 flex-shrink-0" />
                <span className="font-semibold">E-mail:</span>
                <a
                  href="mailto:prof.fellippe@gmail.com"
                  className="text-blue-600 hover:underline text-sm"
                >
                  prof.fellippe@gmail.com
                </a>
              </div>
            </div>
            <p className="text-lg text-gray-800 text-justify leading-relaxed mb-4 mt-4">
              Caso queira saber mais sobre os detalhes da plataforma ou para
              envio de atividades, acesse o GitHub do projeto. Estamos sempre
              abertos a melhorias e novas ideias para enriquecer a plataforma.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-gray-800">
                <FaGithub size={24} className="text-blue-600 flex-shrink-0" />
                <span className="font-semibold">GitHub:</span>
                <a
                  href="https://github.com/Fellippemfv/recursos-didaticos-de-ciencias-da-natureza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  https://github.com/Fellippemfv/recursos-didaticos-de-ciencias-da-natureza
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
