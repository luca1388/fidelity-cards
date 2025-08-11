export const mapQuaggaFormatToReactBarcode = (
  quaggaFormat: string
): ReactCodeFormat => {
  switch (quaggaFormat) {
    case "ean_13":
      return "EAN13";
    case "ean_8":
      return "EAN8";
    case "upc_a":
      return "UPC";
    case "upc_e":
      return "UPCE";
    case "code_128":
      return "CODE128";
    case "code_39":
      return "CODE39";
    case "codabar":
      return "MSI"; // o "CodaBar", ma MSI è spesso un'alternativa comune
    case "itf":
      return "ITF14";
    default:
      console.warn(
        `Formato Quagga non supportato da JsBarcode: ${quaggaFormat}`
      );
      return "CODE128"; // Fallback a un formato comune
  }
};

export type ReactCodeFormat =
  | "CODE39"
  | "CODE128"
  | "CODE128A"
  | "CODE128B"
  | "CODE128C"
  | "EAN13"
  | "EAN8"
  | "EAN5"
  | "EAN2"
  | "UPC"
  | "UPCE"
  | "ITF14"
  | "ITF"
  | "MSI"
  | "MSI10"
  | "MSI11"
  | "MSI1010"
  | "MSI1110"
  | "pharmacode"
  | "codabar"
  | "GenericBarcode"
  | undefined;
