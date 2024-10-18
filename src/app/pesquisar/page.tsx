"use client"

import React, { useState } from "react";
import experimentData from "../../app/api/data/experimentos.json";
import topicGeneralData from "../../app/api/data/experimentGeneralData.json";
import Link from "next/link"; // Importando o componente Link do Next.js
import { BiSearch } from "react-icons/bi";

import experimentTypes from "../../app/api/data/experimentTypes.json"
import { RiArrowRightSLine } from "react-icons/ri";

export default function Search() {
  const [selectedExperimentTypes, setSelectedExperimentTypes] = useState<Set<number>>(new Set());
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({});
  const [selectedGeneralTopics, setSelectedGeneralTopics] = useState<Set<number>>(new Set());
  const [selectedSpecificTopics, setSelectedSpecificTopics] = useState<Set<string>>(new Set());
  const [filteredExperiments, setFilteredExperiments] = useState<any[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [previousFilters, setPreviousFilters] = useState<{
    general: Set<number>;
    specific: Set<string>;
    experimentTypes: Set<number>;
  }>({
    general: new Set(),
    specific: new Set(),
    experimentTypes: new Set()
  });
  
  const [appliedFilters, setAppliedFilters] = useState<{
    general: number[];
    specific: string[];
    experimentTypes: number[];
  }>({
    general: [],
    specific: [],
    experimentTypes: [],
  });

  interface SpecificTopic {
    id: number;
    title: string;
    // Adicione outras propriedades conforme necessário
  }
  
  interface GeneralTopic {
    id: number;
    title: string;
    topicSpecific: SpecificTopic[]; // Definindo a propriedade topicSpecific
    // Adicione outras propriedades conforme necessário
  }

  const handleGeneralTopicChange = (id: number) => {
    const updatedTopics = new Set(selectedGeneralTopics);
    const updatedSpecificTopics = new Set(selectedSpecificTopics);

    if (updatedTopics.has(id)) {
      // Remove o tópico geral selecionado
      updatedTopics.delete(id);
      // Remove todos os tópicos específicos associados ao tópico geral desmarcado
      topicGeneralData
        .find((topic) => topic.id === id)
        ?.topicSpecific.forEach((specific) => {
          const specificKey = `${id}-${specific.id}`;
          updatedSpecificTopics.delete(specificKey);
          // Desmarca o checkbox correspondente ao tópico específico
          setCheckboxes((prevCheckboxes) => ({
            ...prevCheckboxes,
            [specificKey]: false,
          }));
        });
    } else {
      updatedTopics.add(id);
    }

    setSelectedGeneralTopics(updatedTopics);
    setSelectedSpecificTopics(updatedSpecificTopics);
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [id]: !prevCheckboxes[id],
    }));
    setStatusMessage("Filtros alterados. Clique em 'Filtrar' para atualizar a lista.");
  };

  const handleSpecificTopicChange = (generalId: number, specificId: number) => {
    const key = `${generalId}-${specificId}`;
    const updatedSpecificTopics = new Set(selectedSpecificTopics);

    if (updatedSpecificTopics.has(key)) {
      updatedSpecificTopics.delete(key);
    } else {
      updatedSpecificTopics.add(key);
    }

    setSelectedSpecificTopics(updatedSpecificTopics);
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [key]: !prevCheckboxes[key],
    }));
    setStatusMessage("Filtros alterados. Clique em 'Filtrar' para atualizar a lista.");
  };

  const handleExperimentTypeChange = (id: number) => {
    const updatedTypes = new Set(selectedExperimentTypes);
    if (updatedTypes.has(id)) {
      updatedTypes.delete(id);
    } else {
      updatedTypes.add(id);
    }
    setSelectedExperimentTypes(updatedTypes);
    setStatusMessage("Filtros alterados. Clique em 'Filtrar' para atualizar a lista.");
  };

  const filterExperiments = () => {
    console.log("Filtrando experimentos...");
  
    if (
      selectedGeneralTopics.size === 0 &&
      selectedSpecificTopics.size === 0 &&
      selectedExperimentTypes.size === 0
    ) {
      setStatusMessage("Nenhum filtro aplicado. Por favor, selecione um filtro.");
      return;
    }
  
    console.log("Filtros aplicados:");
    console.log("Gerais:", selectedGeneralTopics);
    console.log("Específicos:", selectedSpecificTopics);
    console.log("Tipos de Experimento:", selectedExperimentTypes);
  
    if (
      areFiltersSame(previousFilters.general, selectedGeneralTopics) &&
      areFiltersSame(previousFilters.specific, selectedSpecificTopics) &&
      areFiltersSame(previousFilters.experimentTypes, selectedExperimentTypes)
    ) {
      setStatusMessage(
        "Você já aplicou esses filtros. Por favor, altere os filtros para uma nova pesquisa."
      );
      return;
    }
  
    const filtered = experimentData.filter((experiment) => {
      console.log("Verificando experimento:", experiment.title);
  
      const matchesGeneralTopic = selectedGeneralTopics.size === 0 || Array.from(selectedGeneralTopics).some(
        (generalTopicId) => {
          const generalTopic = topicGeneralData.find(
            (topic) => topic.id === generalTopicId
          );
          if (!generalTopic) return false;
  
          const isSelected =
            experiment.topicGeneral.some(
              (topic) => topic.slug === generalTopic.slug
            ) ||
            experiment.topicSpecific[generalTopic.slug as keyof typeof experiment.topicSpecific];
          if (!isSelected) return false;
  
          const specificTopics = generalTopic.topicSpecific.filter(
            (specificTopic) =>
              checkboxes[`${generalTopic.id}-${specificTopic.id}`]
          );
  
          return (
            isSelected &&
            (specificTopics.length === 0 ||
              specificTopics.some((specificTopic) =>
                experiment.topicSpecific[
                  generalTopic.slug as keyof typeof experiment.topicSpecific
                ]?.some((expSpecific) => expSpecific.slug === specificTopic.slug)
              ))
          );
        }
      );
  
      const matchesExperimentType =
        selectedExperimentTypes.size === 0 ||
        selectedExperimentTypes.has(experiment.experimentType.id);
  
    
  
      console.log(
        "Matches:",
        matchesGeneralTopic,
        matchesExperimentType,
      );
  
      return (
        matchesGeneralTopic &&
        matchesExperimentType
      );
    });
  
    console.log("Experimentos filtrados:", filtered);
    setFilteredExperiments(filtered);
  
    setPreviousFilters({
      general: new Set(selectedGeneralTopics),
      specific: new Set(selectedSpecificTopics),
      experimentTypes: new Set(selectedExperimentTypes),
  
    });
  
    setAppliedFilters({
      general: Array.from(selectedGeneralTopics),
      specific: Array.from(selectedSpecificTopics),
      experimentTypes: Array.from(selectedExperimentTypes),
    });
  
    setStatusMessage("Filtros aplicados com sucesso!");
  };
  
  const areFiltersSame = (prevFilters: Set<any>, currentFilters: Set<any>) => {
    if (prevFilters.size !== currentFilters.size) return false;
    
    // Converte os sets para arrays e compara os elementos
    const prevFiltersArray = Array.from(prevFilters);
    const currentFiltersArray = Array.from(currentFilters);
    
    for (let filter of currentFiltersArray) {
      if (!prevFilters.has(filter)) return false;
    }
    return true;
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeGeneralTopic, setActiveGeneralTopic] = useState<GeneralTopic | null>(null);

  const handleOpenModal = (generalTopic: GeneralTopic) => {
    setActiveGeneralTopic(generalTopic);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveGeneralTopic(null);
  };

  return (
<main className="flex min-h-screen flex-col items-center justify-between sm:m-4">
  <div className="p-6 bg-white rounded-lg shadow-md w-full">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Filtros de pesquisa</h2>
    <h3 className="text-xl font-semibold mb-4 text-gray-700">Temas dos recursos didáticos</h3>
    <p className="text-base text-gray-600 mb-6">
      Filtre pelos temas gerais de Física, Química e Biologia e depois mergulhe em temas específicos dentro de cada área.
    </p>

    {/* Exibir apenas os temas gerais */}
    {topicGeneralData.map((generalTopic) => (
  <div key={generalTopic.id} className="w-full px-2 mb-6">
    <div className="flex items-start mb-4 p-4 border rounded-lg shadow-md bg-white transition-transform hover:scale-105">
      <div className="flex flex-col flex-grow">
        <div className="flex items-center">
          <input
            type="checkbox"
            id={`general-${generalTopic.id}`}
            onChange={() => handleGeneralTopicChange(generalTopic.id)}
            checked={checkboxes[generalTopic.id] || false}
            className="mr-2"
          />
          <label htmlFor={`general-${generalTopic.id}`} className="text-lg font-semibold text-gray-800">
            {generalTopic.title}
          </label>
        </div>
        
        {/* Mensagem condicional */}
        {checkboxes[generalTopic.id] ? (
          <>
            {selectedSpecificTopics.size > 0 ? (
              <p className="text-xs text-green-600 mt-1">
                Tópico(s) selecionado(s): {Array.from(selectedSpecificTopics)
                  .map((specificKey) => {
                    const specificTopic = topicGeneralData
                      .find((topic) => topic.id === generalTopic.id)
                      ?.topicSpecific.find((specific) => `${generalTopic.id}-${specific.id}` === specificKey);
                    return specificTopic ? specificTopic.title : null;
                  })
                  .filter(Boolean) // Remove itens nulos
                  .join(", ")}
              </p>
            ) : (
              <p className="text-xs text-red-600 mt-1">
                Selecione pelo menos um tópico específico, caso contrário ele vai buscar todos!
              </p>
            )}
          </>
        ) : (
          <p className="text-xs text-gray-600 mt-1">
            Clique nesta caixinha para selecionar este tópico
          </p>
        )}
      </div>
      <button
        onClick={() => handleOpenModal(generalTopic)}
        disabled={!checkboxes[generalTopic.id]} // Desabilita se não estiver selecionado
        className={`ml-4 flex items-center justify-center px-3 py-1 text-white text-sm rounded-lg 
          ${checkboxes[generalTopic.id] ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
      >
        <RiArrowRightSLine className="mr-1" />
        Escolher temas específicos
      </button>
    </div>
  </div>
))}


      {/* Modal para selecionar temas específicos */}
      {isModalOpen && activeGeneralTopic && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50" onClick={handleCloseModal}>   {/* Fechar ao clicar fora */}
          <div className="fixed left-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto shadow-xl transition-transform transform translate-x-0" onClick={(e) => e.stopPropagation()}  >  {/* Impedir o clique dentro do modal de fechar */} 
            
{/* Título */}
<div className="mb-6">
  <h2 className="text-xl font-semibold text-center">
    Temas específicos de {activeGeneralTopic.title}
  </h2>
</div>

{/* Lista de temas específicos */}
<div className="flex flex-col overflow-y-auto max-h-[calc(100vh-200px)]"> {/* Ajuste a altura máxima conforme necessário */}
{activeGeneralTopic?.topicSpecific.map((specificTopic) => (
          <div key={specificTopic.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`specific-${specificTopic.id}`}
              onChange={() => handleSpecificTopicChange(activeGeneralTopic.id, specificTopic.id)}
              checked={checkboxes[`${activeGeneralTopic.id}-${specificTopic.id}`] || false}
              className="mr-2"
            />
            <label
              htmlFor={`specific-${specificTopic.id}`}
              className="text-sm text-gray-800"
            >
              {specificTopic.title}
            </label>
          </div>
        ))}
</div>

{/* Altura fantasma para empurrar o botão para baixo */}
<div className="h-24"></div>

{/* Botão Aplicar Filtro */}
<button
  onClick={handleCloseModal}
  className="fixed bottom-0 left-0 w-full bg-blue-600 text-white p-3 text-center"
>
  Aplicar Filtro
</button>


          </div>
        </div>
      )}

      {/* Experimentos */}
      <div className="w-full sm:w-1/3 lg:w-1/3 px-2 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Tipos de recursos didáticos</h3>
        <p className="text-base text-gray-600 mb-6">
          Escolha entre diversos tipos de recursos didáticos.
        </p>
        {experimentTypes.map((type) => (
          <div key={type.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`type-${type.id}`}
              onChange={() => handleExperimentTypeChange(type.id)}
              checked={selectedExperimentTypes.has(type.id)}
              className="mr-2"
            />
            <label htmlFor={`type-${type.id}`} className="text-sm lg:text-base text-gray-800">
              {type.title}
            </label>
          </div>
        ))}
      </div>

    <div className="flex justify-center mt-6">
      <button
        onClick={filterExperiments}
        className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <BiSearch className="text-white mr-2" />
        Filtrar experimentos
      </button>
    </div>
    {statusMessage && (
      <div className={`mt-4 text-center ${statusMessage.includes('sucesso') ? 'text-green-500' : 'text-red-500'}`}>
        {statusMessage}
      </div>
    )}
  </div>

  <section className="w-full mt-8">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Experimentos Filtrados</h2>
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="font-bold text-gray-700">Filtros atualmente aplicados:</span>
      {appliedFilters.general.length > 0 || appliedFilters.specific.length > 0 || appliedFilters.experimentTypes.length > 0 ? (
        <>
          {appliedFilters.general.map((filterId) => {
            const generalTopic = topicGeneralData.find((topic) => topic.id === filterId);
            return generalTopic ? (
              <span
                key={generalTopic.id}
                className="px-2 py-1 bg-blue-200 text-blue-800 rounded-lg text-sm mr-2 mb-2"
              >
                {generalTopic.title}
              </span>
            ) : null;
          })}
          {appliedFilters.specific.map((filterKey) => {
            const [generalId, specificId] = filterKey.split("-");
            const generalTopic = topicGeneralData.find((topic) => topic.id === parseInt(generalId));
            if (!generalTopic) return null;
            const specificTopic = generalTopic.topicSpecific.find((topic) => topic.id === parseInt(specificId));
            return specificTopic ? (
              <span
                key={filterKey}
                className="px-2 py-1 bg-green-200 text-green-800 rounded-lg text-sm mr-2 mb-2"
              >
                {`${generalTopic.title}: ${specificTopic.title}`}
              </span>
            ) : null;
          })}
          {appliedFilters.experimentTypes.map((filterId) => {
            const type = experimentTypes.find((type) => type.id === filterId);
            return type ? (
              <span
                key={type.id}
                className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded-lg text-sm mr-2 mb-2"
              >
                {type.title}
              </span>
            ) : null;
          })}
         
        </>
      ) : (
        <span className="text-sm text-gray-500">Nenhum filtro aplicado.</span>
      )}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredExperiments.map((experiment) => (
        <div key={experiment.id} className="border rounded-lg shadow-md p-4 bg-white">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">{experiment.title}</h3>
          <img
            src={experiment.imagePreview}
            alt={experiment.title}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <Link
            href={`/experimento/${experiment.slug}`}
            passHref
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center block"
            target="_blank"
          >
            Acessar
          </Link>
        </div>
      ))}
    </div>
  </section>
</main>


  );
}
