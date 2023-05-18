import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import customFetch from '../../utils/customFetch'

const initialState = {
	isLoading: false,
	position: '',
	company: '',
	jobLocation: '',
	jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
	jobType: 'full-time',
	statusOptions: ['interview', 'declined', 'pending'],
	status: 'pending',
	isEditing: false,
	editJobId: ''
}

const jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(state => {})
	}
})

export default jobSlice.reducer
