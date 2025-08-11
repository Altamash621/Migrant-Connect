import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScanner = ({ onScanSuccess }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scanner.render(
      (decodedText, decodedResult) => {
        onScanSuccess(decodedText);
        scanner.clear(); // important: stop scanning after success
      },
      (errorMessage) => {
        // console.warn(`QR error: ${errorMessage}`);
      }
    );

    // Cleanup function
    return () => {
      scanner.clear().catch((error) => {
        console.error("Failed to clear scanner:", error);
      });
    };
  }, [onScanSuccess]);

  return <div id="qr-reader" />;
};

export default QRScanner;
