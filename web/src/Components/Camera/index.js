import * as React from "react";

import { styles } from "./styles";
import { useQrReader } from "./hooks";

export const QrReader = ({
  videoContainerStyle,
  containerStyle,
  videoStyle,
  constraints,
  ViewFinder,
  scanDelay,
  className,
  onResult,
  videoId,
}) => {
  useQrReader({
    constraints,
    scanDelay,
    onResult,
    videoId,
  });

  return (
    <section className={className} style={containerStyle}>
      <div
        style={{
          ...styles.container,
          ...videoContainerStyle,
        }}
      >
        {!!ViewFinder && <ViewFinder />}
        <video
          muted
          id={videoId}
          style={{
            ...styles.video,
            ...videoStyle,
            transform: constraints?.facingMode === "user" && "scaleX(-1)",
          }}
        />
      </div>
    </section>
  );
};

QrReader.displayName = "QrReader";
QrReader.defaultProps = {
  constraints: {
    facingMode: "environment",
  },
  videoId: "video",
  scanDelay: 1000,
};

export default QrReader;