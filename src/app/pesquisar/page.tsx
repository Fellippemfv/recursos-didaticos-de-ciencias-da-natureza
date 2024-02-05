import Image from "next/image";
import Link from "next/link";

export default function Search() {
  return (
<main className="flex min-h-screen flex-col items-center justify-between p-8">
  <div className="w-full max-w-lg mx-auto mb-8">
    <label htmlFor="search" className="text-gray-600 mb-2 block">Filtro de Experimentos</label>
    <div className="flex items-center mb-4">
      <input
        type="text"
        id="search"
        placeholder="Digite aqui..."
        className="w-full border rounded-md p-2 mr-2 focus:outline-none focus:border-blue-500"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Buscar</button>
    </div>

    <div className="mb-4">
      <label className="text-gray-600 block mb-2">Local para Realização</label>
      <div className="flex">
        <input type="checkbox" id="lab" className="mr-2" />
        <label htmlFor="lab" className="mr-4">Laboratório</label>

        <input type="checkbox" id="classroom" className="mr-2" />
        <label htmlFor="classroom" className="mr-4">Sala de Aula</label>

        <input type="checkbox" id="outdoor" className="mr-2" />
        <label htmlFor="outdoor">Ambiente Aberto</label>
      </div>
    </div>

    <div className="mb-4">
      <label className="text-gray-600 block mb-2">Nível de dificuldade</label>
      <div className="flex">
        <input type="checkbox" id="simple" className="mr-2" />
        <label htmlFor="simple" className="mr-4">Simples</label>

        <input type="checkbox" id="medium" className="mr-2" />
        <label htmlFor="medium" className="mr-4">Médio</label>

        <input type="checkbox" id="hard" className="mr-2" />
        <label htmlFor="hard">Difícil</label>
      </div>
    </div>


    <div>
      <label className="text-gray-600 block mb-2">Tema</label>
      <div className="flex">
        <input type="checkbox" id="science" className="mr-2" />
        <label htmlFor="science" className="mr-4">Ciências</label>

        <input type="checkbox" id="physics" className="mr-2" />
        <label htmlFor="physics" className="mr-4">Física</label>

        <input type="checkbox" id="biology" className="mr-2" />
        <label htmlFor="biology" className="mr-4">Biologia</label>

        <input type="checkbox" id="chemistry" className="mr-2" />
        <label htmlFor="chemistry">Química</label>
      </div>
    </div>


    <div>
      <label className="text-gray-600 block mb-2">Público alvo</label>
      <div className="flex">
        <input type="checkbox" id="science" className="mr-2" />
        <label htmlFor="science" className="mr-4">Ensino fundamental</label>

        <input type="checkbox" id="physics" className="mr-2" />
        <label htmlFor="physics" className="mr-4">Ensino medio</label>

        <input type="checkbox" id="biology" className="mr-2" />
        <label htmlFor="biology" className="mr-4">Ensino superior</label>

      </div>
    </div>


    <div>
      <label className="text-gray-600 block mb-2">Custo para realização</label>
      <div className="flex">
        <input type="checkbox" id="science" className="mr-2" />
        <label htmlFor="science" className="mr-4">Baixo custo</label>

        <input type="checkbox" id="physics" className="mr-2" />
        <label htmlFor="physics" className="mr-4">Médio custo</label>

        <input type="checkbox" id="biology" className="mr-2" />
        <label htmlFor="biology" className="mr-4">Alto custo</label>

       
      </div>
    </div>

    <div>
      <label className="text-gray-600 block mb-2">Tipos de experimentos</label>
      <div className="flex">
        <input type="checkbox" id="science" className="mr-2" />
        <label htmlFor="science" className="mr-4">Práticos</label>

        <input type="checkbox" id="physics" className="mr-2" />
        <label htmlFor="physics" className="mr-4">Virtuais </label>

        <input type="checkbox" id="biology" className="mr-2" />
        <label htmlFor="biology" className="mr-4">Teóricos</label>

    
      </div>
    </div>



  </div>

  <section className="text-center">
    <p className="text-gray-600">Você ainda não pesquisou, use o filtro e busque!</p>
  </section>
</main>


  );
}
