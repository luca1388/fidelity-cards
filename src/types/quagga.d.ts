declare module "quagga" {
  export interface QuaggaConfig {
    inputStream: {
      type: "LiveStream" | "ImageStream" | "VideoStream";
      target: HTMLElement | null;
      constraints?: MediaTrackConstraints;
      area?: {
        top?: string;
        right?: string;
        left?: string;
        bottom?: string;
      };
    };
    decoder: {
      readers: string[];
    };
    locate?: boolean;
    numOfWorkers?: number;
  }

  export interface CodeResult {
    code: string;
    format: string;
  }

  export interface QuaggaResult {
    codeResult: CodeResult;
  }

  const Quagga: {
    init: (config: QuaggaConfig, callback: (err: Error | null) => void) => void;
    start: () => void;
    stop: () => void;
    onDetected: (callback: (result: QuaggaResult) => void) => void;
    offDetected: (callback: (result: QuaggaResult) => void) => void;
  };

  export default Quagga;
}
