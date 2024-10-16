export const handleArrayByData = <T>(
  idx: number,
  name: string,
  setState: React.Dispatch<React.SetStateAction<T[]>>,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  setState((prev) => {
    const changedArray = [...prev];
    changedArray[idx] = {
      ...changedArray[idx],
      [name]: e.target.value
    };
    return changedArray;
  });
};
