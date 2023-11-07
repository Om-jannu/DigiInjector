// JohnnyFiveComponent.js
import { useState } from 'react';

const JohnnyFive = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [port, setPort] = useState(null);

  const handleConnect = async () => {
    try {
      const selectedPort = await navigator.serial.requestPort();
      await selectedPort.open({ baudRate: 9600 });
      setPort(selectedPort);
      setIsConnected(true);

      // Handle data communication after connection is established
      selectedPort.readableStream.getReader().read().then(({ done, value }) => {
        if (!done) {
          console.log('Received data:', value);
          // Process received data
        }
      });
    } catch (error) {
      console.error('Error connecting to serial port:', error);
    }
  };

  const handleDisconnect = async () => {
    if (port) {
      await port.close();
      setPort(null);
      setIsConnected(false);
    }
  };

  return (
    <div className="m-4 p-4 border border-gray-300 rounded-md">
      <button
        className={`bg-${isConnected ? 'gray' : 'green'}-500 text-white py-2 px-4 rounded-md mr-2`}
        onClick={handleConnect}
        disabled={isConnected}
      >
        Connect
      </button>
      <button
        className={`bg-${isConnected ? 'red' : 'gray'}-500 text-white py-2 px-4 rounded-md`}
        onClick={handleDisconnect}
        disabled={!isConnected}
      >
        Disconnect
      </button>
      {isConnected && (
        <p className="text-green-500 mt-2">
          Connected to serial port: {port.name}
        </p>
      )}
    </div>
  );
};

export default JohnnyFive;
