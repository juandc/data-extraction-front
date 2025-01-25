/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { WebcamCapture } from "@/components/WebcamCapture";
import styles from "./page.module.css";

const fileTypes = ["JPEG", "PNG", "GIF", "PDF", "DOC", "DOCX"];

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [takingPhoto, setTakingPhoto] = useState<boolean>(false);

  const handleFile = (fileList: FileList) => {
    const file = Array.from(fileList);
    setFiles(prev => [...prev, ...file]);
  };

  const addSs = (file: Base64URLString) => {
    const newFile = new File([file], `webcam-${Date.now()}.jpg`, { type: "image/jpeg" });
    setFiles(prev => [...prev, newFile]);
    setTakingPhoto(false);
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
                  <p key={`${index}`}>{file.name}</p>
                ))}
              </div>
            )}

            <div className={styles.ctas}>
              <a
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primary}
              >
                Enviar
              </a>
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
