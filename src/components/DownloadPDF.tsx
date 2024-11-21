// components/DownloadPDF.js
import React from "react";
import { FiDownload } from "react-icons/fi";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const spacing = 8;

// Estilos do PDF
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 25,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: spacing,
  },
  mainTitle: {
    fontSize: 16, // Maior que os outros títulos
    fontWeight: "bold",
    textAlign: "center", // Centralizado no topo
    marginBottom: spacing * 4, // Espaço adicional abaixo do título
    color: "#000",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: spacing,
    color: "#333",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: spacing,
    color: "#444",
  },
  text: {
    fontSize: 10,
    color: "#666",
    lineHeight: 1.3,
    textAlign: "justify",
    marginBottom: spacing,
  },
  image: {
    width: "60%",
    height: "auto",
    marginBottom: 6,
    alignSelf: "center", // Centraliza a imagem
  },
  doubleColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: spacing,
  },
  column: {
    width: "48%",
  },
  stepContainer: {
    border: "1px solid #333", // Borda ao redor de cada etapa
    padding: spacing,
    marginBottom: spacing,
    borderRadius: 4, // Bordas arredondadas
  },
  stepHeader: {
    flexDirection: "row", // Alinha o número e o texto na horizontal
    alignItems: "center",
    marginBottom: spacing,
  },
  stepNumberText: {
    fontSize: 10,
    fontWeight: "bold",
    marginRight: 6, // Espaçamento entre "Etapa" e número
    color: "#333",
  },
  downloadButton: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
    display: "inline-block",
    fontWeight: "bold",
  },
});

const DownloadPDF = ({ experimentInfo }) => {
  const renderMethods = () => {
    const leftColumn = [];
    const rightColumn = [];

    experimentInfo.methods.forEach((method, index) => {
      const methodKey = `${method.id || index}-${method.content}`;

      const content = (
        <View key={methodKey} style={styles.stepContainer}>
          {/* Descrição da etapa */}
          <Text style={styles.text}>
            Etapa {index + 1}: {method.content}
          </Text>
          {/* Imagem centralizada */}
          {method.imagePath && (
            <Image style={styles.image} src={method.imagePath} />
          )}
        </View>
      );

      if (index % 2 === 0) {
        leftColumn.push(content);
      } else {
        rightColumn.push(content);
      }
    });

    return (
      <View style={styles.doubleColumn}>
        <View style={styles.column}>{leftColumn}</View>
        <View style={styles.column}>{rightColumn}</View>
      </View>
    );
  };

  return (
    <div>
      {/* Botão de Download */}
      <PDFDownloadLink
        document={
          <Document>
            <Page style={styles.page}>
              {/* Título principal no topo */}
              <Text style={styles.mainTitle}>{experimentInfo.title}</Text>

              {/* Materiais e Objetivos em colunas */}
              <View style={styles.doubleColumn}>
                {/* Coluna esquerda: Materiais */}
                <View style={styles.column}>
                  <Text style={styles.title}>Lista de Materiais</Text>
                  {experimentInfo.materials.map((material, index) => (
                    <Text key={index} style={styles.text}>
                      {material.content}
                    </Text>
                  ))}
                </View>

                {/* Coluna direita: Objetivos */}
                <View style={styles.column}>
                  <Text style={styles.title}>Objetivos</Text>
                  {experimentInfo.objectives.map((objective, index) => (
                    <Text key={index} style={styles.text}>
                      {objective.content}
                    </Text>
                  ))}
                </View>
              </View>

              {/* Metodologia */}
              <View style={styles.section}>
                <Text style={styles.title}>Metodologia</Text>
                {renderMethods()}
              </View>

              {/* Resultados Esperados */}
              <View style={styles.section}>
                <Text style={styles.title}>Resultados Esperados</Text>
                <Text style={styles.text}>{experimentInfo.results}</Text>
              </View>

              {/* Explicação Científica */}
              <View style={styles.section}>
                <Text style={styles.title}>Explicação Científica</Text>
                <Text style={styles.text}>
                  {experimentInfo.scientificExplanation}
                </Text>
              </View>
            </Page>
          </Document>
        }
        fileName={`recurso-didatico-${experimentInfo.id}`} // Passa o nome dinâmico aqui
      >
        {({ loading }) =>
          loading ? (
            <button
              className="lex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none cursor-not-allowed"
              disabled
            >
              Baixar PDF
            </button>
          ) : (
            <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none cursor-pointer">
              <FiDownload className="mr-2" />
              Baixar PDF
            </button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default DownloadPDF;
