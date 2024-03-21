"use client";
import { FaCheckCircle } from "react-icons/fa";
import experimentData from "../../api/data/experimentos.json";
import { useState } from "react";

export default function Experiment({ params }: { params: { slug: string } }) {
  const [experimentList] = useState(experimentData);
  const pageSlug = params.slug;

  const experimentInfo = experimentList.find(
    (element) => element.slug === pageSlug,
  );

  if (!experimentInfo) {
    return <div>Experimento não encontrado</div>;
  }

  return (
    <div className="container max-w-screen-xl bg-white rounded-lg shadow-lg p-8">
      <div className="">
        <div
          className="h-40 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${experimentInfo.imagePreview})` }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto h-full flex items-center justify-center relative z-10">
            <h1 className="text-4xl font-bold text-white">
              {experimentInfo.title}
            </h1>
          </div>
        </div>

        <div className="container border border-gray-300 rounded p-4 bg-white">
          <div className="flex justify-between items-initial mb-6">
            <div>
              <p className="text-gray-600">
                Publicado em: {experimentInfo.postDate}
              </p>
              <p className="text-gray-600">
                Enviado por: {experimentInfo.profileName}
              </p>
            </div>
            <p className="text-blue-500 font-semibold">
              ID: {experimentInfo.id}
            </p>
          </div>
          <h2>{experimentInfo.title}</h2>
          <p className="mt-4 text-lg text-gray-700">
            {experimentInfo.description}
          </p>
        </div>
      </div>

      <div className="mt-8 border border-gray-300 rounded p-4">
        <h2 className="text-sm font-semibold">Ficha técnica</h2>

        <div className="mt-4">
          <table className="min-w-full text-xs divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Detalhes do Tipo de Experimento
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 font-semibold">
                  Título do Experimento:
                </td>
                <td className="px-4 py-2">{experimentInfo.title}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">
                  Tipo de Experimento:
                </td>
                <td className="px-4 py-2">
                  <strong>{experimentInfo.experimentType.title}</strong>:{" "}
                  {experimentInfo.experimentType.steps}
                </td>
              </tr>

              <tr>
                <td className="px-4 py-2 font-semibold">
                  Onde ele pode ser realizado?
                </td>
                <td className="px-4 py-2">
                  <ul className="list-disc ">
                    {experimentInfo.topicLocation.map((location) => (
                      <li key={location.id}>{location.title}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">
                  Qual o público alvo?
                </td>
                <td className="px-4 py-2">
                  <ul className="list-disc ">
                    {experimentInfo.targetAudience.map((audience) => (
                      <li key={audience.id}>{audience.title}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-semibold">
                  Sobre o que é este experimento?
                </td>
                <td className="px-4 py-2">
                  <ul>
                    {Object.keys(experimentInfo.topicSpecific).map(
                      (topicKey, index) => (
                        <li
                          key={topicKey}
                          className="bg-gray-200 p-4 mt-4 mb-4 mr-8 flex justify-around"
                        >
                          <div className="flex justify-center items-center flex-initial w-1/3">
                            <span>
                              <strong>{topicKey}</strong>
                            </span>
                          </div>
                          <div className="flex-initial w-2/3">
                            <ul className="list-disc">
                              {experimentInfo.topicSpecific[topicKey].map(
                                (topic: any) => (
                                  <li key={topic.id} className="ml-4">
                                    {topic.title}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        </li>
                      ),
                    )}
                  </ul>
                </td>
              </tr>

              <tr>
                <td className="px-4 py-2 font-semibold">Dificuldade</td>
                <td className="px-4 py-2">
                  Este experimento é de dificuldade{" "}
                  <strong>{experimentInfo.difficulty.title}</strong>, ou seja,{" "}
                  {experimentInfo.difficulty.explanation}
                </td>
              </tr>

              <tr>
                <td className="px-4 py-2 font-semibold">Custo</td>
                <td className="px-4 py-2">
                  {" "}
                  É classificado como{" "}
                  <strong>{experimentInfo.cost.title}</strong>, com um custo
                  estimado entre {experimentInfo.cost.steps}.
                </td>
              </tr>

              <tr>
                <td className="px-4 py-2 font-semibold">Objetivos</td>
                <td className="px-4 py-2">
                  <ul className="list-disc ">
                    {experimentInfo.objectives.map((objective) => (
                      <li key={objective.id}>{objective.content}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full mt-8 flex justify-center items-center flex-col">
        <div className="w-full mt-8 flex items-center justify-center flex-col  border border-gray-300 rounded p-4">
          <h2 className="mb-4 text-xl font-semibold">
            Lista de materiais utilizados:
          </h2>
          <ul className="list-disc pl-8">
            {experimentInfo.materials.map((material) => (
              <li key={material.id} className="flex items-center">
                <FaCheckCircle className="mr-2 text-green-500" />
                {material.content}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 w-full border border-gray-300 rounded p-4">
          <h2 className="text-xl font-semibold text-center">
            Métodologia / Passo a passo
          </h2>
          {experimentInfo.methods.map((method, index) => (
            <>
              <p className="mt-8 text-2xl font-bold">{index + 1}° Passo</p>

              <div
                key={method.id}
                className="p-3 sm:p-6 flex flex-col lg:flex-row items-center"
              >
                <div className="max-w-md overflow-hidden mb-4 lg:mb-0 lg:mr-4 lg:w-1/2">
                  {method.imagePath && (
                    <img
                      src={method.imagePath}
                      alt=""
                      className="max-w-full h-auto rounded-lg"
                    />
                  )}
                </div>
                <div className="flex-1 text-justify">
                  <p className="text-sm lg:text-md">{method.content}</p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>

      <div className="mt-4 p-4">
        <h2 className="text-xl font-semibold">Resultados esperados</h2>
        <p className="mt-2">{experimentInfo.results}</p>
      </div>
      <div className="mt-4 p-4">
        <h2 className="text-xl font-semibold">Explicação Científica:</h2>
        <p className="mt-2">{experimentInfo.scientificExplanation}</p>
      </div>
      <div className="mt-4 p-4">
        <h2 className="text-xl font-semibold">Referências</h2>
        <ul className="list-disc pl-4 mt-2">
          {experimentInfo.references.map((reference) => (
            <li key={reference.id}>{reference.content}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4 p-4">
        <h2 className="text-xl font-semibold">Palavras-chave</h2>
        <div className="flex flex-wrap mt-2">
          {experimentInfo.keywords.map((keyword) => (
            <div
              key={keyword.id}
              className="bg-gray-700 text-white px-3 py-1 rounded-lg mr-2 mb-2"
            >
              {keyword.title}
            </div>
          ))}
        </div>
      </div>

      {/* Adicione mais seções conforme necessário para os outros dados */}
    </div>
  );
}
