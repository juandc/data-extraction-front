import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import styles from "../app/page.module.css";

type Props = {
  addSs: (file: Base64URLString) => void;
};

export const WebcamCapture = ({ addSs }: Props) => {
  const webcamRef = useRef<any>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(webcamRef, imageSrc);
    addSs(imageSrc);
  }, [webcamRef, addSs]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100vw" }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        position: "relative",
        height: "100%",
        width: "100%",
      }}>
        <Webcam
          audio={false}
          height={720 / 4}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280 / 4}
          videoConstraints={{
            aspectRatio: 0.5625,
            height: 1280 / 4,
            width: 720 / 4,
          }}
          style={{
            borderRadius: 32,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            height: 1280 / 2,
            width: 720 / 2,
            maxHeight: "calc(90dvh - 4rem)",
            maxWidth: "calc(80dvw - 4rem)",
          }}
        />
        <button
          className={styles.primary}
          onClick={capture}
        >Capture photo</button>
      </div>
    </div>
  );
};
