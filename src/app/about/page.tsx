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
          <p className="text-lg text-gray-800 text-justify leading-relaxed first-line:ml-8">
            Este site foi desenvolvido para fornecer recursos didáticos para o
            ensino de Ciências da Natureza (Física, Química e Biologia). A
            plataforma organizou e centralizou atividades interativas, como
            Dinâmicas (Participação em dupla ou em grupo), Experimentos
            (Demonstrativos e Investigativos), Jogos educativos (Tabuleiros e
            Lúdicos), Modelos físicos (Maquetes e Protótipos) e Aplicativos
            Educativos (Apps e Sites Interativos) e o disponibiliza de forma
            gratuita. O objetivo é fornecer um local para que o professor de
            forma rápida consiga escolher alguma atividade diferente do comum
            para realizar em sala de aula, deste modo, promovendo uma educação
            mais envolvente, onde a teoria se conecta com a prática de forma
            divertida e significativa. As atividade e recursos demonstrados
            foram pegos de diversas fontes: Internet, livros, artigos. Todos os
            créditos foram indicados na aba "Referências" na página especifica
            da atividade. Este projeto NÃO TEM CARÁTER COMERCIAL.
          </p>
        </section>

        {/* Seção História do Projeto */}
        <section className="bg-white p-10 rounded-lg border border-gray-300">
          <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
            A História por Trás do Projeto
          </h2>
          <div className="flex justify-center mb-6">
            <img
              src="https://educacaopublica.cecierj.edu.br/092020/cd33feace8fae56753599be1d0531374.jpg"
              alt="Imagem do Projeto"
              className="rounded-lg shadow-md w-40 h-40 object-cover"
            />
          </div>
          <p className="text-lg text-gray-800 text-justify leading-relaxed">
            O projeto nasceu como parte de uma pesquisa sobre experimentos para
            serem realizados na escola que trabalhava. Durante a pesquisa,
            percebi a necessidade de ferramentas que incentivem a aprendizagem
            ativa e tornem o ensino mais envolvente para os estudantes.
            Entretanto, percebi que as atividades que fomentam o aprendizado vão
            além dos experimentos, elas abrangem todo um conjunto de recursos
            didáticos. Além disso, reparei que durante o planejamento das aulas
            apenas a procura e organização dos recursos didáticos e das
            atividades demoravam muito tempo pois estão presentes em diversas
            fontes e a linguagem muitas vezes era técnica e sem filtros para
            busca, o que dificultava muito. Como forma de resolver este problema
            de organização e tempo, surgiu esta plataforma para que qualquer
            professor consiga de forma rápida e eficiente selecionar atividades
            e recursos didáticos para serem utilizados em sua respectiva unidade
            de ensino. E se quiser ele pode participar enviando sua proposta,
            seja por email ou pelo github.
          </p>
        </section>

        {/* Seção Colaborador */}
        <section className="bg-white p-10 rounded-lg border border-gray-300">
          <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
            Professor/Desenvolvedor
          </h2>
          <div className="flex justify-center mb-6">
            <img
              src="https://avatars.githubusercontent.com/u/67835741?v=4"
              alt="Foto do Colaborador"
              className="rounded-full shadow-md w-40 h-40 object-cover"
            />
          </div>
          <p className="text-lg text-gray-800 text-justify leading-relaxed">
            Eu sou o Fellippe, Professor de ciências e desenvolvedor deste
            projeto, e tenho a missão de proporcionar ferramentas educacionais
            de alta qualidade para tornar o aprendizado de Ciências mais
            acessível e envolvente. Com um forte interesse por educação e
            pedagogia digital, criei este site como uma extensão, com o
            propósito organizar e centralizar atividades e recursos didáticos
            referente a ciências da natureza. Você pode me contrar no lattes:
            https://lattes.cnpq.br/6921925564951567
          </p>
        </section>

        {/* Seção Contato */}
        <section className="bg-white p-10 rounded-lg border border-gray-300">
          <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
            Contato e Feedback
          </h2>
          <p className="text-lg text-center text-gray-800 mb-6">
            Caso tenha dúvidas ou queira compartilhar suas sugestões, entre em
            contato por email, estamos abertos a feedbacks para melhorar
            continuamente a plataforma! Caso queria enviar sua proposta de
            atividade ou que o recurso didático desenvolvido por você seja
            exibido neste site, você pode clicar no link do github abaixo e ver
            as etapas para enviar.
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
