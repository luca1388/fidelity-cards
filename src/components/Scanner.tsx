import { useEffect, useRef, useState } from "react";
import Quagga from "quagga";
// Define QuaggaResult type inline if needed, or use 'any' as a fallback
type QuaggaResult = {
  codeResult?: {
    code?: string;
    format?: string;
    [key: string]: any;
  };
  [key: string]: any;
};
import { Button, Container } from "@mui/material";
import ScannerIcon from "@mui/icons-material/CenterFocusWeak";

const SCANNER_ID = "quagga-scanner";

export default function BarcodeScanner({
  onSuccess,
}: {
  onSuccess: (code: string, result: any) => void;
}) {
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef<HTMLDivElement | null>(null);

  const startScanner = () => {
    if (scanning) return;

    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            facingMode: "environment", // use back camera
          },
          area: {
            top: "30%",
            right: "10%",
            left: "10%",
            bottom: "30%",
          },
        },
        decoder: {
          readers: [
            "ean_reader",
            "ean_8_reader",
            "code_128_reader",
            "code_39_reader",
            "upc_reader",
          ],
        },
        locate: true,
        numOfWorkers: 4,
      },
      (err) => {
        if (err) {
          console.error("Errore scanner:", err);
          return;
        }
        console.log("Scanner inizializzato");
        Quagga.start();
        setScanning(true);
      }
    );
  };

  const stopScanner = () => {
    if (!scanning) return;
    Quagga.stop();
    setScanning(false);
  };

  useEffect(() => {
    if (!scanning) return;

    const onDetected = (result: QuaggaResult) => {
      if (result.codeResult && result.codeResult.code) {
        console.log("Barcode letto:", result.codeResult.code);
        console.log(result);
        onSuccess(result.codeResult.code, result.codeResult.format);
        stopScanner();
      }
    };

    Quagga.onDetected(onDetected);

    return () => {
      Quagga.offDetected(onDetected);
      if (scanning) {
        stopScanner();
      }
    };
  }, [scanning, onSuccess]);

  return (
    <>
      <Button
        variant={scanning ? "contained" : "outlined"}
        color={scanning ? "error" : "primary"}
        startIcon={<ScannerIcon />}
        onClick={scanning ? stopScanner : startScanner}
      >
        {scanning ? "Ferma Scansione" : "Scansiona Tessera"}
      </Button>

      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <div
          ref={scannerRef}
          id={SCANNER_ID}
          style={{
            width: "100%",
            maxWidth: 400,
            position: "relative",
            overflow: "hidden",
            maxHeight: scanning ? "300px" : "0",
            transition: "max-height 0.3s ease-in-out",
          }}
        >
          <div style={{ position: "relative", zIndex: 1 }} />
        </div>
      </Container>
    </>
  );
}
