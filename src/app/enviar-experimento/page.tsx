"use client";
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import styles from './page.module.css' 
import { GrNext } from 'react-icons/gr';
import { MdCheck } from 'react-icons/md';

import { FiUploadCloud } from 'react-icons/fi';
import { ImFilePicture } from 'react-icons/im';

import { FaCopy } from "react-icons/fa";

import { Octokit } from "@octokit/rest";
/* import Octokit from "@octokit/rest"; */

import bnccData from "../../app/api/data/bncc.json"
import locationData from "../../app/api/data/location.json"
import topicGeneralData from "../../app/api/data/experimentGeneralData.json"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

export default function Experiment() { 
  
  const [experimentLocationData] = useState(locationData);
  const [experimentGeneralData] = useState(topicGeneralData);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const experimentJson = JSON.stringify({
      ...experimentData,
    });
    console.log(experimentJson);
  };

  interface Objective {
    objectiveText: string;
    content: string;
  }
  
  const [tempObjectives, setTempObjectives] = useState<Objective[]>([]);
  const [newObjective, setNewObjective] = useState('');
  const [newObjectiveVisible, setNewObjectiveVisible] = useState(false);
  const [editIndexObjectives, setEditIndexObjectives] = useState(-1);
  const [editedObjective, setEditedObjective] = useState('');
  
  const handleObjectiveTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewObjective(value);
  };
  
  const handleAddObjective = () => {
    setNewObjectiveVisible(true);
  };
  
  const handleConfirmAddObjective = () => {
    if (newObjective !== '') {
      setTempObjectives((prevObjectives) => [...prevObjectives, { objectiveText: newObjective, content: '' }]);
      setExperimentData((prevData: any) => {
        const newObjectives = [...prevData.objectives, { content: newObjective }];
        return { ...prevData, objectives: newObjectives };
      });
  
      setNewObjective('');
      setNewObjectiveVisible(false);
    }
  };
  
  const handleCancelAddObjective = () => {
    setNewObjective('');
    setNewObjectiveVisible(false);
  };
  
  const handleEditObjective = (index: number) => {
    setEditIndexObjectives(index);
    setEditedObjective(tempObjectives[index].objectiveText);
  };
  
  const handleSaveObjective = () => {
    setTempObjectives((prevObjectives) => {
      const updatedObjectives = [...prevObjectives];
      updatedObjectives[editIndexObjectives].objectiveText = editedObjective;
      return updatedObjectives;
    });
  
    setExperimentData((prevData: any) => {
      const updatedObjectives = [...prevData.objectives];
      updatedObjectives[editIndexObjectives].content = editedObjective;
      return { ...prevData, objectives: updatedObjectives };
    });
  
    setEditIndexObjectives(-1);
    setEditedObjective('');
  };
  
  const handleDeleteObjective = (index: number) => {
    setTempObjectives((prevObjectives) => {
      const updatedObjectives = [...prevObjectives];
      updatedObjectives.splice(index, 1);
      return updatedObjectives;
    });
  
    setExperimentData((prevData: any) => {
      const updatedObjectives = [...prevData.objectives];
      updatedObjectives.splice(index, 1);
      return { ...prevData, objectives: updatedObjectives };
    });
  };
  
  interface Material {
    materialText: string;
    content: string;
  }

const [tempMaterials, setTempMaterials] = useState<Material[]>([]);
const [newMaterial, setNewMaterial] = useState('');
const [newMaterialVisible, setNewMaterialVisible] = useState(false);
const [editIndexMaterial, setEditIndexMaterial] = useState(-1);
const [editedMaterial, setEditedMaterial] = useState('');

const toggleMaterialFields = () => {
  setNewMaterialVisible(!newMaterialVisible);
};

const handleMaterialTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  setNewMaterial(value);
};

const handleAddMaterial = () => {
  setNewMaterialVisible(true);
};

