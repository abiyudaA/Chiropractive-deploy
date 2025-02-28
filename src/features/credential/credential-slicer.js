import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"
import baseUrl from '../../api/baseUrl';

const initialState = {
    credential: [],
    loading: false,
    error: ""
};

export const credentialSlice = createSlice({
    name: "credential",
    initialState,
    reducers: {
        fetchCredentialStart: (state) => {
            state.loading = true;
            state.credential = [];
            state.error = "";
        },
        fetchCredentialSuccess: (state, action) => {
            state.loading = false;
            state.credential = action.payload;
            state.error = "";
        },
        fetchCredentialFail: (state, action) => {
            state.loading = false;
            state.credential = [];
            state.error = action.payload;
        }

    }
});

export const { fetchCredentialStart, fetchCredentialSuccess, fetchCredentialFail } = credentialSlice.actions;

export const fetchCredential = () => async (dispatch) => {
    try {
        dispatch(fetchCredentialStart());
        const { data } = await axios.get(`${baseUrl}/patients`, {
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        });
        
        dispatch(fetchCredentialSuccess(data.patient));

    } catch (err) {
        dispatch(fetchCredentialFail(err.message));
    }
}

export default credentialSlice.reducer;