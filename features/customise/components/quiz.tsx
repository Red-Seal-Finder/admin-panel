// pages/index.js
import { useState } from "react";
import QuestionForm from "./questionForm";
import QuestionPreview from "./questionPreview";

interface PreviewData {
  question: string;
  options: string[];
}

const Quiz: React.FC = () => {
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleFormPreview = (data: PreviewData) => {
    setPreview(data);
  };

  return (
    <div className="mx-auto mt-8 w-full overflow-x-auto">
      <div className="flex gap-8">
        <div>
          <h1 className="text-2xl font-[500] mb-4 text-[#333]">
            Create Questions
          </h1>
          <QuestionForm
            onSubmit={handleFormPreview}
            setIsUpdating={setIsUpdating}
          />
        </div>
        <div>
          {preview && (
            <QuestionPreview
              question={preview.question}
              options={preview.options}
              isUpdating={isUpdating}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
