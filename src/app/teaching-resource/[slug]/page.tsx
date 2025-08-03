"use client";

import {
  FaBook,
  FaTimes,
  FaFolderOpen,
  FaRegFilePdf,
  FaFileWord,
  FaYoutube,
  FaCheck,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

// Importando o hook usePDF e outros componentes da biblioteca
import { usePDF, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Seus dados serão importados do arquivo JSON.
import resourceData from "../../api/data/teachingResourceSpecifics.json";

// ====================================================================
// INTERFACES E TIPOS PARA O TYPESCRIPT
// ====================================================================
interface Objective {
  id: number;
  content: string;
}

interface Material {
  id: number;
  content: string;
}

interface Method {
  id: number;
  title?: string;
  content: string;
  imagePath?: string;
  note?: string;
  noteType?: string;
}

interface Reference {
  id: number;
  content: string;
}

interface Topic {
    id: number;
    title: string;
    slug: string;
}

interface Experiment {
  id: string;
  postDate: string;
  profileName: string;
  topicGeneral: Topic[];
  topicSpecific: { [key: string]: Topic[] };
  title: string;
  slug: string;
  imagePreview?: string;
  description: string;
  objectives: Objective[];
  materials: Material[];
  methods: Method[];
  scientificExplanation: string;
  videoUrl?: string;
  references: Reference[];
  activitySheetOne?: string;
  activitySheetTwo?: string;
  activitySheetThree?: string;
}

// ====================================================================
// ESTILOS PARA O DOCUMENTO PDF (ATUALIZADO)
// ====================================================================
const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    paddingVertical: 35,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: 'Helvetica-Bold',
    color: '#1a202c',
  },
  section: {
    marginBottom: 15,
    breakInside: 'avoid',
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#2d3748',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 3,
  },
  text: {
    fontSize: 9,
    lineHeight: 1.5,
    textAlign: 'justify',
    color: '#4a5568',
  },
  listItem: {
    marginBottom: 3,
    flexDirection: 'row',
  },
  bulletPoint: {
    width: 10,
    fontSize: 9,
  },
  methodStep: {
    marginBottom: 10,
  },
  methodTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    // CORREÇÃO: Adicionado espaço abaixo do título da etapa
    marginBottom: 4,
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
  }
});

