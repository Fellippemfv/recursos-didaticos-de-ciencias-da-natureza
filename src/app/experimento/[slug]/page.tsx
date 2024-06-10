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
    <div className="container max-w-screen-xl bg-white rounded-lg p-8  border border-gray-300 rounded p-4">
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
          <div className="flex justify-between items-initial">
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
        </div>
      </div>

      <div className="mt-8 border border-gray-300 rounded p-4">
        <h2 className="text-sm font-semibold">Sobre o experimento</h2>
        <p className="mt-4 text-lg text-gray-700">
          {experimentInfo.description}
        </p>
        <div className="flex flex-wrap items-center mt-2">
          <h2 className="text-sm font-semibold mr-4">Palavras-chave:</h2>
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
      <div className="mt-8 border border-gray-300 rounded p-4">
        <div className="bg-gray-50 px-4 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">
        <h2 className="text-sm font-semibold">Ficha técnica</h2>

        </div>

        <div className="mt-4">
          <table className="min-w-full text-xs divide-y divide-gray-200">
           
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
                          key={index}
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
        <div className="w-full mt-8 flex flex-col  border border-gray-300 rounded p-4">
          <h2 className="text-sm font-semibold mb-6">
            Lista de materiais utilizados
          </h2>

          <ul className="list-disc">
            {experimentInfo.materials.map((material) => (
              <li key={material.id} className="flex items-center">
                <FaCheckCircle className="mr-2 text-green-500" />
                {material.content}
              </li>
            ))}
          </ul>
        </div>

   
        <div className="mt-8 w-full border border-gray-300 rounded p-4">
  <h2 className="text-lg font-semibold mb-6">
    Métodologia / Passo a passo
  </h2>

  {experimentInfo.methods.map((method, index) => (
    <div key={method.id} className="mb-8">
      <h3 className="text-lg font-semibold mb-2">
        {index + 1}° Passo
      </h3>

      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start">
        <div className="w-full sm:w-1/2 sm:mr-4 mb-4 sm:mb-0">
          <div className="max-w-full">
            {method.imagePath && (
              <img
                src={method.imagePath}
                alt=""
                className="w-full h-auto rounded-lg"
              />
            )}
          </div>
        </div>

        <div className="w-full text-justify">
          <p className="text-sm lg:text-base">{method.content}</p>
        </div>
      </div>
    </div>
  ))}
</div>




      </div>

      <div className="mt-4  border border-gray-300 rounded p-4 ">
        <h2 className="text-sm font-semibold mb-4">
          Quais os resultados esperados?
        </h2>
        <p className="mt-2">{experimentInfo.results}</p>
      </div>
      <div className="mt-4  border border-gray-300 rounded p-4">
        <h2 className="text-sm font-semibold mb-4">
          Qual a explicação científica?
        </h2>
        <p className="mt-2">{experimentInfo.scientificExplanation}</p>
      </div>
      <div className="mt-4  border border-gray-300 rounded p-4">
        <h2 className="text-sm font-semibold mb-4">Referências</h2>
        <ul className="list-disc pl-4 mt-2">
          {experimentInfo.references.map((reference) => (
            <li key={reference.id}>{reference.content}</li>
          ))}
        </ul>
      </div>

      {/* Adicione mais seções conforme necessário para os outros dados */}
    </div>
  );
}
