import { useState } from 'react';

const useIsOpen = (): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState(false);
  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return [isOpen, handleIsOpen];
};

export default useIsOpen;