// ====================================================================
// COMPONENTE QUE DEFINE A ESTRUTURA DO PDF (ATUALIZADO)
// ====================================================================
const ResourcePDFDocument = ({ data }: { data: Experiment }) => (
  <Document title={data.title}>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{data.title}</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Introdução</Text>
        <Text style={styles.text}>{data.description}</Text>
      </View>

      <View style={styles.columnContainer}>
        <View style={styles.column}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Principais Objetivos</Text>
            {data.objectives.map((obj: Objective) => (
              <View key={obj.id} style={styles.listItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={[styles.text, { flex: 1 }]}>{obj.content}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Materiais Necessários</Text>
            {data.materials.map((mat: Material) => (
              <View key={mat.id} style={styles.listItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={[styles.text, { flex: 1 }]}>{mat.content}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.column}>
           <View style={styles.section}>
            <Text style={styles.sectionTitle}>Explicação Científica</Text>
            <Text style={styles.text}>{data.scientificExplanation}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Passo a Passo</Text>
        {data.methods.map((method: Method, index: number) => (
          <View key={method.id} style={styles.methodStep}>
            {/* CORREÇÃO: Removida a numeração redundante */}
            <Text style={styles.methodTitle}>{method.title || `Etapa ${index + 1}`}</Text>
            <Text style={styles.text}>{method.content}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Referências</Text>
        {data.references.map((ref: Reference, index: number) => (
          <View key={index} style={styles.listItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={[styles.text, { flex: 1 }]}>{ref.content}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// ====================================================================
// Componente dedicado para o botão de PDF
// ====================================================================
const PDFGeneratorButton = ({ experimentInfo }: { experimentInfo: Experiment }) => {
  const [instance, updateInstance] = usePDF({ document: <ResourcePDFDocument data={experimentInfo} /> });
  const [isGenerating, setIsGenerating] = useState(false);

  const triggerDownload = (url: string, fileName: string) => {
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handlePdfDownload = () => {
    if (isGenerating) return;
    
    if (!instance.loading && instance.url) {
      triggerDownload(instance.url, `${experimentInfo.slug || 'experimento'}.pdf`);
    } else {
      setIsGenerating(true);
      (updateInstance as any)();
    }
  };
  
  useEffect(() => {
    if (isGenerating && instance.url && !instance.loading) {
      triggerDownload(instance.url, `${experimentInfo.slug || 'experimento'}.pdf`);
      setIsGenerating(false);
    }
  }, [instance.url, instance.loading, isGenerating, experimentInfo.slug]);

  return (
    <button
      onClick={handlePdfDownload}
      disabled={isGenerating}
      className={`w-full flex items-center justify-center gap-3 px-4 py-3 text-base font-semibold text-white rounded-lg transition-colors cursor-pointer ${
        isGenerating ? 'bg-gray-500 cursor-wait' : 'bg-red-600 hover:bg-red-700'
      }`}
    >
      <FaRegFilePdf size={20} />
      <span>{isGenerating ? 'Gerando PDF...' : 'Baixar PDF'}</span>
    </button>
  );
};


export default function TeachingResource() {
  const downloadFile = (url: string, fileName: string) => {
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const params = useParams<{ slug: string }>();
  const pageSlug = params?.slug;

  const typedResourceData: Experiment[] = resourceData as any;
  const experimentInfo = typedResourceData.find(
    (element) => element.slug === pageSlug,
  );

  const additionalFiles = experimentInfo ? [
    experimentInfo.activitySheetOne,
    experimentInfo.activitySheetTwo,
    experimentInfo.activitySheetThree,
  ].filter((file): file is string => !!file) : [];

  const getFileNameFromUrl = (url: string): string => {
    if (!url) return "";
    try {
      return new URL(url, window.location.origin).pathname.split('/').pop() || "arquivo";
    } catch (e) {
      return url.split('/').pop() || "arquivo";
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const openModal = (imagePath: string) => {
    setCurrentImage(imagePath);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
  };

  if (!pageSlug) {
    return <div className="text-center py-10">Carregando...</div>;
  }

  if (!experimentInfo) {
    return <div className="text-center py-10">Experimento não encontrado</div>;
  }

  return (
    <>
      <main className="max-w-5xl mx-auto container px-4 py-8 md:py-12 pl-0 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <section className="bg-white border-b mb-8">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center text-sm text-gray-500 flex-wrap">
                <a href="/" className="hover:text-blue-600 transition">Início</a>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                <a href="/search" className="hover:text-blue-600 transition">Procurar</a>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                <span className="text-gray-700 font-medium">{experimentInfo.topicGeneral?.[0]?.title || 'Tópico'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                <span className="text-sm md:text-[0.8rem] text-gray-700 font-medium truncate">{experimentInfo.title}</span>
              </div>
            </div>
          </section>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {experimentInfo.title}
            </h1>
           <div className="flex justify-between px-2 mb-6">
  <p className="text-sm text-gray-500">
    <span className="font-semibold">Revisado por:</span> Prof. {experimentInfo.profileName}
  </p>
  <p className="text-sm text-gray-500">
    <span className="font-semibold">Enviado em:</span> {experimentInfo.postDate}
  </p>
</div>

          </div>

          <div className="bg-gray-100 rounded-xl p-4 mb-8 flex items-center justify-center">
            {experimentInfo.imagePreview ? (
              <Image
                src={experimentInfo.imagePreview}
                alt={`Imagem principal do experimento ${experimentInfo.title}`}
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/600x400/e2e8f0/4a5568?text=Imagem+Indisponível'; }}
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                <p className="text-gray-500">Sem imagem de destaque</p>
              </div>
            )}
          </div>

          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Introdução</h2>
            <p className="text-gray-700 mb-4 text-justify">{experimentInfo.description}</p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Principais objetivos</h2>
            <ul className="text-gray-700 mb-4 list-disc pl-5">
              {experimentInfo.objectives.map((objective: Objective) => (
                <li key={objective.id} className="mb-2 text-justify">
                  {objective.content}
                </li>
              ))}
            </ul>
          </div>


          <div className="w-full flex flex-col mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Temas relacionados</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 font-semibold text-left text-gray-700">Tema Geral</th>
                    <th className="px-4 py-2 font-semibold text-left text-gray-700">Temas Específicos</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(experimentInfo.topicSpecific).map((topicKey: string) => (
                    <tr key={topicKey} className="border-b">
                      <td className="px-4 py-2 font-semibold text-gray-800">
                        {topicKey.charAt(0).toUpperCase() + topicKey.slice(1)}
                      </td>
                      <td className="px-4 py-2">
                        <ul className="list-disc pl-4">
                          {experimentInfo.topicSpecific[topicKey as keyof typeof experimentInfo.topicSpecific]?.map((topic: Topic) => (
                            <li key={topic.id} className="text-gray-700">{topic.title}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Materiais Necessários</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <ul className="space-y-3">
                {experimentInfo.materials.map((material: Material) => (
                  <li key={material.id} className="flex items-center">
                    <FaCheck className="text-green-500 h-5 w-5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{material.content}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Passo a passo</h2>
            <div className="space-y-6">
              {experimentInfo.methods.map((method: Method, index: number) => (
                <div key={`${method.id}-${index}`} className="flex space-x-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{method.title || `Etapa ${index + 1}`}</h3>
                    <p className="text-gray-700 mb-4 text-justify">{method.content}</p>
                    {method.note && (
                      <div className={`rounded-lg p-4 mb-4 bg-${method.noteType}-50`}>
                        <p className={`text-sm text-${method.noteType}-700`}>{method.note}</p>
                      </div>
                    )}
                    {method.imagePath && (
                      <div className="mt-4 max-w-full cursor-pointer" onClick={() => openModal(method.imagePath as string)}>
                        <div className="relative w-full aspect-[5/3] bg-gray-100 rounded-lg">
                          <Image
                            src={method.imagePath}
                            alt={`Imagem do passo ${index + 1}`}
                            fill
                            className="object-contain rounded-lg shadow"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/500x300/e2e8f0/4a5568?text=Imagem+Indisponível'; }}
                          />
                        </div>
                        <p className="text-center text-sm text-gray-500 mt-2">(Clique para ampliar)</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={closeModal}>
              <div className="relative flex justify-center items-center h-5/6 w-11/12">
                <img src={currentImage} alt="Imagem ampliada" className="h-full w-full object-contain" />
                <button className="absolute top-4 right-4 text-white text-3xl" onClick={closeModal}><FaTimes /></button>
              </div>
            </div>
          )}
          
          <div className="prose max-w-none mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Explicação Científica</h2>
              <p className="text-gray-700 mb-4 text-justify">{experimentInfo.scientificExplanation}</p>
          </div>

          {experimentInfo.videoUrl && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Demonstração em Vídeo</h2>
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={experimentInfo.videoUrl}
                  title="Demonstração em Vídeo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}

          <div className="prose max-w-none mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
               Referências
            </h2>
            <ul className="list-disc pl-5 text-gray-700">
              {experimentInfo.references.map((reference: Reference, index: number) => (
                <li key={index} className="break-words mb-2 text-justify">
                  {reference.content}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:w-1/3 w-full">
          <div className="sticky top-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h4 className="text-center text-lg font-semibold text-gray-800 mb-4">Recursos para Download</h4>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-center text-gray-600 mb-3">Baixe um resumo completo da atividade em formato PDF.</p>
              {isClient ? (
                <PDFGeneratorButton experimentInfo={experimentInfo} />
              ) : (
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 text-base font-semibold bg-gray-400 text-white rounded-lg cursor-not-allowed"
                >
                  <FaRegFilePdf size={20} />
                  <span>Carregando...</span>
                </button>
              )}
            </div>

            <div className="my-6 border-t border-gray-200"></div>
            <div>
              <h4 className="text-center text-md font-semibold text-gray-800 mb-4">Documento(s) Adicional(is)</h4>
              {additionalFiles.length > 0 ? (
                <div className="space-y-2">
                  {additionalFiles.map((fileUrl: string) => {
                    const fileName = getFileNameFromUrl(fileUrl);
                    return (
                      <div key={fileUrl} className="border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                        <button
                          onClick={() => downloadFile(fileUrl, fileName)}
                          className="w-full flex items-center gap-3 text-blue-600 text-left text-sm font-medium p-3"
                        >
                          <FaFileWord size={20} className="text-blue-500 flex-shrink-0" />
                          <span className="hover:underline truncate">{fileName}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center text-gray-500 p-4 bg-gray-50 rounded-lg">
                  <FaFolderOpen size={24} className="mb-2" />
                  <p className="text-sm">Sem arquivos adicionais.</p>
                </div>
              )}
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
