import { PiWarningBold } from 'react-icons/pi';

const BrowserNotSupported = () => {
  return (
    <div className="h-full flex flex-col p-8 items-center justify-center">
            <PiWarningBold className="text-yellow-400 text-7xl mb-4" />
            <div className="bg-gray-800 p-6 rounded-md shadow-md text-center">
              <p className="text-xl font-bold text-white mb-4">Your Browser does not support Web Serial 😭</p>
              <p className="text-lg mb-4 text-gray-400">
                Try using
                <a href="https://www.google.com/chrome/" target="blank" className="text-blue-400 mx-2 underline">
                  Chrome
                </a>,
                <a href="https://www.microsoft.com/en-us/edge" target="blank" className="text-blue-400 mx-2 underline">
                  Edge
                </a>, or
                <a href="https://www.opera.com/" target="blank" className="text-blue-400 mx-2 underline">
                  Opera
                </a>
              </p>
              <p className="text-sm mb-4 text-gray-400">(iOS & Android browsers are not supported)</p>
              <p>
                Learn more about <a href="https://developer.mozilla.org/en-US/docs/Web/API/Serial#browser_compatibility" target='blank' className="text-blue-400 underline">browser compatibility</a>
              </p>
            </div>
          </div>
  )
}

export default BrowserNotSupported;