"use client";

import React, { useState } from "react";
import experimentData from "../.././app/api/data/experimentos.json";

export default function Search() {
  const [checkboxes, setCheckboxes] = useState({
    Simples: false,
    Difícil: false,
    Ciências: false,
    Física: false,
    Biologia: false,
    Química: false,
    "Ensino fundamental": false,
    "Ensino médio": false,
    "Ensino superior": false,
    "Baixo custo": false,
    "Alto custo": false,
    Práticos: false,
    Virtuais: false,
    Teóricos: false,
  });

  const [filteredExperiments, setFilteredExperiments] = useState([]);

  const handleSelectChange2 = (id) => {
    // Atualizar o estado do checkbox clicado
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [id]: !prevCheckboxes[id],
    }));
  };

  const filterExperiments = () => {
    const filtered = experimentData.filter((experiment) => {
      return (
        (checkboxes.Simples && experiment.difficulty.title === "Simples") ||
        (checkboxes.Difícil && experiment.difficulty.title === "Difícil") ||
        (checkboxes.Ciências && experiment.topicSpecific.quimica) ||
        (checkboxes.Física && experiment.topicSpecific.fisica) ||
        (checkboxes.Biologia && experiment.topicSpecific.biologia) ||
        (checkboxes.Química && experiment.topicSpecific.quimica) ||
        (checkboxes["Ensino fundamental"] &&
          experiment.targetAudience.title === "Ensino fundamental") ||
        (checkboxes["Ensino médio"] &&
          experiment.targetAudience.title === "Ensino medio") ||
        (checkboxes["Ensino superior"] &&
          experiment.targetAudience.title === "Ensino superior") ||
        (checkboxes["Baixo custo"] && experiment.cost.title === "Baixo custo") ||
        (checkboxes["Alto custo"] && experiment.cost.title === "Alto custo") ||
        (checkboxes.Práticos && experiment.experimentType.title === "Práticos") ||
        (checkboxes.Virtuais && experiment.experimentType.title === "Virtuais") ||
        (checkboxes.Teóricos && experiment.experimentType.title === "Teóricos")
      );
    });
    setFilteredExperiments(filtered);
  };

  const handleAccessExperiment = (slug) => {
    // Abre uma nova aba com o endereço "/experimento/slug"
    window.open(`/experimento/${slug}`, "_blank");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      {/* Seção de Filtros */}
      <div className="p-6 bg-white rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-bold mb-4">Filtros</h2>

        <div className="flex flex-wrap -mx-2">
          {/* Nível de Dificuldade */}
          <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <h3 className="text-xl font-semibold mb-2">Nível de Dificuldade</h3>
            {["Simples", "Difícil"].map((label) => (
              <div key={label} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={label}
                  onChange={() => handleSelectChange2(label)}
                  checked={checkboxes[label]}
                  className="mr-2"
                />
                <label htmlFor={label} className="text-lg">
                  {label}
                </label>
              </div>
            ))}
          </div>

          {/* Tema */}
          <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <h3 className="text-xl font-semibold mb-2">Tema</h3>
            {["Ciências", "Física", "Biologia", "Química"].map((label) => (
              <div key={label} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={label}
                  onChange={() => handleSelectChange2(label)}
                  checked={checkboxes[label]}
                  className="mr-2"
                />
                <label htmlFor={label} className="text-lg">
                  {label}
                </label>
              </div>
            ))}
          </div>

          {/* Público Alvo */}
          <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <h3 className="text-xl font-semibold mb-2">Público Alvo</h3>
            {["Ensino fundamental", "Ensino médio", "Ensino superior"].map(
              (label) => (
                <div key={label} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={label}
                    onChange={() => handleSelectChange2(label)}
                    checked={checkboxes[label]}
                    className="mr-2"
                  />
                  <label htmlFor={label} className="text-lg">
                    {label}
                  </label>
                </div>
              )
            )}
          </div>

          {/* Custo */}
          <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <h3 className="text-xl font-semibold mb-2">Custo</h3>
            {["Baixo custo", "Alto custo"].map((label) => (
              <div key={label} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={label}
                  onChange={() => handleSelectChange2(label)}
                  checked={checkboxes[label]}
                  className="mr-2"
                />
                <label htmlFor={label} className="text-lg">
                  {label}
                </label>
              </div>
            ))}
          </div>

          {/* Tipos de Experimentos */}
          <div className="w-full md:w-1/2 lg:w-1/4 px-2 mb-4">
            <h3 className="text-xl font-semibold mb-2">Tipos de Experimentos</h3>
            {["Práticos", "Virtuais", "Teóricos"].map((label) => (
              <div key={label} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={label}
                  onChange={() => handleSelectChange2(label)}
                  checked={checkboxes[label]}
                  className="mr-2"
                />
                <label htmlFor={label} className="text-lg">
                  {label}
                </label>
              </div>
            ))}
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
      <section>
        <h2>Experimentos Filtrados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredExperiments.map((experiment) => (
            <div key={experiment.id} className="border p-4">
              <h3>{experiment.title}</h3>
              <img src={experiment.imagePreview} alt={experiment.title} />
              <button
                onClick={() => handleAccessExperiment(experiment.slug)}
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
