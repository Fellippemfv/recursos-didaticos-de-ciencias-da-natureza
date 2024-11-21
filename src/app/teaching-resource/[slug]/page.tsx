"use client";

import {
  FaBook,
  FaBullseye,
  FaChartBar,
  FaCheckCircle,
  FaClipboardCheck,
  FaClipboardList,
  FaFileDownload,
  FaFlask,
  FaTimes,
} from "react-icons/fa";
import resourceData from "../../api/data/teachingResourceSpecifics.json";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Importando o hook useParams

// pages/your-page.js
import dynamic from "next/dynamic";
import { PDFDownloadLink } from "@react-pdf/renderer";

// Carregar o componente DownloadPDF dinamicamente com SSR desativado
const DownloadPDF = dynamic(() => import("@/components/DownloadPDF"), {
  ssr: false,
});

export default function TeachingResource() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  // Obtendo o parâmetro da URL diretamente usando useParams
  const params = useParams<{ slug: string }>();
  const pageSlug = params?.slug;

  if (!pageSlug) {
    return <div>Carregando...</div>; // Mostra uma mensagem enquanto o slug está sendo carregado
  }

  const [experimentList] = useState(resourceData);

  const experimentInfo = experimentList.find(
    (element) => element.slug === pageSlug,
  );

  if (!experimentInfo) {
    return <div>Experimento não encontrado</div>;
  }

  const openModal = (imagePath: string) => {
    setCurrentImage(imagePath);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
  };

  const downloadFile = (filePath: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
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
              Publicado em: {experimentInfo.postDate}.
            </p>
            <p className="text-gray-600">
              Enviado por: {experimentInfo.profileName}.
            </p>
          </div>

          <div className="flex flex-col items-start space-y-4">
            {/* Exibindo o ID no topo */}
            <p className="text-blue-500 font-semibold">
              ID: {experimentInfo.id}
            </p>

            {/* Download PDF - botão embaixo do ID */}
            <div className="mt-4">
              <DownloadPDF experimentInfo={experimentInfo} />
            </div>
          </div>
        </div>

        {/* Título da atividade */}
        <h1 className="text-2xl font-bold mt-6 text-gray-800">
          Proposta da atividade
        </h1>

        {/* Descrição da atividade */}
        <p className="mt-2 text-base text-gray-700 mb-4 text-justify">
          {experimentInfo.description} Abaixo você pode conferir os temas
          relacionados a este recurso didático.
        </p>

        {/* Seções Padronizadas */}

        {/* Sobre o que é esta atividade? */}
        <div className="w-full flex flex-col mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 font-semibold text-left text-gray-700">
                    Tema Geral
                  </th>
                  <th className="px-4 py-2 font-semibold text-left text-gray-700">
                    Temas Específicos
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(experimentInfo.topicSpecific).map(
                  (topicKey, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2 font-semibold text-gray-800">
                        {topicKey.charAt(0).toUpperCase() + topicKey.slice(1)}{" "}
                        {/* Capitaliza a primeira letra */}
                      </td>
                      <td className="px-4 py-2">
                        <ul className="list-disc pl-4">
                          {experimentInfo.topicSpecific[
                            topicKey as keyof typeof experimentInfo.topicSpecific
                          ]?.map((topic: any) => (
                            <li key={topic.id} className="text-gray-700">
                              {topic.title}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Objetivos */}
        <div className="w-full flex flex-col border border-gray-300 rounded p-4 mb-8">
          {/* Título com ícone alinhado */}
          <h2 className="text-lg font-semibold mb-2 text-gray-700 flex items-center">
            <FaBullseye className="mr-2" /> {/* Ícone à esquerda do título */}
            Ojetivos
          </h2>

          {/* Lista de objetivos */}
          <ul className="list-disc">
            {experimentInfo.objectives.map((objective) => (
              <li key={objective.id} className="ml-4 text-justify">
                {objective.content}
              </li>
            ))}
          </ul>
        </div>

        {/* Materiais */}
        <div className="w-full flex flex-col border border-gray-300 rounded p-4">
          {/* Título com ícone alinhado */}
          <h2 className="text-lg font-semibold mb-2 text-gray-700 flex items-center text-justify">
            <FaClipboardCheck className="mr-2" />{" "}
            {/* Ícone para Lista de Materiais */}
            Lista de materiais necessários
          </h2>

          {/* Lista de materiais com ícones */}
          <ul className="list-disc">
            {experimentInfo.materials.map((material: any) => (
              <li key={material.id} className="flex items-center text-justify">
                <FaCheckCircle className="mr-2 text-green-500" />
                {material.content}
              </li>
            ))}
          </ul>
        </div>

        {/* Metodologia */}
        <div className="mt-8 w-full border border-gray-300 rounded p-4">
          <h2 className="text-lg font-semibold mb-6 text-gray-700 flex items-center">
            <FaClipboardList className="mr-2" /> {/* Ícone para Metodologia */}
            Metodologia
          </h2>

          {experimentInfo.methods.map((method: any, index) => (
            <div
              key={`${method.id}-${index}`} // Combina method.id com o índice para garantir a chave única
              className="flex flex-col mb-8 p-4 border border-gray-200 rounded-lg bg-white flex items-start"
            >
              {/* Bloco para o título da etapa */}
              <div className="flex-shrink-0 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {index + 1}° Etapa
                </h3>
              </div>

              {/* Bloco para a imagem e a descrição */}
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start w-full">
                <div className="w-full sm:w-1/2 sm:mr-4 mb-4 sm:mb-0">
                  <div
                    className="max-w-full cursor-pointer"
                    onClick={() => openModal(method.imagePath)}
                  >
                    {method.imagePath && (
                      <img
                        src={method.imagePath}
                        alt={`Imagem do passo ${index + 1}`}
                        className="w-full h-auto max-h-80 object-contain rounded-lg shadow"
                      />
                    )}
                    <p className="text-center text-sm text-gray-500 mt-2">
                      (Clique para ampliar)
                    </p>
                  </div>
                </div>

                <div className="w-full text-justify">
                  <p className="">{method.content}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Modal para imagem em fullscreen */}
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50" // Fundo com opacidade e modal centralizado
              onClick={closeModal} // Função para fechar ao clicar no fundo
            >
              <div className="relative flex justify-center items-center h-5/6 w-11/12">
                <img
                  src={currentImage}
                  alt="Imagem ampliada"
                  className="h-full w-full object-contain" // A imagem ocupará a altura total e largura total do contêiner
                />
                <button
                  className="absolute top-2 right-2 text-white text-2xl"
                  onClick={closeModal} // Botão para fechar o modal
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Resultados Esperados */}
        {experimentInfo.results && experimentInfo.results !== "" && (
          <div className="mt-4 border border-gray-300 rounded p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center text-justify">
              <FaChartBar className="mr-2" />{" "}
              {/* Ícone para Resultados Esperados */}
              Resultados esperados
            </h2>

            <p className="mt-2 text-justify">{experimentInfo.results}</p>
          </div>
        )}

        {/* Explicação Científica */}
        {experimentInfo.scientificExplanation &&
          experimentInfo.scientificExplanation !== "" && (
            <div className="mt-4 border border-gray-300 rounded p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center text-justify">
                <FaFlask className="mr-2" />{" "}
                {/* Ícone para Explicação Científica */}
                Explicação científica
              </h2>

              <p className="mt-2 text-justify">
                {experimentInfo.scientificExplanation}
              </p>
            </div>
          )}

        {/* Documentos para Download */}
        {experimentInfo.activitySheet &&
          experimentInfo.activitySheet !== "" && (
            <div className="mt-4 border border-gray-300 rounded p-4">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center text-justify">
                <FaFileDownload className="mr-2" />{" "}
                {/* Ícone para Documentos */}
                Documento(s) para download
              </h2>

              <p
                className="mt-2 cursor-pointer text-blue-600 text-justify"
                onClick={() =>
                  downloadFile(
                    experimentInfo.activitySheet || "", // Se não houver arquivo, não faz nada
                    "roteiro-de-atividade.docx",
                  )
                }
              >
                arquivo-1.docx
              </p>
            </div>
          )}

        {/* Referências */}
        <div className="mt-4 border border-gray-300 rounded p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center text-justify">
            <FaBook className="mr-2" /> {/* Ícone para Referências */}
            Referências
          </h2>

          <ul className="list-disc pl-4 mt-2">
            {experimentInfo.references.map((reference: any, index: number) => (
              <li key={index} className="break-words">
                {reference.content}
              </li>
            ))}
          </ul>
        </div>

        {/* Adicione mais seções conforme necessário para os outros dados */}
      </div>
    </div>
  );
}
