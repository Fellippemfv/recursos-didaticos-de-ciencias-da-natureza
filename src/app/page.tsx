import Image from "next/image";
import { FaSearch, FaUpload } from 'react-icons/fa';
import Link from 'next/link';
import imageHomePage from '../../public/exp-home-page.png';

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-4">
      {/* Sobreposição branca semitransparente */}
      <div
        className="absolute inset-0 bg-white opacity-30"
        style={{
          backgroundImage: `url(${imageHomePage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1
        }}
      ></div>
      <section className="mb-16 relative flex flex-col items-center text-center max-w-4xl mx-auto bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-blue-700 mb-6">
          Bem-vindo(a) ao Portal de Experimentos!
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-justify">
          Explore e descubra uma vasta gama de experimentos de ciências, biologia, física e química. Todos os experimentos são testados por profissionais capacitados para garantir uma experiência educativa segura e divertida.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-600">Procure por experimentos</p>
            <Link target="_blank" href="/pesquisar">
              <div className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 cursor-pointer">
                <FaSearch className="mr-2" />
                Pesquisar Experimentos
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center mr-4">
            <p className="mb-2 text-gray-600">Envie seus próprios experimentos</p>
            <Link target="_blank" href="/enviar-experimento">
              <div className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200 cursor-pointer">
                <FaUpload className="mr-2" />
                Enviar Experimentos
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
