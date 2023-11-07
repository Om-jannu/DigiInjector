import { useState, useEffect } from 'react';

const SerialFlasher = () => {
  const [port, setPort] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [inputData, setInputData] = useState('');
  const [receivedData, setReceivedData] = useState('');
  const [connectedDevice, setConnectedDevice] = useState('');

  const connectToDevice = async () => {
    try {
      const selectedPort = await navigator.serial.requestPort();
      await selectedPort.open({ baudRate: 9600 });
      setPort(selectedPort);
      setIsConnected(true);

      // Set the connected device name (modify as per your requirement)
      setConnectedDevice(selectedPort.name);

      // Handle data communication after connection is established
      const reader = selectedPort.readableStream.getReader();
      const readData = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            setReceivedData((prevData) => prevData + new TextDecoder().decode(value));
          }
        } catch (error) {
          console.error('Error reading data:', error);
        }
      };

      readData();
    } catch (error) {
      console.error('Error connecting to serial port:', error);
    }
  };

  useEffect(() => {
    connectToDevice();
    if (isConnected) {
      // Implement any initialization or setup logic for your device
      // For example, you might want to send some initial configuration to your Digispark module.
    }

    return () => {
      if (port) {
        port.close();
        setPort(null);
        setIsConnected(false);
        setConnectedDevice('');
      }
    };
  }, [isConnected]);

  const handleSendData = async () => {
    if (port && inputData) {
      const encoder = new TextEncoder();
      const dataToSend = encoder.encode(inputData + '\n');
      await port.write(dataToSend);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-gray-800 rounded-md shadow-md">
      <button
        onClick={connectToDevice}
        disabled={isConnected}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
      >
        {isConnected ? `Connected to ${connectedDevice}` : 'Connect to Serial Device'}
      </button>
      <div className="mb-4">
        <textarea
          placeholder="Type data to send"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          className="w-full p-2 border border-gray-700 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button
        onClick={handleSendData}
        disabled={!isConnected || !inputData}
        className="bg-green-500 text-white py-2 px-4 rounded-md mb-4"
      >
        Send Data
      </button>
      <div>
        <p className="text-lg font-semibold mb-2">Received Data:</p>
        <pre className="bg-gray-700 p-2 rounded-md overflow-auto max-h-32">
          {receivedData}
        </pre>
      </div>
    </div>
  );
};

export default SerialFlasher;
