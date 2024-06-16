"use client";
import React, {
  type ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { IoFlask, IoFlaskOutline, IoKeyOutline } from "react-icons/io5";
import { PiGitDiffLight } from "react-icons/pi";
import {
  MdAddchart,
  MdBookmarkBorder,
  MdOutlineLocationOn,
  MdOutlinePinch,
  MdPeopleOutline,
  MdDateRange,
  MdError,
  MdFingerprint,
  MdImageSearch,
  MdOutlineBuild,
  MdOutlineDescription,
  MdOutlineFileOpen,
  MdPlaylistAddCheck,
  MdMenuBook,
  MdOutlineLibraryBooks,
  MdDoneOutline,
  MdOutlineAttachMoney,
} from "react-icons/md";

import { RiAddLine, RiUserLine } from "react-icons/ri";
import { FiHash, FiUploadCloud } from "react-icons/fi";

import { FaCopy, FaFlask, FaTrash } from "react-icons/fa";
import { z } from "zod";

import { Octokit } from "@octokit/rest";
/* import Octokit from "@octokit/rest"; */

import locationData from "../../api/data/location.json";
import topicGeneralData from "../../api/data/experimentGeneralData.json";
import axios from "axios";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { FcInfo } from "react-icons/fc";
import { toast } from "../../../components/ui/use-toast";
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

interface LocalizationTopic {
  id: number;
  title: string;
  slug: string;
}

interface TargetAudienceTopic {
  id: number;
  title: string;
  slug: string;
}

interface DifficultyTopic {
  id: number;
  title: string;
  slug: string;
  steps: string;
  explanation: string;
}

interface CostTopic {
  id: number;
  title: string;
  slug: string;
  steps: string;
  explanation: string;
}

interface ExperimentType {
  id: number;
  title: string;
  slug: string;
  steps: string;
}

export default function Experiment() {
  const [experimentLocationData] = useState(locationData);
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
    topicLocation: [],
    targetAudience: [],
    keywords: [],
    difficulty: [],
    cost: [],
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
  });

  const abntRules = [
    {
      source: "Livro",
      rule: "SOBRENOME, Nome. <em>Título do livro</em>: subtítulo. Edição (se houver). Local de ação: Editora, Ano de ação.",
    },
    {
      source: "Site",
      rule: "NOME DO SITE. Disponível em: <URL>. Acesso em: Data.",
    },
    {
      source: "Artigo",
      rule: "AUTOR. Título do artigo. <em>Nome da Revista</em>, Local de ação, volume, número, página inicial-final, mês, ano.",
    },
    // Adicione outras regras conforme necessário
  ];

  const handleSelectDifficultyChange = (
    selectedDifficulty: DifficultyTopic,
  ) => {
    setExperimentData((prevData: any) => ({
      ...prevData,
      difficulty: selectedDifficulty,
    }));
  };

  const difficulties: DifficultyTopic[] = [
    {
      id: 1,
      title: "Fácil",
      slug: "facil",
      steps: "1 - 5",
      explanation: "De 1 a 5 passos são necessários para completar.",
    },
    {
      id: 2,
      title: "Médio",
      slug: "medio",
      steps: "6 - 10",
      explanation: "De 6 a 10 passos são necessários para completar.",
    },
    {
      id: 3,
      title: "Difícil",
      slug: "dificil",
      steps: "11+",
      explanation: "11 ou mais passos são necessários para completar.",
    },
  ];

  const handleSelectExperimentTypeChange = (selectedType: ExperimentType) => {
    setExperimentData((prevData: any) => ({
      ...prevData,
      experimentType: selectedType,
    }));
  };

  const experimentTypes: ExperimentType[] = [
    {
      id: 1,
      title: "Experimentos Demonstrativos",
      slug: "demonstrativos",
      steps:
        "São experimentos realizados para demonstrar um conceito específico.",
    },
    {
      id: 2,
      title: "Experimentos Controlados",
      slug: "controlados",
      steps:
        "Os alunos conduzem experimentos em que todas as variáveis são controladas para testar uma hipótese específica. ",
    },
    {
      id: 3,
      title: "Experimentos de Observação",
      slug: "observacao",
      steps:
        "Os alunos observam fenômenos naturais ou processos em ação e fazem anotações sobre suas observações. ",
    },
    {
      id: 4,
      title: "Experimentos de Campo",
      slug: "campo",
      steps:
        "Os alunos realizam experimentos fora da sala de aula, muitas vezes em ambientes naturais, para coletar dados e realizar observações. ",
    },
    {
      id: 5,
      title: "Experimentos Virtuais ou Simulações",
      slug: "virtuais",
      steps:
        "Os alunos usam software ou simulações computacionais para realizar experimentos que podem ser difíceis ou impossíveis de realizar na vida real. ",
    },
    {
      id: 6,
      title: "Experimentos de Replicação",
      slug: "replicacao",
      steps:
        "Os alunos tentam replicar experimentos científicos famosos para entender o método científico e ganhar experiência prática.",
    },
  ];

  

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

  const handleSelectLocationChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    const selectedTopic = experimentLocationData.find(
      (topic: LocalizationTopic) => topic.slug === value,
    );

    if (selectedTopic) {
      const isTopicAlreadySelected = experimentData.topicLocation.some(
        (topic: any) => topic.title === selectedTopic.title,
      );

      if (!isTopicAlreadySelected) {
        setExperimentData((prevData: any) => ({
          ...prevData,
          topicLocation: [
            ...prevData.topicLocation,
            {
              id: selectedTopic.id,
              title: selectedTopic.title,
              slug: selectedTopic.slug,
            },
          ],
        }));
        event.target.blur(); // Remove o foco do select
      }
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

  const handleRemoveDivLocalization = (id: number) => {
    setExperimentData((prevData) => ({
      ...prevData,
      topicLocation: prevData.topicLocation.filter(
        (topic: Topic) => topic.id !== id,
      ), // Remove a div com o id correspondente
    }));
  };

  const handleRemoveAudience = (id: number) => {
    setExperimentData((prevData) => ({
      ...prevData,
      targetAudience: prevData.targetAudience.filter(
        (audience: TargetAudienceTopic) => audience.id !== id,
      ),
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

  const isTopicSelectedLocalization = (slug: any) => {
    return experimentData.topicLocation.some(
      (topic: LocalizationTopic) => topic.slug === slug,
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

              const imagePath = `/images/${experimentId}/${selectedImage.name}`;

              // Upload da imagem
              adicionarPasso(
                `Realizando o upload da imagem ${imagePath}...`,
                true,
              );
              await octokitClient.repos.createOrUpdateFileContents({
                owner: forkOwner,
                repo: baseRepositoryName,
                path: imagePath,
                message: `Add image for experiment N° ${experimentId}`,
                content: base64Content,
                branch: newBranchName,
              });

              adicionarPasso(
                `Imagem ${imagePath} adicionada com sucesso!`,
                true,
              );
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

          // Montar o caminho da imagem
          const imagePath = `/images/${experimentId}/${imageName}`;

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
            adicionarPasso(
              `Erro ao fazer upload da imagem ${imagePath}`,
              false,
            );
          }
        }
        console.log("Upload de imagens concluído!");
      };

      // Chama a função handleImageUploadMethod
      await handleImageUploadMethod();

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
    } catch (error) {
      console.error("Erro ao enviar experimento.", error);
      adicionarPasso("Erro ao enviar experimento." + `${error}`, false);
      // Lidar com erros
    } finally {
      setIsSending(false);
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

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsImageConfirmed(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsImageConfirmed(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsImageConfirmed(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      setSelectedImage(file);
      const imageURL = URL.createObjectURL(file);
      setImagePreviewURL(imageURL);
      setIsImageConfirmed(true);
      uploadImage(file);
    }
  };

  const uploadImage = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      // Cria o link dinâmico da imagem
      const imagePath = `/images/${experimentData.id}/${file.name}`;
      

      // Atualiza o estado imagePath com o link dinâmico da imagem
       setExperimentData((prevState: any) => ({
         ...prevState,
         imagePreview: imagePath,
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
        const imagePath = `/images/${experimentData.id}/${imageName}`;

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
                        <Label htmlFor="message-2">ID Único</Label>
                      </div>
                      <div className="flex flex-col">
                        <p className="mt-2 mb-4 text-sm text-muted-foreground flex-1">
                          O "ID" é gerado automaticamente, seria o numero de
                          identificação do experimento e deve servir para
                          adicionar e editar o experimento na plataforma do
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
                        <Label htmlFor="message-2">Data de postagem</Label>
                      </div>
                      <div className="flex flex-col">
                        <p className="mt-2 mb-4 text-sm text-muted-foreground flex-1">
                          A data é gerada automaticamente, deve servir para
                          adicionar a pagina do experimento o dia e hora que ele
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
                      <Label htmlFor="message-2">Nome do autor/da autora</Label>
                    </div>
                    <p className="mt-2 mb-4 text-sm text-muted-foreground">
                      O nome do autor/da autora é a identificação de quem enviou
                      os dados do experimento e aparecerá dentro da página do
                      experimento para sabermos quem enviou.
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
                    <Label htmlFor="title">Tópico geral:</Label>
                  </div>
                  <p className="mt-2 mb-4 text-sm text-muted-foreground">
                    Selecione um tópico geral para o seu experimento entre
                    Biologia, Física e Química. Escolha cuidadosamente, pois
                    isso ajudará na identificação e classificação do seu
                    experimento.
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
                                Tópico Específico de {generalTopic.title}:
                              </Label>
                            </div>
                            {/* Restante do código... */}
                          </div>
                          <p className="mt-2 mb-4 text-sm text-muted-foreground">
                            Selecione um tópico específico dentro da{" "}
                            {generalTopic.title} para o seu experimento. Escolha
                            cuidadosamente, pois isso ajudará na identificação e
                            classificação do seu experimento.
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

                <div className="mb-4">
                  <div className="mb-4">
                    <div className="flex flex-row items-center mb-2">
                      <div>
                        <MdOutlineLocationOn style={{ marginRight: "5px" }} />{" "}
                        {/* Adicionando o ícone MdLocationOn dentro de uma div */}
                      </div>
                      <Label htmlFor="topicLocalization">
                        Tópico de Localização:
                      </Label>
                    </div>
                    {/* Restante do código... */}
                  </div>
                  <p className="mt-2 mb-4 text-sm text-muted-foreground">
                    Selecione os lugares onde é possível realizar o experimento.
                    Escolha cuidadosamente, pois isso ajudará na identificação e
                    classificação do seu experimento.
                  </p>
                  <select
                    id="topicLocalization"
                    onChange={handleSelectLocationChange}
                    name="topicLocalization"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-100"
                    defaultValue=""
                  >
                    <option value="">Selecione um tópico</option>
                    {experimentLocationData.map((topic) => (
                      <option
                        key={topic.id}
                        value={topic.slug}
                        disabled={isTopicSelectedLocalization(topic.slug)}
                        className="bg-white"
                      >
                        {topic.title}
                      </option>
                    ))}
                  </select>

                  <div className="mt-2 flex flex-wrap">
                    {experimentData.topicLocation.map((topic: any) => (
                      <div
                        key={topic.id}
                        className="bg-purple-600 p-2 rounded-md inline-flex items-center mr-2 mb-2 text-white shadow-lg relative"
                      >
                        <span className="mr-2">{topic.title}</span>
                        <button
                          onClick={() => {
                            handleRemoveDivLocalization(topic.id);
                          }}
                          className="text-red-500 focus:outline-none hover:text-red-700 transition-colors duration-300 ease-in-out relative"
                        >
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white">X</span>
                          </div>
                        </button>
                      </div>
                    ))}

                    {experimentData.topicLocation.length === 0 && (
                      <div className="flex flex-row justify-center w-full mt-2 p-3 rounded border border-red-200 bg-red-50 flex items-center text-red-500">
                        <MdError className="mr-2" />
                        <span>
                          Selecione pelo menos um tópico sobre a localização
                          onde o experimento pode ser realizado.
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <div className="mb-4">
                    <div className="flex flex-col items-initial mb-2">
                      <div className="flex flex-row items-center justify-initial mb-2">
                        <PiGitDiffLight style={{ marginRight: "5px" }} />{" "}
                        <Label htmlFor="topicDifficulty">Dificuldade:</Label>
                      </div>
                      <p className="mt-2 mb-4 text-sm text-muted-foreground">
                        Essa classificação auxilia na seleção adequada de
                        experimentos, considerando o nível de habilidade e a
                        disponibilidade de tempo dos participantes. A definição
                        precisa da dificuldade também facilita a identificação
                        de áreas que possam requerer assistência adicional ou
                        recursos complementares, contribuindo assim para uma
                        execução mais eficiente e satisfatória do experimento.
                      </p>
                      <div className="mt-4 mb-8">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Classificação
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Passos
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Descrição
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {difficulties.map((difficulty) => (
                              <tr key={difficulty.id}>
                                <td className="px-6 py-4">
                                  {difficulty.title}
                                </td>
                                <td className="px-6 py-4">
                                  {difficulty.steps}
                                </td>
                                <td className="px-6 py-4">
                                  {difficulty.explanation}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-col justify-center p-4 border border-solid border-gray-300 rounded-md mb-4 relative">
                      <table className="custom-table">
                        <tbody>
                          {difficulties.map(
                            (difficulty, index) =>
                              index % 3 === 0 && (
                                <tr key={index} className="text-center">
                                  {" "}
                                  {/* Adicionando classe para centralizar */}
                                  {difficulties
                                    .slice(index, index + 3)
                                    .map((diff, subIndex) => (
                                      <td key={diff.id} className="p-2">
                                        <label>
                                          <input
                                            type="radio"
                                            name="difficulty"
                                            value={diff.slug}
                                            checked={
                                              (experimentData.difficulty as any)
                                                ?.slug === diff.slug
                                            }
                                            onChange={() =>
                                              handleSelectDifficultyChange(diff)
                                            }
                                            className="mr-1"
                                          />
                                          {diff.title}
                                        </label>
                                      </td>
                                    ))}
                                </tr>
                              ),
                          )}
                        </tbody>
                      </table>
                    </div>

                    {experimentData.difficulty.length === 0 && (
                      <div className="flex flex-row justify-center mt-2 p-3 rounded border border-red-200 bg-red-50 flex items-center text-red-500">
                        <MdError className="mr-2" />
                        <span>
                          Selecione pelo menos uma dificuldade relacionado ao
                          experimento.
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <div className="mb-4">
                    <div className="flex flex-col items-initial mb-2">
                      <div className="flex flex-row items-center justify-initial mb-2">
                        <IoFlask style={{ marginRight: "5px" }} />{" "}
                        <label htmlFor="experimentType">
                          Tipo de Experimento:
                        </label>
                      </div>
                      <p className="mt-2 mb-4 text-sm text-muted-foreground">
                        Esta classificação ajuda a definir o tipo de experimento
                        que será realizado. Cada tipo tem características e
                        objetivos específicos.
                      </p>
                      <div className="mt-4 mb-8">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tipo de Experimento
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
                    <div className="mt-2 flex flex-col justfy-center p-4 border border-solid border-gray-300 rounded-md mb-4 relative">
                      <table className="custom-table">
                        <tbody>
                          {experimentTypes.map((type, index) =>
                            index % 2 === 0 ? (
                              <tr className="flex justify-around" key={type.id}>
                                <td>
                                  <label>
                                    <input
                                      type="radio"
                                      name="experimentType"
                                      value={type.slug}
                                      checked={
                                        // @ts-ignore
                                        experimentData.experimentType.slug ===
                                        type.slug
                                      }
                                      onChange={() =>
                                        handleSelectExperimentTypeChange(type)
                                      }
                                      className="mr-1"
                                    />
                                    {type.title}
                                  </label>
                                </td>
                                {experimentTypes[index + 1] && (
                                  <td>
                                    <label>
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
                                          handleSelectExperimentTypeChange(
                                            experimentTypes[index + 1],
                                          )
                                        }
                                        className="mr-1"
                                      />
                                      {experimentTypes[index + 1].title}
                                    </label>
                                  </td>
                                )}
                              </tr>
                            ) : null,
                          )}
                        </tbody>
                      </table>
                    </div>

                    {experimentData.experimentType.length === 0 && (
                      <div className="flex flex-row justify-center mt-2 p-3 rounded border border-red-200 bg-red-50 flex items-center text-red-500">
                        <MdError className="mr-2" />
                        <span>
                          Selecione pelo menos um tipo de experimento.
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
                      <Label htmlFor="title">Título:</Label>
                    </div>
                    {/* Restante do código... */}
                  </div>
                  <p className="mt-2 mb-4 text-sm text-muted-foreground">
                    O título é uma parte crucial da identificação do seu
                    experimento. Por favor, seja claro e descritivo, de
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
                      <span>Escreva um Título para o experimento</span>
                    </div>
                  )}
                </div>

                <div className="mt-8">
      <div className="mb-4">
        <div className="flex flex-row items-center mb-2">
          <MdImageSearch style={{ marginRight: "5px" }} />{" "}
          {/* Adicionando o ícone MdImage dentro de uma div */}
          <Label htmlFor="previewImage">Imagem de Preview</Label>
        </div>

        <p className="mb-2 text-sm text-muted-foreground">
          Forneça uma imagem que represente o experimento como um
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
              <span>Adicione uma imagem relacionada ao experimento</span>
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
                      <Label htmlFor="previewImage">Descrição</Label>
                    </div>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Forneça uma descrição objetiva, detalhada e concisa do seu
                      experimento, escreva de forma que fique chamativo e atraia
                      as pessoas a acessarem. Essa descrição vai aparecer na
                      página de procurar experimentos, logo, seja breve.
                    </p>

                    <Textarea
                      placeholder="Clique e escreva a sua descrição."
                      id="message-2"
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
                          Escreva uma descrição relacionada ao experimento
                        </span>
                      </div>
                    )}
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
                      <Label htmlFor="previewImage">Objetivos</Label>
                    </div>
                    {/* Restante do código... */}
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Liste os objetivos do experimento no infinitivo, ou seja,
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
                        Adicione ao menos um objetivo relacionado ao experimento
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
                        Materiais Necessários
                      </Label>
                    </div>
                    {/* Restante do código... */}
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Liste os materiais essenciais para a realização do
                    experimento. Certifique-se de incluir tudo o que os
                    participantes precisarão para realizar o experimento com
                    sucesso. Por exemplo, inclua computador, tablet ou
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
                          placeholder="Clique e escreva um material."
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
                        Adicione ao menos um material relacionado ao experimento
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
                      <Label htmlFor="previewImage">Passo a passo</Label>
                    </div>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Forneça uma descrição objetiva, detalhada e concisa de cada
                    passo para a realização do seu experimento, escreva de forma
                    que fique claro o que devemos realizar, por isso, separe em
                    passos.
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
                        Adicione ao menos um Passo relacionado ao experimento
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
                        Resultados do Experimento
                      </Label>
                    </div>
                    {/* Restante do código... */}
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Insira os resultados obtidos a partir da realização do
                    experimento. Seja claro e objetivo para que outros usuários
                    possam entender facilmente o que deve ocorrer ao final da
                    sua realização, mais especificamente o que devemos observar
                    após o realizar todas as etapas da metodologia.
                  </p>

                  <Textarea
                    placeholder="Clique e escreva os resultados do seu experimento."
                    id="message-2"
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
                        Escreva o resultado esperado ao realizar o experimento
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
                        Explicação Científica
                      </Label>
                    </div>
                    {/* Restante do código... */}
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    Insira uma explicação científica detalhada do seu
                    experimento. Utilize terminologia apropriada e seja claro
                    para que outros usuários possam compreender facilmente como
                    a ciência explica este experimento.
                  </p>

                  <Textarea
                    placeholder="Clique e escreva a explicação científica do seu experimento."
                    id="message-2"
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
                        experimento
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
                      <Label htmlFor="previewImage">Referências</Label>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      Liste as referências utilizadas no experimento.
                      Certifique-se de incluir todas as fontes e materiais
                      consultados para realizar o experimento.
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
                        experimento
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
                    disabled={isSending}
                    className={`flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ${isSending ? "cursor-not-allowed opacity-50" : "hover:bg-green-600"}`}
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

              <div className="flex flex-col items-start p-8 space-y-4">
                {isSending && (
                  <>
                    <div className="p-8 border border-solid border-gray-300  w-full flex items-center justify-center space-x-2">
                      <FaFlask className="w-8 h-8 animate-wiggle text-purple-500" />
                      <p className="text-lg font-bold text-purple-500">
                        Enviando experimento...
                      </p>
                      <BiLoaderAlt className="w-6 h-6 animate-spin text-purple-500" />
                    </div>
                  </>
                )}

                {pullRequestUrl && (
                  <>
                    <div className="w-full bg-green-100 border border-green-400 text-green-900 px-4 py-2 rounded-md shadow-md">
                      <p className="text-lg font-bold">
                        Experimento enviado com sucesso!
                      </p>
                      <p className="text-lg">
                        Link da pull request:{" "}
                        <a
                          href={pullRequestUrl}
                          className="text-green-600 hover:underline"
                        >
                          {pullRequestUrl}
                        </a>
                      </p>
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
