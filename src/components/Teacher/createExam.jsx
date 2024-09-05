import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateExam = () => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isQuestionFormVisible, setIsQuestionFormVisible] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [multipleChoices, setMultipleChoices] = useState(['', '', '']);
  const [questions, setQuestions] = useState([]);

  const handleLevelDropdownToggle = () => setIsLevelDropdownOpen(!isLevelDropdownOpen);
  const handleTypeDropdownToggle = () => setIsTypeDropdownOpen(!isTypeDropdownOpen);
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setIsLevelDropdownOpen(false);
  };
  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setIsTypeDropdownOpen(false);
    setQuestionText('');
    setMultipleChoices(['', '', '']);
  };
  const handleAddQuestionClick = () => setIsQuestionFormVisible(true);
  const handleQuestionTextChange = (e) => setQuestionText(e.target.value);
  const handleChoiceChange = (index, value) => {
    const newChoices = [...multipleChoices];
    newChoices[index] = value;
    setMultipleChoices(newChoices);
  };
  const handleSaveQuestion = () => {
    const newQuestion = {
      type: selectedType,
      text: questionText,
      choices: selectedType === 'Opción múltiple' ? multipleChoices : null,
    };
    setQuestions([...questions, newQuestion]);
    setIsQuestionFormVisible(false);
    setSelectedType('');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-500 mb-6">Crear examen</h1>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Elige el nivel:</label>
          <div className="relative">
            <button onClick={handleLevelDropdownToggle} className="w-full border border-gray-400 p-2 text-left flex justify-between items-center">
              {selectedLevel || 'Nivel:'}
              <span className="ml-2">&#9660;</span>
            </button>
            {isLevelDropdownOpen && (
              <div className="absolute w-full bg-white border border-gray-400 mt-1 rounded-lg z-10">
                {['Elementary', 'A1', 'A2'].map(level => (
                  <button key={level} onClick={() => handleLevelSelect(level)} className="w-full text-left p-2 hover:bg-gray-100">
                    {level}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Elige el tipo:</label>
          <div className="relative">
            <button onClick={handleTypeDropdownToggle} className="w-full border border-gray-400 p-2 text-left flex justify-between items-center">
              {selectedType || 'Tipo:'}
              <span className="ml-2">&#9660;</span>
            </button>
            {isTypeDropdownOpen && (
              <div className="absolute w-full bg-white border border-gray-400 mt-1 rounded-lg z-10">
                {['Pregunta simple', 'Opción múltiple', 'Video'].map(type => (
                  <button key={type} onClick={() => handleTypeSelect(type)} className="w-full text-left p-2 hover:bg-gray-100">
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-6 flex justify-end">
          <button onClick={handleAddQuestionClick} className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300">
            Agregar pregunta
          </button>
        </div>

        {isQuestionFormVisible && (
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Escribe la pregunta:</label>
            <input
              type="text"
              value={questionText}
              onChange={handleQuestionTextChange}
              className="w-full border border-gray-400 p-2 mb-4 rounded-lg"
              placeholder="Escribe la pregunta aquí"
            />
            {selectedType === 'Opción múltiple' && (
              <div className="space-y-2">
                {multipleChoices.map((choice, index) => (
                  <input
                    key={index}
                    type="text"
                    value={choice}
                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                    className="w-full border border-gray-400 p-2 rounded-lg"
                    placeholder={`Opción ${index + 1}`}
                  />
                ))}
              </div>
            )}
            <button onClick={handleSaveQuestion} className="bg-green-500 text-white rounded-lg py-2 px-4 mt-4 w-full hover:bg-green-600 transition duration-300">
              Guardar pregunta
            </button>
          </div>
        )}

        <Link to="/examenes">
          <button className="bg-green-500 text-white rounded-lg py-2 px-4 w-full hover:bg-green-600 transition duration-300">
            Crear examen
          </button>
        </Link>
        <Link to="/examenes">
          <button className="bg-red-500 text-white rounded-lg py-2 px-4 w-full hover:bg-red-600 transition duration-300 mt-4">
            Cancelar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreateExam;
