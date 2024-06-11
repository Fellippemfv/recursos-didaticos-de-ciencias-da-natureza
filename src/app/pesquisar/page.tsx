"use client";

import React, { useState } from "react";
import experimentData from "../.././app/api/data/experimentos.json";
import topicGeneralData from "../../app/api/data/experimentGeneralData.json";

export default function Search() {
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedGeneralTopics, setSelectedGeneralTopics] = useState(new Set());
  const [filteredExperiments, setFilteredExperiments] = useState([]);

  const handleGeneralTopicChange = (id) => {
    const updatedTopics = new Set(selectedGeneralTopics);
    if (updatedTopics.has(id)) {
      updatedTopics.delete(id);
    } else {
      updatedTopics.add(id);
    }
    setSelectedGeneralTopics(updatedTopics);
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [id]: !prevCheckboxes[id],
    }));
  };

  const handleSpecificTopicChange = (generalId, specificId) => {
    const key = `${generalId}-${specificId}`;
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [key]: !prevCheckboxes[key],
    }));
  };

  const filterExperiments = () => {
    const filtered = experimentData.filter((experiment) => {
      return Array.from(selectedGeneralTopics).some((generalTopicId) => {
        const generalTopic = topicGeneralData.find(
          (topic) => topic.id === generalTopicId
        );
        if (!generalTopic) return false;

        const isSelected = experiment.topicSpecific[generalTopic.slug];
        const specificTopics = generalTopic.topicSpecific.filter(
          (specificTopic) =>
            checkboxes[`${generalTopic.id}-${specificTopic.id}`]
        );

        return (
          isSelected &&
          (specificTopics.length === 0 ||
            specificTopics.some((specificTopic) =>
              experiment.topicSpecific[specificTopic.slug]
            ))
        );
      });
    });

    setFilteredExperiments(filtered);
  };

  const handleAccessExperiment = (slug) => {
    window.open(`/experimento/${slug}`, "_blank");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
     <div className="p-6 bg-white rounded-lg shadow-md w-full">
  <h2 className="text-2xl font-bold mb-4">Filtros</h2>
  <div className="flex flex-wrap -mx-2">
    {/* Tema */}
    <div className="w-full flex flex-col sm:flex-row lg:flex-row items-start">
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
        </div>
      ))}
    </div>

    {/* Tópicos Específicos */}
    <div className="w-full flex flex-col sm:flex-row lg:flex-row items-start">
      {Array.from(selectedGeneralTopics).map((generalTopicId) => {
        const generalTopic = topicGeneralData.find(
          (topic) => topic.id === generalTopicId
        );
        if (!generalTopic) return null;
        return (
          <div key={generalTopic.id} className="w-full sm:w-1/3 lg:w-1/3 px-2 mb-4">
            <h3 className="text-xs font-semibold mb-2">
              {generalTopic.title} (opcional)
            </h3>
            {generalTopic.topicSpecific.map((specificTopic) => (
              <div key={specificTopic.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`specific-${specificTopic.id}`}
                  onChange={() =>
                    handleSpecificTopicChange(generalTopic.id, specificTopic.id)
                  }
                  checked={checkboxes[`${generalTopic.id}-${specificTopic.id}`] || false}
                  className="mr-2"
                />
                <label
                  htmlFor={`specific-${specificTopic.id}`}
                  className="text-sm lg:text-xs"
                >
                  {specificTopic.title}
                </label>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  </div>

  {/* Botão para filtrar */}
  <div className="flex justify-center mt-6">
    <button
      onClick={filterExperiments}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Filtrar
    </button>
  </div>
</div>


     {/* Resultados da pesquisa */}
<section className="w-full mt-8">
  <h2 className="text-2xl font-bold mb-4">Experimentos Filtrados</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {filteredExperiments.map((experiment) => (
      <div key={experiment.id} className="border rounded-lg shadow-md p-4 bg-white">
        <h3 className="text-lg font-semibold mb-2">{experiment.title}</h3>
        <img
          src={experiment.imagePreview}
          alt={experiment.title}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <button
          onClick={() => handleAccessExperiment(experiment.slug)}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Acessar
        </button>
      </div>
    ))}
  </div>
</section>


    </main>
  );
}
