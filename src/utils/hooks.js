import { useCallback, useState } from 'react';

const useSelectionSystem = (itemData) => {
  const [selectedItem, setSelectedItem] = useState(new Set());

  const selectSingle = useCallback(wId => {
    const temp = [...selectedItem];
    temp.push(wId);
    setSelectedItem(new Set(temp));
  }, [selectedItem]);

  const deSelectSingle = useCallback(wId => {
    let temp = new Set(selectedItem);
    temp.delete(wId);
    setSelectedItem(temp);
  },[selectedItem]);

  const selectAll = () => {
    const temp = itemData.map(i => i._id);
    setSelectedItem(new Set(temp));
  };
  const deselectAll = () => {
    setSelectedItem(new Set());
  };

  return {
    selectedItem,
    count:selectedItem.size,
    selectSingle,
    deSelectSingle,
    selectAll,
    deselectAll
  }
};

export {
  useSelectionSystem
};