const handleConfirmAddMaterial = () => {
  if (newMaterial !== '') {
    setTempMaterials((prevMaterials) => [...prevMaterials, { materialText: newMaterial, content: '' }]);
    setExperimentData((prevData: any) => {
      const newMaterials = [...prevData.materials, { content: newMaterial }];
      return { ...prevData, materials: newMaterials };
    });

    setNewMaterial('');
    setNewMaterialVisible(false);
  }
};

const handleCancelAddMaterial = () => {
  setNewMaterial('');
  setNewMaterialVisible(false);
};

const handleEditMaterial = (index: number) => {
  setEditIndexMaterial(index);
  setEditedMaterial(tempMaterials[index].materialText);
};

const handleSaveMaterial = () => {
  setTempMaterials((prevMaterials) => {
    const updatedMaterials = [...prevMaterials];
    updatedMaterials[editIndexMaterial].materialText = editedMaterial;
    return updatedMaterials;
  });

  setExperimentData((prevData: any) => {
    const updatedMaterials = [...prevData.materials];
    updatedMaterials[editIndexMaterial].content = editedMaterial;
    return { ...prevData, materials: updatedMaterials };
  });

  setEditIndexMaterial(-1);
  setEditedMaterial('');
};

const handleDeleteMaterial = (index: number) => {
  setTempMaterials((prevMaterials) => {
    const updatedMaterials = [...prevMaterials];
    updatedMaterials.splice(index, 1);
    return updatedMaterials;
  });

  setExperimentData((prevData: any) => {
    const updatedMaterials = [...prevData.materials];
    updatedMaterials.splice(index, 1);
    return { ...prevData, materials: updatedMaterials };
  });
};

interface Reference {
  referenceText: string;
  content: string;
}

const [tempReferences, setTempReferences] = useState<Reference[]>([]);
const [newReference, setNewReference] = useState('');
const [newReferenceVisible, setNewReferenceVisible] = useState(false);
const [editIndexReference, setEditIndexReference] = useState(-1);
const [editedReference, setEditedReference] = useState('');

const toggleReferenceFields = () => {
  setNewReferenceVisible(!newReferenceVisible);
};

const handleReferenceTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = event.target;
  setNewReference(value);
};

const handleAddReference = () => {
  setNewReferenceVisible(true);
};

const handleConfirmAddReference = () => {
  if (newReference !== '') {
    setTempReferences((prevReferences) => [...prevReferences, { referenceText: newReference, content: '' }]);
    setExperimentData((prevData: any) => {
      const newReferences = [...prevData.references, { content: newReference }];
      return { ...prevData, references: newReferences };
    });

    setNewReference('');
    setNewReferenceVisible(false);
  }
};

const handleCancelAddReference = () => {
  setNewReference('');
  setNewReferenceVisible(false);
};

const handleEditReference = (index: number) => {
  setEditIndexReference(index);
  setEditedReference(tempReferences[index].referenceText);
};

const handleSaveReference = () => {
  setTempReferences((prevReferences) => {
    const updatedReferences = [...prevReferences];
    updatedReferences[editIndexReference].referenceText = editedReference;
    return updatedReferences;
  });

  setExperimentData((prevData: any) => {
    const updatedReferences = [...prevData.references];
    updatedReferences[editIndexReference].content = editedReference;
    return { ...prevData, references: updatedReferences };
  });

  setEditIndexReference(-1);
  setEditedReference('');
};

