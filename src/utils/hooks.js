import { useCallback, useEffect, useState } from 'react';
import Snackbar from 'react-native-snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleWorker, getWorkers } from '../redux/actions/workerAction';
// import { addToEvent } from '../redux/slices/recordSlice';
import { danger } from '../styles/colors';
import instance from './axiosInstance';
import { CONNECTION_ERROR, RESET_RECORDS } from './constants';
import { defaultSnackbarOptions } from './helpers';

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
      setLoading(true);
      const worker = await getSingleWorker(workerId);
      if(worker === null) return;
      setPrevData({
        name: worker.name,
        role: worker.role,
        contactNumber: worker.contactNumber,
        wagesPerDay: worker.wagesPerDay,
        address: worker.address,
      });
      cb(worker);
      setLoading(false);
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


const useCreateMonthlyRecord = () => {
  const [loading, setLoading] = useState(false);
  const [settlementResult, setSettlementResult] = useState({});
  const createRecord = async(workerId, numberOfDays, cb=async() => {}) => {
    try {
      setLoading(true);
      const {data} = await instance.post("/record/create", {workerId, numberOfDays});
      if(data.success){
        setLoading(false);
        Snackbar.show(defaultSnackbarOptions(data.message));
        setSettlementResult(data.data?.settlementResponse);
        if(typeof cb === 'function'){
          await cb();
        }
      }
    } catch (error) {
      if(error.errorType !== CONNECTION_ERROR){
        setLoading(false);
        Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
      }
    }
  }

  return {createRecord, settlementResult, loading};
}

const useWorkerStatusUpdate = () => {
  const [updateLoading, setUpdateLoading] = useState(false);

  const updateStatus = async (workerId, status, cb = () => {}) => {
    try {
      setUpdateLoading(true);
      const {data} = await instance.put(`/worker/updatestatus`, {
        activeStatus: status,
        workerId
      });
      if(data.success){
        Snackbar.show(defaultSnackbarOptions(data.message));
        if(typeof cb === 'function'){
          cb();
        }
      }
    } catch (error) {
      if(error.errorType !== CONNECTION_ERROR){
        Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
      }
    }finally{
      setUpdateLoading(false);
    }
  }
  return {updateStatus, updateLoading, setUpdateLoading};
}

const useCheckForSettlement = (recordId, cb = () => {}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async() => {
      try {
        setLoading(true);
        const {data} = await instance.get(`/record/check-settlement/${recordId}`);
        if(data.success){
          Snackbar.show(defaultSnackbarOptions(data.message));
          if(typeof cb === 'function'){
            cb(data.data);
          }
        }
      } catch (error) {
        if(error.errorType !== CONNECTION_ERROR){
          Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
        }
      }finally{
        setLoading(false);
      }
    })()
  }, []);
  return {loading};
}

const usePerformSettlementAndAdjustAmount = (recordId) => {
  const [loading, setLoading] = useState(false);

  const settleAccount = async(dayDate, cb) => {
    try {
      setLoading(true);
      const {data} = await instance.post("/record/settlement", {recordId, dayDate});
      if(data.success){
        Snackbar.show(defaultSnackbarOptions(data.message));
        if(typeof cb === 'function'){
          cb(data.data);
        }
      }
    } catch (error) {
      if(error.errorType !== CONNECTION_ERROR){
        Snackbar.show(defaultSnackbarOptions(error.response?.data?.message, danger));
      }
    }finally{
      setLoading(false);
    }
  }

  const adjustAmount = async(givenAmount, settlementDayDate, cb) => {
    try {
      setLoading(true);
      const {data} = await instance.post("/record/adjust-settlement", {givenAmount, settlementDayDate, recordId});
      if(data.success){
        Snackbar.show(defaultSnackbarOptions(data.message));
        if(typeof cb === 'function'){
          cb(data.data);
        }
      }
    } catch (error) {
      console.log(error);
      if(error.errorType !== CONNECTION_ERROR){
        Snackbar.show(defaultSnackbarOptions(error?.response?.data?.message, danger));
      }
    }finally{
      setLoading(false);
    }
  }

  return {settleAccount, adjustAmount, loading, setLoading};
}

const useCurrentDate = () => {
  const {currentDate} = useSelector(state => state.thekedar);
  return currentDate;
}

const useMonthEvent = () => {
  const {events, loading} = useSelector(state => state.events);

  const getEvent = (workerId, monthIndex) => {
    if(!events[workerId]){
      return null;
    }
    return events[workerId][monthIndex];
  }

  const checkIfEventExists = (workerId, monthIndex) => {
    if(!events[workerId]){
      return false;
    }
    if(!events[workerId][monthIndex]){
      return false;
    }
    // const {dailyRecords} = events[workerId][monthIndex];
    // return  dailyRecords?.length > 0;
    return true;
  }

  return {
    getEvent,
    checkIfEventExists,
    loading
  };
}

const useGetALlRecords = (workerId) => {
  const {data, loading, workerId: currWID} = useSelector(state => state.allRecords);
  const dispatch = useDispatch();

  const getRecords = (year) => {
    if(!data[year]){
      return [];
    }
    return data[year];
  }

  const ifRecordExist = (year) => {
    if(workerId !== currWID){
      dispatch({type:RESET_RECORDS});
      return false;
    }
    if(!data[year]){
      return false;
    }
    return true;
  }

  return {
    getRecords,
    ifRecordExist,
    loading
  };
}



export {
  useCheckForSettlement,
  useCreateMonthlyRecord,
  useCurrentDate,
  useErrorMessage,
  useGetSettlementReadyWorkers,
  useGetWorker,
  useMonthEvent,
  usePerformSettlementAndAdjustAmount,
  useSelectionSystem,
  useWorkerStatusUpdate,
  useGetALlRecords
};

