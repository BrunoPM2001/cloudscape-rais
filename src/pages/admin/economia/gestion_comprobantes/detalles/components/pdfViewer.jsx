import {
  Box,
  Button,
  Container,
  Header,
  Spinner,
} from "@cloudscape-design/components";
import { Document, Page, pdfjs } from "react-pdf";
import { useState, useMemo } from "react";

import "pdfjs-dist/web/pdf_viewer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

const maxWidth = 700;

export default ({ url }) => {
  //  States
  const [numPages, setNumPages] = useState();

  const file = useMemo(() => ({ url }), [url]);

  //  Functions
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Container
      header={
        <Header
          variant="h3"
          actions={
            <Button
              variant="primary"
              iconName="external"
              href={url}
              target="_blank"
            >
              Abrir en una nueva ventana
            </Button>
          }
        >
          Archivo adjunto
        </Header>
      }
    >
      {url == "" ? (
        <></>
      ) : (
        <div
          style={{
            overflow: "auto",
            maxHeight: "70vh",
          }}
        >
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <Box textAlign="center">
                <Spinner size="large" />
              </Box>
            }
            error="Error al cargar pdf"
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={maxWidth}
              />
            ))}
          </Document>
        </div>
      )}
    </Container>
  );
};
