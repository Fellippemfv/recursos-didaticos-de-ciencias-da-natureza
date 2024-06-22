"use client"

import React, { useState } from "react";
import experimentData from "../../app/api/data/experimentos.json";
import topicGeneralData from "../../app/api/data/experimentGeneralData.json";
import Link from "next/link"; // Importando o componente Link do Next.js
import { BiSearch } from "react-icons/bi";

import experimentTypes from "../../app/api/data/experimentTypes.json"
import difficulties from "../../app/api/data/difficulties.json"
import locationData from "../../app/api/data/location.json";



export default function Search() {
  const [selectedExperimentTypes, setSelectedExperimentTypes] = useState<Set<number>>(new Set());
  const [selectedDifficulties, setSelectedDifficulties] = useState<Set<number>>(new Set());
  const [selectedLocations, setSelectedLocations] = useState<Set<number>>(new Set());
  

  const [checkboxes, setCheckboxes] = useState<{ [key: string]: boolean }>({});
  const [selectedGeneralTopics, setSelectedGeneralTopics] = useState<Set<number>>(new Set());
  const [selectedSpecificTopics, setSelectedSpecificTopics] = useState<Set<string>>(new Set());
  const [filteredExperiments, setFilteredExperiments] = useState<any[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [previousFilters, setPreviousFilters] = useState<{
    general: Set<number>;
    specific: Set<string>;
    experimentTypes: Set<number>;
    difficulties: Set<number>;
    locations: Set<number>;
  }>({
    general: new Set(),
    specific: new Set(),
    experimentTypes: new Set(),
    difficulties: new Set(),
    locations: new Set(),
  });
  
  const [appliedFilters, setAppliedFilters] = useState<{
    general: number[];
    specific: string[];
    experimentTypes: number[];
    difficulties: number[];
    locations: number[];
  }>({
    general: [],
    specific: [],
    experimentTypes: [],
    difficulties: [],
    locations: [],
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
  
  const handleDifficultyChange = (id: number) => {
    const updatedDifficulties = new Set(selectedDifficulties);
    if (updatedDifficulties.has(id)) {
      updatedDifficulties.delete(id);
    } else {
      updatedDifficulties.add(id);
    }
    setSelectedDifficulties(updatedDifficulties);
    setStatusMessage("Filtros alterados. Clique em 'Filtrar' para atualizar a lista.");
  };
  
  const handleLocationChange = (id: number) => {
    const updatedLocations = new Set(selectedLocations);
    if (updatedLocations.has(id)) {
      updatedLocations.delete(id);
    } else {
      updatedLocations.add(id);
    }
    setSelectedLocations(updatedLocations);
    setStatusMessage("Filtros alterados. Clique em 'Filtrar' para atualizar a lista.");
  };
  
  

  const filterExperiments = () => {
    console.log("Filtrando experimentos...");
  
    if (
      selectedGeneralTopics.size === 0 &&
      selectedSpecificTopics.size === 0 &&
      selectedExperimentTypes.size === 0 &&
      selectedDifficulties.size === 0 &&
      selectedLocations.size === 0
    ) {
      setStatusMessage("Nenhum filtro aplicado. Por favor, selecione um filtro.");
      return;
    }
  
    console.log("Filtros aplicados:");
    console.log("Gerais:", selectedGeneralTopics);
    console.log("Específicos:", selectedSpecificTopics);
    console.log("Tipos de Experimento:", selectedExperimentTypes);
    console.log("Dificuldades:", selectedDifficulties);
    console.log("Localizações:", selectedLocations);
  
    if (
      areFiltersSame(previousFilters.general, selectedGeneralTopics) &&
      areFiltersSame(previousFilters.specific, selectedSpecificTopics) &&
      areFiltersSame(previousFilters.experimentTypes, selectedExperimentTypes) &&
      areFiltersSame(previousFilters.difficulties, selectedDifficulties) &&
      areFiltersSame(previousFilters.locations, selectedLocations)
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
  
      const matchesDifficulty =
        selectedDifficulties.size === 0 ||
        selectedDifficulties.has(experiment.difficulty.id);
  
      const matchesLocation =
        selectedLocations.size === 0 ||
        experiment.topicLocation.some((location) =>
          selectedLocations.has(location.id)
        );
  
      console.log(
        "Matches:",
        matchesGeneralTopic,
        matchesExperimentType,
        matchesDifficulty,
        matchesLocation
      );
  
      return (
        matchesGeneralTopic &&
        matchesExperimentType &&
        matchesDifficulty &&
        matchesLocation
      );
    });
  
    console.log("Experimentos filtrados:", filtered);
    setFilteredExperiments(filtered);
  
    setPreviousFilters({
      general: new Set(selectedGeneralTopics),
      specific: new Set(selectedSpecificTopics),
      experimentTypes: new Set(selectedExperimentTypes),
      difficulties: new Set(selectedDifficulties),
      locations: new Set(selectedLocations),
    });
  
    setAppliedFilters({
      general: Array.from(selectedGeneralTopics),
      specific: Array.from(selectedSpecificTopics),
      experimentTypes: Array.from(selectedExperimentTypes),
      difficulties: Array.from(selectedDifficulties),
      locations: Array.from(selectedLocations),
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
  
  

  return (
<main className="flex min-h-screen flex-col items-center justify-between sm:m-4">
  <div className="p-6 bg-white rounded-lg shadow-md w-full">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Filtros</h2>
    <h3 className="text-xl font-semibold mb-4 text-gray-700">Temas de experimentos</h3>
    <p className="text-base text-gray-600 mb-6">
      Filtre pelos temas gerais de Física, Química e Biologia e depois mergulhe em temas específicos dentro de cada área.
    </p>

    <div className="flex flex-wrap -mx-2">
      {topicGeneralData.map((generalTopic) => (
        <div key={generalTopic.id} className="w-full sm:w-1/3 lg:w-1/3 px-2 mb-6">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`general-${generalTopic.id}`}
              onChange={() => handleGeneralTopicChange(generalTopic.id)}
              checked={checkboxes[generalTopic.id] || false}
              className="mr-2"
            />
            <label htmlFor={`general-${generalTopic.id}`} className="text-sm lg:text-base text-gray-800">
              {generalTopic.title}
            </label>
          </div>
          <div className="ml-4">
            {generalTopic.topicSpecific.map((specificTopic) => (
              <div key={specificTopic.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`specific-${specificTopic.id}`}
                  onChange={() => handleSpecificTopicChange(generalTopic.id, specificTopic.id)}
                  checked={checkboxes[`${generalTopic.id}-${specificTopic.id}`] || false}
                  disabled={!selectedGeneralTopics.has(generalTopic.id)}
                  className="mr-2"
                />
                <label
                  htmlFor={`specific-${specificTopic.id}`}
                  className={`text-sm lg:text-xs ${!selectedGeneralTopics.has(generalTopic.id) ? 'text-gray-400' : 'text-gray-800'}`}
                >
                  {specificTopic.title}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="w-full sm:w-1/3 lg:w-1/3 px-2 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Tipos de Experimento</h3>
        <p className="text-base text-gray-600 mb-6">
          Escolha entre diversos tipos de experimentos.
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

      <div className="w-full sm:w-1/3 lg:w-1/3 px-2 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Dificuldades</h3>
        <p className="text-base text-gray-600 mb-6">
          Encontre experimentos que correspondam ao seu nível de habilidade.
        </p>
        {difficulties.map((difficulty) => (
          <div key={difficulty.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`difficulty-${difficulty.id}`}
              onChange={() => handleDifficultyChange(difficulty.id)}
              checked={selectedDifficulties.has(difficulty.id)}
              className="mr-2"
            />
            <label htmlFor={`difficulty-${difficulty.id}`} className="text-sm lg:text-base text-gray-800">
              {difficulty.title}
            </label>
          </div>
        ))}
      </div>

      <div className="w-full sm:w-1/3 lg:w-1/3 px-2 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Localizações</h3>
        <p className="text-base text-gray-600 mb-6">
          Filtre os experimentos com base em suas localizações.
        </p>
        {locationData.map((location) => (
          <div key={location.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`location-${location.id}`}
              onChange={() => handleLocationChange(location.id)}
              checked={selectedLocations.has(location.id)}
              className="mr-2"
            />
            <label htmlFor={`location-${location.id}`} className="text-sm lg:text-base text-gray-800">
              {location.title}
            </label>
          </div>
        ))}
      </div>
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
      {appliedFilters.general.length > 0 || appliedFilters.specific.length > 0 || appliedFilters.experimentTypes.length > 0 || appliedFilters.difficulties.length > 0 || appliedFilters.locations.length > 0 ? (
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
          {appliedFilters.difficulties.map((filterId) => {
            const difficulty = difficulties.find((diff) => diff.id === filterId);
            return difficulty ? (
              <span
                key={difficulty.id}
                className="px-2 py-1 bg-red-200 text-red-800 rounded-lg text-sm mr-2 mb-2"
              >
                {difficulty.title}
              </span>
            ) : null;
          })}
          {appliedFilters.locations.map((filterId) => {
            const location = locationData.find((loc) => loc.id === filterId);
            return location ? (
              <span
                key={location.id}
                className="px-2 py-1 bg-purple-200 text-purple-800 rounded-lg text-sm mr-2 mb-2"
              >
                {location.title}
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
