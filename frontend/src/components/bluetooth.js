import { useState } from 'react';
import '../styles/bluetooth.css';

function BluetoothManager() {
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState('');
  const [showPanel, setShowPanel] = useState(false);

  const handleAddDevice = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service']
      });

      const server = await device.gatt.connect();

      setDevices(prev => [
        ...prev,
        {
          name: device.name || 'Sin nombre',
          id: device.id,
          connected: device.gatt.connected
        }
      ]);

      setError('');
    } catch (err) {
      console.error('Error al conectar con el dispositivo:', err);
      setError('No se pudo conectar al dispositivo');
    }
  };

  const togglePanel = () => setShowPanel(!showPanel);

  return (
    <>
      <button className="dropdown-item" onClick={togglePanel}>
        <i class="fa-solid fa-circle-plus"></i>  Agregar dispositivo
      </button>

      <div className={`custom-side-panel ${showPanel ? 'show' : ''}`}>
        <div className="panel-header d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="mb-0">Dispositivos Bluetooth</h5>
          <button
            className="btn-close"
            onClick={togglePanel}
            aria-label="Close"
          ></button>
        </div>

        <div className="panel-body p-3">
          <button
            onClick={handleAddDevice}
            className="btn btn-primary w-100 mb-3"
          >
            Buscar y conectar dispositivo
          </button>

          {error && <div className="alert alert-danger">{error}</div>}

          {devices.length === 0 ? (
            <p className="text-muted">No hay dispositivos conectados.</p>
          ) : (
            <ul className="list-group">
              {devices.map((device, index) => (
                <li key={index} className="list-group-item">
                  <strong>Nombre:</strong> {device.name}<br />
                  <strong>ID:</strong> {device.id}<br />
                  <strong>Estado:</strong>{' '}
                  {device.connected ? 'Conectado' : 'Desconectado'}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {showPanel && (
        <div
          className="custom-backdrop"
          onClick={togglePanel}
        ></div>
      )}
    </>
  );
}

export default BluetoothManager;
