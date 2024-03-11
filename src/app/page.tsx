import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Seção 1 */}
      <div className="flex flex-col items-center pt-12 pb-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 max-w-6xl w-full">
          <div className="flex flex-col space-y-4 lg:w-1/2 w-full">
            <h1 className="text-5xl font-bold">
              Desbrave o mundo dos experimentos: fácil, dinâmico e educativo!
            </h1>
            <p className="text-gray-600 text-lg">
              Procure experimentos de ciências, biologia, física ou química para
              relização em sala de aula ou no laboratório.
            </p>
            <div className="flex flex-col space-y-2">
              <Link href="/login">
                {/* <Button className="w-full lg:w-1/2">Get Your Headshots</Button> */}
              </Link>
              <p className="text-sm text-gray-500 italic">
                Todos os experimentos desta plataforma são testados por
                profissionais da área da educação capacitados.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
            <img
              src="https://www.getheadshots.ai/_next/static/media/hero.f617e1de.png"
              alt="AI Headshot Illustration"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Seção 2 */}
      <section className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Seção 2</h1>
        <p className="text-gray-600">Conteúdo da segunda seção vai aqui.</p>
      </section>

      {/* Seção 3 */}
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Seção 3</h1>
        <p className="text-gray-600">Conteúdo da terceira seção vai aqui.</p>
      </section>
    </main>
  );
}
