"use client"

import React, { useState } from "react";
import experimentData from "../../app/api/data/experimentos.json";
import topicGeneralData from "../../app/api/data/experimentGeneralData.json";
import Link from "next/link"; // Importando o componente Link do Next.js

export default function Search() {
  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({});
  const [selectedGeneralTopics, setSelectedGeneralTopics] = useState<Set<number>>(new Set());
  const [selectedSpecificTopics, setSelectedSpecificTopics] = useState<Set<string>>(new Set());
  const [filteredExperiments, setFilteredExperiments] = useState<any[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [previousFilters, setPreviousFilters] = useState<{ general: Set<number>; specific: Set<string> }>({
    general: new Set(),
    specific: new Set(),
  });
  const [appliedFilters, setAppliedFilters] = useState<{ general: number[]; specific: string[] }>({
    general: [],
    specific: [],
  });

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

  const filterExperiments = () => {
    if (selectedGeneralTopics.size === 0 && selectedSpecificTopics.size === 0) {
      setStatusMessage("Nenhum filtro aplicado. Por favor, selecione um filtro.");
      return;
    }

    if (areFiltersSame(previousFilters.general, selectedGeneralTopics) && areFiltersSame(previousFilters.specific, selectedSpecificTopics)) {
      setStatusMessage("Você já aplicou esses filtros. Por favor, altere os filtros para uma nova pesquisa.");
      return;
    }
    const filtered = experimentData.filter((experiment) => {
      return Array.from(selectedGeneralTopics).some((generalTopicId) => {
        const generalTopic = topicGeneralData.find((topic) => topic.id === generalTopicId);
        if (!generalTopic) return false;
    
        // Verifica se experiment.topicSpecific[generalTopic.slug] existe e não é undefined
        const isSelected = experiment.topicSpecific[generalTopic.slug as keyof typeof experiment.topicSpecific];
        if (!isSelected) return false;
    
        const specificTopics = generalTopic.topicSpecific.filter(
          (specificTopic) => checkboxes[`${generalTopic.id}-${specificTopic.id}`]
        );
    
        return (
          isSelected &&
          (specificTopics.length === 0 ||
            specificTopics.some((specificTopic) =>
              experiment.topicSpecific[generalTopic.slug as keyof typeof experiment.topicSpecific]?.some(
                (expSpecific) => expSpecific.slug === specificTopic.slug
              )
            ))
        );
      });
    });
    
    

    console.log("Filtered Experiments:", filtered);
    console.log("Selected General Topics:", selectedGeneralTopics);
    console.log("Selected Specific Topics:", selectedSpecificTopics);

    setFilteredExperiments(filtered);
    setPreviousFilters({ general: new Set(selectedGeneralTopics), specific: new Set(selectedSpecificTopics) });
    setAppliedFilters({ general: Array.from(selectedGeneralTopics), specific: Array.from(selectedSpecificTopics) });
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
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="p-6 bg-white rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-bold mb-4">Filtros</h2>
        <div className="flex flex-wrap -mx-2">
          {topicGeneralData.map((generalTopic) => (
            <div key={generalTopic.id} className="w-full sm:w-1/3 lg:w-1/3 px-2 mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`general-${generalTopic.id}`}
                  onChange={() => handleGeneralTopicChange(generalTopic.id)}
                  checked={checkboxes[generalTopic.id] || false}
                  className="mr-2"
                />
                <label
                  htmlFor={`general-${generalTopic.id}`}
                  className="text-sm lg:text-xs"
                >
                  {generalTopic.title}
                </label>
              </div>
              <div className="ml-4">
                {generalTopic.topicSpecific.map((specificTopic) => (
                  <div key={specificTopic.id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`specific-${specificTopic.id}`}
                      onChange={() =>
                        handleSpecificTopicChange(generalTopic.id, specificTopic.id)
                      }
                      checked={checkboxes[`${generalTopic.id}-${specificTopic.id}`] || false}
                      disabled={!selectedGeneralTopics.has(generalTopic.id)}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`specific-${specificTopic.id}`}
                      className={`text-sm lg:text-xs ${!selectedGeneralTopics.has(generalTopic.id) ? 'text-gray-400' : ''}`}
                    >
                      {specificTopic.title}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={filterExperiments}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Filtrar
          </button>
        </div>
        {statusMessage && (
          <div className={`mt-4 text-center ${statusMessage.includes('sucesso') ? 'text-green-500' : 'text-red-500'}`}>
            {statusMessage}
          </div>
        )}
      </div>

      <section className="w-full mt-8">
        <h2 className="text-2xl font-bold mb-4">Experimentos Filtrados</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="font-bold">Filtros atualmente aplicados:</span>
          {appliedFilters.general.length > 0 || appliedFilters.specific.length > 0 ? (
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

  if (!generalTopic) return null; // Se generalTopic não existir, retorna null

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

            </>
          ) : (
            <span className="text-sm text-gray-500">Nenhum filtro aplicado.</span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredExperiments.map((experiment) => (
            <div key={experiment.id} className="border rounded-lg shadow-md p-4 bg-white">
              <h3 className="text-lg font-semibold mb-2">{experiment.title}</h3>
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
