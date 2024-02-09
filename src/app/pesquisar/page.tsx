import Image from "next/image";
import Link from "next/link";

export default function Search() {
  return (
<main className="flex min-h-screen flex-col items-center justify-between p-8">
  <div className="w-full max-w-screen-lg mx-auto mb-8">




  <div className=" flex justify-center items-center mb-8">
  <div className="w-full">
    <label htmlFor="search" className="mb-4 text-gray-600 mb-2 block text-xl font-semibold">Escolha uma opção</label>
    <div className=" flex items-center flex-col md:flex-row">
    <div className="min-w-60 mb-4 md:mb-0 md:w-auto w-full ">
  <select className="w-full rounded border border-gray-300 py-2 px-2 md:px-4 focus:outline-none focus:border-blue-500">
    <option value="experimentos">Experimentos</option>
    <option value="demonstracoes">Demonstrações</option>
  </select>
</div>


      <div className="w-full flex flex-col md:flex-row mx-auto">
        <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 md:mb-0 md:ml-2">Buscar</button>
        <button className="ml-0 md:ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Resetar Filtros</button>
      </div>
    </div>
  </div>
</div>





    <label htmlFor="search" className="mb-4 text-gray-600 mb-2 block text-xl font-semibold">Filtros para Busca</label>


    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      {/* Local para Realização */}
      <div>
        <label className="text-gray-600 block mb-2">Local para Realização</label>

        <div className="flex flex-wrap">
          <div className="flex items-center mb-2">
            <input type="checkbox" id="lab" className="mr-2" />
            <label htmlFor="lab" className="mr-4">Laboratório</label>
          </div>

          <div className="flex items-center mb-2">
            <input type="checkbox" id="classroom" className="mr-2" />
            <label htmlFor="classroom" className="mr-4">Sala de Aula</label>
          </div>

          <div className="flex items-center mb-2">
            <input type="checkbox" id="outdoor" className="mr-2" />
            <label htmlFor="outdoor">Ambiente Aberto</label>
          </div>
        </div>
      </div>

      {/* Nível de Dificuldade */}
      <div>
        <label className="text-gray-600 block mb-2">Nível de dificuldade</label>
         <div className="flex flex-wrap">
          <div className="flex items-center mb-2">
            <input type="checkbox" id="lab" className="mr-2" />
            <label htmlFor="lab" className="mr-4">Simples</label>
          </div>

          <div className="flex items-center mb-2">
            <input type="checkbox" id="outdoor" className="mr-2" />
            <label htmlFor="outdoor">Difícil</label>
          </div>
        </div>
      </div>

      {/* Tema */}
      <div>
        <label className="text-gray-600 block mb-2">Tema</label>
        <div className="flex flex-wrap">
          <div className="flex items-center mb-2">
            <input type="checkbox" id="lab" className="mr-2" />
            <label htmlFor="lab" className="mr-4">Ciências</label>
          </div>

          <div className="flex items-center mb-2">
            <input type="checkbox" id="classroom" className="mr-2" />
            <label htmlFor="classroom" className="mr-4">Física</label>
          </div>

          <div className="flex items-center mb-2">
            <input type="checkbox" id="outdoor" className="mr-2" />
            <label htmlFor="outdoor">Biologia</label>
          </div>

          <div className="flex items-center mb-2">
            <input type="checkbox" id="outdoor" className="mr-2" />
            <label htmlFor="outdoor">Quimica</label>
          </div>
        </div>
      </div>

      {/* Público Alvo */}
      <div>
        <label className="text-gray-600 block mb-2">Público alvo</label>
        <div className="flex flex-wrap">
          <div className="flex items-center mb-2">
            <input type="checkbox" id="lab" className="mr-2" />
            <label htmlFor="lab" className="mr-4">Ensino fundamental</label>
          </div>

          <div className="flex items-center mb-2">
            <input type="checkbox" id="classroom" className="mr-2" />
            <label htmlFor="classroom" className="mr-4">Ensino medio</label>
          </div>

          <div className="flex items-center mb-2">
            <input type="checkbox" id="outdoor" className="mr-2" />
            <label htmlFor="outdoor">Ensino superior</label>
          </div>
        </div>
      </div>

      {/* Custo */}
      <div>
        <label className="text-gray-600 block mb-2">Custo para realização</label>
        <div className="flex flex-wrap">
          <div className="flex items-center mb-2">
            <input type="checkbox" id="lab" className="mr-2" />
            <label htmlFor="lab" className="mr-4">Baixo custo</label>
          </div>

          <div className="flex items-center mb-2">
            <input type="checkbox" id="outdoor" className="mr-2" />
            <label htmlFor="outdoor">Alto custo</label>
          </div>
        </div>
      </div>

      {/* Tipos de Experimentos */}
      <div>
        <label className="text-gray-600 block mb-2">Tipos de experimentos</label>
        <div className="flex flex-wrap">
          <div className="flex items-center mb-2">
            <input type="checkbox" id="lab" className="mr-2" />
            <label htmlFor="lab" className="mr-4">Práticos</label>
          </div>

          <div className="flex items-center mb-2">
            <input type="checkbox" id="classroom" className="mr-2" />
            <label htmlFor="classroom" className="mr-4">Virtuais</label>
          </div>

          <div className="flex items-center mb-2">
            <input type="checkbox" id="outdoor" className="mr-2" />
            <label htmlFor="outdoor">Teóricos</label>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section className="text-center">
    <p className="text-gray-600">Você ainda não pesquisou, use o filtro e busque!</p>
  </section>
</main>




  );
}
