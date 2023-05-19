import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import customFetch from '../../utils/customFetch'
import { toast } from 'react-toastify'
import { logoutUser } from '../user/userSlice'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import { getAllJobs, hideLoading, showLoading } from '../allJobs/allJobsSlice'
import { useDispatch } from 'react-redux'

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

export const createJob = createAsyncThunk(
	'job/createJob',
	async (job, thunkAPI) => {
		try {
			const resp = await customFetch.post('/jobs', job, {
				headers: {
					Authorization: `Bearer ${thunkAPI.getState().user.user.token}`
				}
			})
			thunkAPI.dispatch(clearValues())
			return resp.data
		} catch (error) {
			if (error.response.status === 401) {
				logoutUser()
				return thunkAPI.rejectWithValue('Unauthorized! Logging out...')
			}
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

export const deleteJob = createAsyncThunk(
	'job/deleteJob',
	async (jobId, thunkAPI) => {
		thunkAPI.dispatch(showLoading())
		console.log(jobId)
		try {
			const resp = await customFetch.delete(`/jobs/${jobId}`, {
				headers: {
					Authorization: `Bearer ${thunkAPI.getState().user.user.token}`
				}
			})
			thunkAPI.dispatch(getAllJobs())
			return resp.data.msg
		} catch (error) {
			thunkAPI.dispatch(hideLoading())
			return thunkAPI.rejectWithValue(error.response.data.msg)
		}
	}
)

const jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {
		handleChange: (state, { payload: { name, value } }) => {
			state[name] = value
		},
		clearValues: () => {
			return {
				...initialState,
				jobLocation: getUserFromLocalStorage()?.location || ''
			}
		}
	},
	extraReducers: builder => {
		builder
			.addCase(createJob.pending, state => {
				state.isLoading = true
			})
			.addCase(
				(createJob.fulfilled,
				state => {
					state.isLoading = false
					toast.success('Job created!')
				})
			)
			.addCase(createJob.rejected, (state, { payload }) => {
				state.isLoading = false
				toast.error(payload)
			})
			.addCase(deleteJob.rejected, (state, { payload }) => {
				toast.error(payload)
			})
			.addCase(deleteJob.fulfilled, (state, { payload }) => {
				toast.success(payload)
			})
	}
})

export const { handleChange, clearValues } = jobSlice.actions
export default jobSlice.reducer
