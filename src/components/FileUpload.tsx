"use client";

import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPEG", "PNG", "GIF", "PDF", "DOC", "DOCX"];

export const FileUpload = () => {
  return (
    <FileUploader
      multiple={true}
      // name="file"
      // handleFile={(file: File) => console.log(file)}
      // handleChange={(e: React.ChangeEvent<HTMLInputElement>) => console.log(e)}
      // fileTypes={fileTypes}
      // uploadedLabel="¿Quieres subir algo más?"
      // hoverTitle="Arroja tu factura aquí"
      // style={{ width: "100%", height: "100%" }}
    />
  );
};