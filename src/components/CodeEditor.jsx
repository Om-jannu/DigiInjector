import { useState } from 'react';
import FileSaver from 'file-saver';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CodeLine from './CodeLine';

const CodeEditor = () => {
  const [codeLines, setCodeLines] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [parameterInput, setParameterInput] = useState('');

  const functionOptions = [
    {
      label: 'Send Key Stroke',
      value: 'sendKeyStroke',
      parameters: ['KEY_A', 'KEY_B', 'KEY_C', 'KEY_D', 'KEY_E', 'KEY_F', 'KEY_G', 'KEY_H', 'KEY_I', 'KEY_J', 'KEY_K', 'KEY_L', 'KEY_M', 'KEY_N', 'KEY_O', 'KEY_P', 'KEY_Q', 'KEY_R', 'KEY_S', 'KEY_T', 'KEY_U', 'KEY_V', 'KEY_W', 'KEY_X', 'KEY_Y', 'KEY_Z',
        'KEY_1', 'KEY_2', 'KEY_3', 'KEY_4', 'KEY_5', 'KEY_6', 'KEY_7', 'KEY_8', 'KEY_9', 'KEY_0',
        'KEY_ENTER', 'KEY_ESC', 'KEY_BACKSPACE', 'KEY_TAB', 'KEY_SPACE', 'KEY_MINUS', 'KEY_EQUAL', 'KEY_LEFT_BRACE', 'KEY_RIGHT_BRACE', 'KEY_BACKSLASH', 'KEY_NON_US_NUM', 'KEY_SEMICOLON', 'KEY_QUOTE', 'KEY_TILDE', 'KEY_COMMA', 'KEY_PERIOD', 'KEY_SLASH',
        'KEY_CAPS_LOCK', 'KEY_F1', 'KEY_F2', 'KEY_F3', 'KEY_F4', 'KEY_F5', 'KEY_F6', 'KEY_F7', 'KEY_F8', 'KEY_F9', 'KEY_F10', 'KEY_F11', 'KEY_F12',
        'KEY_PRINTSCREEN', 'KEY_SCROLL_LOCK', 'KEY_PAUSE', 'KEY_INSERT', 'KEY_HOME', 'KEY_PAGE_UP', 'KEY_DELETE', 'KEY_END', 'KEY_PAGE_DOWN', 'KEY_RIGHT', 'KEY_LEFT', 'KEY_DOWN', 'KEY_UP',
        'KEY_NUM_LOCK', 'KEYPAD_SLASH', 'KEYPAD_ASTERISK', 'KEYPAD_MINUS', 'KEYPAD_PLUS', 'KEYPAD_ENTER', 'KEYPAD_1', 'KEYPAD_2', 'KEYPAD_3', 'KEYPAD_4', 'KEYPAD_5', 'KEYPAD_6', 'KEYPAD_7', 'KEYPAD_8', 'KEYPAD_9', 'KEYPAD_0', 'KEYPAD_PERIOD',
        'KEY_NON_US_BS', 'KEY_APPLICATION', 'KEY_POWER', 'KEYPAD_EQUAL',
        'MOD_CTRL_LEFT', 'MOD_SHIFT_LEFT', 'MOD_ALT_LEFT', 'MOD_GUI_LEFT', 'MOD_CTRL_RIGHT', 'MOD_SHIFT_RIGHT', 'MOD_ALT_RIGHT', 'MOD_GUI_RIGHT'],
    },
    { label: 'Delay', value: 'delay', parameters: [] },
    { label: 'Print', value: 'print', parameters: [] },
  ];

  const generateCode = () => {
    let valueToUse = selectedValue;

    if (['delay', 'print'].includes(selectedFunction)) {
      valueToUse = parameterInput;
    }

    if (selectedFunction && valueToUse) {
      const newLine = generateLine(selectedFunction, valueToUse);
      setCodeLines([...codeLines, newLine]);
      resetForm();
    }
  };

  const moveCodeLine = (fromIndex, toIndex) => {
    const updatedCodeLines = [...codeLines];
    const [movedLine] = updatedCodeLines.splice(fromIndex, 1);
    updatedCodeLines.splice(toIndex, 0, movedLine);
    setCodeLines(updatedCodeLines);
  };

  const deleteCodeLine = (index) => {
    const updatedCodeLines = [...codeLines];
    updatedCodeLines.splice(index, 1);
    setCodeLines(updatedCodeLines);
  };

  const resetForm = () => {
    setSelectedFunction('');
    setSelectedValue('');
    setParameterInput('');
    setIsDropdownOpen(false);
  };

  const handleFunctionSelect = (value) => {
    setSelectedFunction(value);
    setSelectedValue('');
    setParameterInput('');
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
        return ` DigiKeyboard.sendKeyStroke(${value});`;
      case 'delay':
        return ` DigiKeyboard.delay(${value});`;
      case 'print':
        return ` DigiKeyboard.print("${value}");`;
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

  const clearScreen = () => {
    setCodeLines([]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-gray-900 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between mb-4">
            <div>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
                onClick={downloadCodeFile}
              >
                Download .ino File
              </button>
              <button
                className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
                onClick={clearScreen}
              >
                Clear Screen
              </button>
            </div>
          </div>

          <pre className="bg-gray-800 p-4 rounded-md">
            {`#include "DigiKeyboard.h"\n\nvoid setup() {\n`}
            {codeLines.map((line, index) => (
              <CodeLine
                key={index}
                index={index}
                content={line}
                moveCodeLine={moveCodeLine}
                deleteCodeLine={deleteCodeLine}
              />
            ))}
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
              onClick={() => setIsDropdownOpen(true)}
            >
              +
            </button>
            {`\n}\n\nvoid loop() {\n  // Nothing to do here\n}`}
          </pre>

          {isDropdownOpen && (
            <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black bg-opacity-25">
              <div className="bg-gray-800 p-4 rounded-md">
                <label className="block mb-2 text-sm font-semibold">Add Line to Setup</label>
                <div className="relative mb-4">
                  <select
                    className="w-full py-2 px-4 border border-gray-700 rounded-md text-white bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
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

                {selectedFunction && selectedFunction !== 'delay' && selectedFunction !== 'print' && (
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-semibold">Select Parameter:</label>
                    <select
                      className="w-full py-2 px-4 border border-gray-700 rounded-md text-white bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
                      value={selectedValue}
                      onChange={(e) => handleParameterSelect(e.target.value)}
                    >
                      <option value="">Select Parameter</option>
                      {functionOptions
                        .find((option) => option.value === selectedFunction)
                        ?.parameters.map((param) => (
                          <option key={param} value={param}>
                            {param}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                {(selectedFunction === 'delay' || selectedFunction === 'print') && (
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-semibold">Enter Parameter:</label>
                    <input
                      type="text"
                      className="w-full py-2 px-4 border border-gray-700 rounded-md text-white bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
                      value={parameterInput}
                      onChange={handleParameterInput}
                      placeholder={`Enter ${selectedValue}`}
                    />
                  </div>
                )}
                <div className="flex justify-end">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
                    onClick={generateCode}
                  >
                    Add Line
                  </button>
                  <button
                    className="ml-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default CodeEditor;
