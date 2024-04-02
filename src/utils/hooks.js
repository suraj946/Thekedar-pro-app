import { useCallback, useEffect, useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { defaultSnackbarOptions } from './helpers';
import { danger } from '../styles/colors';

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

const useErrorMessage = ({error, setError, message, setMessage}) => {
  useEffect(() => {
    if(error){
      Snackbar.show(defaultSnackbarOptions(error, danger));
      setError("");
    }

    if(message){
      Snackbar.show(defaultSnackbarOptions(message));
      setMessage("");
    }
  }, [error, setError, message, setMessage]);
  
}

export {
  useSelectionSystem,
  useErrorMessage
};

