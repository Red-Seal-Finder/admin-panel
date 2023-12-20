// pages/index.js
import { useState } from 'react';
import QuestionForm from './questionForm';
import QuestionPreview from './questionPreview';

interface PreviewData {
  question: string;
  options: string[];
}

const Quiz: React.FC = () => {
  const [preview, setPreview] = useState<PreviewData | null>(null);

  const handleFormSubmit = (data: PreviewData) => {
    setPreview(data);
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Create Questions</h1>
          <QuestionForm onSubmit={handleFormSubmit} />
        </div>
        <div>
          {preview && (
            <QuestionPreview question={preview.question} options={preview.options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
