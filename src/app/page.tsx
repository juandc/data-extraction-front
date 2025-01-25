/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { WebcamCapture } from "@/components/WebcamCapture";
import styles from "./page.module.css";

const fileTypes = ["JPEG", "PNG", "GIF", "PDF", "DOC", "DOCX"];

function DataURIToBlob(dataURI: string) {
  const splitDataURI = dataURI.split(',')
  const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)

  return new Blob([ia], { type: mimeString })
}

export default function Home() {
  const [files, setFiles] = useState<Array<File | Blob>>([]);
  const [takingPhoto, setTakingPhoto] = useState<boolean>(false);

  const handleFile = (fileList: FileList) => {
    const file = Array.from(fileList);
    setFiles(prev => [...prev, ...file]);
  };

  const addSs = (file: Base64URLString) => {
    // const newFile = new File([file], `webcam-${Date.now()}.png`, { type: "image/png" });
    const newFile = DataURIToBlob(file);
    setFiles(prev => [...prev, newFile]);
    setTakingPhoto(false);
  };

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("data", file);
    // files.forEach(file => formData.append("files", file));
    const response = await fetch("https://n8n.deltaweb.cl/webhook/ocrtest", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  };

  const uploadFiles = () => {
    files.forEach(async file => {
      await uploadFile(file);
    });
  };

  let label: string | undefined;
  if (!files?.length) label = "Arrastra o selecciona tu archivo";
  else label = "Arrastrar o seleccionar más archivos";

  return (
    <div>
      {takingPhoto && (
        <WebcamCapture addSs={addSs} />
      )}

      {!takingPhoto && (
        <div className={styles.page}>
          <main className={styles.main}>
            <div className={styles.dropzone}>
              <FileUploader
                multiple={true}
                name="file"
                handleChange={handleFile}
                fileTypes={fileTypes}
                classes={styles.dropzone_drag}
              >
                <p>{label}</p>
              </FileUploader>

              <button
                type="button"
                className={styles.dropzone_photo}
                onClick={() => setTakingPhoto(true)}
              >
                Toma una foto
              </button>
            </div>

            {files && (
              <div>
                {[...files].flatMap((file, index) => (
                  <p key={`${index}`}>{file?.name ?? "Archivo extraño"}</p>
                ))}
              </div>
            )}

            <div className={styles.ctas}>
              <button
                type="button"
                className={styles.primary}
                onClick={uploadFiles}
              >
                Enviar
              </button>
            </div>
          </main>
        </div>
      )}

      {/* <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
