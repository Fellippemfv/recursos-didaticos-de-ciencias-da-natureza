import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import dynamic from "next/dynamic";

interface ExperimentInfo {
  id: string;
  [key: string]: any;
}

// Componente de botão de download
const DownloadButton = ({ loading }: { loading: boolean }) => {
  return loading ? (
    <button className="btn bg-blue-500 text-white py-2 px-4 rounded">
      Gerando PDF...
    </button>
  ) : (
    <button className="btn bg-green-500 text-white py-2 px-4 rounded">
      Baixar PDF
    </button>
  );
};

// Carregando o componente 'DownloadPDF' dinamicamente com SSR desabilitado
const DownloadPDF = dynamic(
  () => import("./DownloadPDF").then((mod) => mod.default),
  { ssr: false },
);

// Componente principal para gerar e baixar o PDF
const ButtonPDF = ({ experimentInfo }: { experimentInfo: ExperimentInfo }) => {
  return (
    <PDFDownloadLink
      document={<DownloadPDF experimentInfo={experimentInfo} />}
      fileName={`atividade_${experimentInfo.id}.pdf`}
    >
      {
        ((params: any) => (
          <DownloadButton loading={params.loading} />
        )) as unknown as React.ReactNode
      }
    </PDFDownloadLink>
  );
};

export default ButtonPDF;
