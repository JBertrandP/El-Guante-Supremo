import { useState } from 'react';
import '../styles/bluetooth.css';
import axios from 'axios';

function WifiDeviceManager() {
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [ip, setIp] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;

  const handleAddDevice = async () => {
    try {
      const res = await axios.get(`http://${ip}/status`);
      if (res.status === 200){
        //const socket = new WebSocket(`ws://${ip}/ws/glove`);
        const socket = new WebSocket(`wss://${API_URL}/ws/glove`);

        socket.onopen = () => {
          console.log("Conectado al WebSocket de glove");
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.mensaje_final) {
              if (data.mensaje_final === "mensaje") {
                console.log("Mensaje completo:", data);
              } else {
                console.log("Letra recibida:", data);
              }
            }
          } catch (error) {
            console.error("Error al parsear JSON:", error);
          }
        };

        socket.onerror = (error) => {
          console.error("Error en WebSocket:", error);
        };

        socket.onclose = () => {
          console.log("WebSocket cerrado");
        };
      }

      const newDevice = {
        name: res.data.name || 'Dispositivo WiFi',
        ip: ip,
        status: res.data.status || 'Activo',
      };

      setDevices(prev => [...prev, newDevice]);
      setError('');
      setIp('');
    } catch (err) {
      console.error('Error al conectar con el dispositivo:', err);
      setError('No se pudo conectar al dispositivo WiFi');
    }
  };

  const togglePanel = () => setShowPanel(!showPanel);

  return (
    <>
      <button className="dropdown-item" onClick={togglePanel}>
        <i className="fa-solid fa-wifi"></i> Agregar dispositivo WiFi
      </button>

      <div className={`custom-side-panel ${showPanel ? 'show' : ''}`}>
        <div className="panel-header d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="mb-0">Dispositivos WiFi</h5>
          <button
            className="btn-close"
            onClick={togglePanel}
            aria-label="Close"
          ></button>
        </div>

        <div className="panel-body p-3">
          <div className="mb-3">
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="form-control"
              placeholder="Ingresa la IP del dispositivo"
            />
          </div>
          <button
            onClick={handleAddDevice}
            className="btn btn-primary w-100 mb-3"
          >
            Conectar dispositivo
          </button>

          {error && <div className="alert alert-danger">{error}</div>}

          {devices.length === 0 ? (
            <p className="text-muted">No hay dispositivos conectados.</p>
          ) : (
            <ul className="list-group">
              {devices.map((device, index) => (
                <li key={index} className="list-group-item">
                  <strong>Nombre:</strong> {device.name}<br />
                  <strong>IP:</strong> {device.ip}<br />
                  <strong>Estado:</strong> {device.status}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {showPanel && (
        <div className="custom-backdrop" onClick={togglePanel}></div>
      )}
    </>
  );
}

export default WifiDeviceManager;
