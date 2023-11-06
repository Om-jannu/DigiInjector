// import { useState } from 'react';

// function App() {
//   const [codeLines, setCodeLines] = useState([]);
//   const [selectedFunction, setSelectedFunction] = useState('');
//   const [selectedValue, setSelectedValue] = useState('');
//   const [availableParameters, setAvailableParameters] = useState([]);
//   const [parameterInput, setParameterInput] = useState('');

//   const generateCode = () => {
//     let valueToUse = selectedValue;
    
//     // If the selected function is 'delay' or 'print', use the parameterInput value
//     if (['delay', 'print'].includes(selectedFunction)) {
//       valueToUse = parameterInput;
//     }

//     if (selectedFunction && valueToUse) {
//       const newLine = generateLine(selectedFunction, valueToUse);
//       setCodeLines([...codeLines, newLine]);
//       setSelectedFunction('');
//       setSelectedValue('');
//       setAvailableParameters([]);
//       setParameterInput('');
//     }
//   };

//   const functionOptions = [
//     { label: 'Send Key Stroke', value: 'sendKeyStroke', parameters: ['KEY_A', 'KEY_B', 'KEY_C'] },
//     { label: 'Delay', value: 'delay', parameters: [] },
//     { label: 'Print', value: 'print', parameters: [] },
//   ];

//   const handleFunctionSelect = (value) => {
//     const selectedFunctionObj = functionOptions.find((option) => option.value === value);
//     setSelectedFunction(value);
//     setAvailableParameters(selectedFunctionObj ? selectedFunctionObj.parameters : []);
//     setSelectedValue('');
//     setParameterInput(''); // Reset parameterInput for 'delay' and 'print' functions
//   };

//   const handleParameterSelect = (value) => {
//     setSelectedValue(value);
//   };

//   const handleParameterInput = (e) => {
//     setParameterInput(e.target.value);
//   };

//   const generateLine = (func, value) => {
//     switch (func) {
//       case 'sendKeyStroke':
//         return `DigiKeyboard.sendKeyStroke(${value});`;
//       case 'delay':
//         return `DigiKeyboard.delay(${value});`;
//       case 'print':
//         return `DigiKeyboard.print("${value}");`;
//       default:
//         return '';
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <div className="grid grid-cols-2 gap-8">
//         <div className="bg-gray-200 p-4 rounded-md">
//           <label className="block mb-2 text-sm font-semibold">Select Function:</label>
//           <div className="relative">
//             <select
//               className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
//               value={selectedFunction}
//               onChange={(e) => handleFunctionSelect(e.target.value)}
//             >
//               <option value="">Select Function</option>
//               {functionOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {availableParameters.length > 0 && (
//             <div className="mt-4">
//               <label className="block mb-2 text-sm font-semibold">Select Parameter:</label>
//               <div className="relative">
//                 <select
//                   className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
//                   value={selectedValue}
//                   onChange={(e) => handleParameterSelect(e.target.value)}
//                 >
//                   <option value="">Select Parameter</option>
//                   {availableParameters.map((param) => (
//                     <option key={param} value={param}>
//                       {param}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           )}

//           {(selectedFunction === 'delay' || selectedFunction === 'print') && (
//             <div className="mt-4">
//               <label className="block mb-2 text-sm font-semibold">Enter Parameter:</label>
//               <input
//                 type="text"
//                 className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
//                 value={parameterInput}
//                 onChange={handleParameterInput}
//                 placeholder="Enter parameter"
//               />
//             </div>
//           )}

//           <button
//             className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
//             onClick={generateCode}
//           >
//             Generate Code
//           </button>
//         </div>

//         <div>
//           <div className="bg-gray-200 p-4 rounded-md">
//             <label className="block mb-2 text-sm font-semibold">Generated Code:</label>
//             {codeLines.map((line, index) => (
//               <pre key={index}>{line}</pre>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState } from 'react';
import * as FileSaver from 'file-saver';

function App() {
  const [codeLines, setCodeLines] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [availableParameters, setAvailableParameters] = useState([]);
  const [parameterInput, setParameterInput] = useState('');

  const generateCode = () => {
    let valueToUse = selectedValue;

    // If the selected function is 'delay' or 'print', use the parameterInput value
    if (['delay', 'print'].includes(selectedFunction)) {
      valueToUse = parameterInput;
    }

    if (selectedFunction && valueToUse) {
      const newLine = generateLine(selectedFunction, valueToUse);
      setCodeLines([...codeLines, newLine]);
      setSelectedFunction('');
      setSelectedValue('');
      setAvailableParameters([]);
      setParameterInput('');
    }
  };

  const handleFunctionSelect = (value) => {
    const selectedFunctionObj = functionOptions.find((option) => option.value === value);
    setSelectedFunction(value);
    setAvailableParameters(selectedFunctionObj ? selectedFunctionObj.parameters : []);
    setSelectedValue('');
    setParameterInput(''); // Reset parameterInput for 'delay' and 'print' functions
  };

  const handleParameterSelect = (value) => {
    setSelectedValue(value);
  };

  const handleParameterInput = (e) => {
    setParameterInput(e.target.value);
  };

  const generateLine = (func, value) => {
    switch (func) {
      case 'sendKeyStroke':
        return `  DigiKeyboard.sendKeyStroke(${value});`;
      case 'delay':
        return `  DigiKeyboard.delay(${value});`;
      case 'print':
        return `  DigiKeyboard.print("${value}");`;
      default:
        return '';
    }
  };

  const downloadCodeFile = () => {
    const generatedCode = codeLines.join('\n');
    const template = `#include "DigiKeyboard.h"\n\nvoid setup() {\n${generatedCode}\n}\n\nvoid loop() {\n  // Nothing to do here\n}\n`;
    const blob = new Blob([template], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, 'generated_code.ino');
  };

  const functionOptions = [
    { label: 'Send Key Stroke', value: 'sendKeyStroke', parameters: ['KEY_A', 'KEY_B', 'KEY_C'] },
    { label: 'Delay', value: 'delay', parameters: [] },
    { label: 'Print', value: 'print', parameters: [] },
  ];

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-gray-200 p-4 rounded-md">
          <label className="block mb-2 text-sm font-semibold">Select Function:</label>
          <div className="relative">
            <select
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={selectedFunction}
              onChange={(e) => handleFunctionSelect(e.target.value)}
            >
              <option value="">Select Function</option>
              {functionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {availableParameters.length > 0 && (
            <div className="mt-4">
              <label className="block mb-2 text-sm font-semibold">Select Parameter:</label>
              <div className="relative">
                <select
                  className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={selectedValue}
                  onChange={(e) => handleParameterSelect(e.target.value)}
                >
                  <option value="">Select Parameter</option>
                  {availableParameters.map((param) => (
                    <option key={param} value={param}>
                      {param}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {(selectedFunction === 'delay' || selectedFunction === 'print') && (
            <div className="mt-4">
              <label className="block mb-2 text-sm font-semibold">Enter Parameter:</label>
              <input
                type="text"
                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={parameterInput}
                onChange={handleParameterInput}
                placeholder="Enter parameter"
              />
            </div>
          )}

          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={generateCode}
          >
            Generate Code
          </button>

          <button
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
            onClick={downloadCodeFile}
          >
            Download .ino File
          </button>
        </div>

        <div>
          <div className="bg-gray-200 p-4 rounded-md">
            <label className="block mb-2 text-sm font-semibold">Generated Code:</label>
            {codeLines.map((line, index) => (
              <pre key={index}>{line}</pre>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

