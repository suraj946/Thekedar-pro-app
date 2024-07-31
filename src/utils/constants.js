export const ATTENDANCE_STATUS = ["half", "present", "absent", "one-and-half"];
export const WAGES_FACTOR = {
  half:0.5,
  present:1,
  absent:0,
  "one-and-half":1.5,
}

export const DEFAULT_ATTENDANCE_STATUS = "present";

export const WORKER_ROLES = ["mistri", "labour", "general"];
export const DEFAULT_WORKER_ROLE = "general";

export const MONTH = ["baisakh", "jyestha", "asadh", "shrawan", "bhadra", "ashwin", "kartik", "mangsir", "poush", "magh", "falgun", "chaitra"]

export const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]


//axios
export const LOAD_USER_REQUEST = "loadUserRequest";
export const LOAD_USER_SUCCESS = "loadUserSuccess";
export const LOAD_USER_FAIL = "loadUserFail";

export const REGISTER_REQUEST = "registerRequest";
export const REGISTER_SUCCESS = "registerSuccess";
export const REGISTER_FAIL = "registerFail";

export const UPDATE_USER = "updateUser";

// export const WORKER_FOR_ATTENDANCE_REQUEST = "workerAttendanceRequest";
// export const WORKER_FOR_ATTENDANCE_SUCCESS = "workerAttendanceSuccess";
// export const WORKER_FOR_ATTENDANCE_FAIL = "workerAttendanceFail";
// export const FILTER_WORKER_FOR_ATTENDANCE = "filterWorkerAttendance";

export const GET_WORKER_REQUEST = "getWorkerRequest";
export const GET_WORKER_SUCCESS_ACTIVE = "getWorkerSuccessActive";
export const GET_WORKER_SUCCESS_NON_ACTIVE = "getWorkerSuccessNonActive";
export const GET_WORKER_FAIL = "getWorkerFail";
export const ADD_WORKER_FOR_ATTENDANCE = "addWorkerForAttendance";
export const UPDATE_AFTER_ATTENDANCE = "updateAfterAttendance";

export const LOGOUT_SUCCESS = "logoutSuccess";

export const ADD_SINGLE_WORKER = "addSingleWorker";
export const UPDATE_SINGLE_WORKER = "updateSingleWorker";

export const ADD_WORKER_FOR_NEW_RECORD = "addWorkerForNewRecord";
export const UPDATE_WORKER_FOR_NEW_RECORD = "updateWorkerForNewRecord";

export const CLEAR_ERROR = "clearError";

export const SET_CURRENT_DATE = "setCurrentDate";

export const EVENT_REQUEST = "eventRequest";
export const EVENT_SUCCESS = "eventSuccess";
export const EVENT_FAIL = "eventFail";

export const GOOD_MORNING = "Good Morning";
export const GOOD_AFTERNOON = "Good Afternoon";
export const GOOD_EVENING = "Good Evening";

export const ALL_RECORDS_REQUEST = "allRecordsRequest";
export const ALL_RECORDS_SUCCESS = "allRecordsSuccess";
export const ALL_RECORDS_FAIL = "allRecordsFail";
export const RESET_RECORDS = "resetRecords";
export const SET_LOADING = "setLoading";

export const GET_SITES_REQUEST = "getSitesRequest";
export const GET_SITES_SUCCESS = "getSitesSuccess";
export const GET_SITES_FAIL = "getSitesFail";

export const SINGLE_SITE_REQUEST = "singleSiteRequest";
export const SINGLE_SITE_SUCCESS = "singleSiteSuccess";
export const SINGLE_SITE_FAIL = "singleSiteFail";

//error types
export const CONNECTION_ERROR = "connection-error";
