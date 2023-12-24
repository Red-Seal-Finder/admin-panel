import React from "react";

// Since the table data is dynamic a table component will replace by this template
// This Template defines how you can implement any table on your page
// components/Tabs.tsx
import { useState } from 'react';
import Skills from "./skills";
import Quiz from "./quiz";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabChange = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-start gap-5">
        {/* ====== add a new skill ===========  */}
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 1 ? 'bg-white border border-[#262626] text-[#262626]' : 'bg-white'
          }`}
          onClick={() => handleTabChange(1)}
        >
          Set Quiz
        </button>

        {/* ================= edit quiz =================  */}
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 2 ? 'bg-white border border-[#262626] text-[#262626]' : 'bg-white'
          }`}
          onClick={() => handleTabChange(2)}
        >
          Edit Quiz
        </button>

        {/* ================ add new skill ==================  */}
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 3 ? 'bg-white border border-[#262626] text-[#262626]' : 'bg-white'
          }`}
          onClick={() => handleTabChange(3)}
        >
          Add new skill
        </button>
      </div>
      <div className="mt-4">
        {activeTab === 1 && 
          <>
            <Quiz />
          </>
        }
        {activeTab === 2 && <div>Content for Tab 2</div>}
        {
          activeTab === 3 && 
          <>
            <div className="w-[50%] pt-10">
              <Skills />
              <div className="mt-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  New skill
                </label>
                <input
                  type="text"
                  name="skill"
                  id="skill"
                  autoComplete="skill"
                  className="w-[100%] border-0 py-1.5 px-3 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Plumber"
                />
              </div>
              <button className="border-0 bg-[#262626] text-[#fff] px-5 py-2 rounded mt-10" >Publish</button>
            </div>
          </>
        }
        {/* Add more tabs and their content as needed */}
      </div>
    </div>
  );
};

export default Tabs;
