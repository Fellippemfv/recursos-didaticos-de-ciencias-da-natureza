"use client";
import React, {
  type ChangeEvent,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IoFlask } from "react-icons/io5";
import {
  MdAddchart,
  MdBookmarkBorder,
  MdOutlinePinch,
  MdDateRange,
  MdError,
  MdFingerprint,
  MdImageSearch,
  MdOutlineBuild,
  MdOutlineDescription,
  MdOutlineFileOpen,
  MdPlaylistAddCheck,
  MdMenuBook,
  MdOutlineLibraryBooks

} from "react-icons/md";

import { RiAddLine, RiUserLine } from "react-icons/ri";
import { FiHash, FiUploadCloud } from "react-icons/fi";

import { FaCopy, FaExclamationTriangle, FaFlask, FaTrash } from "react-icons/fa";
import { z } from "zod";

import { Octokit } from "@octokit/rest";
/* import Octokit from "@octokit/rest"; */


import experimentTypes from "../../api/data/experimentTypes.json"
import abntRules from "../../api/data/abntRules.json"
import topicGeneralData from "../../api/data/experimentGeneralData.json";


import axios from "axios";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { FcInfo } from "react-icons/fc";
import { BiLoaderAlt } from "react-icons/bi";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

// Crie uma instância do Octokit
const octokit = new Octokit();

// Preciso colocar essa logica no home

interface Topic {
  id: number;
  title: string;
  slug: string;
}

interface SpecificTopic {
  id: number;
  title: string;
  slug: string;
}

interface ExperimentType {
  id: number;
  title: string;
  slug: string;
  steps: string;
}

