"use client";
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './page.module.css' 
import { GrNext } from 'react-icons/gr';
import { MdCheck } from 'react-icons/md';
import { RiAddLine } from 'react-icons/ri';

import { FiTool, FiUploadCloud } from 'react-icons/fi';
import { ImFilePicture } from 'react-icons/im';

import { FaCopy } from "react-icons/fa";

import { Octokit } from "@octokit/rest";
/* import Octokit from "@octokit/rest"; */

import bnccData from "../../app/api/data/bncc.json"
import locationData from "../../app/api/data/location.json"
import topicGeneralData from "../../app/api/data/experimentGeneralData.json"
import targetAudience from "../../app/api/data/targetAudience.json"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FcInfo } from 'react-icons/fc';

// Crie uma instância do Octokit
const octokit = new Octokit();

//Preciso colocar essa logica no home

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

export default function Experiment() { 
  
  const [experimentLocationData] = useState(locationData);
  const [experimentGeneralData] = useState(topicGeneralData);
  const [experimentTargetAudienceData] = useState(targetAudience);
  const [copied, setCopied] = useState(false); 
  const [apiToken, setApiToken] = useState('');
  const [username, setUsername] = useState('');
  
  
  
  
  const [experimentData, setExperimentData] = useState({
    id: '',
    topicGeneral: [],
    topicSpecific: [],
    topicLocation: [],
    profileName: '',
    postDate: '',
    title: '',
    slug: '',
    imagePreview: '',
    description: '',
    objectives: [],
    materials: [],
    methods: [],
    results: '',
    scientificExplanation: '',
    references: [],
    targetAudience: [],
  });
  
  const handleGeneralSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const selectedTopic = experimentGeneralData.find((topic) => topic.slug === value);
  
    if (selectedTopic) {
      const isTopicAlreadySelected = experimentData.topicGeneral.some(
        (topic: any) => topic.title === selectedTopic.title
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
      }
    }
  
    event.target.value = ''; // Limpa o valor selecionado
  };
  
  const handleSpecificSelectChange = (event: ChangeEvent<HTMLSelectElement>, generalTopicSlug: any) => {
    const { value } = event.target;
    const selectedSpecificTopic = experimentGeneralData
      .find((topic) => topic.slug === generalTopicSlug)
      ?.topicSpecific.find((topic) => topic.slug === value);
  
    if (selectedSpecificTopic) {
      setExperimentData((prevData: any) => {
        const updatedTopicSpecific = {
          ...prevData.topicSpecific,
          [generalTopicSlug]: [
            ...(prevData.topicSpecific[generalTopicSlug] as any || []),
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
    }
  
    event.target.value = ''; // Limpa o valor selecionado
  };

  const handleSelectLocationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const selectedTopic = experimentLocationData.find((topic: LocalizationTopic) => topic.slug === value);
  
    if (selectedTopic) {
      const isTopicAlreadySelected = experimentData.topicLocation.some(
        (topic: any) => topic.title === selectedTopic.title
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
      }
    }
  
    event.target.value = ""; // Limpa o valor selecionado
  };

  const handleSelectAudienceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const selectedAudience = experimentTargetAudienceData.find((audience: TargetAudienceTopic) => audience.slug === value);

    if (selectedAudience) {
      const isAudienceAlreadySelected = experimentData.targetAudience.some(
        (audience: any) => audience.title === selectedAudience.title
      );

      if (!isAudienceAlreadySelected) {
        setExperimentData((prevData: any) => ({
          ...prevData,
          targetAudience: [
            ...prevData.targetAudience,
            {
              id: selectedAudience.id,
              title: selectedAudience.title,
              slug: selectedAudience.slug,
            },
          ],
        }));
      }
    }

    event.target.value = ""; // Limpa o valor selecionado
  };
  
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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
        topicGeneral: prevData.topicGeneral.filter((topic: Topic) => topic.id !== id),
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
          (topic: SpecificTopic) => topic.id !== id
        ),
      },
    }));
  };

  const handleRemoveDivLocalization = (id: number) => {
    setExperimentData((prevData) => ({
      ...prevData,
      topicLocation: prevData.topicLocation.filter((topic: Topic) => topic.id !== id), // Remove a div com o id correspondente
    }));
  };

  const handleRemoveAudience = (id: number) => {
    setExperimentData((prevData) => ({
      ...prevData,
      targetAudience: prevData.targetAudience.filter((audience: TargetAudienceTopic) => audience.id !== id),
    }));
  };
  
  const isGeneralTopicSelected = (slug: any) => {
    return experimentData.topicGeneral.some((topic: Topic) => topic.slug === slug);
  };
  
  const isSpecificTopicSelected = (slug: any) => {
    return Object.values(experimentData.topicSpecific).some((topics: SpecificTopic[]) =>
      topics.some((topic: SpecificTopic) => topic.slug === slug)
    );
  };

  const isTopicSelectedLocalization = (slug: any) => {
    return experimentData.topicLocation.some((topic: LocalizationTopic) => topic.slug === slug);
  };

  const isAudienceSelected = (slug: any) => {
    return experimentData.targetAudience.some((audience: TargetAudienceTopic) => audience.slug === slug);
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
  const [newObjective, setNewObjective] = useState('');
  const [newObjectiveVisible, setNewObjectiveVisible] = useState(false);
  const [editObjective, setEditObjective] = useState<Objective | null>(null);
  
  const [nextId, setNextId] = useState(1);
  
  const handleObjectiveTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setNewObjective(value);
  };
  
  const handleAddObjective = () => {
    setNewObjectiveVisible(true);
  };
  
  const handleConfirmAddObjective = () => {
    if (newObjective !== '') {
      const newObj: Objective = { id: nextId, objectiveText: newObjective, content: '' };
      setTempObjectives((prevObjectives) => [...prevObjectives, newObj]);
      setExperimentData((prevData: any) => {
        const newObjectives = [...prevData.objectives, { id: nextId, content: newObjective }];
        return { ...prevData, objectives: newObjectives };
      });
  
      setNewObjective('');
      setNewObjectiveVisible(false);
      setNextId(prevId => prevId + 1);
    }
  };
  
  const handleCancelAddObjective = () => {
    setNewObjective('');
    setNewObjectiveVisible(false);
  };
  
  const handleEditObjective = (objective: Objective) => {
    setEditObjective(objective);
  };
  
  const handleSaveObjective = () => {
    if (editObjective) {
      const updatedObjectives = tempObjectives.map(obj =>
        obj.id === editObjective.id ? { ...obj, objectiveText: editObjective.objectiveText } : obj
      );
      setTempObjectives(updatedObjectives);
  
      const dataObjectives = experimentData.objectives.map((obj: any) =>
        obj.id === editObjective.id ? { ...obj, content: editObjective.objectiveText } : obj
      );
      setExperimentData((prevData: any) => ({ ...prevData, objectives: dataObjectives }));
  
      setEditObjective(null);
    }
  };
  
  const handleDeleteObjective = (id: number) => {
    setTempObjectives(prevObjectives => prevObjectives.filter(obj => obj.id !== id));
    setExperimentData(prevData => ({
      ...prevData,
      objectives: prevData.objectives.filter((obj: any) => obj.id !== id),
    }));
  };
  interface Material {
    id: number;
    materialText: string;
    content: string;
  }

  const [tempMaterials, setTempMaterials] = useState<Material[]>([]);
  const [newMaterial, setNewMaterial] = useState('');
  const [newMaterialVisible, setNewMaterialVisible] = useState(false);
  const [editMaterial, setEditMaterial] = useState<Material | null>(null);

  const [nextMaterialId, setNextMaterialId] = useState(1);

  const handleMaterialTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewMaterial(value);
  };

  const handleAddMaterial = () => {
    setNewMaterialVisible(true);
  };

  const handleConfirmAddMaterial = () => {
    if (newMaterial !== '') {
      const newMat: Material = { id: nextMaterialId, materialText: newMaterial, content: '' };
      setTempMaterials((prevMaterials) => [...prevMaterials, newMat]);
      setExperimentData((prevData: any) => {
        const newMaterials = [...prevData.materials, { id: nextMaterialId, content: newMaterial }];
        return { ...prevData, materials: newMaterials };
      });

      setNewMaterial('');
      setNewMaterialVisible(false);
      setNextMaterialId(prevId => prevId + 1);
    }
  };

  const handleCancelAddMaterial = () => {
    setNewMaterial('');
    setNewMaterialVisible(false);
  };

  const handleEditMaterial = (material: Material) => {
    setEditMaterial(material);
  };

  const handleSaveMaterial = () => {
    if (editMaterial) {
      const updatedMaterials = tempMaterials.map(mat =>
        mat.id === editMaterial.id ? { ...mat, materialText: editMaterial.materialText } : mat
      );
      setTempMaterials(updatedMaterials);

      const dataMaterials = experimentData.materials.map((mat: any) =>
        mat.id === editMaterial.id ? { ...mat, content: editMaterial.materialText } : mat
      );
      setExperimentData((prevData: any) => ({ ...prevData, materials: dataMaterials }));

      setEditMaterial(null);
    }
  };

  const handleDeleteMaterial = (id: number) => {
    setTempMaterials(prevMaterials => prevMaterials.filter(mat => mat.id !== id));
    setExperimentData(prevData => ({
      ...prevData,
      materials: prevData.materials.filter((mat: any) => mat.id !== id),
    }));
  };


  interface Reference {
    id: number;
    referenceText: string;
    content: string;
  }

  const [tempReferences, setTempReferences] = useState<Reference[]>([]);
  const [newReference, setNewReference] = useState('');
  const [newReferenceVisible, setNewReferenceVisible] = useState(false);
  const [editReference, setEditReference] = useState<Reference | null>(null);

  const [nextReferenceId, setNextReferenceId] = useState(1);

  const handleReferenceTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewReference(value);
  };

  const handleAddReference = () => {
    setNewReferenceVisible(true);
  };

  const handleConfirmAddReference = () => {
    if (newReference !== '') {
      const newRef: Reference = { id: nextReferenceId, referenceText: newReference, content: '' };
      setTempReferences((prevReferences) => [...prevReferences, newRef]);
      setExperimentData((prevData: any) => {
        const newReferences = [...prevData.references, { id: nextReferenceId, content: newReference }];
        return { ...prevData, references: newReferences };
      });

      setNewReference('');
      setNewReferenceVisible(false);
      setNextReferenceId(prevId => prevId + 1);
    }
  };

  const handleCancelAddReference = () => {
    setNewReference('');
    setNewReferenceVisible(false);
  };

  const handleEditReference = (reference: Reference) => {
    setEditReference(reference);
  };

  const handleSaveReference = () => {
    if (editReference) {
      const updatedReferences = tempReferences.map(ref =>
        ref.id === editReference.id ? { ...ref, referenceText: editReference.referenceText } : ref
      );
      setTempReferences(updatedReferences);

      const dataReferences = experimentData.references.map((ref: any) =>
        ref.id === editReference.id ? { ...ref, content: editReference.referenceText } : ref
      );
      setExperimentData((prevData: any) => ({ ...prevData, references: dataReferences }));

      setEditReference(null);
    }
  };

  const handleDeleteReference = (id: number) => {
    setTempReferences(prevReferences => prevReferences.filter(ref => ref.id !== id));
    setExperimentData(prevData => ({
      ...prevData,
      references: prevData.references.filter((ref: any) => ref.id !== id),
    }));
  };



  // Declaração da constante fora da função handleGenerateId
  const [experimentId, setExperimentId] = useState('');

  const handleGenerateId = useCallback(() => {
    const date = new Date();
    const formattedDate = format(date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm 'horário local.'", { locale: ptBR });
    const generatedId = Date.now().toString();
    setExperimentData((prevData) => ({
      ...prevData,
      id: generatedId,
      postDate: formattedDate,
    }));
    setExperimentId(generatedId); // Atualiza o valor do ID no estado
  }, []);





  const [isLoading, setIsLoading] = useState(true); // Iniciar com isLoading como true

  useEffect(() => {
    const storedApiToken = localStorage.getItem('githubApiToken');
    if (storedApiToken) {
      setApiToken(storedApiToken);
      setUsername('nome de usuário');
      setIsLoading(false); // Parar o indicador de carregamento quando a chave estiver disponível
    } else {
      setIsLoading(false); // Parar o indicador de carregamento se a chave não estiver disponível
    }
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true); // Iniciar o indicador de carregamento

    const user = await testApiToken(apiToken);

    setIsLoading(false); // Parar o indicador de carregamento

    if (user) {
      localStorage.setItem('githubApiToken', apiToken);
      setUsername(user);
    }
  };

  const handleBackToHome = () => {
    setUsername('');
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // limpa o estado após 2 segundos
  };

  const [isSending, setIsSending] = useState(false);
  const [isDivHidden, setIsDivHidden] = useState(false);

  async function handleSend() {
    setIsSending(true);

    const octokitClient = new Octokit({
      auth: apiToken
    });
  
    const newBranchName = `experiment-update-${experimentId}`;

    const baseRepositoryOwnerName = "fellippemfv";
    const baseRepositoryName = "my-science-project";
    const baseBranchName = "add-experiment";

    //Json
    const filePath = "src/app/api/data/experimentos.json";
    const fileContent = JSON.stringify(experimentData, null, 2);

    const passosRealizados = document.getElementById("passos-realizados");
   


    const adicionarPasso = (passo: string, sucesso: boolean) => {
      if (passosRealizados) {
        const item = document.createElement("li");
        item.textContent = passo;
        item.style.color = sucesso ? "green" : "red";
        passosRealizados.appendChild(item);
      }
    };

    
  
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
  
    adicionarPasso("Esperando alguns segundos para garantir que as informações do fork estejam atualizadas...", true);
    // Espera alguns segundos para garantir que as informações do fork estejam atualizadas
    await new Promise(resolve => setTimeout(resolve, 5000));
  
    // Verifica se a branch "new-experiment" existe no fork
    adicionarPasso(`Verificando a existência da branch "${baseBranchName}" no fork...`, true);
    console.log(`Verificando a existência da branch "${baseBranchName}" no fork...`);
    let { data } = await octokitClient.repos.getBranch({
      owner: forkOwner,
      repo: baseRepositoryName,
      branch: baseBranchName
    });
  
    if (!data) {
      // Cria a branch "new-experiment" no fork se ela não existir
    adicionarPasso(`A branch "${baseBranchName}" não existe no fork. Criando a branch...`, true);

      console.log(`A branch "${baseBranchName}" não existe no fork. Criando a branch...`);
      const baseBranch = await octokitClient.repos.getBranch({
        owner: baseRepositoryOwnerName,
        repo: baseRepositoryName,
        branch: baseBranchName
      });
      const baseCommitSha = baseBranch.data.commit.sha;
  
      await octokitClient.git.createRef({
        owner: forkOwner,
        repo: baseRepositoryName,
        ref: `refs/heads/${baseBranchName}`,
        sha: baseCommitSha
      });
  
      // Aguarda alguns segundos para garantir que a branch seja criada no fork
    adicionarPasso("Aguardando alguns segundos para garantir que a branch já esteja criada no fork...", true);

      await new Promise(resolve => setTimeout(resolve, 5000));
  
    adicionarPasso(`Verificando se existe a branche '${baseBranchName}' no fork...`, true);


      // Obtém novamente as informações da branch no fork
      ({ data } = await octokitClient.repos.getBranch({
        owner: forkOwner,
        repo: baseRepositoryName,
        branch: baseBranchName
      }));
    }
  
    adicionarPasso(`Branch "${baseBranchName}" encontrada no fork!`, true);
    console.log(`Branch "${baseBranchName}" encontrada no fork. Continuando com o código...`);
    const baseCommitSha = data.commit.sha;
  
    // Cria a nova branch com base na branch "test" do fork
    adicionarPasso("Criando a nova branch com base na branch 'test' do fork...", true);

    const { data: newBranch } = await octokitClient.git.createRef({
      owner: forkOwner,
      repo: baseRepositoryName,
      ref: `refs/heads/${newBranchName}`,
      sha: baseCommitSha
    });

    adicionarPasso(`Branch nova do fork criada com sucesso!`, true);
    console.log("Branch nova do fork, usando como base 'test', criada com sucesso!");
  
    /* const newBranchSha = newBranch.object.sha; */
  

    adicionarPasso(`Buscando o conteúdo atual do arquivo na branch '${baseBranchName}' do fork...`, true);
    // Busca o conteúdo atual do arquivo na branch "test" do fork
    const fileInfo = await octokitClient.repos.getContent({
      owner: forkOwner,
      repo: baseRepositoryName,
      path: filePath,
      ref: baseBranchName,
    });

    adicionarPasso(`Busca pelo conteúdo atual realizada com sucesso!`, true);

    console.log("selectedImage na funcao de upload" + selectedImage)


    console.log("iniciando a adicao de imagem")


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
            
            const imagePath = `public/images/${experimentId}/${selectedImage.name}`;
            
            // Upload da imagem
            adicionarPasso(`Realizando o upload da imagem ${imagePath}...`, true);
            await octokitClient.repos.createOrUpdateFileContents({
              owner: forkOwner,
              repo: baseRepositoryName,
              path: imagePath,
              message: `Add image for experiment N° ${experimentId}`,
              content: base64Content,
              branch: newBranchName,
            });
    
            adicionarPasso(`Imagem ${imagePath} adicionada com sucesso!`, true);
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
    const imagePath = `public/images/${experimentId}/${imageName}`;
    
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
        email: "your.email@example.com"
      },
      committer: {
        name: "Your Name",
        email: "your.email@example.com"
      },
      content: Buffer.from(updatedContent).toString("base64")
    });

    adicionarPasso("Novo commit realizado com sucesso!", true);

  
    const newCommitSha = newCommit.sha;
  
    // Verifica se fileInfo é um objeto único ou uma matriz de objetos
    const fileInfoArray = Array.isArray(fileInfo.data) ? fileInfo.data : [fileInfo.data];
  
    // Verifica se o primeiro elemento do array possui a propriedade 'sha'
    if (fileInfoArray.length > 0 && 'sha' in fileInfoArray[0]) {
      // Acessa a propriedade 'sha' do primeiro elemento do array
      const sha = fileInfoArray[0].sha;
  
      // Atualiza o conteúdo do arquivo na nova branch do fork
      adicionarPasso("Atualizando o conteúdo do arquivo na nova branch do fork...", true);
      await octokitClient.repos.createOrUpdateFileContents({
        owner: forkOwner,
        repo: baseRepositoryName,
        path: filePath,
        message: `Update experiment data for experiment N° ${experimentId}`,
        content: Buffer.from(updatedContent).toString("base64"),
        branch: newBranchName,
        sha: sha
      });

      adicionarPasso("Conteúdo do arquivo atualizado com sucesso!", true);
      console.log("Dados adicionados à nova branch do fork com sucesso!");
    } else {
      // Trata o caso em que a propriedade 'sha' não está presente
      console.error("A propriedade 'sha' não está presente no objeto fileInfo.");
      adicionarPasso("A propriedade 'sha' não está presente no objeto fileInfo.", false);
    }



    
  
    adicionarPasso("Mesclando os commits da branch de destino do fork na nova branch do fork...", true);
    // Mescla os commits da branch de destino do fork na nova branch do fork
    const mergeResponse = await octokitClient.repos.merge({
      owner: forkOwner,
      repo: baseRepositoryName,
      base: newBranchName,
      head: baseBranchName
    });
  
    adicionarPasso("Commits mesclados com sucesso!", true);
    console.log("Commits mesclados com sucesso!");
  
    adicionarPasso("Criando uma pull request para mesclar as alterações da nova branch do fork na branch 'test' do repositório original...", true);
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
    setIsDivHidden(true)

    // Exibe o link para a pull request criada
    const pullRequestUrl = pullRequest.data.html_url;
    adicionarPasso(`Link da pull request: ${pullRequestUrl}`, true);


  }
  
  
  
  
  

  
  
  
  

  const generateSlug = useCallback(() => {
    const specialCharsMap: {[key: string]: string} = {
      á: 'a',
      à: 'a',
      ã: 'a',
      â: 'a',
      é: 'e',
      ê: 'e',
      í: 'i',
      ó: 'o',
      õ: 'o',
      ô: 'o',
      ú: 'u',
      ü: 'u',
      ç: 'c',
    };
  
    const titleWithoutSpecialChars = experimentData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, (match: string) => {
        const replacement = specialCharsMap[match];
        return replacement ? replacement : '';
      });
  
    return titleWithoutSpecialChars
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
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
  
  async function testApiToken(apiToken: string) {
    try {
      const response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${apiToken}`,
        },
      }); 
      return response.data.login;
    } catch (error) {
      console.error('Erro ao testar a chave da API:', error);
      return null;
    }
  }




  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null);
  const [isImageConfirmed, setIsImageConfirmed] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    let uploadProgress: NodeJS.Timeout | null = null;

    if (selectedImage) {
      setUploadStatus('Uploading... 0%');

      // Simulando o progresso do upload
      uploadProgress = setInterval(() => {
        console.log("imagem selecionada: " + selectedImage?.name);

        setUploadStatus((prevStatus) => {
          const progress = parseInt(prevStatus.split(' ')[1]);
          const newProgress = progress + 100;
          if (newProgress >= 100) {
            clearInterval(uploadProgress as NodeJS.Timeout);
            return 'Upload completed! 100%';
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
    console.log(file)

  
    if (file) {
      setSelectedImage(file);
      console.log(selectedImage)
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
    setUploadStatus('');
  
    // Limpe a propriedade imagePreview do estado experimentData
    setExperimentData((prevState: any) => ({
      ...prevState,
      imagePreview: '',
    }));
  
    // Redefinir o valor do input file para null
    const imageInputElement = document.getElementById(
      'imageUpload'
    ) as HTMLInputElement;
    if (imageInputElement) {
      imageInputElement.value = '';
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
      const imagePath = `public/images/${experimentId}/${file.name}`;
  
      // Atualiza o estado imagePath com o link dinâmico da imagem
      setExperimentData((prevState: any) => ({
        ...prevState,
        imagePreview: imagePath,
      }));
    };
  
    reader.readAsDataURL(file);
  };
  
  const getProgressBarWidth = () => {
    if (uploadStatus.includes('100%')) {
      return '100%';
    } else {
      const progress = parseInt(uploadStatus.split(' ')[1]);
      return `${progress}%`;
    }
  };




  interface Method {
    id: number;
    content: string;
    imagePath: string; // Adiciona a rota da imagem ao objeto Method
  }
  
  const [tempMethods, setTempMethods] = useState<Method[]>([]);
  const [newMethod, setNewMethod] = useState('');
  const [newMethodVisible, setNewMethodVisible] = useState(false);
  const [editMethod, setEditMethod] = useState<Method | null>(null);
  const [imageInputsCount, setImageInputsCount] = useState(1);
  const [nextMethodId, setNextMethodId] = useState(1);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  const handleMethodTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setNewMethod(value);
  };
  
  
  const handleAddMethod = () => {
    setNewMethodVisible(true);
  };
  
  const handleConfirmAddMethod = () => {
    if (newMethod !== '') {
      const newMethodObj: Method = { id: nextMethodId, content: newMethod, imagePath: '' };
      setTempMethods((prevMethods) => [...prevMethods, newMethodObj]);
      setExperimentData((prevData: any) => {
        const newMethods = [...prevData.methods, { id: nextMethodId, content: newMethod, imagePath: '' }];
        return { ...prevData, methods: newMethods };
      });
  
      setNewMethod('');
      setNewMethodVisible(false);
      setNextMethodId((prevId) => prevId + 1);
    }
  };
  
  const handleCancelAddMethod = () => {
    setNewMethod('');
    setNewMethodVisible(false);
    setEditMethod(null);
    // Voltar para o valor anterior ao clicar em editar
    if (editMethod) {
      setTempMethods(prevMethods => {
        const updatedMethods = prevMethods.map(method => {
          if (method.id === editMethod.id) {
            return { ...method, content: editMethod.content };
          }
          return method;
        });
        return updatedMethods;
      });
    }
  };
  
  
  const handleEditMethod = (method: Method) => {
    setEditMethod(method);
  };
 
  const handleSaveMethod = (index: any) => {
    const methodToSave = tempMethods[index];
  
    // Verifica se experimentData e experimentData.methods estão definidos
    if (experimentData && experimentData.methods) {
      const updatedMethods = tempMethods.map((m, i) =>
        i === index ? { ...m, content: methodToSave.content } : m
      );
      setTempMethods(updatedMethods);
  
      const dataMethods = experimentData.methods.map((m: any) =>
        m.id === methodToSave.id ? { ...m, content: methodToSave.content } : m
      );
      setExperimentData((prevData: any) => ({ ...prevData, methods: dataMethods }));
    }
    
    setEditMethod(null)
  };
  
  
  
  const handleDeleteMethod = (id: number, index: number) => {
    

    const methodToDelete = tempMethods.find(method => method.id === id);
    const hasImage = methodToDelete && methodToDelete.imagePath !== '';
    
    // Remove a imagem se existir
    if (hasImage) {
      handleRemoveImageMethod(index);
    }
    
    // Remove o método pelo ID
    setTempMethods(prevMethods => prevMethods.filter(method => method.id !== id));
  
    // Atualiza os índices dos métodos restantes
    setPreviewImages(prevImages => prevImages.filter((_, i) => i !== index));
    setImageInputsCount(prevCount => prevCount - 1);
  
    // Remove o método em experimentData.methods
    setExperimentData(prevData => ({
      ...prevData,
      methods: prevData.methods.filter((m: any) => m.id !== id),
    }));
  };

  const handleMethodImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
  
    if (files) {
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64Data = reader.result as string;
        const imageName = files[0].name;
        const imagePath = `public/images/${experimentData.id}/${imageName}`;
  
        const updatedMethods = tempMethods.map((method, i) => {
          if (i === index) {
            return { ...method, imagePath: imagePath };
          }
          return method;
        });
  
        setTempMethods(updatedMethods);
        setPreviewImages(prevImages => {
          const updatedImages = [...prevImages];
          updatedImages[index] = base64Data;
          return updatedImages;
        });
  
// Atualiza o experimentData.methods com o caminho da imagem
setExperimentData((prevData: any) => {
  const updatedData = {
    ...prevData,
    methods: (prevData.methods as any[]).map(m => {
      if (m.id === updatedMethods[index].id) {
        return { ...m, imagePath: imagePath };
      }
      return m;
    })
  };
  return updatedData;
});


      };
  
      reader.readAsDataURL(files[0]);
    }
  };
  
  
  const handleRemoveImageMethod = (index: number) => {
    
    const updatedMethods = [...tempMethods];
    updatedMethods[index] = { ...updatedMethods[index], imagePath: '' };
    setTempMethods(updatedMethods);
  
    setPreviewImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = '';
      return updatedImages;
    });
  
    // Redefine o valor do input file para permitir carregar a mesma imagem novamente
    const fileInput = document.getElementById(`imageMethod${index + 1}Upload`) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  
    setImageInputsCount((prevCount) => prevCount - 1);
    
    setExperimentData((prevData: any) => ({
      ...prevData,
      methods: prevData.methods.map((m: any) => {
        if (m.id === updatedMethods[index].id) {
          return { ...m, imagePath: '' };
        }
        return m;
      }),
    }));
  };
  
  






  return ( 
    <>

    <div className='' >
    <div className={styles.form}>







<form onSubmit={handleSubmit}>
  <div>
  
  <div className="border border-gray-200 rounded-lg p-6 mb-6">
  <h2 className="text-lg font-semibold mb-4">Etapa 1: Informações Gerais</h2>

  <div className="mb-4">
  <Label htmlFor="message-2">ID Único</Label>
  <p className="mt-2 mb-4 text-sm text-muted-foreground">
    O "ID" é gerado automaticamente, seria o numero de identificação do experimento e deve servir para adicionar e editar o experimento na plataforma do github.
  </p>
    <Input
      id="id"
      type="text"
      name="id"
      value={experimentData.id}
      onChange={handleInputChange}
      disabled
      className="cursor-not-allowed w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-100"
    />
  </div>

  <div className="mb-4">
  <Label htmlFor="message-2">Data de postagem</Label>
  <p className="mt-2 mb-4 text-sm text-muted-foreground">
    A data é gerada automaticamente, deve servir para adicionar a pagina do experimento o dia e hora que ele foi enviado.
  </p>
    <Input
      id="postDate"
      type="text"
      name="postDate"
      value={experimentData.postDate}
      onChange={handleInputChange}
      disabled
      className="cursor-not-allowed w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-100"
    />
  </div>

  <div className="mb-4">
  <Label htmlFor="message-2">Nome do autor/da autora</Label>
  <p className="mt-2 mb-4 text-sm text-muted-foreground">
    O nome do autor/da autora, é a identificação de quem enviou os dados do experimento, vai aparecer dentro da pagina do experimento para sabermos quem enviou.
  </p>
    <Input
    placeholder='Clique e escreva seu nome.'
      id="profileName"
      type="text"
      name="profileName"
      value={experimentData.profileName}
      onChange={handleInputChange}
      className="max-w-40rem px-4 mb-2 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none"
    />
    <p className="text-sm text-muted-foreground">
    Insira entre 10-300 caracteres.
  </p>
  </div>
</div>

<div className="border border-gray-300 rounded-lg p-6 mb-6">
  <h2 className="text-lg font-semibold mb-4">Etapa 2: Tópicos</h2>

  <div className="mb-4">
    <label htmlFor="topicGeneral" className="block text-gray-700 mb-1">
      Tópico Geral:
    </label>
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
      {experimentData.topicGeneral.map((topic: Topic) => (
        <div key={topic.id} className="bg-gray-200 p-2 rounded-md inline-flex items-center mr-2 mb-2">
          {topic.title}
          <button
            onClick={() => handleRemoveGeneralTopic(topic.id, topic.slug)}
            className="ml-2 text-red-500 focus:outline-none"
          >
            X
          </button>
        </div>
      ))}

      {experimentData.topicGeneral.length === 0 && (
        <div className="text-red-500 mt-2">
          Selecione pelo menos um tópico geral
        </div>
      )}
    </div>
  </div>

  {experimentData.topicGeneral.length > 0 && (
    <>
      {experimentData.topicGeneral.map((generalTopic: any) => {
        const specificTopics = experimentGeneralData.find(
          (topic) => topic.slug === generalTopic.slug
        )?.topicSpecific || [];

        const selectedSpecificTopics = (
          experimentData.topicSpecific[generalTopic.slug] || []
        ) as SpecificTopic[];

        return (
          <div key={generalTopic.slug} className="mb-4">
            <label htmlFor={`topicSpecific-${generalTopic.slug}`} className="block text-gray-700 mb-1">
              Tópico Específico de {generalTopic.title}:
            </label>
            <select
              id={`topicSpecific-${generalTopic.slug}`}
              onChange={(event) => handleSpecificSelectChange(event, generalTopic.slug)}
              name="topicSpecific"
              defaultValue=""
              disabled={isSpecificTopicSelected(generalTopic.slug)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-100"
            >
              <option value="">Selecione um tópico</option>
              {specificTopics.map((specificTopic) => {
                const isTopicSelected = selectedSpecificTopics.some(
                  (topic) => topic.slug === specificTopic.slug
                );

                return (
                  <option
                    key={specificTopic.id}
                    value={specificTopic.slug}
                    disabled={isSpecificTopicSelected(specificTopic.slug) || isTopicSelected}
                    className="bg-white"
                  >
                    {specificTopic.title}
                  </option>
                );
              })}
            </select>

            <div className="mt-2 flex flex-wrap">
              {selectedSpecificTopics.map((topic: any) => (
                <div key={topic.id} className="bg-gray-200 p-2 rounded-md inline-flex items-center mr-2 mb-2">
                  {topic.title}
                  <button
                    onClick={() => handleRemoveSpecificTopic(topic.id, generalTopic.slug)}
                    className="ml-2 text-red-500 focus:outline-none"
                  >
                    X
                  </button>
                </div>
              ))}

              {selectedSpecificTopics.length === 0 && (
                <div className="text-red-500 mt-2">
                  Escolha pelo menos um tópico de {generalTopic.title}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  )}

  <div className="mb-4">
    <label htmlFor="topicLocalization" className="block text-gray-700 mb-1">
      Tópico de Localização:
    </label>
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
      {experimentData.topicLocation.map((topic: LocalizationTopic) => (
        <div key={topic.id} className="bg-gray-200 p-2 rounded-md inline-flex items-center mr-2 mb-2">
          {topic.title}
          <button onClick={() => handleRemoveDivLocalization(topic.id)} className="ml-2 text-red-500 focus:outline-none">
            X
          </button>
        </div>
      ))}

      {experimentData.topicLocation.length === 0 && (
        <div className="text-red-500 mt-2">
          Selecione pelo menos um tópico sobre a localização onde o experimento pode ser realizado.
        </div>
      )}
    </div>
  </div>

  <div className="mb-4">
    <label htmlFor="topicAudience" className="block text-gray-700 mb-1">
      Tópico de Público-Alvo:
    </label>
    <select
      id="topicAudience"
      onChange={handleSelectAudienceChange}
      name="topicAudience"
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-100"
      defaultValue=""
    >
      <option value="">Selecione um tópico</option>
      {experimentTargetAudienceData.map((audience) => (
        <option
          key={audience.id}
          value={audience.slug}
          disabled={isAudienceSelected(audience.slug)}
          className="bg-white"
        >
          {audience.title}
        </option>
      ))}
    </select>

    <div className="mt-2 flex flex-wrap">
      {experimentData.targetAudience.map((audience: TargetAudienceTopic) => (
        <div key={audience.id} className="bg-gray-200 p-2 rounded-md inline-flex items-center mr-2 mb-2">
          {audience.title}
          <button onClick={() => handleRemoveAudience(audience.id)} className="ml-2 text-red-500 focus:outline-none">
            X
          </button>
        </div>
      ))}

      {experimentData.targetAudience.length === 0 && (
        <div className="text-red-500 mt-2">
          Selecione pelo menos um tópico sobre o público-alvo do experimento.
        </div>
      )}
    </div>
  </div>
</div>





<div className="border border-gray-200 rounded-lg p-6 mb-6">
  <h2 className="text-lg font-semibold mb-4">Etapa 3: Informações Básicas do experimento</h2>

  <div className="mb-4">
  <Label htmlFor="title">Título:</Label>
  <p className="mt-2 mb-4 text-sm text-muted-foreground">
    O título é uma parte crucial da identificação do seu experimento. Por favor, seja claro e descritivo, de preferência faça algo chamativo.
  </p>
  <Input
    placeholder='Insira o título aqui.'
    id="title"
    type="text"
    name="title"
    onChange={handleInputChange}
    className="max-w-40rem px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none"
    
  />
   <p className="text-sm text-muted-foreground">
    Insira entre 10-300 caracteres.
  </p>
</div>


  <div className="mb-4">
  <Label htmlFor="title">Slug</Label>
  <p className="mt-2 mb-4 text-sm text-muted-foreground">
    O slug é gerado atomaticamente, e ele é basicamente o endereço onde vamos encontrar o experimento, por isso ele não deve ser igual a nenhum já cadastrado.
  </p>
    <Input
      id="slug"
      type="text"
      name="slug"
      value={generateSlug()}
      onChange={handleInputChange}
      disabled
      className="cursor-not-allowed w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100"
    />
  </div>

  <Label>
    Imagem de Preview
  </Label>

  <p className="mt-2 mb-4 text-sm text-muted-foreground">
      Insira uma imagem para visualização prévia. Esta imagem será exibida como um preview do seu experimento. Escolha uma imagem que represente o experiment como um todo para aparecer na página de busca, veja algo bem chamativo.
    </p>



    <div className="flex flex-col items-center">
  <div className="flex flex-col md:flex-row items-start justify-center md:justify-center w-full">
    <div className="mb-4 md:mb-0">
      {imagePreviewURL && (
     <div className="mb-4 mr-8">
     <h3 className="text-lg font-semibold mb-2">Preview:</h3>
     <div className="flex flex-col items-center">
       <img className="h-auto max-h-48 object-cover rounded-md mr-2 mb-2 md:mb-0" src={imagePreviewURL} alt="Preview" />
       <Button onClick={handleRemoveImage} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">Remover Imagem</Button>
     </div>
   </div>
   
      )}

      {!imagePreviewURL && (
        <div className="flex flex-col items-center cursor-pointer" id={styles.upload}>
          <FiUploadCloud className="text-4xl mb-2" />
          <h1 className="text-lg font-semibold mb-1">Importe sua imagem</h1>
          <p className="mb-2 px-8 text-sm">Arraste ou clique para fazer upload</p>
          <input type="file" className="hidden" id="imageUpload" accept="image/*" onChange={handleImageChange} disabled={isImageConfirmed} />
        </div>
      )}
    </div>
  </div>
</div>







<div className="grid w-full gap-1.5">
<Label className='mb-2' htmlFor="message-2">Descrição</Label>
<p className="mb-2 text-sm text-muted-foreground">
    Forneça uma descrição objetiva, detalhada e concisa do seu experimento, escreva de forma que fique chamativo e atraia as pessoas a acessarem. Essa descrição vai aparecer na página de procurar experimentos, logo, seja breve.
</p>

  <Textarea
    placeholder="Clique e escreva a sua descrição."
    id="message-2"
    className="max-w-40rem h-32 px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none"
 name="description"
    onChange={handleInputChange}
    minLength={10}
    maxLength={300}
  />
  <p className="text-sm text-muted-foreground">
    Insira entre 10-300 caracteres.
  </p>
 
    </div>

</div>



<div className="border border-gray-200 rounded-lg p-6 mb-6">
  <h2 className="text-lg font-semibold mb-4">Etapa 4: Informações Complementares</h2>
  

  <div className="mt-8">
  <Label className='mb-2' htmlFor="objectives">Objetivos</Label>
<p className="mb-2 text-sm text-muted-foreground">
    Liste os objetivos do experimento no infinitivo, ou seja, descreva o que se pretende alcançar de forma clara e sucinta. Certifique-se de incluir todos os objetivos que o experimento visa alcançar. Por exemplo, "analisar", "comparar", "avaliar", entre outros. Cada objetivo deve estar descrito no infinitivo e de forma distinta.
</p>


  {tempObjectives.map((objective, index) => (
    <div key={objective.id} className="border border-solid border-gray-300 rounded-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <Label className="mr-4 block font-semibold">{`${index + 1}° Objetivo:`}</Label>
      </div>
      <div>
        {editObjective && editObjective.id === objective.id ? (
          <>
           <Textarea
            placeholder="Clique e escreva um objetivo."
            className="mb-2 max-w-40rem h-32 px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none"
 value={editObjective.objectiveText}
            onChange={(event) => setEditObjective({ ...editObjective, objectiveText: event.target.value })}
          />
          <p className="text-sm text-muted-foreground">
          Insira entre 10-300 caracteres.
          </p>
          </>
         
          
        ) : (
          <>
           <Textarea
            placeholder="Clique e escreva um objetivo."
            className="mb-2 cursor-not-allowed max-w-40rem h-32 px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none"
 value={objective.objectiveText}
            readOnly
          />
          <p className="text-sm text-muted-foreground">
          Insira entre 10-300 caracteres.
          </p>
          </>
         
        )}
      </div>

      <div className="flex justify-end">
        {editObjective && editObjective.id === objective.id ? (
          <>
            <Button className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-600" onClick={handleSaveObjective}>Salvar</Button>
            <Button className="px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-600" onClick={() => setEditObjective(null)}>Cancelar</Button>
          </>
        ) : (
          <>
            <Button className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600" onClick={() => handleEditObjective(objective)}>Editar</Button>
            <Button className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-600" onClick={() => handleDeleteObjective(objective.id)}>Excluir</Button>
          </>
        )}
      </div>
    </div>
  ))}

  {tempObjectives.length < 5 && !newObjectiveVisible && (
    <Button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600" onClick={handleAddObjective}>
      <RiAddLine className="h-5 w-5 mr-2" />
      <span>Adicionar novo Objetivo</span>
    </Button>
  )}

  {newObjectiveVisible && (
    <div className="border border-solid border-gray-300 rounded-md p-4 mb-4">
      <Textarea
        placeholder="Clique e escreva um objetivo."
        className="mb-2 max-w-40rem h-32 px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none"
 value={newObjective}
        onChange={handleObjectiveTextChange}
      />
      <p className="text-sm text-muted-foreground">
          Insira entre 10-300 caracteres.
          </p>
      <div className="mt-4 flex justify-end">
        <Button className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-600" onClick={handleConfirmAddObjective}>Adicionar Objetivo</Button>
        <Button className="px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-600" onClick={handleCancelAddObjective}>Cancelar</Button>
      </div>
    </div>
  )}
</div>


<div className="mt-8">
<Label className='mb-2' htmlFor="materials">Materiais Necessários</Label>
<p className="mb-2 text-sm text-muted-foreground">
    Liste os materiais essenciais para a realização do experimento. Certifique-se de incluir tudo o que os participantes precisarão para realizar o experimento com sucesso. Por exemplo, inclua computador, tablet ou smartphone com acesso à internet, bem como qualquer outro material. Adicione a quantidade e o nome de cada material.
</p>

  {tempMaterials.map((material, index) => (
    <div key={material.id} className="border-b border-solid border-darkgray pb-2 mb-4">
      <label className="block mb-1">{`${index + 1}° Material`}</label>
      <div className="flex flex-col">
        {editMaterial && editMaterial.id === material.id ? (
          <Input
            className="max-w-40rem px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none mb-2"
            type="text"
            value={editMaterial.materialText}
            onChange={(event) => setEditMaterial({ ...editMaterial, materialText: event.target.value })}
          />
        ) : (
          <Input
            className="cursor-not-allowed max-w-40rem px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none mb-2"
            type="text"
            value={material.materialText}
            readOnly
          />
        )}
        <p className="text-sm text-muted-foreground mb-2">Insira entre 10-300 caracteres.</p>
        <div className="flex justify-end">
          {editMaterial && editMaterial.id === material.id ? (
            <>
              <Button className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-600" onClick={handleSaveMaterial}>Salvar</Button>
              <Button className="px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-600" onClick={() => setEditMaterial(null)}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600" onClick={() => handleEditMaterial(material)}>Editar</Button>
              <Button className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-600" onClick={() => handleDeleteMaterial(material.id)}>Excluir</Button>
            </>
          )}
        </div>
      </div>
    </div>
  ))}

  {tempMaterials.length < 5 && !newMaterialVisible && (
    <Button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600" onClick={handleAddMaterial}>
    <RiAddLine className="h-5 w-5 mr-2" />
    <span>Adicionar novo Material</span>
  </Button>
  
  )}

  {newMaterialVisible && (
    <div className="mb-4">
      <Input
        className="max-w-40rem px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none mb-2"
        type="text"
        value={newMaterial}
        onChange={handleMaterialTextChange}
      />
      <p className="text-sm text-muted-foreground mb-2">Insira entre 10-300 caracteres.</p>
      <div className="flex justify-end">
        <Button className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-600" onClick={handleConfirmAddMaterial}>Adicionar Material</Button>
        <Button className="px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-600" onClick={handleCancelAddMaterial}>Cancelar</Button>
      </div>
    </div>
  )}
</div>

<div className="mt-8">
  <Label className="mb-2" htmlFor="message-2">
    Passo a passo
  </Label>
  <p className="mb-2 text-sm text-muted-foreground">
    Forneça uma descrição objetiva, detalhada e concisa de cada passo para a realização do seu experimento, escreva de forma que fique claro o que devemos realizar, por isso, separe em passos.
  </p>

  {tempMethods.map((method, index) => (
    <div key={method.id} className="border border-solid border-darkgray rounded-md p-4 mb-4 relative">
    <div className="border-b border-gray-300 p-4 mb-4">
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center">
      <FcInfo className="w-6 h-6 mr-2" /> {/* Ícone FiTool */}
      <label className="block mb-1 font-bold">{`${index + 1}° Passo`}</label> {/* Passos em negrito */}
    </div>
    <Button className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-600" onClick={() => handleDeleteMethod(method.id, index)}>Excluir este passo</Button>
  </div>
</div>


      <div className="flex flex-col md:flex-row md:items-center">
       
        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
        <Label className='mb-2'>Texto deste passo:</Label>
          <Textarea
            className="mb-2 max-w-40rem h-32 px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none"
            value={method.content}
            readOnly={!editMethod || editMethod.id !== method.id}
            onChange={(event) => {
              const updatedMethods = [...tempMethods];
              updatedMethods[index] = { ...updatedMethods[index], content: event.target.value };
              setTempMethods(updatedMethods);
            }}
            style={{ cursor: !editMethod ? 'not-allowed' : 'auto' }}
          />
          <p className="text-sm text-muted-foreground">
            Insira entre 10-300 caracteres.
          </p>
          {editMethod && editMethod.id === method.id ? (
        <div className='w-full flex justify-end mt-4 bottom-0 right-0'>
          <Button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-600" onClick={() => handleSaveMethod(index)}>Salvar</Button>
          <Button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-600" onClick={handleCancelAddMethod}>Cancelar</Button>
        </div>
      ) : (
        <div className='w-full flex justify-end mt-4 bottom-0 right-0'>
          <Button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600" onClick={() => handleEditMethod(method)}>Editar Texto</Button>
        </div>
      )}
        </div>
        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
  <Label className='flex flex-col items-center md:items-center mb-2 md:mr-4'>Imagem deste passo:</Label>

  <div className="flex flex-col items-center md:items-center">
    {!previewImages[index] ? (
      <label htmlFor={`imageMethod${index + 1}Upload`} className={`cursor-pointer w-full md:w-auto flex justify-center md:justify-start mt-8`}>
        <div className="max-w-40rem p-4 w-full h-200 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
          <FiUploadCloud className="text-4xl mb-2" />
          <h1 className="text-lg font-semibold mb-1">Importe sua imagem</h1>
          <p className="mb-2 px-8 text-sm">Arraste ou clique para fazer upload</p>
          <p className="mb-2 px-8 text-sm">Aceita PNG, JPG, JPEG e SVG.</p>
        </div>
        <input
          type="file"
          accept="image/*"
          id={`imageMethod${index + 1}Upload`}
          onChange={(event) => handleMethodImageChange(index, event)}
          className="hidden"
        />
      </label>
    ) : (
      <div className="flex flex-col items-center">
        <img src={previewImages[index]} alt={`Imagem do método ${index + 1}`} className="h-auto max-h-48 object-cover rounded-md mr-2 mb-2 md:mb-0" />
        <Button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600" onClick={() => handleRemoveImageMethod(index)}>
          Remover imagem
        </Button>
      </div>
    )}
  </div>
</div>


      </div>
    
     
    </div>
  ))}

  {tempMethods.length < 5 && !newMethodVisible && (
    <Button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600" onClick={handleAddMethod}>
      <RiAddLine className="h-5 w-5 mr-2" />
      <span>Adicionar novo Passo</span>
    </Button>
  )}

  {newMethodVisible && (
    <div className="mb-4">
      <Label className="mb-2" htmlFor="message-2">
        Escreva abaixo o próximo passo.
      </Label>
      <p className="mb-2 text-sm text-muted-foreground">
        Depois de escrever, clique em 'Adicionar método', depois você vai conseguir editar o texto e adicionar uma imagem. Deve ser de APENAS UM PASSO, não se preocupe que posteriormente você vai conseguir adicionar novos passos.
      </p>
      <Textarea
        className="mb-2 max-w-40rem h-32 px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none"
        value={newMethod}
        onChange={handleMethodTextChange}
      />
      <p className="text-sm text-muted-foreground">
        Insira entre 10-300 caracteres.
      </p>

      <div className="mt-4 flex flex-col md:flex-row md:items-center">
        <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" onClick={handleConfirmAddMethod}>
          Adicionar Método
        </button>
        <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={handleCancelAddMethod}>
          Cancelar
        </button>
      </div>
    </div>
  )}
</div>


<div className="grid w-full gap-1.5 mt-8 ">
  <Label className='mb-2' htmlFor="message-2">Resultados do Experimento</Label>
  <p className="mb-2 text-sm text-muted-foreground">
    Insira os resultados obtidos a partir da realização do experimento. Seja claro e objetivo para que outros usuários possam entender facilmente o que deve ocorrer ao final da sua realização, mais especificamente o que devemos observar após o realizar todas as etapas da metodologia.
  </p>

  <Textarea
    placeholder="Clique e escreva os resultados do seu experimento."
    id="message-2"
    className="max-w-40rem h-32 px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none"
    name="results"
    onChange={handleInputChange}
    minLength={10}
    maxLength={300}
  />
  <p className="text-sm text-muted-foreground">
    Insira entre 10-300 caracteres.
  </p>
</div>




<div className="grid w-full gap-1.5 mt-8">
  <Label className='mb-2' htmlFor="message-2">Explicação Científica</Label>
  <p className="mb-2 text-sm text-muted-foreground">
    Insira uma explicação científica detalhada do seu experimento. Utilize terminologia apropriada e seja claro para que outros usuários possam compreender facilmente como a ciência explica este experimento.
  </p>

  <Textarea
    placeholder="Clique e escreva a explicação científica do seu experimento."
    id="message-2"
    className="max-w-40rem h-32 px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transprent focus:ring-transparent outline-none resize-none"
    name="scientificExplanation"
    onChange={handleInputChange}
    minLength={10}
    maxLength={300}
  />
  <p className="text-sm text-muted-foreground">
    Insira entre 10-300 caracteres.
  </p>
</div>

<div className="mt-8">
  <Label htmlFor="references" className="block text-gray-700 mb-2">
    Referências
  </Label>
  <p className="text-sm text-gray-500 mb-4">
    Liste as referências utilizadas no experimento. Certifique-se de incluir todas as fontes e materiais consultados para realizar o experimento.
  </p>

  {tempReferences.map((reference, index) => (
    <div key={reference.id} className="border-b border-solid border-darkgray pb-2 mb-4 flex flex-col">
      <Label className="block mb-1">{`${index + 1}° Referência`}</Label>
      <div className="flex flex-col">
        {editReference && editReference.id === reference.id ? (
          <Input
            className="max-w-40rem px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transparent focus:ring-transparent outline-none resize-none mb-2"
            type="text"
            value={editReference.referenceText}
            onChange={(event) => setEditReference({ ...editReference, referenceText: event.target.value })}
          />
        ) : (
          <Input
            className="cursor-not-allowed max-w-40rem px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transparent focus:ring-transparent outline-none resize-none mb-2"
            type="text"
            value={reference.referenceText}
            readOnly
          />
        )}
        <p className="text-sm text-gray-500 mb-2">Insira entre 10-300 caracteres.</p>
        <div className="flex justify-end">
          {editReference && editReference.id === reference.id ? (
            <>
              <Button className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-600" onClick={handleSaveReference}>Salvar</Button>
              <Button className="px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-600" onClick={() => setEditReference(null)}>Cancelar</Button>
            </>
          ) : (
            <>
              <Button className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600" onClick={() => handleEditReference(reference)}>Editar</Button>
              <Button className="px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-600" onClick={() => handleDeleteReference(reference.id)}>Excluir</Button>
            </>
          )}
        </div>
      </div>
    </div>
  ))}

  {tempReferences.length < 5 && !newReferenceVisible && (
    <Button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600" onClick={handleAddReference}>
      <RiAddLine className="h-5 w-5 mr-2" />
      <span>Adicionar nova Referência</span>
    </Button>
  )}

  {newReferenceVisible && (
    <div className="mb-4">
      <Input
        className="max-w-40rem px-4 border border-gray-350 focus:border-gray-400 focus:ring-gray-350 focus-visible:ring-transparent focus:ring-transparent outline-none resize-none mb-2"
        type="text"
        value={newReference}
        onChange={handleReferenceTextChange}
      />
      <p className="text-sm text-gray-500 mb-2">Insira entre 10-300 caracteres.</p>
      <div className="flex justify-end">
        <Button className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:bg-green-600" onClick={handleConfirmAddReference}>Adicionar Referência</Button>
        <Button className="px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-600" onClick={handleCancelAddReference}>Cancelar</Button>
      </div>
    </div>
  )}
</div>


</div>


<button onClick={handleSend} className="flex items-center justify-center mt-4 px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
  <span>Enviar Experimento</span>
  <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
  </svg>
</button>



  </div>

</form>
</div>
 {Object.keys(experimentData).length > 0 && (
  <>
    <div className="d-flex justify-content-end">
      <button className="btn btn-outline-primary me-2" onClick={handleCopy}>
        {copied ? "Copiado!" : "Copiar"}
        <FaCopy className="ms-2" />
      </button>
    </div>
    <pre>
      {JSON.stringify(experimentData, null, 2)}
    </pre>
  </>
)} 
    </div>



    
  
    </>
  
  )
}
