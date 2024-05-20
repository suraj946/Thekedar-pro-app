import { useCallback, useEffect, useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { danger } from '../styles/colors';
import instance from './axiosInstance';
import { CONNECTION_ERROR } from './constants';
import { defaultSnackbarOptions } from './helpers';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkers } from '../redux/actions/workerAction';

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

const useGetWorker = (workerId, cb) => {
  const [loading, setLoading] = useState(false);
  const [prevData, setPrevData] = useState({});
  useEffect(() => {
    (async()=>{
      try {
        setLoading(true);
        const {data} = await instance.get(`/worker/single/${workerId}`);
        // const {data} = await instance.get(`/worker/single/661b806c041b992a9a0ac2e1`);
        if(data.success){
          setPrevData({
            name: data.data.name,
            role: data.data.role,
            contactNumber: data.data.contactNumber,
            wagesPerDay: data.data.wagesPerDay,
            address: data.data.address,
          });
          cb(data.data);
        }
      } catch (error) {
        if (error.errorType !== CONNECTION_ERROR) {
          Snackbar.show(
            defaultSnackbarOptions(error.response?.data?.message, danger),
          );
          //to set worker data to default -> null
          cb(null);
        }
      }finally{
        setLoading(false);
      }
    })();
  }, []);
  
  return {loading, prevData};
}

const useGetSettlementReadyWorkers = () => {
  const {workers, loading} = useSelector(state => state.workers);
  const [settlementReadyWorkers, setSettlementReadyWorkers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if(workers.length === 0){
      dispatch(getWorkers());
    }
    setSettlementReadyWorkers(workers.filter(w => w.readyForSettlement));
  }, [workers.length]);
  
  return {settlementReadyWorkers, loading};
}


export {
  useErrorMessage,
  useGetWorker, useSelectionSystem,
  useGetSettlementReadyWorkers
};

