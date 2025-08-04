"use client";

import React, { useRef, useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { VscError } from "react-icons/vsc";

// Importando os dados JSON
import teachingResourceData from "../api/data/teachingResourceSpecifics.json";
import topicGeneralData from "../api/data/teachingResourceGeneralThemes.json";
import resourceTypes from "../api/data/teachingResourceTypes.json";

/**
 * Este componente contém toda a lógica de busca e a interface do usuário.
 * Ele usa o hook `useSearchParams` e, por isso, é envolvido por <Suspense> no componente da página.
 */
function SearchImplementation() {
  // Hooks do Next.js para manipulação da URL
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- ESTADOS ---
  const [searchTermInput, setSearchTermInput] = useState('');
  const [filteredExperiments, setFilteredExperiments] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Estados para os filtros ativos (derivados da URL)
  const [selectedGeneralTopics, setSelectedGeneralTopics] = useState<Set<string>>(new Set());
  const [selectedSpecificTopics, setSelectedSpecificTopics] = useState<Set<string>>(new Set());
  const [selectedExperimentTypes, setSelectedExperimentTypes] = useState<Set<string>>(new Set());

  const filteredSectionRef = useRef<HTMLDivElement | null>(null);

  // --- LÓGICA PRINCIPAL: EFEITO PARA SINCRONIZAR URL COM O ESTADO E FILTRAR ---
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    const q = params.get("q") || "";
    const disciplinas = new Set(params.getAll("disciplina"));
    const topicos = new Set(params.getAll("topico"));
    const tipos = new Set(params.getAll("tipo"));

    setSearchTermInput(q);
    setSelectedGeneralTopics(disciplinas);
    setSelectedSpecificTopics(topicos);
    setSelectedExperimentTypes(tipos);

    // Só executa a busca se houver algum parâmetro na URL
    if (params.toString().length > 0) {
      const searchKeywords = q.toLowerCase().split(' ').filter(kw => kw.trim() !== '');

      const filtered = teachingResourceData.filter((resource) => {
        const matchesSearch =
          searchKeywords.length === 0 ||
          searchKeywords.every(keyword =>
            resource.title.toLowerCase().includes(keyword) ||
            resource.description?.toLowerCase().includes(keyword)
          );

        const matchesGeneralTopic =
          disciplinas.size === 0 ||
          resource.topicGeneral.some(tg => disciplinas.has(tg.slug));

        const matchesSpecificTopic =
          topicos.size === 0 ||
          Array.from(topicos).some((key) => {
            const [generalSlug, specificSlug] = key.split("|");
           return (resource.topicSpecific as any)?.[generalSlug as any]?.some(
             (spec: any) => (spec as any).slug === (specificSlug as any)
           );
          });
        
        const matchesExperimentType =
          tipos.size === 0 || tipos.has(resource.resourceType.slug);

        return matchesSearch && matchesGeneralTopic && matchesSpecificTopic && matchesExperimentType;
      });

      setFilteredExperiments(filtered);
      setStatusMessage(`${filtered.length} resultados encontrados.`);
      setHasSearched(true);
    } else {
      // Se não houver parâmetros, limpa os resultados e reseta o estado
      setFilteredExperiments([]);
      setStatusMessage("");
      setHasSearched(false);
    }
    
    setVisibleCount(6);
  }, [searchParams]);

  // --- FUNÇÕES PARA ATUALIZAR A URL ---
  const updateURLParams = useCallback((updates: {key: string, value: string, action: 'toggle' | 'set' | 'clear'}) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (updates.action === 'clear') {
        router.push(pathname);
        return;
    }
    
    if (updates.action === 'set') {
        if (updates.value) {
            newParams.set(updates.key, updates.value);
        } else {
            newParams.delete(updates.key);
        }
    }

    if (updates.action === 'toggle') {
        const allValues = newParams.getAll(updates.key);
        if (allValues.includes(updates.value)) {
            const filteredValues = allValues.filter(v => v !== updates.value);
            newParams.delete(updates.key);
            filteredValues.forEach(v => newParams.append(updates.key, v));
            
            if (updates.key === 'disciplina') {
                const topicsToRemove = new URLSearchParams(searchParams.toString()).getAll('topico').filter(t => t.startsWith(`${updates.value}|`));
                const currentTopics = newParams.getAll('topico').filter(t => !topicsToRemove.includes(t));
                newParams.delete('topico');
                currentTopics.forEach(t => newParams.append('topico', t));
            }
        } else {
            newParams.append(updates.key, updates.value);
        }
    }
    
    router.push(`${pathname}?${newParams.toString()}`);
  }, [pathname, router, searchParams]);

  const handleSearchClick = () => {
    updateURLParams({ key: 'q', value: searchTermInput, action: 'set' });
    if (filteredSectionRef.current) {
        filteredSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleGeneralTopic = (slug: string) => updateURLParams({ key: 'disciplina', value: slug, action: 'toggle' });
  const toggleSpecificTopic = (key: string) => updateURLParams({ key: 'topico', value: key, action: 'toggle' });
  const toggleExperimentType = (slug: string) => updateURLParams({ key: 'tipo', value: slug, action: 'toggle' });
  const clearFilters = () => updateURLParams({ action: 'clear', key: '', value: '' });
  const loadMore = () => setVisibleCount((prev) => prev + 6);

  return (
    <main className="max-w-5xl mx-auto text-center mb-16 mt-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Pesquisar Recursos Didáticos</h1>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-grow">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Digite palavras-chave..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={searchTermInput}
            onChange={(e) => setSearchTermInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
          />
        </div>
        <button
          onClick={handleSearchClick}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Pesquisar
        </button>
      </div>
      
      {(searchTermInput || selectedGeneralTopics.size > 0 || selectedSpecificTopics.size > 0 || selectedExperimentTypes.size > 0) ? (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border">
          <div className="flex justify-between items-start">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="font-semibold text-sm mr-2 text-gray-700">Filtros Ativos:</span>
              {searchTermInput && (
                <span className="flex items-center gap-1 text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">
                  Busca: "{searchTermInput}"
                </span>
              )}
              {Array.from(selectedGeneralTopics).map(slug => { const topic = topicGeneralData.find(t => t.slug === slug); return topic ? ( <span key={slug} className="flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{topic.title}</span> ) : null; })}
              {Array.from(selectedExperimentTypes).map(slug => { const type = resourceTypes.find(t => t.slug === slug); return type ? ( <span key={slug} className="flex items-center gap-1 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">{type.title}</span> ) : null; })}
              {Array.from(selectedSpecificTopics).map(key => { const [generalSlug, specificSlug] = key.split("|"); const generalTopic = topicGeneralData.find(t => t.slug === generalSlug); const specificTopic = generalTopic?.topicSpecific.find(st => st.slug === specificSlug); return specificTopic ? ( <span key={key} className="flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{specificTopic.title}</span> ) : null; })}
            </div>
            <button onClick={clearFilters} className="ml-4 flex-shrink-0 text-sm text-blue-600 hover:text-blue-800 hover:underline">Limpar Filtros</button>
          </div>
        </div>
      ) : ( <div className="mb-8 p-4 bg-gray-50 rounded-lg border"> <p className="text-center text-sm text-gray-500">Nenhum filtro aplicado</p> </div> )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
        <aside className="space-y-4 col-span-1">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Disciplina</h3>
            <div className="flex flex-wrap gap-2">
              {topicGeneralData.map((topic) => { const isActive = selectedGeneralTopics.has(topic.slug); return ( <button key={topic.id} onClick={() => toggleGeneralTopic(topic.slug)} className={`px-3 py-1 rounded-full text-sm border transition-all ${ isActive ? "bg-blue-100 text-blue-800 border-blue-400 font-medium" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100" }`}>{topic.title}</button> ); })}
            </div>
            {topicGeneralData.map((topic) => { if (!selectedGeneralTopics.has(topic.slug)) return null; return ( <div key={topic.id} className="mt-4 ml-2"> <h4 className="text-sm text-gray-700 font-medium mb-2">{topic.title} - Tópicos:</h4> <div className="flex flex-wrap gap-2"> {topic.topicSpecific.map((specific) => { const key = `${topic.slug}|${specific.slug}`; const isChecked = selectedSpecificTopics.has(key); return ( <button key={key} onClick={() => toggleSpecificTopic(key)} className={`px-3 py-1 rounded-full text-xs border transition-all ${ isChecked ? "bg-green-100 text-green-800 border-green-400 font-medium" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100" }`}>{specific.title}</button> ); })} </div> </div> ); })}
          </div>
          <div className="pt-4">
            <h3 className="font-semibold text-gray-900 mb-2">Tipo de Recurso</h3>
            <div className="flex flex-wrap gap-2">
              {resourceTypes.map((type) => { const isActive = selectedExperimentTypes.has(type.slug); return ( <button key={type.id} onClick={() => toggleExperimentType(type.slug)} className={`px-3 py-1 rounded-full text-sm border transition-all ${ isActive ? "bg-purple-100 text-purple-800 border-purple-400 font-medium" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100" }`}>{type.title}</button> ); })}
            </div>
          </div>
        </aside>

        <div className="col-span-1 md:col-span-3">
          <div className="mb-4 text-sm text-gray-500 text-left">{statusMessage}</div>
          
          <div ref={filteredSectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[300px]">
            {!hasSearched ? (
              <div className="md:col-span-2 flex flex-col items-center justify-center text-center p-10 bg-gray-50 rounded-lg">
                <FiSearch className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">Pronto para explorar?</h3>
                <p className="text-gray-500 mt-1">Use a busca ou os filtros para encontrar recursos didáticos.</p>
              </div>
            ) : filteredExperiments.length === 0 ? (
              <div className="md:col-span-2 flex flex-col items-center justify-center text-center p-10 bg-gray-50 rounded-lg">
                <VscError className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">Nenhum resultado obtido</h3>
                <p className="text-gray-500 mt-1">Tente ajustar seus filtros ou termos de busca.</p>
              </div>
            ) : (
              filteredExperiments.slice(0, visibleCount).map((exp, idx) => (
                <div key={exp.slug || idx} className="border p-3 rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow flex flex-col">
                  {exp.imagePreview && ( <img src={exp.imagePreview} alt={exp.title} className="w-full h-40 object-cover rounded-md mb-3" onError={(e) => (e.currentTarget.style.display = 'none')} /> )}
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{exp.title}</h3>
                    <p className="text-gray-600 mb-3 text-sm flex-grow">
                      {exp.description ? `${exp.description.substring(0, 120)}${exp.description.length > 120 ? '...' : ''}` : ''}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-4">
                      {exp.topicGeneral.map((t: any) => ( <span key={t.slug} className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{t.title}</span> ))}
                      {Object.entries(exp.topicSpecific).flatMap(([_, specs]: any) => specs.map((spec: any) => ( <span key={spec.slug} className="px-2 py-1 bg-green-100 text-green-800 rounded">{spec.title}</span> )))}
                    </div>
                    <Link href={`/teaching-resource/${exp.slug}`} target="_blank" className="w-full text-center mt-auto inline-block px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              ))
            )}

            {visibleCount < filteredExperiments.length && (
              <div className="text-center pt-4 md:col-span-2"> 
                <button onClick={loadMore} className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
                  Carregar mais
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}


/**
 * Este é o componente de página principal (o default export).
 * Ele é responsável por renderizar a fronteira de Suspense, que é uma
 * exigência do Next.js para componentes que usam `useSearchParams`.
 */
export default function SearchPage() {
  return (
    <Suspense fallback={
        <div className="flex items-center justify-center h-screen w-full">
            <div className="text-center p-10 text-gray-500">
                Carregando recursos...
            </div>
        </div>
    }>
      <SearchImplementation />
    </Suspense>
  );
}
