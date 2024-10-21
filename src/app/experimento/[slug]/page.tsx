"use client";
import { FaArrowRight, FaBook, FaChartBar, FaCheckCircle, FaClipboardCheck, FaClipboardList, FaFileAlt, FaFileDownload, FaFlask, FaImage, FaTimes } from "react-icons/fa";
import experimentData from "../../api/data/experimentos.json";
import { useState } from "react";

export default function Experiment({ params }: { params: { slug: string } }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const openModal = (imagePath) => {
    setCurrentImage(imagePath);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage('');
  };

  const [experimentList] = useState(experimentData);
  const pageSlug = params.slug;

  const experimentInfo = experimentList.find(
    (element) => element.slug === pageSlug,
  );

  if (!experimentInfo) {
    return <div>Experimento não encontrado</div>;
  }

    // Função para download do arquivo
    const downloadFile = (filePath: string, fileName: string) => {
      const link = document.createElement('a');
      link.href = filePath;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  return (
    <div className="container max-w-screen-xl bg-white rounded-lg p-8  border border-gray-300 rounded p-4">
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

 {/* Título do experimento */}
<h1 className="text-2xl font-bold mt-6 text-gray-800">{experimentInfo.title}</h1>

{/* Descrição do experimento */}
<p className="mt-2 text-base text-gray-700 mb-4 text-justify">{experimentInfo.description}</p>

{/* Seções Padronizadas */}

{/* Sobre o que é este experimento? */}
<h2 className="text-lg font-semibold text-gray-700">
  Sobre o que é este experimento?
</h2>
<ul className="p-4"> {/* Removi a classe list-disc aqui */}
  {Object.keys(experimentInfo.topicSpecific).map((topicKey, index) => (
    <li key={index} className="mt-2">
      <strong>{topicKey}:</strong>
      <ul className="list-disc pl-2"> {/* Bolinhas apenas para os tópicos específicos */}
        {experimentInfo.topicSpecific[topicKey as keyof typeof experimentInfo.topicSpecific]?.map((topic: any) => (
          <li key={topic.id} className="ml-2">
            {topic.title}
          </li>
        ))}
      </ul>
    </li>
  ))}
</ul>


{/* Objetivos */}
  <h2 className="text-lg font-semibold text-gray-700">Quais são os objetivos?</h2>
  <ul className="list-disc pl-4 p-4">
    {experimentInfo.objectives.map((objective) => (
      <li key={objective.id} className="ml-4">
        {objective.content}
      </li>
    ))}
  </ul>


  
</div>


        

    


<div className="w-full mt-8 flex justify-center items-center flex-col">
<div className="w-full flex flex-col border border-gray-300 rounded p-4">
  {/* Título com ícone alinhado */}
  <h2 className="text-lg font-semibold mb-6 text-gray-700 flex items-center">
    <FaClipboardCheck className="mr-2" /> {/* Ícone para Lista de Materiais */}
    Lista de materiais necessários
  </h2>

  {/* Lista de materiais com ícones */}
  <ul className="list-disc pl-4">
    {experimentInfo.materials.map((material) => (
      <li key={material.id} className="flex items-center">
        <FaCheckCircle className="mr-2 text-green-500" />
        {material.content}
      </li>
    ))}
  </ul>
</div>



  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start w-full">
  <div className="mt-8 w-full border border-gray-300 rounded p-4">
  <h2 className="text-lg font-semibold mb-6 text-gray-700 flex items-center">
  <FaClipboardList className="mr-2" /> {/* Ícone para Metodologia */}
  Metodologia
</h2>


    {experimentInfo.methods.map((method, index) => (
      <div key={method.id} className="flex flex-col mb-8 p-4 border border-gray-200 rounded-lg bg-white flex items-start">
        
        {/* Bloco para o título da etapa */}
        <div className="flex-shrink-0 mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {index + 1}° Etapa
          </h3>
        </div>

        {/* Bloco para a imagem e a descrição */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start w-full">
          <div className="w-full sm:w-1/2 sm:mr-4 mb-4 sm:mb-0">
            <div className="max-w-full cursor-pointer" onClick={() => openModal(method.imagePath)}>
              {method.imagePath && (
                <img
                  src={method.imagePath}
                  alt={`Imagem do passo ${index + 1}`}
                  className="w-full h-auto max-h-80 object-contain rounded-lg shadow"
                />
              )}
              <p className="text-center text-sm text-gray-500 mt-2">(Clique para ampliar)</p>
            </div>
          </div>

          <div className="w-full text-justify">
            <p className="">
              <FaArrowRight className="inline mr-2" />
              {method.content}
            </p>
          </div>
        </div>
      </div>
    ))}

{/* Modal para imagem em fullscreen */}
{isModalOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50" // Ajuste a opacidade aqui
    onClick={closeModal} // Mantém a funcionalidade de fechar ao clicar no fundo
  >
    <div className="relative" onClick={(e) => e.stopPropagation()}> {/* Impede que o clique no conteúdo do modal feche o modal */}
      <img
        src={currentImage}
        alt="Imagem ampliada"
        className="max-w-full max-h-screen object-contain"
      />
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={closeModal}
      >
        <FaTimes />
      </button>
    </div>
  </div>
)}

  </div>
</div>


</div>


{/* Resultados Esperados */}
<div className="mt-4 border border-gray-300 rounded p-4">
<h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center text-justify">
  <FaChartBar className="mr-2" /> {/* Ícone para Resultados Esperados */}
  Quais os resultados esperados?
</h2>

  <p className="mt-2">{experimentInfo.results}</p>
</div>

{/* Explicação Científica */}
<div className="mt-4 border border-gray-300 rounded p-4">
<h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center text-justify">
  <FaFlask className="mr-2" /> {/* Ícone para Explicação Científica */}
  Qual a explicação científica?
</h2>

  <p className="mt-2">{experimentInfo.scientificExplanation}</p>
</div>

{/* Documentos para Download */}
<div className="mt-4 border border-gray-300 rounded p-4">
<h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center text-justify">
  <FaFileDownload className="mr-2" /> {/* Ícone para Documentos */}
  Documento(s) para download
</h2>

  <p
    className="mt-2 cursor-pointer text-blue-600 text-justify"
    onClick={() => downloadFile(experimentInfo.activitySheet, 'roteiro-de-atividade.docx')}
  >
    roteiro-de-atividade.docx
  </p>
</div>

{/* Referências */}
<div className="mt-4 border border-gray-300 rounded p-4">
<h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center text-justify">
  <FaBook className="mr-2" /> {/* Ícone para Referências */}
  Referências
</h2>


  <ul className="list-disc pl-4 mt-2">
    {experimentInfo.references.map((reference) => (
      <li key={reference.id} className="break-words">
        {reference.content}
      </li>
    ))}
  </ul>
</div>



      {/* Adicione mais seções conforme necessário para os outros dados */}
    </div>
  );
}
