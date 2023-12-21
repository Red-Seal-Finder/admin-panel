// components/QuestionPreview.js
import React from 'react';

interface QuestionPreviewProps {
  question: string;
  options: string[];
}

const QuestionPreview: React.FC<QuestionPreviewProps> = ({ question, options }) => {
  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Question Preview</h2>
      <p className="mb-2">{question}</p>
      <ul>
        {options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionPreview;

  