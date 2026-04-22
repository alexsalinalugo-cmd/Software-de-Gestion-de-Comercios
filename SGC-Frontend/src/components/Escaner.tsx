import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

// 1. Definimos qué recibe el componente
interface Props {
  // El escáner devuelve el texto del QR como un string
  onScanSuccess: (decodedText: string) => void;
}

const QRScanner = ({ onScanSuccess }: Props) => {
  // 2. Tipamos la referencia con la clase que provee la librería
  // Empezamos con null, pero le avisamos que guardará un Html5QrcodeScanner
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (!scannerRef.current) {
      // Creamos la instancia
      const scanner = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: 250,
          rememberLastUsedCamera: true,
        },
        false,
      );

      scannerRef.current = scanner;

      // El segundo parámetro es para errores de escaneo (opcional)
      scanner.render(onScanSuccess, (error) => {
        // Errores de lectura silenciosos o console.log(error);
      });
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch((error) => {
          console.error("Error al limpiar el escáner:", error);
        });
        scannerRef.current = null;
      }
    };
  }, [onScanSuccess]); // Agregamos onScanSuccess como dependencia por seguridad

  return (
    <div className="p-2 rounded-lg my-4">
      <div id="reader"></div>
    </div>
  );
};

export default QRScanner;
