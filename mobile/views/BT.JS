import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const { width, height } = Dimensions.get('window');
const manager = new BleManager();

export default function BtScreen() {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    startScan();
    return () => {
      manager.stopDeviceScan();
    };
  }, []);

  const startScan = async () => {
    setDevices([]);
    setIsScanning(true);

    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);
    }

    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('Error al escanear:', error);
        setIsScanning(false);
        return;
      }

      if (device && device.name && !devices.some(d => d.id === device.id)) {
        setDevices(prev => [...prev, device]);
      }
    });

    setTimeout(() => {
      manager.stopDeviceScan();
      setIsScanning(false);
    }, 8000); // Detiene escaneo después de 8 segundos
  };

  const connectToDevice = async (device) => {
    try {
      const connected = await manager.connectToDevice(device.id);
      await connected.discoverAllServicesAndCharacteristics();
      setConnectedDevice(connected);
      alert(`✅ Conectado a ${connected.name}`);
    } catch (e) {
      console.log('Error al conectar:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dispositivos Bluetooth</Text>

      {connectedDevice && (
        <Text style={styles.connected}>
          ✅ Conectado a: {connectedDevice.name}
        </Text>
      )}

      {isScanning && <ActivityIndicator size="large" color="#033552" />}

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.device}
            onPress={() => connectToDevice(item)}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.id}>{item.id}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.buttonContainer} onPress={startScan}>
        <Text style={styles.buttonText}>🔄 Reescanear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#33AAEE',
    paddingTop: height * 0.1,
    paddingHorizontal: width * 0.05,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#033552',
    marginBottom: 20,
  },
  connected: {
    fontSize: width * 0.04,
    color: 'green',
    marginBottom: 10,
  },
  device: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderColor: '#033552',
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  name: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#033552',
  },
  id: {
    fontSize: width * 0.035,
    color: '#666',
    marginTop: 4,
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: '#033552',
    borderRadius: 8,
    padding: 14,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});
