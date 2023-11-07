import { isChrome, isEdge, isOpera } from 'react-device-detect';
import CodeEditor from './components/CodeEditor';
import Header from './components/Header';
import Footer from './components/Footer';
import BrowserNotSupported from './components/BrowserNotSupported';
import SerialFlasher from './components/SerialFlasher';

function App() {
  const isSupportedBrowser = isChrome || isEdge || isOpera;

  return (
    <div className="flex flex-col min-h-screen font-sans text-white bg-gray-900">
      <Header />
      <div className="flex flex-grow p-8 items-center justify-center">
        {isSupportedBrowser ? (
          <div className='h-full w-full'>
            <SerialFlasher/>
            <CodeEditor />
          </div>
        ) : (
          <BrowserNotSupported/>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
