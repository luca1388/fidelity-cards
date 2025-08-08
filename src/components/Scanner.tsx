import { useEffect, useRef, useState } from "react";
import {
  Html5Qrcode,
  // Html5QrcodeSupportedFormats,
  type CameraDevice,
} from "html5-qrcode";
import { Button, Container } from "@mui/material";
import ScannerIcon from "@mui/icons-material/CenterFocusWeak";

const SCANNER_ID = "custom-html5-qrcode";

const findBackCamera = (devices: CameraDevice[]) => {
  // Cerca per nome
  const backCam = devices.find((d) => /back|rear|environment/i.test(d.label));
  return backCam?.id || devices[1]?.id; // fallback alla seconda disponibile
};

export default function BarcodeScanner({
  onSuccess,
}: {
  onSuccess: (code: string, result: any) => void;
}) {
  const [scanning, setScanning] = useState(false);
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);

  const startScanner = async () => {
    if (scanning || html5QrcodeRef.current) return;

    const config = {
      fps: 10,
      qrbox: { width: 300, height: 100 },
      // formatsToSupport: [
      //   Html5QrcodeSupportedFormats.EAN_13,
      //   Html5QrcodeSupportedFormats.CODE_128,
      //   Html5QrcodeSupportedFormats.CODE_39,
      //   Html5QrcodeSupportedFormats.UPC_A,
      // ],
    };

    try {
      const html5QrCode = new Html5Qrcode(SCANNER_ID);
      html5QrcodeRef.current = html5QrCode;

      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length) {
        const cameraId = findBackCamera(devices) || devices[0].id;

        await html5QrCode.start(
          cameraId,
          config,
          (decodedText, result) => {
            console.log("Barcode letto:", decodedText);
            onSuccess(decodedText, result);
            stopScanner(); // ferma lo scanner
          },
          (_error) => {
            console.warn("Errore di scansione", _error);
          }
        );

        setScanning(true);
      } else {
        alert("Nessuna fotocamera disponibile");
      }
    } catch (err) {
      console.error("Errore scanner:", err);
    }
  };

  const stopScanner = async () => {
    if (html5QrcodeRef.current) {
      try {
        await html5QrcodeRef.current.stop();
        await html5QrcodeRef.current.clear();
      } catch (err) {
        console.error("Errore durante lo stop:", err);
      } finally {
        html5QrcodeRef.current = null;
        setScanning(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (scanning) stopScanner();
    };
  }, [scanning]);

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
        }}
      >
        <div
          id={SCANNER_ID}
          style={{
            width: "100%",
            maxWidth: 400,
          }}
        />
      </Container>
    </>
  );
  //   return (
  //     <Stack spacing={2}>
  //       <TextField
  //         label="Codice Tessera"
  //         variant="outlined"
  //         value={cardCode}
  //         onChange={(e) => setCardCode(e.target.value)}
  //         fullWidth
  //       />
  //       <Button
  //         variant={scanning ? "contained" : "outlined"}
  //         color={scanning ? "error" : "primary"}
  //         startIcon={<ScannerIcon />}
  //         onClick={scanning ? stopScanner : startScanner}
  //       >
  //         {scanning ? "Ferma Scansione" : "Scansiona Tessera"}
  //       </Button>

  //       <div id={SCANNER_ID} style={{ width: "100%", maxWidth: 400 }} />
  //     </Stack>
  //   );
}