export default function Experiment() {
  const successRef = useRef<HTMLDivElement>(null); // Especifica o tipo HTMLDivElement
  const [experimentGeneralData] = useState(topicGeneralData);
  const [apiToken, setApiToken] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("githubApiToken");
    if (storedToken) {
      setApiToken(storedToken);
    }
  }, []);

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const token = e.target.value;
    setApiToken(token);
    localStorage.setItem("githubApiToken", token);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const testApiToken = async (token: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      setTestResult({
        success: true,
        message: `Teste bem-sucedido. Usuário: ${response.data.login}`,
      });
    } catch (error) {
      console.error("Erro ao testar a chave da API. Chave inválida.", error);
      setTestResult({
        success: false,
        message: "Erro ao testar a chave da API. Chave inválida.",
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setTestResult(null);
      }, 10000);
    }
  };

  const handleTestClick = async () => {
    await testApiToken(apiToken);
  };

  const handleCloseClick = () => {
    setTestResult(null);
  };

  const [experimentData, setExperimentData] = useState({
    id: "",
    postDate: "",
    profileName: "",
    topicGeneral: [],
    topicSpecific: [],
    experimentType: [],
    title: "",
    slug: "",
    imagePreview: "",
    description: "",
    objectives: [],
    materials: [],
    methods: [],
    results: "",
    scientificExplanation: "",
    references: [],
    activitySheetOne: "",
  });

  const handleSelectExperimentTypeChange = (selectedType: ExperimentType) => {
    setExperimentData((prevData: any) => ({
      ...prevData,
      experimentType: selectedType,
    }));
  };

  const handleGeneralSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const selectedTopic = experimentGeneralData.find(
      (topic) => topic.slug === value,
    );

    if (selectedTopic) {
      const isTopicAlreadySelected = experimentData.topicGeneral.some(
        (topic: any) => topic.title === selectedTopic.title,
      );

      if (!isTopicAlreadySelected) {
        setExperimentData((prevData: any) => ({
          ...prevData,
          topicGeneral: [
            ...prevData.topicGeneral,
            {
              id: selectedTopic.id,
              title: selectedTopic.title,
              slug: selectedTopic.slug,
            },
          ],
          topicSpecific: {
            ...prevData.topicSpecific,
            [selectedTopic.slug]: [],
          },
        }));
        event.target.blur(); // Remove o foco do select
      }
    }

    event.target.value = ""; // Limpa o valor selecionado
  };

  const handleSpecificSelectChange = (
    event: ChangeEvent<HTMLSelectElement>,
    generalTopicSlug: any,
  ) => {
    const { value } = event.target;
    const selectedSpecificTopic = experimentGeneralData
      .find((topic) => topic.slug === generalTopicSlug)
      ?.topicSpecific.find((topic) => topic.slug === value);

    if (selectedSpecificTopic) {
      setExperimentData((prevData: any) => {
        const updatedTopicSpecific = {
          ...prevData.topicSpecific,
          [generalTopicSlug]: [
            ...(prevData.topicSpecific[generalTopicSlug] || []),
            {
              id: selectedSpecificTopic.id,
              title: selectedSpecificTopic.title,
              slug: selectedSpecificTopic.slug,
            },
          ],
        };

        return {
          ...prevData,
          topicSpecific: updatedTopicSpecific,
        };
      });
      event.target.blur(); // Remove o foco do select
    }

    event.target.value = ""; // Limpa o valor selecionado
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setExperimentData({
      ...experimentData,
      [name]: value,
    });
  };

  const handleRemoveGeneralTopic = (id: number, generalTopicSlug: any) => {
    setExperimentData((prevData) => {
      const updatedTopicSpecific = { ...prevData.topicSpecific };
      delete updatedTopicSpecific[generalTopicSlug];

      return {
        ...prevData,
        topicGeneral: prevData.topicGeneral.filter(
          (topic: Topic) => topic.id !== id,
        ),
        topicSpecific: updatedTopicSpecific,
      };
    });
  };

  const handleRemoveSpecificTopic = (id: number, generalTopicSlug: any) => {
    setExperimentData((prevData: any) => ({
      ...prevData,
      topicSpecific: {
        ...prevData.topicSpecific,
        [generalTopicSlug]: prevData.topicSpecific[generalTopicSlug].filter(
          (topic: SpecificTopic) => topic.id !== id,
        ),
      },
    }));
  };

  const isGeneralTopicSelected = (slug: any) => {
    return experimentData.topicGeneral.some(
      (topic: Topic) => topic.slug === slug,
    );
  };

  const isSpecificTopicSelected = (slug: any) => {
    return Object.values(experimentData.topicSpecific).some(
      (topics: SpecificTopic[]) =>
        topics.some((topic: SpecificTopic) => topic.slug === slug),
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const experimentJson = JSON.stringify({
      ...experimentData,
    });
    console.log(experimentJson);
  };

  interface Objective {
    id: number;
    objectiveText: string;
    content: string;
  }

  const [tempObjectives, setTempObjectives] = useState<Objective[]>([]);
  const [nextId, setNextId] = useState(1);

  const handleDeleteObjective = (id: number) => {
    setTempObjectives((prevObjectives) =>
      prevObjectives.filter((obj) => obj.id !== id),
    );
    setExperimentData((prevData: any) => ({
      ...prevData,
      objectives: prevData.objectives.filter((obj: any) => obj.id !== id),
    }));
  };

  const handleAddEmptyObjective = () => {
    if (tempObjectives.length < 5) {
      const newObj: Objective = { id: nextId, objectiveText: "", content: "" };
      setTempObjectives((prevObjectives) => [...prevObjectives, newObj]);
      setExperimentData((prevData: any) => ({
        ...prevData,
        objectives: [...prevData.objectives, { id: nextId, content: "" }],
      }));
      setNextId((prevId) => prevId + 1);
    }
  };

  const handleObjectiveChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    id: number,
  ) => {
    const { value } = event.target;
    const updatedObjectives = tempObjectives.map((obj) =>
      obj.id === id ? { ...obj, objectiveText: value } : obj,
    );
    setTempObjectives(updatedObjectives);
    setExperimentData((prevData: any) => ({
      ...prevData,
      objectives: prevData.objectives.map((obj: any) =>
        obj.id === id ? { ...obj, content: value } : obj,
      ),
    }));
  };

  interface Material {
    id: number;
    materialText: string;
    content: string;
  }

  const [tempMaterials, setTempMaterials] = useState<Material[]>([]);
  const [nextMaterialId, setNextMaterialId] = useState(1);

  const handleDeleteMaterial = (id: number) => {
    setTempMaterials((prevMaterials) =>
      prevMaterials.filter((material) => material.id !== id),
    );
    setExperimentData((prevData: any) => ({
      ...prevData,
      materials: prevData.materials.filter(
        (material: any) => material.id !== id,
      ),
    }));
  };

  const handleAddEmptyMaterial = () => {
    if (tempMaterials.length < 25) {
      const newMaterial: Material = {
        id: nextMaterialId,
        materialText: "",
        content: "",
      };
      setTempMaterials((prevMaterials) => [...prevMaterials, newMaterial]);
      setExperimentData((prevData: any) => ({
        ...prevData,
        materials: [...prevData.materials, { id: nextMaterialId, content: "" }],
      }));
      setNextMaterialId((prevId) => prevId + 1);
    }
  };

  const handleMaterialChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const { value } = event.target;
    const updatedMaterials = tempMaterials.map((material) =>
      material.id === id ? { ...material, materialText: value } : material,
    );
    setTempMaterials(updatedMaterials);
    setExperimentData((prevData: any) => ({
      ...prevData,
      materials: prevData.materials.map((material: any) =>
        material.id === id ? { ...material, content: value } : material,
      ),
    }));
  };

  interface Reference {
    id: number;
    referenceText: string;
    content: string;
  }

  const [tempReferences, setTempReferences] = useState<Reference[]>([]);
  const [nextReferenceId, setNextReferenceId] = useState(1);

  const handleDeleteReference = (id: number) => {
    setTempReferences((prevReferences) =>
      prevReferences.filter((reference) => reference.id !== id),
    );
    setExperimentData((prevData: any) => ({
      ...prevData,
      references: prevData.references.filter(
        (reference: any) => reference.id !== id,
      ),
    }));
  };

  const handleAddEmptyReference = () => {
    if (tempReferences.length < 5) {
      const newReference: Reference = {
        id: nextReferenceId,
        referenceText: "",
        content: "",
      };
      setTempReferences((prevReferences) => [...prevReferences, newReference]);
      setExperimentData((prevData: any) => ({
        ...prevData,
        references: [
          ...prevData.references,
          { id: nextReferenceId, content: "" },
        ],
      }));
      setNextReferenceId((prevId) => prevId + 1);
    }
  };

  const handleReferenceChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    id: number,
  ) => {
    const { value } = event.target;
    const updatedReferences = tempReferences.map((reference) =>
      reference.id === id ? { ...reference, referenceText: value } : reference,
    );
    setTempReferences(updatedReferences);
    setExperimentData((prevData: any) => ({
      ...prevData,
      references: prevData.references.map((reference: any) =>
        reference.id === id ? { ...reference, content: value } : reference,
      ),
    }));
  };

  // Declaração da constante fora da função handleGenerateId
  const [experimentId, setExperimentId] = useState("");

  const handleGenerateId = useCallback(() => {
    const date = new Date();
    const formattedDate = format(date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
      locale: ptBR,
    });
    const generatedId = Date.now().toString();
    setExperimentData((prevData) => ({
      ...prevData,
      id: generatedId,
      postDate: formattedDate,
    }));
    setExperimentId(generatedId); // Atualiza o valor do ID no estado
  }, []);

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [passos, setPassos] = useState([]);
  const [pullRequestUrl, setPullRequestUrl] = useState(""); // Definindo o estado inicial como uma string vazia

  async function handleSend() {
    setIsSending(true);
    setPassos([]);

    const passosRealizados = document.getElementById("passos-realizados");

    const adicionarPasso = (passo: string, sucesso: boolean) => {
      if (passosRealizados) {
        const item = document.createElement("li");
        item.textContent = passo;
        item.style.color = sucesso ? "green" : "red";
        passosRealizados.appendChild(item);
      }
    };

    try {
      // Lógica para enviar os dados e obter os passos
      const octokitClient = new Octokit({
        auth: apiToken,
      });

      const newBranchName = `experiment-update-${experimentId}`;

      const baseRepositoryOwnerName = "fellippemfv";
      const baseRepositoryName = "my-science-project";
      const baseBranchName = "add-experiment";

      // Json
      const filePath = "src/app/api/data/experimentos.json";
      const fileContent = JSON.stringify(experimentData, null, 2);

      adicionarPasso("Criando o fork do repositório original...", true);
      // Cria o fork do repositório original
      console.log("Criando o fork do repositório original...");
      const { data: fork } = await octokitClient.repos.createFork({
        owner: baseRepositoryOwnerName,
        repo: baseRepositoryName,
      });
      adicionarPasso("Fork criado com sucesso!", true);
      console.log("Fork criado com sucesso!");

      const forkOwner = fork.owner.login;

      adicionarPasso(
        "Esperando alguns segundos para garantir que as informações do fork estejam atualizadas...",
        true,
      );
      // Espera alguns segundos para garantir que as informações do fork estejam atualizadas
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Verifica se a branch "new-experiment" existe no fork
      adicionarPasso(
        `Verificando a existência da branch "${baseBranchName}" no fork...`,
        true,
      );
      console.log(
        `Verificando a existência da branch "${baseBranchName}" no fork...`,
      );
      let { data } = await octokitClient.repos.getBranch({
        owner: forkOwner,
        repo: baseRepositoryName,
        branch: baseBranchName,
      });

      if (!data) {
        // Cria a branch "new-experiment" no fork se ela não existir
        adicionarPasso(
          `A branch "${baseBranchName}" não existe no fork. Criando a branch...`,
          true,
        );

        console.log(
          `A branch "${baseBranchName}" não existe no fork. Criando a branch...`,
        );
        const baseBranch = await octokitClient.repos.getBranch({
          owner: baseRepositoryOwnerName,
          repo: baseRepositoryName,
          branch: baseBranchName,
        });
        const baseCommitSha = baseBranch.data.commit.sha;

        await octokitClient.git.createRef({
          owner: forkOwner,
          repo: baseRepositoryName,
          ref: `refs/heads/${baseBranchName}`,
          sha: baseCommitSha,
        });

        // Aguarda alguns segundos para garantir que a branch seja criada no fork
        adicionarPasso(
          "Aguardando alguns segundos para garantir que a branch já esteja criada no fork...",
          true,
        );

        await new Promise((resolve) => setTimeout(resolve, 5000));

        adicionarPasso(
          `Verificando se existe a branche '${baseBranchName}' no fork...`,
          true,
        );

        // Obtém novamente as informações da branch no fork
        ({ data } = await octokitClient.repos.getBranch({
          owner: forkOwner,
          repo: baseRepositoryName,
          branch: baseBranchName,
        }));
      }

      adicionarPasso(`Branch "${baseBranchName}" encontrada no fork!`, true);
      console.log(
        `Branch "${baseBranchName}" encontrada no fork. Continuando com o código...`,
      );
      const baseCommitSha = data.commit.sha;

      // Cria a nova branch com base na branch "test" do fork
      adicionarPasso(
        "Criando a nova branch com base na branch 'test' do fork...",
        true,
      );

      const { data: newBranch } = await octokitClient.git.createRef({
        owner: forkOwner,
        repo: baseRepositoryName,
        ref: `refs/heads/${newBranchName}`,
        sha: baseCommitSha,
      });

      adicionarPasso("Branch nova do fork criada com sucesso!", true);
      console.log(
        "Branch nova do fork, usando como base 'test', criada com sucesso!",
      );

      /* const newBranchSha = newBranch.object.sha; */

      adicionarPasso(
        `Buscando o conteúdo atual do arquivo na branch '${baseBranchName}' do fork...`,
        true,
      );
      // Busca o conteúdo atual do arquivo na branch "test" do fork
      const fileInfo = await octokitClient.repos.getContent({
        owner: forkOwner,
        repo: baseRepositoryName,
        path: filePath,
        ref: baseBranchName,
      });

      adicionarPasso("Busca pelo conteúdo atual realizada com sucesso!", true);

      console.log("selectedImage na funcao de upload" + selectedImage);

      console.log("iniciando a adicao de imagem");

      const handleImageUpload = async () => {
        console.log("Conteúdo de selectedImage:", selectedImage);
      
        if (selectedImage) {
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64String = reader.result as string | null;
            if (base64String !== null) {
              // Remover o prefixo do URI de dados
              const base64Content = base64String.split(",")[1];
              console.log("Base64 da imagem:", base64Content);
      
              const imagePath = `public/${experimentId}/images/${selectedImage.name}`;
      
              // Verificar se o arquivo já existe no repositório
              let fileSha;
              try {
                const response = await octokitClient.repos.getContent({
                  owner: forkOwner,
                  repo: baseRepositoryName,
                  path: imagePath,
                  ref: newBranchName,
                });
      
                // Verificar se é um arquivo (type === "file")
                if (response.data && !Array.isArray(response.data) && response.data.type === "file") {
                  fileSha = response.data.sha;
                } else {
                  // Não é um arquivo válido (pode ser um diretório ou outro tipo)
                  throw new Error("O conteúdo obtido não é um arquivo válido.");
                }
              } catch (error: any) {
                if (error.status !== 404) {
                  adicionarPasso("Erro ao verificar existência do arquivo no GitHub.", false);
                  console.error(error);
                  return;
                }
              }
      
              // Upload da imagem
              adicionarPasso(`Realizando o upload da imagem ${imagePath}...`, true);
              try {
                await octokitClient.repos.createOrUpdateFileContents({
                  owner: forkOwner,
                  repo: baseRepositoryName,
                  path: imagePath,
                  message: `Add image for experiment N° ${experimentId}`,
                  content: base64Content,
                  branch: newBranchName,
                  sha: fileSha, // Incluir SHA se o arquivo já existir
                });
                adicionarPasso(`Imagem ${imagePath} adicionada com sucesso!`, true);
              } catch (error: any) {
                console.error(error);
                adicionarPasso("Erro ao fazer upload da imagem para o GitHub.", false);
              }
            } else {
              adicionarPasso("Erro ao converter imagem para base64.", false);
            }
          };
          reader.onerror = () => {
            adicionarPasso("Erro ao ler o arquivo.", false);
          };
          reader.readAsDataURL(selectedImage);
        } else {
          adicionarPasso("Nenhuma imagem selecionada.", false);
        }
      };
      
      // Chama a função handleImageUpload
      await handleImageUpload();
      
      
      const handleImageUploadMethod = async () => {
        console.log("Iniciando o upload de imagens...");
      
        // Iterar sobre cada imagem em previewImages
        for (let i = 0; i < previewImages.length; i++) {
          const base64String = previewImages[i];
      
          // Remover o prefixo do URI de dados
          const base64Content = base64String.split(",")[1];
          console.log("Base64 da imagem:", base64Content);
      
          // Obter o nome da imagem usando a mesma lógica que você já tem
          const imageName = tempMethods[i].imagePath.split("/").pop() || "";
      
          // Montar o caminho da imagem sem barra inicial
          const imagePath = `public/${experimentId}/images/${imageName}`;



      
          // Upload da imagem
          adicionarPasso(`Realizando o upload da imagem ${imagePath}...`, true);
          try {
            await octokitClient.repos.createOrUpdateFileContents({
              owner: forkOwner,
              repo: baseRepositoryName,
              path: imagePath,
              message: `Add image for experiment N° ${experimentId}`,
              content: base64Content,
              branch: newBranchName,
            });
      
            adicionarPasso(`Imagem ${imagePath} adicionada com sucesso!`, true);
          } catch (error) {
            console.error("Erro ao fazer upload da imagem:", error);
            adicionarPasso(`Erro ao fazer upload da imagem ${imagePath}`, false);
          }
        }
        console.log("Upload de imagens concluído!");
      };
      
      // Chama a função handleImageUploadMethod
      await handleImageUploadMethod();

      // Chama a função handleDocumentUploadOne
      const handleDocumentUploadOne = async () => {
        console.log('Iniciando o upload de documentos...');
      
        if (!selectedDocumentOne) {
          console.error('Nenhum documento selecionado.');
          return;
        }
      
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result as string | null;
          if (!base64String) {
            console.error('Erro ao ler o arquivo.');
            return;
          }
      
          const base64Content = base64String.split(',')[1];
          console.log('Base64 do documento:', base64Content);
      
          const documentPath = `public/${experimentData.id}/documents/${selectedDocumentOne.name}`;
      
          let fileSha = '';
      
          // Função para obter a SHA mais recente do arquivo
          const getFileSha = async (path: string) => {
            try {
              const { data } = await octokitClient.repos.getContent({
                owner: forkOwner,
                repo: baseRepositoryName,
                path: path,
                ref: newBranchName,
              });
      
              if (Array.isArray(data)) {
                console.error('O caminho especificado parece ser um diretório, não um arquivo.');
                return '';
              }
      
              return data.sha;
            } catch (error: any) {  // Aqui foi alterado para `any`
              if (error.status === 404) {
                return ''; // Arquivo não existe
              } else {
                console.error('Erro ao verificar existência do arquivo no GitHub:', error);
                throw error;
              }
            }
          };
      
          try {
            fileSha = await getFileSha(documentPath);
          } catch (error: any) {  // Aqui foi alterado para `any`
            console.error('Erro ao obter SHA do arquivo:', error);
            return;
          }
      
          try {
            await octokitClient.repos.createOrUpdateFileContents({
              owner: forkOwner,
              repo: baseRepositoryName,
              path: documentPath,
              message: `Add document for experiment N° ${experimentData.id}`,
              content: base64Content,
              branch: newBranchName,
              sha: fileSha, // Incluir SHA se o arquivo já existir
            });
      
            console.log(`Documento ${documentPath} adicionado com sucesso!`);
          } catch (error: any) {  // Aqui foi alterado para `any`
            console.error('Erro ao fazer upload do documento para o GitHub:', error);
          }
        };
      
        reader.onerror = () => {
          console.error('Erro ao ler o arquivo.');
        };
      
        reader.readAsDataURL(selectedDocumentOne);
      };
      
      await handleDocumentUploadOne();

      // Chama a função handleDocumentUploadTwo
      const handleDocumentUploadTwo = async () => {
        console.log('Iniciando o upload de documentos...');
      
        if (!selectedDocumentTwo) {
          console.error('Nenhum documento selecionado.');
          return;
        }
      
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result as string | null;
          if (!base64String) {
            console.error('Erro ao ler o arquivo.');
            return;
          }
      
          const base64Content = base64String.split(',')[1];
          console.log('Base64 do documento:', base64Content);
      
          const documentPath = `public/${experimentData.id}/documents/${selectedDocumentTwo.name}`;
      
          let fileSha = '';
      
          // Função para obter a SHA mais recente do arquivo
          const getFileSha = async (path: string) => {
            try {
              const { data } = await octokitClient.repos.getContent({
                owner: forkOwner,
                repo: baseRepositoryName,
                path: path,
                ref: newBranchName,
              });
      
              if (Array.isArray(data)) {
                console.error('O caminho especificado parece ser um diretório, não um arquivo.');
                return '';
              }
      
              return data.sha;
            } catch (error: any) {  // Aqui foi alterado para `any`
              if (error.status === 404) {
                return ''; // Arquivo não existe
              } else {
                console.error('Erro ao verificar existência do arquivo no GitHub:', error);
                throw error;
              }
            }
          };
      
          try {
            fileSha = await getFileSha(documentPath);
          } catch (error: any) {  // Aqui foi alterado para `any`
            console.error('Erro ao obter SHA do arquivo:', error);
            return;
          }
      
          try {
            await octokitClient.repos.createOrUpdateFileContents({
              owner: forkOwner,
              repo: baseRepositoryName,
              path: documentPath,
              message: `Add document for experiment N° ${experimentData.id}`,
              content: base64Content,
              branch: newBranchName,
              sha: fileSha, // Incluir SHA se o arquivo já existir
            });
      
            console.log(`Documento ${documentPath} adicionado com sucesso!`);
          } catch (error: any) {  // Aqui foi alterado para `any`
            console.error('Erro ao fazer upload do documento para o GitHub:', error);
          }
        };
      
        reader.onerror = () => {
          console.error('Erro ao ler o arquivo.');
        };
      
        reader.readAsDataURL(selectedDocumentTwo);
      };
      await handleDocumentUploadTwo();
      
      // Chama a função handleDocumentUploadThree
      const handleDocumentUploadThree = async () => {
        console.log('Iniciando o upload de documentos...');
      
        if (!selectedDocumentThree) {
          console.error('Nenhum documento selecionado.');
          return;
        }
      
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result as string | null;
          if (!base64String) {
            console.error('Erro ao ler o arquivo.');
            return;
          }
      
          const base64Content = base64String.split(',')[1];
          console.log('Base64 do documento:', base64Content);
      
          const documentPath = `public/${experimentData.id}/documents/${selectedDocumentThree.name}`;
      
          let fileSha = '';
      
          // Função para obter a SHA mais recente do arquivo
          const getFileSha = async (path: string) => {
            try {
              const { data } = await octokitClient.repos.getContent({
                owner: forkOwner,
                repo: baseRepositoryName,
                path: path,
                ref: newBranchName,
              });
      
              if (Array.isArray(data)) {
                console.error('O caminho especificado parece ser um diretório, não um arquivo.');
                return '';
              }
      
              return data.sha;
            } catch (error: any) {  // Aqui foi alterado para `any`
              if (error.status === 404) {
                return ''; // Arquivo não existe
              } else {
                console.error('Erro ao verificar existência do arquivo no GitHub:', error);
                throw error;
              }
            }
          };
      
          try {
            fileSha = await getFileSha(documentPath);
          } catch (error: any) {  // Aqui foi alterado para `any`
            console.error('Erro ao obter SHA do arquivo:', error);
            return;
          }
      
          try {
            await octokitClient.repos.createOrUpdateFileContents({
              owner: forkOwner,
              repo: baseRepositoryName,
              path: documentPath,
              message: `Add document for experiment N° ${experimentData.id}`,
              content: base64Content,
              branch: newBranchName,
              sha: fileSha, // Incluir SHA se o arquivo já existir
            });
      
            console.log(`Documento ${documentPath} adicionado com sucesso!`);
          } catch (error: any) {  // Aqui foi alterado para `any`
            console.error('Erro ao fazer upload do documento para o GitHub:', error);
          }
        };
      
        reader.onerror = () => {
          console.error('Erro ao ler o arquivo.');
        };
      
        reader.readAsDataURL(selectedDocumentThree);
      };
      await handleDocumentUploadThree();

      const handleApplyingCommentsAndPullRequest = async () => {
        adicionarPasso("Adicionando sugestão de novo experimento...", true);
        // Decodifica o conteúdo atual para uma string
        const currentContent = Array.isArray(fileInfo.data)
          ? undefined
          : fileInfo.data.type === "file" && fileInfo.data.content
            ? Buffer.from(fileInfo.data.content, "base64").toString()
            : undefined;
  
        // Converte o conteúdo atual em um array de objetos JSON
        const currentArray = currentContent ? JSON.parse(currentContent) : [];
  
        // Converte o novo conteúdo em um objeto JSON
        const newObject = JSON.parse(fileContent);
  
        // Adiciona o novo objeto ao array existente
        currentArray.push(newObject);
  
        // Converte o array atualizado de volta em uma string JSON
        const updatedContent = JSON.stringify(currentArray, null, 2);
        adicionarPasso("Sugestão adicionada com sucesso!", true);
  
        adicionarPasso("Criando um novo commit...", true);
        // Cria um novo commit com os dados atualizados
        const { data: newCommit } = await octokitClient.git.createCommit({
          owner: forkOwner,
          repo: baseRepositoryName,
          message: `Send experiment N° ${experimentId}`,
          tree: data.commit.commit.tree.sha,
          parents: [baseCommitSha],
          author: {
            name: "Your Name",
            email: "your.email@example.com",
          },
          committer: {
            name: "Your Name",
            email: "your.email@example.com",
          },
          content: Buffer.from(updatedContent).toString("base64"),
        });
  
        adicionarPasso("Novo commit realizado com sucesso!", true);
  
        const newCommitSha = newCommit.sha;
  
        // Verifica se fileInfo é um objeto único ou uma matriz de objetos
        const fileInfoArray = Array.isArray(fileInfo.data)
          ? fileInfo.data
          : [fileInfo.data];
  
        // Verifica se o primeiro elemento do array possui a propriedade 'sha'
        if (fileInfoArray.length > 0 && "sha" in fileInfoArray[0]) {
          // Acessa a propriedade 'sha' do primeiro elemento do array
          const sha = fileInfoArray[0].sha;
  
          // Atualiza o conteúdo do arquivo na nova branch do fork
          adicionarPasso(
            "Atualizando o conteúdo do arquivo na nova branch do fork...",
            true,
          );
          await octokitClient.repos.createOrUpdateFileContents({
            owner: forkOwner,
            repo: baseRepositoryName,
            path: filePath,
            message: `Update experiment data for experiment N° ${experimentId}`,
            content: Buffer.from(updatedContent).toString("base64"),
            branch: newBranchName,
            sha,
          });
  
          adicionarPasso("Conteúdo do arquivo atualizado com sucesso!", true);
          console.log("Dados adicionados à nova branch do fork com sucesso!");
        } else {
          // Trata o caso em que a propriedade 'sha' não está presente
          console.error(
            "A propriedade 'sha' não está presente no objeto fileInfo.",
          );
          adicionarPasso(
            "A propriedade 'sha' não está presente no objeto fileInfo.",
            false,
          );
        }
  
        adicionarPasso(
          "Mesclando os commits da branch de destino do fork na nova branch do fork...",
          true,
        );
        // Mescla os commits da branch de destino do fork na nova branch do fork
        const mergeResponse = await octokitClient.repos.merge({
          owner: forkOwner,
          repo: baseRepositoryName,
          base: newBranchName,
          head: baseBranchName,
        });
  
        adicionarPasso("Commits mesclados com sucesso!", true);
        console.log("Commits mesclados com sucesso!");
  
        adicionarPasso(
          "Criando uma pull request para mesclar as alterações da nova branch do fork na branch 'test' do repositório original...",
          true,
        );
        // Cria uma pull request para mesclar as alterações da nova branch do fork na branch "test" do repositório original
        const pullRequest = await octokitClient.pulls.create({
          owner: baseRepositoryOwnerName,
          repo: baseRepositoryName,
          title: `Update experiment data for experiment N° ${experimentId}`,
          body: "Please review and approve this update to the experiment data.",
          head: `${forkOwner}:${newBranchName}`,
          base: baseBranchName,
        });
  
        adicionarPasso("Pull request criada com sucesso!", true);
        console.log("Pull request criada com sucesso!");
  
        adicionarPasso("Pronto você enviou seu experimento!", true);
  
        // Exibe o link para a pull request criada
        const pullRequestUrl = pullRequest.data.html_url;
        adicionarPasso(`Link da pull request: ${pullRequestUrl}`, true);
  
        // Exemplo de setar a URL da pull request no final
        setPullRequestUrl(`${pullRequestUrl}`);
      };

      // Chama a função handleApplyingCommentsAndPullRequest
      await handleApplyingCommentsAndPullRequest();
     
    } catch (error) {
      console.error("Erro ao enviar experimento.", error);
      adicionarPasso("Erro ao enviar experimento." + `${error}`, false);
      // Lidar com erros
    } finally {
      setIsSending(false);
      setIsSent(true);
      if (successRef.current) {
        successRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  const generateSlug = useCallback(() => {
    const specialCharsMap: Record<string, string> = {
      á: "a",
      à: "a",
      ã: "a",
      â: "a",
      é: "e",
      ê: "e",
      í: "i",
      ó: "o",
      õ: "o",
      ô: "o",
      ú: "u",
      ü: "u",
      ç: "c",
    };

    const titleWithoutSpecialChars = experimentData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, (match: string) => {
        const replacement = specialCharsMap[match];
        return replacement || "";
      });

    return titleWithoutSpecialChars
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "");
  }, [experimentData.title]);

  useEffect(() => {
    setExperimentData((prevData) => ({
      ...prevData,
      slug: generateSlug(),
    }));
  }, [experimentData.title, generateSlug]);

  useEffect(() => {
    handleGenerateId();
  }, [handleGenerateId]);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null);
  const [isImageConfirmed, setIsImageConfirmed] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    let uploadProgress: NodeJS.Timeout | null = null;

    if (selectedImage) {
      setUploadStatus("Uploading... 0%");

      // Simulando o progresso do upload
      uploadProgress = setInterval(() => {
        console.log("imagem selecionada: " + selectedImage?.name);

        setUploadStatus((prevStatus) => {
          const progress = parseInt(prevStatus.split(" ")[1]);
          const newProgress = progress + 100;
          if (newProgress >= 100) {
            clearInterval(uploadProgress!);
            return "Upload completed! 100%";
          }
          return `Uploading... ${newProgress}%`;
        });
      }, 200);
    }

    return () => {
      if (uploadProgress) {
        clearInterval(uploadProgress);
      }
    };
  }, [selectedImage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);

    if (file) {
      setSelectedImage(file);
      const imageURL = URL.createObjectURL(file);
      setImagePreviewURL(imageURL);
      setIsImageConfirmed(true);
      uploadImage(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreviewURL(null);
    setIsImageConfirmed(false);
    setUploadStatus("");

    // Limpe a propriedade imagePreview do estado experimentData
    // setExperimentData((prevState: any) => ({
    //   ...prevState,
    //   imagePreview: "",
    // }));

    // Redefinir o valor do input file para null
    const imageInputElement = document.getElementById(
      "imageUpload",
    ) as HTMLInputElement;
    if (imageInputElement) {
      imageInputElement.value = "";
    }
  };

  const uploadImage = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      // Cria o link dinâmico da imagem
      const imagePath = `/${experimentData.id}/images/${file.name}`;
      

      // Atualiza o estado imagePath com o link dinâmico da imagem
       setExperimentData((prevState: any) => ({
         ...prevState,
         imagePreview: imagePath,
       }));
    };

    reader.readAsDataURL(file);
  };

  //Documento-1
  const [selectedDocumentOne, setSelectedDocumentOne] = useState<File | null>(null);
  const [documentPreviewURLOne, setDocumentPreviewURLOne] = useState<string | null>(null);
  const [isDocumentConfirmedOne, setIsDocumentConfirmedOne] = useState(false);

   //Documento-2
   const [selectedDocumentTwo, setSelectedDocumentTwo] = useState<File | null>(null);
   const [documentPreviewURLTwo, setDocumentPreviewURLTwo] = useState<string | null>(null);
   const [isDocumentConfirmedTwo, setIsDocumentConfirmedTwo] = useState(false);

     //Documento-3
     const [selectedDocumentThree, setSelectedDocumentThree] = useState<File | null>(null);
     const [documentPreviewURLThree, setDocumentPreviewURLThree] = useState<string | null>(null);
     const [isDocumentConfirmedThree, setIsDocumentConfirmedThree] = useState(false);


  const handleDocumentChangeOne = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);

    if (file) {
      setSelectedDocumentOne(file);
      const documentURL = URL.createObjectURL(file);
      setDocumentPreviewURLOne(documentURL);
      setIsDocumentConfirmedOne(true);
      uploadDocumentOne(file);
    }
  };

  const handleRemoveDocumentOne = () => {
    setSelectedDocumentOne(null);
    setDocumentPreviewURLOne(null);
    setIsDocumentConfirmedOne(false);
    setUploadStatus('');
    
    // Limpe a propriedade activitySheetOne do estado experimentData
    setExperimentData((prevState) => ({
      ...prevState,
      activitySheetOne: '',
    }));

    // Redefinir o valor do input file para null
    const documentInputElement = document.getElementById('documentUploadOne') as HTMLInputElement;
    if (documentInputElement) {
      documentInputElement.value = '';
    }
  };

  const uploadDocumentOne = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      // Cria o link dinâmico do documento
      const documentPath = `/${experimentData.id}/documents/${file.name}`

      // Atualiza o estado activitySheetOne com o link dinâmico do documento
      setExperimentData((prevState) => ({
        ...prevState,
        activitySheetOne: documentPath,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleDocumentChangeTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);

    if (file) {
      setSelectedDocumentTwo(file);
      const documentURL = URL.createObjectURL(file);
      setDocumentPreviewURLTwo(documentURL);
      setIsDocumentConfirmedTwo(true);
      uploadDocumentTwo(file);
    }
  };

  const handleRemoveDocumentTwo = () => {
    setSelectedDocumentTwo(null);
    setDocumentPreviewURLTwo(null);
    setIsDocumentConfirmedTwo(false);
    setUploadStatus('');
    
    // Limpe a propriedade activitySheetTwo do estado experimentData
    setExperimentData((prevState) => ({
      ...prevState,
      activitySheetTwo: '',
    }));

    // Redefinir o valor do input file para null
    const documentInputElement = document.getElementById('documentUploadTwo') as HTMLInputElement;
    if (documentInputElement) {
      documentInputElement.value = '';
    }
  };

  const uploadDocumentTwo = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      // Cria o link dinâmico do documento
      const documentPath = `/${experimentData.id}/documents/${file.name}`

      // Atualiza o estado activitySheetTwo com o link dinâmico do documento
      setExperimentData((prevState) => ({
        ...prevState,
        activitySheetTwo: documentPath,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleDocumentChangeThree = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);

    if (file) {
      setSelectedDocumentThree(file);
      const documentURL = URL.createObjectURL(file);
      setDocumentPreviewURLThree(documentURL);
      setIsDocumentConfirmedThree(true);
      uploadDocumentThree(file);
    }
  };

  const handleRemoveDocumentThree = () => {
    setSelectedDocumentThree(null);
    setDocumentPreviewURLThree(null);
    setIsDocumentConfirmedThree(false);
    setUploadStatus('');
    
    // Limpe a propriedade activitySheetThree do estado experimentData
    setExperimentData((prevState) => ({
      ...prevState,
      activitySheetThree: '',
    }));

    // Redefinir o valor do input file para null
    const documentInputElement = document.getElementById('documentUploadThree') as HTMLInputElement;
    if (documentInputElement) {
      documentInputElement.value = '';
    }
  };

  const uploadDocumentThree = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      // Cria o link dinâmico do documento
      const documentPath = `/${experimentData.id}/documents/${file.name}`

      // Atualiza o estado activitySheetThree com o link dinâmico do documento
      setExperimentData((prevState) => ({
        ...prevState,
        activitySheetThree: documentPath,
      }));
    };

    reader.readAsDataURL(file);
  };

  interface Method {
    id: number;
    content: string;
    imagePath: string; // Adiciona a rota da imagem ao objeto Method
  }

  const [tempMethods, setTempMethods] = useState<Method[]>([]);
  const [newMethod, setNewMethod] = useState("");
  const [newMethodVisible, setNewMethodVisible] = useState(false);
  const [editMethod, setEditMethod] = useState<Method | null>(null);
  const [imageInputsCount, setImageInputsCount] = useState(1);
  const [nextMethodId, setNextMethodId] = useState(1);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [methodContent, setMethodContent] = useState<string>("");

  const handleMethodTextChange = (
    index: number,
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;

    // Atualiza o conteúdo do método em tempMethods
    const updatedMethods = [...tempMethods];
    updatedMethods[index] = { ...updatedMethods[index], content: value };
    setTempMethods(updatedMethods);

    // Atualiza experimentData.methods com o novo conteúdo
    setExperimentData((prevData: any) => {
      const updatedData = {
        ...prevData,
        methods: updatedMethods,
      };
      return updatedData;
    });
  };

  const handleAddMethod = () => {
    const newMethodObj: Method = {
      id: nextMethodId,
      content: newMethod,
      imagePath: "",
    };
    setTempMethods((prevMethods) => [...prevMethods, newMethodObj]);
    setExperimentData((prevData: any) => {
      const newMethods = [
        ...prevData.methods,
        { id: nextMethodId, content: newMethod, imagePath: "" },
      ];
      return { ...prevData, methods: newMethods };
    });

    setNewMethod("");
    setNewMethodVisible(false);
    setNextMethodId((prevId) => prevId + 1);
  };

  const handleDeleteMethod = (id: number, index: number) => {
    const methodToDelete = tempMethods.find((method) => method.id === id);
    const hasImage = methodToDelete && methodToDelete.imagePath !== "";

    // Remove a imagem se existir
    if (hasImage) {
      handleRemoveImageMethod(index);
    }

    // Remove o método pelo ID
    setTempMethods((prevMethods) =>
      prevMethods.filter((method) => method.id !== id),
    );

    // Atualiza os índices dos métodos restantes
    setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageInputsCount((prevCount) => prevCount - 1);

    // Remove o método em experimentData.methods
    setExperimentData((prevData) => ({
      ...prevData,
      methods: prevData.methods.filter((m: any) => m.id !== id),
    }));
  };

  const handleMethodImageChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;

    if (files) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64Data = reader.result as string;
        const imageName = files[0].name;
        const imagePath = `/${experimentData.id}/images/${imageName}`;

        const updatedMethods = tempMethods.map((method, i) => {
          if (i === index) {
            return { ...method, imagePath };
          }
          return method;
        });

        setTempMethods(updatedMethods);
        setPreviewImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[index] = base64Data;
          return updatedImages;
        });

        // Atualiza o experimentData.methods com o caminho da imagem
        setExperimentData((prevData: any) => {
          const updatedData = {
            ...prevData,
            methods: (prevData.methods as any[]).map((m) => {
              if (m.id === updatedMethods[index].id) {
                return { ...m, imagePath };
              }
              return m;
            }),
          };
          return updatedData;
        });
      };

      reader.readAsDataURL(files[0]);
    }
  };

  const handleRemoveImageMethod = (index: number) => {
    const updatedMethods = [...tempMethods];
    updatedMethods[index] = { ...updatedMethods[index], imagePath: "" };
    setTempMethods(updatedMethods);

    setPreviewImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = "";
      return updatedImages;
    });

    // Redefine o valor do input file para permitir carregar a mesma imagem novamente
    const fileInput = document.getElementById(
      `imageMethod${index + 1}Upload`,
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    setImageInputsCount((prevCount) => prevCount - 1);

    setExperimentData((prevData: any) => ({
      ...prevData,
      methods: prevData.methods.map((m: any) => {
        if (m.id === updatedMethods[index].id) {
          return { ...m, imagePath: "" };
        }
        return m;
      }),
    }));
  };

  return (
    <>
      <div className="">
      <div className="flex flex-col gap-10">
          <form onSubmit={handleSubmit}>
            <div className="m-4 sm:m-0">
            {!pullRequestUrl && (
  <>
                <div className="border border-gray-300 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">
                  Chave da API do Github
                </h2>
                <input
                  type="text"
                  value={apiToken}
                  onChange={handleTokenChange}
                  placeholder="Digite o token da API do Github"
                  className={`border border-gray-300 rounded-lg p-2 mb-2 w-full ${isEditing ? "" : "opacity-50 cursor-not-allowed"}`}
                  disabled={!isEditing}
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleEditClick}
                    className={`bg-blue-600 ${isEditing ? "hover:bg-blue-700" : ""} text-white py-2 px-4 rounded-lg mr-2 ${isEditing ? "px-4 py-2 mr-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-600" : ""}`}
                  >
                    {isEditing ? "Concluir" : "Editar código"}
                  </button>
                  <button
                    onClick={handleTestClick}
                    className={`bg-purple-600 ${isEditing ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"} 
                     text-white py-2 px-4 rounded-lg ${isEditing || isLoading ? "disabled:opacity-50 disabled:cursor-not-allowed" : ""}`}
                    disabled={isEditing || isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 mr-2 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin opacity-50 cursor-not-allowed"></div>
                        <span>Aguarde</span>
                      </div>
                    ) : (
                      "Testar"
                    )}
                  </button>
                </div>
                {testResult && (
                  <div
                    className={`mt-4 p-2 ${testResult.success ? "bg-green-100" : "bg-red-100"} rounded-md flex justify-between items-center`}
                  >
                    <span>{testResult.message}</span>
                    <button
                      onClick={handleCloseClick}
                      className="text-red-600 ml-2 focus:outline-none hover:text-red-800"
                    >
                      x
                    </button>
                  </div>
                )}
              </div>

              <div className="border border-gray-300 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">
                  Etapa 1: Informações Gerais
                </h2>

                <div className="mt-8">
                  <div className="mb-4">
                    <div className="mb-4 flex flex-col">
                      <div className="flex flex-row">
                        <MdFingerprint style={{ marginRight: "5px" }} />
                        <Label htmlFor="message-2">ID Único *Automático</Label>
                      </div>
                      <div className="flex flex-col">
                        <p className="mt-2 mb-4 text-sm text-muted-foreground flex-1">
                          O "ID" é gerado automaticamente, seria o numero de
                          identificação do recurso didático e deve servir para editar a atividade na plataforma do
                          github.
                        </p>
                        <Input
                          id="id"
                          type="text"
                          name="id"
                          value={experimentData.id}
                          onChange={handleInputChange}
                          disabled
                          className="cursor-not-allowed w-full md:w-auto px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="mb-4">
                    <div className="flex flex-col">
                      <div className="flex flex-row items-center">
                        <MdDateRange style={{ marginRight: "5px" }} />
                        <Label htmlFor="message-2">Data de postagem *Automático</Label>
                      </div>
                      <div className="flex flex-col">
                        <p className="mt-2 mb-4 text-sm text-muted-foreground flex-1">
                          A data é gerada automaticamente, deve servir para
                          mostrar na página da atividade o dia e hora que ele
                          foi enviado.
                        </p>
                        <Input
                          id="postDate"
                          type="text"
                          name="postDate"
                          value={experimentData.postDate}
                          onChange={handleInputChange}
                          disabled
                          className="cursor-not-allowed w-full md:w-auto px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="mb-4">
                    <div className="flex flex-row items-center mb-2">
                      <RiUserLine style={{ marginRight: "5px" }} />{" "}
                      {/* Adicionando o ícone RiUserLine */}
                      <Label htmlFor="message-2">Nome do autor/da autora *Obrigatório</Label>
                    </div>
                    <p className="mt-2 mb-4 text-sm text-muted-foreground">
                      O nome do autor/da autora é a identificação de quem enviou
                      os dados do recurso didático e aparecerá dentro da página do
                      da atividade para sabermos quem enviou.
                    </p>
                    <Input
                      placeholder="Clique e escreva seu nome."
                      id="profileName"
                      type="text"
                      name="profileName"
                      value={experimentData.profileName}
                      onChange={handleInputChange}
                      className="mb-4 max-w-40rem px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transparent outline-none resize-none"
                    />
                    <p className="text-sm text-muted-foreground">
                      Insira entre 10-300 caracteres.
                    </p>
                  </div>

                  {experimentData.profileName.length === 0 && (
                    <div className="flex flex-row justify-center w-full mt-2 p-3 rounded border border-red-200 bg-red-50 flex items-center text-red-500">
                      <MdError className="mr-2" />
                      <span>Escreva um nome de identificação</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Etapa 2: Tópicos</h2>

                <div className="mb-4">
                  <div className="flex flex-row items-center mb-2">
                    <div>
                      <FiHash style={{ marginRight: "5px" }} />{" "}
                      {/* Adicionando o ícone FaHashtag dentro de uma div */}
                    </div>
                    <Label htmlFor="title">Tópico geral  *Obrigatório</Label>
                  </div>
                  <p className="mt-2 mb-4 text-sm text-muted-foreground">
                    Selecione um tópico geral para o seu recurso didático entre
                    Biologia, Física e Química. Escolha cuidadosamente, pois
                    isso ajudará na identificação e classificação do sua
                    atividade.
                  </p>
                  <select
                    id="topicGeneral"
                    onChange={handleGeneralSelectChange}
                    name="topicGeneral"
                    defaultValue=""
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-100"
                  >
                    <option value="">Selecione um tópico</option>
                    {experimentGeneralData.map((topic) => (
                      <option
                        key={topic.id}
                        value={topic.slug}
                        disabled={isGeneralTopicSelected(topic.slug)}
                        className="bg-white"
                      >
                        {topic.title}
                      </option>
                    ))}
                  </select>

                  <div className="mt-2 flex flex-wrap">
                    {experimentData.topicGeneral.map((topic: any) => (
                      <div
                        key={topic.id}
                        className="bg-purple-600 p-2 rounded-md inline-flex items-center mr-2 mb-2 text-white shadow-lg relative"
                      >
                        <span className="mr-2">{topic.title}</span>
                        <button
                          onClick={() => {
                            handleRemoveGeneralTopic(topic.id, topic.slug);
                          }}
                          className="text-red-500 focus:outline-none hover:text-red-700 transition-colors duration-300 ease-in-out relative"
                        >
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white">X</span>
                          </div>
                        </button>
                      </div>
                    ))}

                    {experimentData.topicGeneral.length === 0 && (
                      <div className="flex flex-row justify-center w-full mt-2 p-3 rounded border border-red-200 bg-red-50 flex items-center text-red-500">
                        <MdError className="mr-2" />
                        <span>Selecione pelo menos um tópico geral</span>
                      </div>
                    )}
                  </div>
                </div>

                {experimentData.topicGeneral.length > 0 && (
                  <>
                    {experimentData.topicGeneral.map((generalTopic: any) => {
                      const specificTopics =
                        experimentGeneralData.find(
                          (topic) => topic.slug === generalTopic.slug,
                        )?.topicSpecific || [];

                      const selectedSpecificTopics = (experimentData
                        .topicSpecific[generalTopic.slug] ||
                        []) as SpecificTopic[];

                      return (
                        <div key={generalTopic.slug} className="mb-4">
                          <div className="mb-4">
                            <div className="flex flex-row items-center mb-2">
                              <div>
                                <MdBookmarkBorder
                                  style={{ marginRight: "5px" }}
                                />
                              </div>
                              <Label
                                htmlFor={`topicSpecific-${generalTopic.slug}`}
                              >
                                Tópico Específico de {generalTopic.title}  *Obrigatório
                              </Label>
                            </div>
                            {/* Restante do código... */}
                          </div>
                          <p className="mt-2 mb-4 text-sm text-muted-foreground">
                            Selecione um tópico específico dentro da{" "}
                            {generalTopic.title} para o seu recurso didático. Escolha
                            cuidadosamente, pois isso ajudará na identificação e
                            classificação de sua atividade.
                          </p>
                          <select
                            id={`topicSpecific-${generalTopic.slug}`}
                            onChange={(event) => {
                              handleSpecificSelectChange(
                                event,
                                generalTopic.slug,
                              );
                            }}
                            name="topicSpecific"
                            defaultValue=""
                            disabled={isSpecificTopicSelected(
                              generalTopic.slug,
                            )}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-100"
                          >
                            <option value="">Selecione um tópico</option>
                            {specificTopics.map((specificTopic) => {
                              const isTopicSelected =
                                selectedSpecificTopics.some(
                                  (topic) => topic.slug === specificTopic.slug,
                                );

                              return (
                                <option
                                  key={specificTopic.id}
                                  value={specificTopic.slug}
                                  disabled={
                                    isSpecificTopicSelected(
                                      specificTopic.slug,
                                    ) || isTopicSelected
                                  }
                                  className="bg-white"
                                >
                                  {specificTopic.title}
                                </option>
                              );
                            })}
                          </select>

                          <div className="mt-2 flex flex-wrap">
                            {selectedSpecificTopics.map((topic: any) => (
                              <div
                                key={topic.id}
                                className="bg-purple-600 p-2 rounded-md inline-flex items-center mr-2 mb-2 text-white shadow-lg relative"
                              >
                                <span className="mr-2">{topic.title}</span>
                                <button
                                  onClick={() => {
                                    handleRemoveSpecificTopic(
                                      topic.id,
                                      generalTopic.slug,
                                    );
                                  }}
                                  className="text-red-500 focus:outline-none hover:text-red-700 transition-colors duration-300 ease-in-out relative"
                                >
                                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                    <span className="text-white">X</span>
                                  </div>
                                </button>
                              </div>
                            ))}
                            {selectedSpecificTopics.length === 0 && (
                              <div className="mt-2 p-3 rounded border border-red-200 bg-red-50 flex items-center text-red-500">
                                <MdError className="mr-2" />
                                <span>
                                  Escolha pelo menos um tópico de{" "}
                                  {generalTopic.title}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}

                <div className="mb-8">
                  <div className="mb-4">
                    <div className="flex flex-col items-initial mb-2">
                      <div className="flex flex-row items-center justify-initial mb-2">
                        <IoFlask style={{ marginRight: "5px" }} />
                        <Label
                                htmlFor={`experimentType`}
                              >
                                 Tipo de Recurso didático *Obrigatório
                              </Label>                         
                      </div>
                      <p className="mt-2 mb-4 text-sm text-muted-foreground">
                        Esta classificação ajuda a definir o tipo de recurso didático
                        que será mostrado. Cada tipo tem características e
                        objetivos específicos.
                      </p>
                      <div className="mt-4 mb-8">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tipo de Recurso didático
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Descrição
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {experimentTypes.map((type) => (
                              <tr key={type.id}>
                                <td className="px-6 py-4">{type.title}</td>
                                <td className="px-6 py-4">{type.steps}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="mt-4 p-4 border border-gray-300 rounded-md mb-4 relative bg-white shadow-sm">
  {/* Tabela estilizada para tipos de experimentos */}
  <table className="w-full table-fixed">
    <tbody>
      {experimentTypes.map((type, index) =>
        index % 2 === 0 ? (
          <tr key={type.id} className="flex justify-between mb-2">
            <td className="w-1/2 p-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="experimentType"
                  value={type.slug}
                  checked={
                    // @ts-ignore
                    experimentData.experimentType.slug === type.slug
                  }
                  onChange={() => handleSelectExperimentTypeChange(type)}
                  className="mr-2 text-blue-600 focus:ring focus:ring-blue-300"
                />
                <span className="text-gray-700">{type.title}</span>
              </label>
            </td>
            {experimentTypes[index + 1] && (
              <td className="w-1/2 p-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="experimentType"
                    value={experimentTypes[index + 1].slug}
                    checked={
                      // @ts-ignore
                      experimentData.experimentType.slug ===
                      experimentTypes[index + 1].slug
                    }
                    onChange={() =>
                      handleSelectExperimentTypeChange(experimentTypes[index + 1])
                    }
                    className="mr-2 text-blue-600 focus:ring focus:ring-blue-300"
                  />
                  <span className="text-gray-700">
                    {experimentTypes[index + 1].title}
                  </span>
                </label>
              </td>
            )}
          </tr>
        ) : null
      )}
    </tbody>
  </table>
</div>


                    {experimentData.experimentType.length === 0 && (
                      <div className="flex flex-row justify-center mt-2 p-3 rounded border border-red-200 bg-red-50 flex items-center text-red-500">
                        <MdError className="mr-2" />
                        <span>
                          Selecione pelo menos um tipo de recurso didático.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">
                  Etapa 3: Informações Básicas do experimento
                </h2>

                <div className="mt-8">
                  <div className="mb-4">
                    <div className="flex flex-row items-center mb-2">
                      <div>
                        <MdOutlineFileOpen style={{ marginRight: "5px" }} />{" "}
                        {/* Adicionando o ícone FaHeading dentro de uma div */}
                      </div>
                      <Label htmlFor="title">Título *Obrigatório</Label>
                    </div>
                    {/* Restante do código... */}
                  </div>
                  <p className="mt-2 mb-4 text-sm text-muted-foreground">
                    O título é uma parte crucial da identificação do sua
                    atividade. Por favor, seja claro e descritivo, de
                    preferência faça algo chamativo.
                  </p>
                  <Input
                    placeholder="Insira o título aqui."
                    id="title"
                    type="text"
                    name="title"
                    onChange={handleInputChange}
                    className="max-w-40rem px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none"
                  />
                  <p className="text-sm text-muted-foreground">
                    Insira entre 10-300 caracteres.
                  </p>

                  {experimentData.title.length === 0 && (
                    <div className="flex flex-row justify-center w-full mt-2 p-3 rounded border border-red-200 bg-red-50 flex items-center text-red-500">
                      <MdError className="mr-2" />
                      <span>Escreva um Título para representar a atividade</span>
                    </div>
                  )}
                </div>

                <div className="mt-8">
      <div className="mb-4">
        <div className="flex flex-row items-center mb-2">
          <MdImageSearch style={{ marginRight: "5px" }} />{" "}
          {/* Adicionando o ícone MdImage dentro de uma div */}
          <Label htmlFor="previewImage">Imagem de Preview *Obrigatório</Label>
        </div>

        <p className="mb-2 text-sm text-muted-foreground">
          Forneça uma imagem que represente a atividade como um
          todo. Essa imagem vai ficar na página de busca e na página
          do experimento em si.
        </p>

        <div className="flex flex-col items-center">
          <div className="flex flex-col md:flex-row items-start justify-center md:justify-center w-full">
            <div className="mb-4 md:mb-0">
              {imagePreviewURL && (
                <div className="mb-4 mr-8">
                  <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                  <div className="flex flex-col items-center">
                    <img
                      className="h-auto max-h-48 object-cover rounded-md mr-2 mb-2 md:mb-0"
                      src={imagePreviewURL}
                      alt="Preview"
                    />
                    <Button
                      onClick={handleRemoveImage}
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                    >
                      Remover Imagem
                    </Button>
                  </div>
                </div>
              )}

              {!imagePreviewURL && (
                <label
                  htmlFor="imageUpload"
                  className="max-w-40rem p-4 w-full h-200 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer"
                 
                >
                  <FiUploadCloud className="text-4xl mb-2" />
                  <h1 className="text-lg font-semibold mb-1">Importe sua imagem</h1>
                  <p className="mb-2 px-8 text-sm">Arraste ou clique para fazer upload</p>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isImageConfirmed}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {experimentData.imagePreview.length === 0 && (
            <div className="flex flex-row justify-center w-full mt-2 p-3 rounded border border-red-200 bg-red-50 flex items-center text-red-500">
              <MdError className="mr-2" />
              <span>Adicione uma imagem relacionada ao recurso didático</span>
            </div>
          )}
        </div>
      </div>
    </div>
   
    <div className="mt-8">
          <div className="mb-4">
            <div className="flex flex-row items-center mb-2">
              <div>
                <MdOutlineDescription style={{ marginRight: "5px" }} />{" "}
                {/* Adicionando o ícone MdImage dentro de uma div */}
              </div>
              <Label htmlFor="previewImage">Descrição *Obrigatório</Label>
            </div>
            <p className="mb-2 text-sm text-muted-foreground">
              Forneça uma descrição objetiva, detalhada e concisa da
              atividade, escreva de forma que fique chamativo e atraia
              as pessoas a acessarem. Essa descrição vai aparecer na
              página de procurar experimentos, logo, seja breve.
            </p>

            <Textarea
              placeholder="Clique e escreva a sua descrição."
              id="description"
              className="max-w-40rem h-32 px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none"
              name="description"
              onChange={handleInputChange}
            />
            <p className="text-sm text-muted-foreground">
              Insira entre 10-300 caracteres.
            </p>

            {experimentData.description.length === 0 && (
              <div className="flex flex-row justify-center w-full mt-2 p-3 rounded border border-red-200 bg-red-50 flex items-center text-red-500">
                <MdError className="mr-2" />
                <span>
                  Escreva uma descrição relacionada ao recurso didático
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
      {/* Cabeçalho com ícone e label */}

     
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <MdOutlineDescription className="text-xl mr-2" />
          <Label htmlFor="previewImage"> Arquivos adicionais para download *Opcional</Label>

          
        </div>

        {/* Texto explicativo */}
        <p className="mb-2 text-sm text-gray-600">
          Anexe até 3 arquivos adicionais nos formatos ".docx" ou ".pptx". De no máximo 1mb. Esses arquivos podem complementar o recurso didático com materiais de apoio, como roteiros, apresentações ou documentos explicativos.
        </p>

{/* Arquivo-1 */}
<div className="border border-gray-300 p-4 rounded-md mt-4">
    {/* Linha com o input de arquivo e botão de remover */}
<div className="flex items-center justify-between mb-4">
  <h2 className="text-lg font-semibold mr-2">Primeiro Arquivo:</h2> {/* Alinhado à esquerda */}

  {/* Input de arquivo (bloqueado se já tiver um arquivo selecionado) */}
  <div className="flex-grow mr-2"> {/* Permite que o input ocupe o espaço disponível */}
    <input
      type="file"
      id="documentUploadOne"
      onChange={handleDocumentChangeOne}
      accept=".docx, .pptx"
      disabled={isDocumentConfirmedOne} // Bloqueia o input se já houver um arquivo
      className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
        isDocumentConfirmedOne ? "cursor-not-allowed opacity-50" : ""
      }`}
      style={{
        cursor: isDocumentConfirmedOne ? "not-allowed" : "pointer", // Cursor de não permitido quando bloqueado
      }}
    />
  </div>

  {/* Botão de remover (só aparece se houver arquivo selecionado) */}
  {selectedDocumentOne && (
    <button
      onClick={handleRemoveDocumentOne}
      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none text-sm"
    >
      Remover Documento
    </button>
  )}
</div>

{/* Mensagem de erro ou aviso, só aparece se não houver arquivo */}
{!selectedDocumentOne && (
  <p className="mt-2 text-sm text-red-600 bg-red-100 p-2 rounded">
    Nenhum arquivo escolhido.
  </p>
)}
</div>

{/* Arquivo-2 */}
<div className="border border-gray-300 p-4 rounded-md mt-4">
    {/* Linha com o input de arquivo e botão de remover */}
<div className="flex items-center justify-between mb-4">
  <h2 className="text-lg font-semibold mr-2">Segundo Arquivo:</h2> {/* Alinhado à esquerda */}

  {/* Input de arquivo (bloqueado se já tiver um arquivo selecionado) */}
  <div className="flex-grow mr-2"> {/* Permite que o input ocupe o espaço disponível */}
    <input
      type="file"
      id="documentUploadTwo"
      onChange={handleDocumentChangeTwo}
      accept=".docx, .pptx"
      disabled={isDocumentConfirmedTwo} // Bloqueia o input se já houver um arquivo
      className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
        isDocumentConfirmedTwo ? "cursor-not-allowed opacity-50" : ""
      }`}
      style={{
        cursor: isDocumentConfirmedTwo ? "not-allowed" : "pointer", // Cursor de não permitido quando bloqueado
      }}
    />
  </div>

  {/* Botão de remover (só aparece se houver arquivo selecionado) */}
  {selectedDocumentTwo && (
    <button
      onClick={handleRemoveDocumentTwo}
      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none text-sm"
    >
      Remover Documento
    </button>
  )}
</div>

{/* Mensagem de erro ou aviso, só aparece se não houver arquivo */}
{!selectedDocumentTwo && (
  <p className="mt-2 text-sm text-red-600 bg-red-100 p-2 rounded">
    Nenhum arquivo escolhido.
  </p>
)}
</div>

{/* Arquivo-3 */}
<div className="border border-gray-300 p-4 rounded-md mt-4">
    {/* Linha com o input de arquivo e botão de remover */}
<div className="flex items-center justify-between mb-4">
  <h2 className="text-lg font-semibold mr-2">Terceiro Arquivo:</h2> {/* Alinhado à esquerda */}

  {/* Input de arquivo (bloqueado se já tiver um arquivo selecionado) */}
  <div className="flex-grow mr-2"> {/* Permite que o input ocupe o espaço disponível */}
    <input
      type="file"
      id="documentUploadThree"
      onChange={handleDocumentChangeThree}
      accept=".docx, .pptx"
      disabled={isDocumentConfirmedThree} // Bloqueia o input se já houver um arquivo
      className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
        isDocumentConfirmedThree ? "cursor-not-allowed opacity-50" : ""
      }`}
      style={{
        cursor: isDocumentConfirmedThree ? "not-allowed" : "pointer", // Cursor de não permitido quando bloqueado
      }}
    />
  </div>

  {/* Botão de remover (só aparece se houver arquivo selecionado) */}
  {selectedDocumentThree && (
    <button
      onClick={handleRemoveDocumentThree}
      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none text-sm"
    >
      Remover Documento
    </button>
  )}
</div>

{/* Mensagem de erro ou aviso, só aparece se não houver arquivo */}
{!selectedDocumentThree && (
  <p className="mt-2 text-sm text-red-600 bg-red-100 p-2 rounded">
    Nenhum arquivo escolhido.
  </p>
)}
</div>
  

      </div>
    </div>


              </div>

              <div className="border border-gray-300 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">
                  Etapa 4: Informações Complementares
                </h2>

                <div className="mt-8">
                  <div className="mb-4">
                    <div className="flex flex-row items-center mb-2">
                      <div>
                        <MdPlaylistAddCheck style={{ marginRight: "5px" }} />{" "}
                        {/* Adicionando o ícone MdImage dentro de uma div */}
                      </div>
                      <Label htmlFor="previewImage">Objetivos *Obrigatório</Label>
                    </div>
                    {/* Restante do código... */}
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Liste os objetivos da atividade no infinitivo, ou seja,
                    descreva o que se pretende alcançar de forma clara e
                    sucinta. Certifique-se de incluir todos os objetivos que o
                    experimento visa alcançar. Por exemplo, "analisar",
                    "comparar", "avaliar", entre outros. Cada objetivo deve
                    estar descrito no infinitivo e de forma distinta.
                  </p>

                  {tempObjectives.map((objective, index) => (
                    <div
                      key={objective.id}
                      className="border border-solid border-gray-300 rounded-md mb-4 relative"
                    >
                      <div className="flex items-center justify-between border-b border-gray-300 p-4">
                        <div className="flex items-center">
                          <FcInfo className="w-6 h-6 mr-2" />{" "}
                          {/* Ícone FiTool */}
                          <Label className="mr-4 block font-semibold">{`${index + 1}° Objetivo:`}</Label>
                        </div>
                        <Button
                          className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-600"
                          onClick={() => {
                            handleDeleteObjective(objective.id);
                          }}
                        >
                          <FaTrash className="mr-2" /> Excluir este Objetivo
                        </Button>
                      </div>

                      <div className="p-4">
                        <Textarea
                          placeholder="Clique e escreva um objetivo."
                          className="mb-2 max-w-40rem h-32 px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none"
                          value={objective.objectiveText}
                          onChange={(event) => {
                            handleObjectiveChange(event, objective.id);
                          }}
                        />
                        <p className="text-sm text-muted-foreground">
                          Insira entre 10-300 caracteres.
                        </p>
                      </div>
                    </div>
                  ))}

                  {experimentData.objectives.length === 0 && (
                    <div className="flex flex-row justify-center w-full mt-2 p-3 rounded border border-red-200 bg-red-50 flex items-center text-red-500">
                      <MdError className="mr-2" />
                      <span>
                        Adicione ao menos um objetivo relacionado ao recurso didático
                      </span>
                    </div>
                  )}

                  {tempObjectives.length < 5 && (
                    <Button
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600"
                      onClick={handleAddEmptyObjective}
                    >
                      <RiAddLine className="h-5 w-5 mr-2" />
                      <span>Adicionar novo Objetivo</span>
                    </Button>
                  )}
                </div>

                <div className="mt-8">
                  <div className="mb-4">
                    <div className="flex flex-row items-center mb-2">
                      <div>
                        <MdOutlineBuild style={{ marginRight: "5px" }} />{" "}
                        {/* Adicionando o ícone MdImage dentro de uma div */}
                      </div>
                      <Label htmlFor="previewImage">
                        Materiais Necessários *Obrigatório
                      </Label>
                    </div>
                    {/* Restante do código... */}
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Liste os materiais essenciais para a realização da
                    atividade. Certifique-se de incluir tudo o que os
                    participantes precisarão para realizar a atividade com
                    sucesso. Por exemplo, inclua, impressão de arquivos, lapis, caneta, computador, tablet ou
                    smartphone com acesso à internet, bem como qualquer outro
                    material. Adicione a quantidade e o nome de cada material.
                  </p>

                  {tempMaterials.map((material, index) => (
                    <div
                      key={material.id}
                      className="border border-solid border-gray-300 rounded-md mb-4 relative"
                    >
                      <div className="flex items-center justify-between border-b border-gray-300 p-4">
                        <div className="flex items-center">
                          <FcInfo className="w-6 h-6 mr-2" />{" "}
                          {/* Ícone FiTool */}
                          <Label className="mr-4 block font-semibold">{`${index + 1}° Material:`}</Label>
                        </div>
                        <Button
                          className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-600"
                          onClick={() => {
                            handleDeleteMaterial(material.id);
                          }}
                        >
                          <FaTrash className="mr-2" /> Excluir este Material
                        </Button>
                      </div>
                      <div className="p-4">
                        <Input
                          type="text"
                          placeholder="Clique e escreva a quantidade e o nome de um material."
                          className="mb-2 max-w-40rem px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transparent focus:ring-transparent outline-none resize-none"
                          defaultValue={material.materialText}
                          onChange={(event) => {
                            handleMaterialChange(event, material.id);
                          }}
                        />
                        <p className="text-sm text-muted-foreground">
                          Insira entre 10-300 caracteres.
                        </p>
                      </div>
                    </div>
                  ))}

                  {experimentData.materials.length === 0 && (
                    <div className="flex flex-row justify-center w-full mt-2 p-3 rounded border border-red-200 bg-red-50 flex items-center text-red-500">
                      <MdError className="mr-2" />
                      <span>
                        Adicione ao menos um material que será utilizado na atividade
                      </span>
                    </div>
                  )}

                  {tempMaterials.length < 25 && (
                    <Button
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600"
                      onClick={handleAddEmptyMaterial}
                    >
                      <RiAddLine className="h-5 w-5 mr-2" />
                      <span>Adicionar novo Material</span>
                    </Button>
                  )}
                </div>

                <div className="mt-8">
                  <div className="mb-4">
                    <div className="flex flex-row items-center mb-2">
                      <div>
                        <MdOutlinePinch style={{ marginRight: "5px" }} />{" "}
                        {/* Adicionando o ícone MdImage dentro de uma div */}
                      </div>
                      <Label htmlFor="previewImage">Passo a passo *Obrigatório</Label>
                    </div>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Forneça uma descrição objetiva, detalhada e concisa de cada
                    passo para a realização a atividade porposta, escreva de forma
                    que fique claro o que devemos realizar, por isso, separe em
                    etapas.
                  </p>

                  {tempMethods.map((method, index) => (
                    <div
                      key={method.id}
                      className="border border-solid border-gray-300 rounded-md mb-4 relative"
                    >
                      <div className="border-b border-gray-300 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FcInfo className="w-6 h-6 mr-2" />{" "}
                            {/* Ícone FiTool */}
                            <label className="block mb-1 font-bold">{`${index + 1}° Passo`}</label>{" "}
                            {/* Passos em negrito */}
                          </div>
                          <Button
                            className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-600"
                            onClick={() => {
                              handleDeleteMethod(method.id, index);
                            }}
                          >
                            <FaTrash className="mr-2" /> Excluir este passo
                          </Button>
                        </div>
                      </div>

                      <div className="m-4 flex flex-col md:flex-row md:items-baseline">
                        <div
                          key={method.id}
                          className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4"
                        >
                          <Label className="mb-2">Texto deste passo:</Label>
                          <Textarea
                            className="mb-2 max-w-40rem h-52 px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none"
                            value={method.content}
                            onChange={(event) => {
                              handleMethodTextChange(index, event);
                            }}
                          />
                          <p className="text-sm text-muted-foreground">
                            Insira entre 10-300 caracteres.
                          </p>
                        </div>

                        <div className=" w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
                          <Label className="flex flex-col items-center md:items-center mb-2 md:mr-4">
                            Imagem deste passo:
                          </Label>
                          <div className="flex flex-col items-center md:items-center">
                            {!previewImages[index] ? (
                              <label
                                htmlFor={`imageMethod${index + 1}Upload`}
                                className={
                                  "cursor-pointer w-full md:w-auto flex justify-center md:justify-start mt-8"
                                }
                              >
                                <div className="max-w-40rem p-4 w-full h-200 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
                                  <FiUploadCloud className="text-4xl mb-2" />
                                  <h1 className="text-lg font-semibold mb-1">
                                    Importe sua imagem
                                  </h1>
                                  <p className="mb-2 px-8 text-sm">
                                    Arraste ou clique para fazer upload
                                  </p>
                                  <p className="mb-2 px-8 text-sm">
                                    Aceita PNG, JPG, JPEG e SVG.
                                  </p>
                                </div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  id={`imageMethod${index + 1}Upload`}
                                  onChange={(event) => {
                                    handleMethodImageChange(index, event);
                                  }}
                                  className="hidden"
                                />
                              </label>
                            ) : (
                              <div className="flex flex-col items-center">
                                <img
                                  src={previewImages[index]}
                                  alt={`Imagem do método ${index + 1}`}
                                  className="h-auto max-h-48 object-cover rounded-md mr-2 mb-2 md:mb-0"
                                />
                                <Button
                                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                                  onClick={() => {
                                    handleRemoveImageMethod(index);
                                  }}
                                >
                                  Remover imagem
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {experimentData.methods.length === 0 && (
                    <div className="flex flex-row justify-center w-full mt-2 p-3 rounded border border-red-200 bg-red-50 flex items-center text-red-500">
                      <MdError className="mr-2" />
                      <span>
                        Adicione ao menos um Passo relacionado ao recurso didático
                      </span>
                    </div>
                  )}

                  {tempMethods.length < 25 && !newMethodVisible && (
                    <Button
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600"
                      onClick={handleAddMethod}
                    >
                      <RiAddLine className="h-5 w-5 mr-2" />
                      <span>Adicionar novo Passo</span>
                    </Button>
                  )}
                </div>

                <div className="grid w-full gap-1.5 mt-8 ">
                  <div className="mb-4">
                    <div className="flex flex-row items-center mb-2">
                      <div>
                        <MdAddchart style={{ marginRight: "5px" }} />{" "}
                        {/* Adicionando o ícone MdImage dentro de uma div */}
                      </div>
                      <Label htmlFor="previewImage">
                        Resultados esperados *Opcional
                      </Label>
                    </div>
                    {/* Restante do código... */}
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Insira os resultados obtidos a partir da realização da
                    atividade. Seja claro e objetivo para que outros usuários
                    possam entender facilmente o que deve ocorrer ao final da
                    sua realização, mais especificamente o que devemos observar
                    após o realizar todas as etapas da metodologia. Insira apenas se for pertinente.
                  </p>

                  <Textarea
                    placeholder="Clique e escreva os resultados do seu experimento."
                    id="results"
                    className="max-w-40rem h-32 px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none"
                    name="results"
                    onChange={handleInputChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Insira entre 10-300 caracteres.
                  </p>

                  {experimentData.results.length === 0 && (
                    <div className="flex flex-row justify-center w-full mt-2 p-3 rounded border border-red-200 bg-red-50 flex items-center text-red-500">
                      <MdError className="mr-2" />
                      <span>
                        Escreva o resultado esperado ao realizar o recurso didático (se houver)
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid w-full gap-1.5 mt-8">
                  <div className="mb-4">
                    <div className="flex flex-row items-center mb-2">
                      <div>
                        <MdMenuBook style={{ marginRight: "5px" }} />{" "}
                        {/* Adicionando o ícone MdImage dentro de uma div */}
                      </div>
                      <Label htmlFor="previewImage">
                        Explicação Científica *Opcional
                      </Label>
                    </div>
                    {/* Restante do código... */}
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Insira uma explicação científica detalhada da sua atividade. Utilize terminologia apropriada e seja claro
                    para que outros usuários possam compreender facilmente como
                    a ciência explica este recurso didático. Lembrando: Apenas se nescessário.
                  </p>

                  <Textarea
                    placeholder="Clique e escreva a explicação científica do seu experimento."
                    id="scientificExplanation"
                    className="max-w-40rem h-32 px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none"
                    name="scientificExplanation"
                    onChange={handleInputChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Insira entre 10-300 caracteres.
                  </p>

                  {experimentData.scientificExplanation.length === 0 && (
                    <div className="flex flex-row justify-center w-full mt-2 p-3 rounded border border-red-200 bg-red-50 flex items-center text-red-500">
                      <MdError className="mr-2" />
                      <span>
                        Escreva uma explicação ciêntifica relacionado ao
                        recurso didático (se houver)
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <div className="mb-4">
                    <div className="flex flex-row items-center mb-2">
                      <div>
                        <MdOutlineLibraryBooks style={{ marginRight: "5px" }} />{" "}
                        {/* Ícone MdOutlineLibraryBooks */}
                      </div>
                      <Label htmlFor="previewImage">Referências *Obrigatório</Label>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      Liste as referências utilizadas.
                      Certifique-se de incluir todas as fontes e materiais
                      consultados para realizar a atividade.
                    </p>

                    <div className="mt-2 flex flex-col justfy-center p-4 border border-solid border-gray-300 rounded-md mb-4 relative">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Tipo de Fonte
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Exemplo
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {abntRules.map((rule, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4">{rule.source}</td>
                              <td
                                className="px-6 py-4"
                                dangerouslySetInnerHTML={{ __html: rule.rule }}
                              />
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {tempReferences.map((reference, index) => (
                    <div
                      key={reference.id}
                      className="border border-solid border-gray-300 rounded-md mb-4 relative"
                    >
                      <div className="flex items-center justify-between border-b border-gray-300 p-4">
                        <div className="flex items-center">
                          <FcInfo className="w-6 h-6 mr-2" />{" "}
                          {/* Ícone FiTool */}
                          <Label className="block mb-1">{`${index + 1}° Referência`}</Label>
                        </div>
                        <Button
                          className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-600"
                          onClick={() => {
                            handleDeleteReference(reference.id);
                          }}
                        >
                          <FaTrash className="mr-2" /> Excluir esta Referência
                        </Button>
                      </div>

                      <div className="p-4">
                        <Textarea
                          placeholder="Clique e escreva uma referência."
                          className="max-w-40rem px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transparent focus:ring-transparent outline-none resize-none mb-2"
                          value={reference.referenceText}
                          onChange={(event) => {
                            handleReferenceChange(event, reference.id);
                          }}
                        />
                        <p className="text-sm text-gray-500 mb-2">
                          Insira entre 10-300 caracteres.
                        </p>
                      </div>
                    </div>
                  ))}

                  {experimentData.references.length === 0 && (
                    <div className="flex flex-row justify-center w-full mt-2 p-3 rounded border border-red-200 bg-red-50 flex items-center text-red-500">
                      <MdError className="mr-2" />
                      <span>
                        Adicione ao menos uma referência relacionada ao
                        recurso didático
                      </span>
                    </div>
                  )}

                  {tempReferences.length < 5 && (
                    <Button
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600"
                      onClick={handleAddEmptyReference}
                    >
                      <RiAddLine className="h-5 w-5 mr-2" />
                      <span>Adicionar nova Referência</span>
                    </Button>
                  )}
                </div>

                <div className="mt-16">
      <button
        onClick={handleSend}
        disabled={isSending || isSent}
        className={`flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${isSending || isSent ? "cursor-not-allowed opacity-50" : "hover:bg-green-600"}`}
      >
        {isSending ? (
          <>
            <span className="mr-4">Enviando Experimento</span>
            <div className="w-6 h-6 border-4 border-t-4 border-green-400 rounded-full animate-spin mr-3"></div>
          </>
        ) : (
          <>
          
            <span>Enviar Experimento</span>
            <svg
              className="w-6 h-6 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </>
        )}
      </button>
     
              </div>
              </div>
  </>

)}


              <div className="flex flex-col items-start p-8 space-y-4">
              {isSending && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 border border-solid border-gray-300 w-auto flex flex-col items-center space-y-4 rounded-lg shadow-lg">
            <FaFlask className="w-8 h-8 animate-wiggle text-purple-500" />
            <p className="text-lg font-bold text-purple-500">
              Enviando experimento...
            </p>
            <p className="text-sm text-gray-600">
              Por favor, aguarde um momento. Isso pode demorar de 1 a 3 minutos.
            </p>
            <BiLoaderAlt className="w-6 h-6 animate-spin text-purple-500" />
          </div>
        </div>
              )}


              {pullRequestUrl && (

                <>
                  <div ref={successRef} className="w-full mt-8 p-8 bg-gradient-to-r from-green-400 to-green-500 border border-green-400 text-white rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105">
            <div className="flex items-center mb-4">
              <svg className="w-10 h-10 mr-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-3xl font-extrabold">
                Experimento enviado com sucesso!
              </p>
            </div>
            <p className="text-lg">
              Link da pull request:{" "}
              <a
                href={pullRequestUrl}
                className="text-white font-semibold underline hover:text-green-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                {pullRequestUrl}
              </a>
            </p>
          </div>
          <div className="w-full mt-4 text-center bg-red-700 text-white p-4 rounded-md">
  <div className="flex items-center justify-center mb-2">
    <FaExclamationTriangle className="w-6 h-6 mr-2" />
    <p className="mr-4">Recarregue a página para enviar outro experimento!</p>
    <button
      onClick={() => window.location.reload()}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    >
      Recarregar Página
    </button>
  </div>
</div>


                </>
            
      
              )}
              </div>
            </div>
          </form>
        </div>
         {Object.keys(experimentData).length > 0 && (
          <>
            <div className="d-flex justify-content-end">
              <button className="btn btn-outline-primary me-2">
                <FaCopy className="ms-2" />
              </button>
            </div>
            <pre>{JSON.stringify(experimentData, null, 2)}</pre>
          </>
        )} 
      </div>
    </>
  );
}
