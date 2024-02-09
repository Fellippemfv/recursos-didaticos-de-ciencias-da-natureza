"use client"
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";



export default function Search() {

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (option: any) => {
    setSelectedOption(option);
  };

  

  return (
<main className="flex min-h-screen flex-col items-center justify-between p-4">
  <div className="w-full max-w-screen-lg mx-auto mb-8">




  <div className=" flex justify-center items-center mb-8">
  <div className="w-full">
    <label htmlFor="search" className="mb-4 text-gray-600 mb-2 block text-xl font-semibold">Escolha uma opção</label>
    <div className=" flex items-center flex-col md:flex-row">
    <div className="min-w-60 mb-4 md:mb-0 md:w-auto w-full ">

     <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[180px] w-full">
          <SelectValue placeholder="Selecione uma opção" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Opções</SelectLabel>
            <SelectItem className="cursor-pointer" value="apple">Experimentos</SelectItem>
            <SelectItem className="cursor-pointer" value="banana">Demonstrações</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
</div>


      <div className="w-full flex flex-col md:flex-row mx-auto">
      <button 
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2 md:mb-0 md:ml-2 ${selectedOption ? '' : 'opacity-50 cursor-not-allowed'}`} 
        disabled={!selectedOption}
      >
        <HiOutlineSearch className="inline mr-1" />
        Buscar
      </button>
        <AlertDialog>
  <AlertDialogTrigger className="ml-0 md:ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Resetar Filtros</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
      <AlertDialogDescription>
        Confirmando você vai tirar todos os filtros aplicados
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction className="">Confirmar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

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
          <Checkbox className="mr-2" id="terms1" />
            <label htmlFor="lab" className="mr-4">Laboratório</label>
          </div>

          <div className="flex items-center mb-2">
          <Checkbox className="mr-2" id="terms2" />
            <label htmlFor="classroom" className="mr-4">Sala de Aula</label>
          </div>

          <div className="flex items-center mb-2">
          <Checkbox className="mr-2" id="terms3" />
            <label htmlFor="outdoor">Ambiente Aberto</label>
          </div>
        </div>
      </div>

      {/* Nível de Dificuldade */}
      <div>
        <label className="text-gray-600 block mb-2">Nível de dificuldade</label>
         <div className="flex flex-wrap">
          <div className="flex items-center mb-2">
          <Checkbox className="mr-2" id="terms4" />
            <label htmlFor="lab" className="mr-4">Simples</label>
          </div>

          <div className="flex items-center mb-2">
          <Checkbox className="mr-2" id="terms5" />
            <label htmlFor="outdoor">Difícil</label>
          </div>
        </div>
      </div>

      {/* Tema */}
      <div>
        <label className="text-gray-600 block mb-2">Tema</label>
        <div className="flex flex-wrap">
          <div className="flex items-center mb-2">
          <Checkbox className="mr-2" id="terms6" />
            <label htmlFor="lab" className="mr-4">Ciências</label>
          </div>

          <div className="flex items-center mb-2">
          <Checkbox className="mr-2" id="terms7" />
            <label htmlFor="classroom" className="mr-4">Física</label>
          </div>

          <div className="flex items-center mb-2">
          <Checkbox className="mr-2" id="terms8" />
            <label htmlFor="outdoor">Biologia</label>
          </div>

          <div className="flex items-center mb-2">
          <Checkbox className="mr-2" id="terms9" />
            <label htmlFor="outdoor">Quimica</label>
          </div>
        </div>
      </div>

      {/* Público Alvo */}
      <div>
        <label className="text-gray-600 block mb-2">Público alvo</label>
        <div className="flex flex-wrap">
          <div className="flex items-center mb-2">
          <Checkbox className="mr-2" id="terms10" />
            <label htmlFor="lab" className="mr-4">Ensino fundamental</label>
          </div>

          <div className="flex items-center mb-2">
          <Checkbox className="mr-2" id="terms11" />
            <label htmlFor="classroom" className="mr-4">Ensino medio</label>
          </div>

          <div className="flex items-center mb-2">
          <Checkbox className="mr-2" id="terms12" />
            <label htmlFor="outdoor">Ensino superior</label>
          </div>
        </div>
      </div>

      {/* Custo */}
      <div>
        <label className="text-gray-600 block mb-2">Custo para realização</label>
        <div className="flex flex-wrap">
          <div className="flex items-center mb-2">
          <Checkbox className="mr-2" id="terms13" />
            <label htmlFor="lab" className="mr-4">Baixo custo</label>
          </div>

          <div className="flex items-center mb-2">
          <Checkbox className="mr-2" id="terms14" />
            <label htmlFor="outdoor">Alto custo</label>
          </div>
        </div>
      </div>

      {/* Tipos de Experimentos */}
      <div>
        <label className="text-gray-600 block mb-2">Tipos de experimentos</label>
        <div className="flex flex-wrap">
          <div className="flex items-center mb-2">
          <Checkbox className="mr-2" id="terms15" />
            <label htmlFor="lab" className="mr-4">Práticos</label>
          </div>

          <div className="flex items-center mb-2">
          <Checkbox className="mr-2" id="terms16" />
            <label htmlFor="classroom" className="mr-4">Virtuais</label>
          </div>

          <div className="flex items-center mb-2">
          <Checkbox className="mr-2" id="terms17" />
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