const handleDeleteReference = (index: number) => {
  setTempReferences((prevReferences) => {
    const updatedReferences = [...prevReferences];
    updatedReferences.splice(index, 1);
    return updatedReferences;
  });

  setExperimentData((prevData: any) => {
    const updatedReferences = [...prevData.references];
    updatedReferences.splice(index, 1);
    return { ...prevData, references: updatedReferences };
  });
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
  
    const baseBranchName = "test";
    const newBranchName = `experiment-update-${experimentId}`;

    //Json
    const filePath = "src/app/api/data/experimentos.json";
    const fileContent = JSON.stringify(experimentData, null, 2);

    //Img
    const filePathImg = "public/images/${experimentId}";
    const fileContentImg = JSON.stringify(experimentData, null, 2);

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
      owner: "Science-projects",
      repo: "testing",
    });
    adicionarPasso("Fork criado com sucesso!", true);
    console.log("Fork criado com sucesso!");
  
    const forkOwner = fork.owner.login;
  
    adicionarPasso("Esperando alguns segundos para garantir que as informações do fork estejam atualizadas...", true);
    // Espera alguns segundos para garantir que as informações do fork estejam atualizadas
    await new Promise(resolve => setTimeout(resolve, 5000));
  
    // Verifica se a branch "test" existe no fork
    adicionarPasso(`Verificando a existência da branch "${baseBranchName}" no fork...`, true);
    console.log(`Verificando a existência da branch "${baseBranchName}" no fork...`);
    let { data } = await octokitClient.repos.getBranch({
      owner: forkOwner,
      repo: "testing",
      branch: baseBranchName
    });
  
    if (!data) {
      // Cria a branch "test" no fork se ela não existir
    adicionarPasso(`A branch "${baseBranchName}" não existe no fork. Criando a branch...`, true);

      console.log(`A branch "${baseBranchName}" não existe no fork. Criando a branch...`);
      const baseBranch = await octokitClient.repos.getBranch({
        owner: "Science-projects",
        repo: "testing",
        branch: baseBranchName
      });
      const baseCommitSha = baseBranch.data.commit.sha;
  
      await octokitClient.git.createRef({
        owner: forkOwner,
        repo: "testing",
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
        repo: "testing",
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
      repo: "testing",
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
      repo: "testing",
      path: filePath,
      ref: baseBranchName,
    });

    adicionarPasso(`Busca pelo conteúdo atual realizada com sucesso!`, true);


    //Devo permitir apenas jpg, jpeg e png.
    const handleImageUpload = async (imageFile: File) => {
      if (imageFile) {
        const imageContent = await readFileAsBase64(imageFile);
        const imagePath = `public/images/${experimentId}/${imageFile.name}`;
    
        // Upload da imagem
        adicionarPasso(`Realizando o upload da imagem ${imagePath}...`, true);
        await octokitClient.repos.createOrUpdateFileContents({
          owner: forkOwner,
          repo: "testing",
          path: imagePath,
          message: `Add image for experiment N° ${experimentId}`,
          content: imageContent,
          branch: newBranchName,
        });
    
        adicionarPasso(`Imagem ${imagePath} adicionada com sucesso!`, true);
      } else {
        adicionarPasso("Nenhuma imagem selecionada.", false);
      }
    };
    
    const readFileAsBase64 = (file: File) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string | null;
          if (base64String !== null) {
            const [, base64Content] = base64String.split(",");
            resolve(base64Content);
          } else {
            reject("Erro ao ler o arquivo.");
          }
        };
        reader.onerror = () => {
          reject("Erro ao ler o arquivo.");
        };
        reader.readAsDataURL(file);
      });
    };

    adicionarPasso("Realizando o upload da imagem de preview...", true);
    const imageUploadElement = document.getElementById("imageUpload") as HTMLInputElement | null;
    if (imageUploadElement && imageUploadElement.files && imageUploadElement.files[0]) {
    const imageFile = imageUploadElement.files[0];
    await handleImageUpload(imageFile);
    adicionarPasso("Upload da imagem concluído.", true);
    } else {
    adicionarPasso("Nenhuma imagem selecionada.", false); 
    }

    for (let i = 1; i < imageInputsCount; i++) {
      adicionarPasso(`Realizando o upload da imagem de método parte ${i}...`, true);
    
      const imageInputElement = document.getElementById(`imageMethod${i}Upload`) as HTMLInputElement | null;
      if (imageInputElement && imageInputElement.files && imageInputElement.files[0]) {
        const imageFile = imageInputElement.files[0];
        await handleImageUpload(imageFile);
        adicionarPasso(`Upload da imagem de método parte ${i} concluído.`, true);
      } else {
        adicionarPasso(`Nenhuma imagem selecionada para o método parte ${i}.`, false);
      }
    }
    

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
      repo: "testing",
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
        repo: "testing",
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
      repo: "testing",
      base: newBranchName,
      head: baseBranchName
    });
  
    adicionarPasso("Commits mesclados com sucesso!", true);
    console.log("Commits mesclados com sucesso!");
  
    adicionarPasso("Criando uma pull request para mesclar as alterações da nova branch do fork na branch 'test' do repositório original...", true);
    // Cria uma pull request para mesclar as alterações da nova branch do fork na branch "test" do repositório original
    const pullRequest = await octokitClient.pulls.create({
      owner: "Science-projects",
      repo: "testing",
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






  const [tempMethods, setTempMethods] = useState<{ methodText: string; methodImages: string }[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageInputsCount, setImageInputsCount] = useState(1);
  const [disableInput, setDisableInput] = useState<boolean[]>([]);
  const [editMode, setEditMode] = useState<boolean[]>([]);
  const [showFields, setShowFields] = useState(false);
  const [filledMethods, setFilledMethods] = useState<number[]>([]);

  const toggleStepFields = () => {
    setShowFields(!showFields);
  };

  const handleMethodTextChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
  
    setTempMethods((prevMethods) => {
      const updatedMethods = [...prevMethods];
  
      if (index < updatedMethods.length) {
        updatedMethods[index] = { ...updatedMethods[index], methodText: value };
      }
  
      const updatedFilledMethods = [...filledMethods];
      if (value.trim() !== '') {
        if (!updatedFilledMethods.includes(index)) {
          updatedFilledMethods.push(index);
        }
      } else {
        const indexToRemove = updatedFilledMethods.indexOf(index);
        if (indexToRemove !== -1) {
          updatedFilledMethods.splice(indexToRemove, 1);
        }
      }
      setFilledMethods(updatedFilledMethods);
  
      return updatedMethods;
    });
  };
  
  

  const handleMethodImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64Data = reader.result as string;
        const imagePath = `public/images/${experimentData.id}/${files[0].name}`;

        const updatedMethods = [...tempMethods];

        if (updatedMethods[index]) {
          updatedMethods[index] = { ...updatedMethods[index], methodImages: imagePath };
        } else {
          updatedMethods[index] = { methodText: '', methodImages: imagePath };
        }

        setTempMethods(updatedMethods);
        setPreviewImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[index] = base64Data;
          return updatedImages;
        });
      };

      reader.readAsDataURL(files[0]);
    }
  };

  const handleAddStep = () => {
    setShowFields(true);
    setTempMethods((prevMethods) => [...prevMethods, { methodText: '', methodImages: '' }]);
    setDisableInput((prevDisableInput) => [...prevDisableInput, true]);
    setEditMode((prevEditMode) => [...prevEditMode, true]);
    setImageInputsCount((prevCount) => prevCount + 1);
  };

  const handleConfirmAdd = () => {
    if (tempMethods.length > 6) {
      // Limite de 5 inputs atingido
      return;
    }
  
    const nonEmptyMethods = tempMethods.filter(
      (method) => method.methodText.trim() !== '' || method.methodImages !== ''
    );
  
    if (nonEmptyMethods.length > 0) {
      const lastMethod = nonEmptyMethods[nonEmptyMethods.length - 1];
  
      setFilledMethods((prevFilledMethods) => [...prevFilledMethods, tempMethods.length - 1]);
  
      setExperimentData((prevState: any) => ({
        ...prevState,
        methods: [...prevState.methods, lastMethod],
      }));
    }
  
    setShowFields(false);
    setTempMethods((prevMethods) => [...prevMethods]);
    setImageInputsCount((prevCount) => prevCount + 1);
  };
  
  const handleCancelAdd = () => {
    setTempMethods((prevMethods) => prevMethods.slice(0, prevMethods.length - 1));
    setDisableInput((prevDisableInput) => prevDisableInput.slice(0, prevDisableInput.length - 1));
    setEditMode((prevEditMode) => prevEditMode.slice(0, prevEditMode.length - 1));
    setImageInputsCount((prevCount) => prevCount - 1);
    setShowFields(false);
  };

  const getFilledMethods = () => {
    return tempMethods.filter(
      (_, index) =>
        filledMethods.includes(index) || (showFields && index === tempMethods.length - 1)
    );
  };

  const fileInputRef = useRef<HTMLInputElement>(null);







  return ( 
    <>

    <div className={`${styles.container} ${isSending ? styles.hide : ""}`}>

    <div>


    <div className={`${styles.container} ${isSending ? styles.hide : ''}`}>
      <div>
        {isLoading ? ( // Verificar se isLoading é verdadeiro para exibir o indicador de carregamento
         <div className={styles.loading}>
         <div className={styles.spinner}></div>
         <p>Carregando...</p>
       </div>
        ) : username ? (
          <div>
<div className="flex justify-center">
  <div className="flex flex-col justify-center items-center w-full bg-green-500 text-white p-4 rounded-lg">
    <p className="mb-2">
      Agora você está habilitado para enviar seu experimento!
    </p>
    <button onClick={handleBackToHome} className="px-4 py-2 bg-white text-green-500 rounded-md focus:outline-none hover:bg-gray-200">
      Mudar usuário
    </button>
  </div>
</div>


            
            <div className={styles.form}>







<form onSubmit={handleSubmit}>
  <div>
  
  <div className="border border-gray-200 rounded-lg p-6 mb-6">
  <h2 className="text-lg font-semibold mb-4">Etapa 1: Informações Gerais</h2>

  <div className="mb-4">
    <label htmlFor="id" className="block text-gray-700 mb-1">
      ID:
    </label>
    <input
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
    <label htmlFor="postDate" className="block text-gray-700 mb-1">
      Post Date:
    </label>
    <input
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
    <label htmlFor="profileName" className="block text-gray-700 mb-1">
      Profile Name:
    </label>
    <input
      id="profileName"
      type="text"
      name="profileName"
      value={experimentData.profileName}
      onChange={handleInputChange}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
    />
  </div>
</div>

<div className="border border-gray-200 rounded-lg p-6 mb-6">
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

    <div className="mt-2">
      {experimentData.topicGeneral.map((topic: Topic) => (
        <div key={topic.id} className="bg-gray-100 p-2 rounded-md inline-block mr-2 mb-2">
          {topic.title}
          <button
            onClick={() => handleRemoveGeneralTopic(topic.id, topic.slug)}
            className="ml-2 text-red-500 focus:outline-none"
          >
            X
          </button>
        </div>
      ))}
    </div>

    {experimentData.topicGeneral.length === 0 && (
      <div className="text-red-500 mt-2">
        Selecione pelo menos um tópico geral
      </div>
    )}
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

            <div className="mt-2">
              {selectedSpecificTopics.map((topic: any) => (
                <div key={topic.id} className="bg-gray-100 p-2 rounded-md inline-block mr-2 mb-2">
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
    Localization Topic
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

  <div className="mt-2">
    {experimentData.topicLocation.map((topic: LocalizationTopic) => (
      <div key={topic.id} className="bg-gray-100 p-2 rounded-md inline-block mb-2">
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

</div>

<div className="border border-gray-200 rounded-lg p-6 mb-6">
  <h2 className="text-lg font-semibold mb-4">Etapa 3: Informações Básicas</h2>

  <div className="mb-4">
    <label htmlFor="title" className="block text-gray-700 mb-1">
      Title:
    </label>
    <input
      id="title"
      type="text"
      name="title"
      onChange={handleInputChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
  </div>

  <div className="mb-4">
    <label htmlFor="slug" className="block text-gray-700 mb-1">
      Slug:
    </label>
    <input
      id="slug"
      type="text"
      name="slug"
      value={generateSlug()}
      onChange={handleInputChange}
      disabled
      className="cursor-not-allowed w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100"
    />
  </div>

  <label className="block mb-4">
  <span className="text-gray-700">Imagem de preview:</span>
</label>

<div className="bg-white rounded-lg p-4 mb-4">
  <div className="flex flex-col items-center">
    {imagePreviewURL && (
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Preview:</h3>
        <img className="max-h-40  w-full max-w-lg h-auto mb-2" src={imagePreviewURL} alt="Preview" />
      </div>
    )}

    <div className="flex flex-col items-center mb-4">
      {selectedImage && (
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-2">
            <ImFilePicture className="text-2xl mr-2" />
            <div>
              <h2 className="text-lg font-semibold">{selectedImage.name}</h2>
              <span>{`${selectedImage.size} bytes`}</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-lg">
            <div className="bg-blue-500 rounded-lg" style={{ width: getProgressBarWidth(), height: '4px' }}></div>
          </div>
          <span className="mt-2">{uploadStatus}</span>
        </div>
      )}

      {selectedImage && (
        <div className="mt-4">
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={handleRemoveImage}>Remover Imagem</button>
        </div>
      )}
    </div>

    {!imagePreviewURL && (
      <div className="flex flex-col items-center" id={styles.upload}>
        <FiUploadCloud className="text-4xl mb-2" />
        <h1 className="text-lg font-semibold mb-1">Importe seus arquivos</h1>
        <p className="mb-2">Arraste ou clique para fazer upload</p>
        <input type="file" className="hidden" id="imageUpload" accept="image/*" onChange={handleImageChange} disabled={isImageConfirmed} />
      </div>
    )}
  </div>
</div>



  <label className="block mb-4">
    <span className="text-gray-700">Description:</span>
    <textarea className="block w-full h-32 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" name="description" onChange={handleInputChange} />
  </label>
</div>

<div className="border border-gray-200 rounded-lg p-6 mb-6">
  <h2 className="text-lg font-semibold mb-4">Etapa 4: Informações Complementares</h2>
  

  <div className="mt-8">
  <label htmlFor="title" className="block text-gray-700 mb-1">
  Objetivos
    </label>

  {tempObjectives.map((objective, index) => (
    <div key={index} className="border-b border-solid border-darkgray pb-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between"> {/* Usando flex para alinhar os elementos */}
      <label className="mr-4 block mb-1">{`${index + 1}° Objetivo`}</label> {/* Ajuste do rótulo para incluir o número do objetivo */}
      <div className="flex flex-col md:flex-row md:items-center flex-grow"> {/* Usando flex-grow para ocupar o espaço disponível */}
        {editIndexObjectives === -1 || editIndexObjectives !== index ? (
          <input
            className="cursor-not-allowed flex-grow w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            value={objective.objectiveText}
            onChange={() => {}}
            disabled
          />
        ) : (
          <input
            className="flex-grow w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            value={editedObjective}
            onChange={(event) => setEditedObjective(event.target.value)}
          />
        )}
        {editIndexObjectives === -1 || editIndexObjectives !== index ? (
          <>
            <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => handleEditObjective(index)}>Editar</button>
            <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" onClick={() => handleDeleteObjective(index)}>Excluir</button>
          </>
        ) : (
          <>
            <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" onClick={handleSaveObjective}>Salvar</button>
            <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={() => setEditIndexObjectives(-1)}>Cancelar</button>
          </>
        )}
      </div>
    </div>
  ))}

  {tempObjectives.length < 5 && !newObjectiveVisible && (
    <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleAddObjective}>Adicionar +1 Objetivo</button>
  )}

  {newObjectiveVisible && (
    <div className="mb-4">
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        type="text"
        value={newObjective}
        onChange={handleObjectiveTextChange}
      />
      <div className="mt-4 flex flex-col md:flex-row md:items-center"> {/* Usando flex para alinhar os botões */}
        <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" onClick={handleConfirmAddObjective}>Adicionar Objetivo</button>
        <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={handleCancelAddObjective}>Cancelar</button>
      </div>
    </div>
  )}
</div>






<div className="mt-8">
<label htmlFor="title" className="block text-gray-700 mb-1">
Materiais
    </label>


  {tempMaterials.map((material, index) => (
    <div key={index} className="border-b border-solid border-darkgray pb-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
      <label className="mr-4 block mb-1">{`${index + 1}° Material`}</label>
      <div className="flex flex-col md:flex-row md:items-center flex-grow">
        {editIndexMaterial === -1 || editIndexMaterial !== index ? (
          <input
            className="cursor-not-allowed flex-grow w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            value={material.materialText}
            onChange={() => {}}
            disabled
          />
        ) : (
          <input
            className="flex-grow w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            value={editedMaterial}
            onChange={(event) => setEditedMaterial(event.target.value)}
          />
        )}
        {editIndexMaterial === -1 || editIndexMaterial !== index ? (
          <>
            <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => handleEditMaterial(index)}>Editar</button>
            <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" onClick={() => handleDeleteMaterial(index)}>Excluir</button>
          </>
        ) : (
          <>
            <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" onClick={handleSaveMaterial}>Salvar</button>
            <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={() => setEditIndexMaterial(-1)}>Cancelar</button>
          </>
        )}
      </div>
    </div>
  ))}

  {tempMaterials.length < 5 && !newMaterialVisible && (
    <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleAddMaterial}>Adicionar +1 Material</button>
  )}

  {newMaterialVisible && (
    <div className="mb-4">
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        type="text"
        value={newMaterial}
        onChange={handleMaterialTextChange}
      />
      <div className="mt-4 flex flex-col md:flex-row md:items-center">
        <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" onClick={handleConfirmAddMaterial}>Adicionar Material</button>
        <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={handleCancelAddMaterial}>Cancelar</button>
      </div>
    </div>
  )}
</div>





  <div className="mt-8">
  <label htmlFor="title" className="block text-gray-700 mb-1">
  Passos
    </label>



    {getFilledMethods().map((method, index) => (
      <div key={index} className="mb-4">
        <label className="block mb-1">Method Text:</label>
        <input
          type="text"
          value={method.methodText}
          onChange={(event) => handleMethodTextChange(index, event)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />

        <label htmlFor={`imageMethod${index + 1}Upload`} className="block mt-4 mb-1">Method Image:</label>
        <div className="flex items-center">
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              id={`imageMethod${index + 1}Upload`}
              onChange={(event) => handleMethodImageChange(index, event)}
              ref={fileInputRef}
              className="hidden"
            />
            <label htmlFor={`imageMethod${index + 1}Upload`} className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <span>Clique aqui ou arraste o arquivo</span>
            </label>
          </div>
          <div className="ml-4">
            {previewImages[index] && (
              <img src={previewImages[index]} alt={`Method ${index + 1} Preview`} className="w-24 h-auto" />
            )}
          </div>
        </div>
      </div>
    ))}

    {tempMethods.length < 5 && !showFields && (
      <button onClick={handleAddStep} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">Adicionar +1 Passo</button>
    )}

    {showFields && (
      <div className="mt-4">
        <button onClick={handleConfirmAdd} className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">Adicionar Método</button>
        <button onClick={handleCancelAdd} className="px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">Cancelar</button>
      </div>
    )}
  </div>

  <div className="mt-8">
  <label htmlFor="title" className="block text-gray-700 mb-1">
  Results
    </label>

  <textarea className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" name="results" onChange={handleInputChange} />
</div>


<div className="mt-8">
<label className="block mb-4">
    <span className="text-gray-700">Scientific Explanation:</span>
    <textarea className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" name="scientificExplanation" onChange={handleInputChange} />
  </label>
</div>


<div className="mt-8">
  <h1 className="text-xl font-semibold mb-2">Referências</h1>

  {tempReferences.map((reference, index) => (
    <div key={index} className="border-b border-solid border-darkgray pb-2 mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
      <label className="mr-4 block mb-1">{`${index + 1}° Referência`}</label>
      <div className="flex flex-col md:flex-row md:items-center flex-grow">
        {editIndexReference === -1 || editIndexReference !== index ? (
          <input
            className="cursor-not-allowed flex-grow w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            value={reference.referenceText}
            onChange={() => {}}
            disabled
          />
        ) : (
          <input
            className="flex-grow w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            value={editedReference}
            onChange={(event) => setEditedReference(event.target.value)}
          />
        )}
        {editIndexReference === -1 || editIndexReference !== index ? (
          <>
            <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => handleEditReference(index)}>Editar</button>
            <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" onClick={() => handleDeleteReference(index)}>Excluir</button>
          </>
        ) : (
          <>
            <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" onClick={handleSaveReference}>Salvar</button>
            <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={() => setEditIndexReference(-1)}>Cancelar</button>
          </>
        )}
      </div>
    </div>
  ))}

  {tempReferences.length < 5 && !newReferenceVisible && (
    <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleAddReference}>Adicionar +1 Referência</button>
  )}

  {newReferenceVisible && (
    <div className="mb-4">
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        type="text"
        value={newReference}
        onChange={handleReferenceTextChange}
      />
      <div className="mt-4 flex flex-col md:flex-row md:items-center">
        <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" onClick={handleConfirmAddReference}>Adicionar Referência</button>
        <button className="mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" onClick={handleCancelAddReference}>Cancelar</button>
      </div>
    </div>
  )}
</div>


</div>


<button className="flex items-center justify-center mt-4 px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
  <span>Enviar Experimento</span>
  <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
  </svg>
</button>


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

</form>
</div>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-32">
          <form onSubmit={handleFormSubmit} className="max-w-sm">
            <p className="mb-4">
              Insira sua chave API do GitHub
            </p>
            <input
              type="text"
              id="apiTokenInput"
              value={apiToken}
              onChange={(event) => {
                const token = event.target.value;
                setApiToken(token);
                localStorage.setItem('githubApiToken', token);
              }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-center">
              <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600">
                Adicionar chave
              </button>
            </div>
          </form>
        </div>
        
        )}
      </div>
    </div>

     

      


    </div>








    </div>


    <div className={`${styles.experimentContainer} ${isSending ? "" : styles.hide}`}>
      {isDivHidden &&  <div className={`${styles.successDiv} ${isDivHidden ? styles.hidden : ''}`}>
        <h2 id="mensagem-final">Experimento enviado com sucesso!</h2>
        <p>Seu experimento foi enviado para análise.</p>
        <Link href="/">Clique aqui para ir a pagina inicial</Link>
      </div>} 

      {!isDivHidden &&  <div className={`${styles.successDiv} ${isDivHidden ? styles.hidden : ''}`}>
        <h2 id="mensagem-final">Enviando seu experimento, aguarde um momento...</h2>
        <p>Seu experimento esta sendo enviado pelo github, acompanhe abaixo o passo a passo</p>
      </div>}
   


  <p className={styles.stepsLabel}>Passos realizados:</p>
  <ul id="passos-realizados" className={styles.stepsList}>
    {/* Passos vão aqui */}
  </ul>
</div>



    
  
    </>
  
  )
}
