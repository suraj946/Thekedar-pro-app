import { createSlice } from "@reduxjs/toolkit";
import {
  GET_SITES_FAIL,
  GET_SITES_REQUEST,
  GET_SITES_SUCCESS,
  SINGLE_SITE_FAIL,
  SINGLE_SITE_REQUEST,
  SINGLE_SITE_SUCCESS
} from "../../utils/constants";

export const siteSlice = createSlice({
  initialState: {
    sites: [],
    loading: false,
  },
  name: "site",
  reducers: {
    removeSiteFromStrore:(state, action) => {
      state.sites = state.sites.filter(item => item._id !== action.payload);
    },
    updateSiteInStore:(state, action) => {
      state.sites = state.sites.map(item => {
        if(item._id === action.payload._id){
          return {...item, ...action.payload};
        }
        return item;
      });
    },
    addSiteToStore:(state, action) => {
      state.sites = [...state.sites, action.payload];
    }
  },
  extraReducers: builder => {
    builder.addCase(GET_SITES_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(GET_SITES_SUCCESS, (state, action) => {
      state.loading = false;
      state.sites = action.payload;
    })
    .addCase(GET_SITES_FAIL, (state) => {
      state.loading = false;
    })
  },
});

const {removeSiteFromStrore, updateSiteInStore, addSiteToStore} = siteSlice.actions
const siteReducer = siteSlice.reducer;

export const singleSiteSlice = createSlice({
  initialState:{
    site: {},
    loading: false,
  },
  name: "singleSite",
  reducers: {
    addPaymentToStore: (state, action) => {
      state.site.totalPayments += action.payload.amount;
      state.site.payments = [action.payload,...state.site.payments];
    },
    removePaymentFromStore: (state, action) => {
      state.site.totalPayments -= action.payload.amount;
      state.site.payments = state.site.payments.filter(item => item._id !== action.payload.paymentId);
    },
    updatePaymentInStore: (state, action) => {
      state.site.totalPayments = state.site.totalPayments - action.payload.oldAmount + action.payload.newAmount;
      state.site.payments = state.site.payments.map(item => {
        if(item._id === action.payload.data._id){
          return {...item, ...action.payload.data};
        }
        return item;
      });
    }
  },
  extraReducers: builder => {
    builder.addCase(SINGLE_SITE_REQUEST, (state) => {
      state.loading = true;
    })
    .addCase(SINGLE_SITE_SUCCESS, (state, action) => {
      state.loading = false;
      state.site = action.payload;
    })
    .addCase(SINGLE_SITE_FAIL, (state) => {
      state.loading = false;
    })
  }
});

const {addPaymentToStore, removePaymentFromStore, updatePaymentInStore} = singleSiteSlice.actions;
const singleSiteReducer = singleSiteSlice.reducer;

export {
  addPaymentToStore, addSiteToStore, removePaymentFromStore, removeSiteFromStrore, singleSiteReducer, siteReducer, updatePaymentInStore, updateSiteInStore
};

