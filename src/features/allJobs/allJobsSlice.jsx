import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/customFetch'

const initialFiltersState = {
	search: '',
	searchStatus: 'all',
	searchType: 'all',
	sort: 'latest',
	sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
}

const initialState = {
	isLoading: true,
	jobs: [],
	totalJobs: 0,
	numOfPages: 1,
	page: 1,
	stats: {},
	monthlyApplications: [],
	...initialFiltersState
}

export const getAllJobs = createAsyncThunk(
	'allJobs/getJobs',
	async (_, thunkAPI) => {
		let url = '/jobs'
		try {
			const response = await customFetch(`${url}`)
			console.log(response.data)
			return response.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

export const showStats = createAsyncThunk(
	'allJobs/showStats',
	async (_, thunkAPI) => {
		try {
			const resp = await customFetch('/jobs/stats')
			console.log(resp)
			return resp.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

const allJobsSlice = createSlice({
	name: 'allJobs',
	initialState,
	reducers: {
		showLoading: state => {
			state.isLoading = true
		},
		hideLoading: state => {
			state.isLoading = false
		},
		handleChange: (state, { payload: { name, value } }) => {
			// state.page = 1 later
			state[name] = value
		},
		clearFilters: state => {
			return { ...state, ...initialFiltersState }
		}
	},
	extraReducers: builder => {
		builder
			.addCase(getAllJobs.pending, state => {
				state.isLoading = true
			})
			.addCase(getAllJobs.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.jobs = payload.jobs
				state.numOfPages = payload.numOfPages
				state.totalJobs = payload.totalJobs
			})
			.addCase(getAllJobs.rejected, (state, { payload }) => {
				state.isLoading = false
				toast.error(payload)
			})
			.addCase(showStats.pending, state => {
				state.isLoading = true
			})
			.addCase(showStats.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.stats = payload.defaultStats
				state.monthlyApplications = payload.monthlyApplications
			})
			.addCase(showStats.rejected, (state, { payload }) => {
				state.isLoading = false
				toast.error(payload)
			})
	}
})
export const { showLoading, hideLoading, handleChange, clearFilters } =
	allJobsSlice.actions
export default allJobsSlice.reducer
