import React, { useState, ChangeEvent, FormEvent } from "react";

interface QuestionFormProps {
  onSubmit: (data: { question: string; options: string[] }) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);

  const handleOptionChange = (index: number, value: string) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ question, options });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md ml-6">
      <label className="block text-sm font-medium text-gray-700">
        Question:
      </label>
      <input
        type="text"
        value={question}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQuestion(e.target.value)
        }
        className="mt-2 py-2 px-4 border rounded-md w-full outline-none focus:border-[#333] focus:border transition-all duration-300"
        required
      />

      <label className="block text-sm font-medium text-gray-700 mt-4">
        Options:
      </label>
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleOptionChange(index, e.target.value)
          }
          className="mt-2 py-2 px-4 border rounded-md w-full outline-none focus:border-[#333] focus:border transition-all duration-300"
          required
        />
      ))}

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-6 text-sm py-2 rounded-md hover:opacity-90 hover:scale-[0.99] transition-all"
      >
        Submit
      </button>
    </form>
  );
};

export default QuestionForm;
