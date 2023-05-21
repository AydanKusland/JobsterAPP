import customFetch from '../../utils/customFetch'
import { logoutUser } from './userSlice'

export const registerUserThunk = async (url, user, thunkAPI) => {
	try {
		const resp = await customFetch.post(url, user)
		return resp.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
}
export const loginUserThunk = async (url, user, thunkAPI) => {
	try {
		const resp = await customFetch.post(url, user)
		return resp.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
}
export const updateUserThunk = async (url, user, thunkAPI) => {
	try {
		const resp = await customFetch.patch(url, user)
		return resp.data
	} catch (error) {
		if (error.response.status === 401) {
			thunkAPI.dispatch(logoutUser())
			return thunkAPI.rejectWithValue('Unauthorized! Logging out!')
		}
		console.log(error.response)
		return thunkAPI.rejectWithValue(error.response.data.msg)
	}
}

// export const clearValuesThunk = async (url, thunkAPI) => {}
