import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredItemPurchage: [],
    filteredLoans: [],
     filteredLoans_d: [],
      filteredUsers: [],
       filteredDeatilsLoans: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_LOANS(state, action) {
     
      const { loans, search } = action.payload;
      //console.log("loans >>>>>p ",loans)
      const tempLoans = loans.filter(
        (user) =>
          user.employee_id.toLowerCase().includes(search.toLowerCase()) ||
          user.item_description.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredLoans = tempLoans;
    },
    FILTER_LOANS_D(state, action) {
     
       const { loans_d, search } = action.payload;
      //console.log("loaloans_dloans_dloans_dns >>>>>p.. ",loans_d)
      const tempLoans_d = loans_d.filter(
        (user) =>
          user.employee_id.toLowerCase().includes(search.toLowerCase()) ||
          user.item_description.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredLoans_d = tempLoans_d;
    },
    
            FILTER_ITEM_PURCHASE(state, action) {
      const { itemPurchages, search } = action.payload;
        // console.log("itemPurchages  ",itemPurchages)
      const tempItemPurchage = itemPurchages.filter(
        (user) =>
          user.employee_id.toLowerCase().includes(search.toLowerCase()) ||
          user.item_description.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredItemPurchage = tempItemPurchage;
    },
    FILTER_USERS(state, action) {
      const { users, search } = action.payload;
      const tempUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredUsers = tempUsers;  
    },
    FILTER_LOANS_DETAILS(state, action) {
      
         const { loans, search } = action.payload;
      const tempLoans = loans.filter(
        (user) =>
          user.employee_id.toLowerCase().includes(search.toLowerCase()) ||
          user.item_description.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredItemPurchage = tempLoans;
  
    },
  
  },
});

export const { FILTER_LOANS,FILTER_ITEM_PURCHASE,FILTER_USERS,FILTER_LOANS_DETAILS,FILTER_LOANS_D } = filterSlice.actions;

export const selectLoans = (state) => state.filter.filteredLoans;
export const selectLoans_d = (state) => state.filter.filteredLoans_d;
export const selectDeatilsLoans = (state) => state.filter.filteredLoans;
export const selectUsers = (state) => state.filter.filteredUsers;
export const selectItemPurchage = (state) => state.filter.filteredItemPurchage;
export default filterSlice.reducer;
