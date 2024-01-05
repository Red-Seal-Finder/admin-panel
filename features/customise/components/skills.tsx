import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FiChevronDown } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { getSkills } from '@/lib/api/api';
import { ISkills } from '@/lib/types';


export default function Skills() {
  const [skills, setSkills] = useState<ISkills>()
  useEffect(() => {
    getSkills().then((response) => {
      setSkills(response);
      // console.log(response);
    });
  }, []);

  return (
    <>
      <select className='w-[50%] p-2'>
        {skills?.skills.map((item, index) => (
          <option key={index} className='capitalize'>{item.name}</option>
        ))}
      </select>
    </>
  );
}
