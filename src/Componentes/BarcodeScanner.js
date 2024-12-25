import React, { useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

const ImageScanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [detectedCode, setDetectedCode] = useState(''); // Para el JSON completo leído del QR
  const [imagePreview, setImagePreview] = useState(null); // Para mostrar la imagen cargada
  const [qrImage, setQrImage] = useState(null); // Para la imagen extraída del JSON

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Archivo cargado:', file);
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Crear vista previa de la imagen
      setDetectedCode(''); // Reiniciar el código detectado
      setQrImage(null); // Reiniciar la imagen extraída
    }
  };

  const handleScan = async () => {
    if (!selectedFile) {
      alert('Por favor, sube una imagen primero.');
      return;
    }
    console.log('Iniciando el escaneo...');

    const reader = new FileReader();
    reader.onload = async (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = async () => {
        const codeReader = new BrowserMultiFormatReader();
        try {
          console.log('Procesando la imagen...');
          const result = await codeReader.decodeFromImageElement(img);
          console.log('Código detectado:', result.text);
          setDetectedCode(result.text); // Mostrar el código detectado

          // Intenta interpretar el resultado como JSON
          try {
            const parsedData = JSON.parse(result.text); // Convierte el texto en JSON
            if (parsedData.imagen) {
              setQrImage(parsedData.imagen); // Extrae la URL de la imagen del JSON
            }
          } catch (jsonError) {
            console.error('El código escaneado no contiene JSON válido:', jsonError);
          }
        } catch (error) {
          console.error('Error al escanear el código:', error);
          setDetectedCode('No se detectó ningún código.');
        }
      };
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <div>
      <h1>Escáner de Códigos</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleScan} disabled={!selectedFile}>
        Escanear
      </button>

      {imagePreview && (
        <div>
          <h3>Vista previa de la imagen:</h3>
          <img src={imagePreview} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}

      {detectedCode && (
        <div>
          <h3>Resultados del escaneo:</h3>
          <p><strong>Contenido del JSON:</strong> {detectedCode}</p>
        </div>
      )}

      {qrImage && (
        <div>
          <h3>Imagen extraída del QR:</h3>
          <img
            src={qrImage}
            alt="Imagen del QR"
            style={{ maxWidth: '100%', maxHeight: '300px', border: '1px solid black' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageScanner;
