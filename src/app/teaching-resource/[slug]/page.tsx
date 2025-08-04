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
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 22,
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
    fontSize: 10,
    lineHeight: 1.6,
    textAlign: 'justify',
    color: '#4a5568',
  },
  listItem: {
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
    marginRight: 5,
  },
  methodStep: {
    marginBottom: 12,
  },
  methodTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    marginBottom: 4,
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
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
        </View>
        <View style={styles.column}>
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
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Passo a Passo</Text>
        {data.methods.map((method: Method, index: number) => (
          <View key={method.id} style={styles.methodStep}>
            <Text style={styles.methodTitle}>{method.title || `Etapa ${index + 1}`}</Text>
            <Text style={styles.text}>{method.content}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explicação Científica</Text>
        <Text style={styles.text}>{data.scientificExplanation}</Text>
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
    if (isGenerating || instance.loading) return;
    
    if (instance.url) {
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
      disabled={isGenerating || instance.loading}
      className={`w-full flex items-center justify-center gap-3 px-4 py-3 text-base font-semibold text-white rounded-lg transition-all duration-300 ease-in-out ${
        (isGenerating || instance.loading) ? 'bg-gray-500 cursor-wait' : 'bg-red-600 hover:bg-red-700 hover:scale-105'
      }`}
    >
      <FaRegFilePdf size={20} />
      <span>{isGenerating ? 'Gerando PDF...' : (instance.loading ? 'Carregando...' : 'Baixar PDF')}</span>
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
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
    document.body.style.overflow = 'auto';
  };

  if (!pageSlug) {
    return <div className="text-center py-20 text-gray-600">Carregando...</div>;
  }
  
  if (!experimentInfo) {
    return <div className="text-center py-20 text-gray-600">Experimento não encontrado.</div>;
  }

  return (
    <>
      <main className="max-w-5xl mx-auto bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Coluna Principal (Conteúdo) */}
          <div className="w-full lg:w-2/3">
            
            {/* Breadcrumbs */}
            <section className="mb-6">
              <div className="flex items-center text-sm text-gray-500 flex-wrap gap-x-2">
                <a href="/" className="hover:text-blue-600 transition">Início</a>
                <span className="text-gray-400">/</span>
                <a href="/search" className="hover:text-blue-600 transition">Procurar</a>
                <span className="text-gray-400">/</span>
                <span className="font-medium text-gray-700">{experimentInfo.topicGeneral?.[0]?.title || 'Tópico'}</span>
                <span className="text-gray-400">/</span>
                <span className="font-medium text-gray-800 truncate" title={experimentInfo.title}>{experimentInfo.title}</span>
              </div>
            </section>

            {/* Título e Metadados */}
            <div className="mb-6 md:mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
                {experimentInfo.title}
              </h1>
              <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-500 gap-2">
                <p><span className="font-semibold">Revisado por:</span> Prof. {experimentInfo.profileName}</p>
                <p><span className="font-semibold">Enviado em:</span> {experimentInfo.postDate}</p>
              </div>
            </div>

            {/* Imagem de Destaque */}
            <div className="md:max-w-full mb-8 rounded-xl overflow-hidden shadow-lg">
              {experimentInfo.imagePreview ? (
                <Image
                  src={experimentInfo.imagePreview}
                  alt={`Imagem principal do experimento ${experimentInfo.title}`}
                  width={800}
                  height={450}
                  className="w-full h-auto object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/800x450/e2e8f0/4a5568?text=Imagem+Indisponível'; }}
                  priority
                />
              ) : (
                <div className="w-full aspect-video bg-gray-200 flex items-center justify-center rounded-lg">
                  <p className="text-gray-500">Sem imagem de destaque</p>
                </div>
              )}
            </div>

            {/* Seções de Conteúdo */}
            <div className="space-y-10">
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">Introdução</h2>
                <p className="text-gray-700 text-justify leading-relaxed">{experimentInfo.description}</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">Principais objetivos</h2>
                <ul className="text-gray-700 list-disc pl-5 space-y-2">
                  {experimentInfo.objectives.map((objective: Objective) => (
                    <li key={objective.id} className="text-justify leading-relaxed">{objective.content}</li>
                  ))}
                </ul>
              </section>
              
              {/* Tabela/Cartões de Temas Relacionados - RESPONSIVO */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">Temas relacionados</h2>
                <div className="space-y-4 md:hidden">
                    {Object.keys(experimentInfo.topicSpecific).map((topicKey: string) => (
                        <div key={topicKey} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <h3 className="font-semibold text-gray-800 mb-2">{topicKey.charAt(0).toUpperCase() + topicKey.slice(1)}</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                {experimentInfo.topicSpecific[topicKey as keyof typeof experimentInfo.topicSpecific]?.map((topic: Topic) => (
                                    <li key={topic.id} className="text-sm text-gray-600">{topic.title}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="hidden md:block overflow-x-auto">
                  <table className="min-w-full border border-gray-300 bg-white">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-left text-gray-700">Tema Geral</th>
                        <th className="px-4 py-3 font-semibold text-left text-gray-700">Temas Específicos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(experimentInfo.topicSpecific).map((topicKey: string) => (
                        <tr key={topicKey} className="border-b border-gray-200 last:border-b-0">
                          <td className="px-4 py-3 font-semibold text-gray-800 align-top">
                            {topicKey.charAt(0).toUpperCase() + topicKey.slice(1)}
                          </td>
                          <td className="px-4 py-3">
                            <ul className="list-disc pl-4 space-y-1">
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
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">Materiais Necessários</h2>
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <ul className="space-y-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {experimentInfo.materials.map((material: Material) => (
                      <li key={material.id} className="flex items-center">
                        <FaCheck className="text-green-500 h-5 w-5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{material.content}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-3">Passo a passo</h2>
                <div className="space-y-8">
                  {experimentInfo.methods.map((method: Method, index: number) => (
                    <div key={`${method.id}-${index}`} className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl shadow-md">
                        {index + 1}
                      </div>
                      <div className="bg-white rounded-lg shadow-md p-6 flex-1 w-full border border-gray-200">
                        <h3 className="font-bold text-lg text-gray-800 mb-2">{method.title || `Etapa ${index + 1}`}</h3>
                        <p className="text-gray-700 mb-4 text-justify leading-relaxed">{method.content}</p>
                        {method.note && (
                          <div className={`rounded-lg p-3 mb-4 text-sm bg-blue-50 border border-blue-200 text-blue-800`}>
                            <strong>Nota:</strong> {method.note}
                          </div>
                        )}
                        {method.imagePath && (
                          <div className="md:max-w-full mt-4 cursor-pointer group" onClick={() => openModal(method.imagePath as string)}>
                            <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border">
                              <Image
                                src={method.imagePath}
                                alt={`Imagem do passo ${index + 1}`}
                                fill
                                className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/500x300/e2e8f0/4a5568?text=Imagem+Indisponível'; }}
                              />
                            </div>
                            <p className="text-center text-sm text-gray-500 mt-2 group-hover:text-blue-600 transition-colors">(Clique para ampliar)</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">Explicação Científica</h2>
                <p className="text-gray-700 text-justify leading-relaxed">{experimentInfo.scientificExplanation}</p>
              </section>

              {experimentInfo.videoUrl && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">Demonstração em Vídeo</h2>
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg border">
                    <iframe
                      src={experimentInfo.videoUrl}
                      title="Demonstração em Vídeo"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </section>
              )}

<section className="w-full">
  <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">
    Referências
  </h2>
  <ul className="list-disc pl-5 text-gray-700 space-y-2 max-w-full overflow-hidden">
    {experimentInfo.references.map((reference: Reference, index: number) => (
      <li
        key={index}
        className="break-all text-justify leading-relaxed text-sm w-full"
      >
        {reference.content}
      </li>
    ))}
  </ul>
</section>


            </div>
          </div>

          {/* Sidebar (Recursos) */}
          <aside className="w-full lg:w-1/3">
            <div className="sticky top-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-center text-xl font-bold text-gray-800 mb-5">Recursos para Download</h3>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-6">
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

              <div>
                <h4 className="text-center text-lg font-semibold text-gray-800 mb-4">Documento(s) Adicional(is)</h4>
                {additionalFiles.length > 0 ? (
                  <div className="space-y-3">
                    {additionalFiles.map((fileUrl: string) => {
                      const fileName = getFileNameFromUrl(fileUrl);
                      return (
                        <div key={fileUrl} className="border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                          <button
                            onClick={() => downloadFile(fileUrl, fileName)}
                            className="w-full flex items-center gap-3 text-blue-600 text-left text-sm font-medium p-3"
                          >
                            <FaFileWord size={20} className="text-blue-500 flex-shrink-0" />
                            <span className="hover:underline truncate" title={fileName}>{fileName}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center text-gray-500 p-4 bg-gray-50 rounded-lg border">
                    <FaFolderOpen size={24} className="mb-2" />
                    <p className="text-sm">Sem arquivos adicionais.</p>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Modal para Imagem Ampliada */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4 transition-opacity duration-300" 
          onClick={closeModal}
        >
          <div 
            className="relative max-w-4xl max-h-full" 
            onClick={(e) => e.stopPropagation()}
          >
            <img src={currentImage} alt="Imagem ampliada" className="object-contain max-w-full max-h-[90vh] rounded-lg shadow-2xl" />
            <button 
              className="absolute -top-2 -right-2 md:top-2 md:right-2 bg-white rounded-full p-2 text-gray-800 hover:bg-gray-200 transition-all" 
              onClick={closeModal}
              aria-label="Fechar modal"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
