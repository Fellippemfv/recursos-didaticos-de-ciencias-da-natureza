import img from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
     
     <div className="max-w-5xl mx-auto p-6 space-y-12">
      {/* Informações do Projeto */}
      <section className="bg-blue-100 p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Sobre o Projeto</h1>
        <p className="text-lg">
          Esta plataforma foi criada para facilitar o acesso a recursos didáticos interativos, como experimentos, jogos e dinâmicas, que auxiliem professores e estudantes. Nosso propósito é apoiar o aprendizado de forma lúdica e acessível, oferecendo um repositório de atividades educacionais práticas e inovadoras. Queremos contribuir para a educação, promovendo uma experiência de ensino mais enriquecedora e interativa.
        </p>
      </section>

      {/* Equipe */}
      <section>
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Nossa Equipe</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Membro da equipe 1 */}
          <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md text-center">
            <img
              src="https://st4.depositphotos.com/2704315/27896/v/1600/depositphotos_278960050-stock-illustration-work-planning-timeline-concept-vector.jpg"
              alt="Nome do Membro 1"
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Nome do Membro 1</h3>
            <p className="text-gray-600">Idealizador e Educador</p>
            <p className="mt-2 text-sm">
              Especialista em educação com foco no ensino lúdico e didático.
            </p>
          </div>
          {/* Membro da equipe 2 */}
          <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md text-center">
            <img
              src="https://st4.depositphotos.com/2704315/27896/v/1600/depositphotos_278960050-stock-illustration-work-planning-timeline-concept-vector.jpg"
              alt="Nome do Membro 2"
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Nome do Membro 2</h3>
            <p className="text-gray-600">Desenvolvedor Full Stack</p>
            <p className="mt-2 text-sm">
              Responsável pelo desenvolvimento da plataforma e pela experiência do usuário.
            </p>
          </div>
       
        </div>
      </section>

      {/* Contato e Feedback */}
      <section className="bg-blue-100 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Contato e Feedback</h2>
        <p className="text-lg mb-4 text-center">
          Entre em contato conosco ou envie suas sugestões para melhorar a plataforma!
        </p>
        <ul className="list-disc list-inside text-center space-y-2">
          <li>
            <span className="font-semibold">E-mail:</span> contato@plataformaeducacional.com
          </li>
          <li>
            <span className="font-semibold">GitHub:</span>{' '}
            <a
              href="https://github.com/repositorio-do-projeto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              github.com/repositorio-do-projeto
            </a>
          </li>
        </ul>
      </section>
    </div>
    </main>
  );
}
