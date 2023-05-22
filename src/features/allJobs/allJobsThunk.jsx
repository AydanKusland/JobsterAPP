import customFetch, {
	checkForUnauthorizedResponse
} from '../../utils/customFetch'

export const getAllJobsThunk = async (_, thunkAPI) => {
	const { page, search, searchStatus, searchType, sort } =
		thunkAPI.getState().allJobs
	let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`
	if (search) {
		url += `&search=${search}`
	}
	try {
		const response = await customFetch(`${url}`)
		return response.data
	} catch (error) {
		return checkForUnauthorizedResponse(error, thunkAPI)
	}
}

export const showStatsThunk = async (_, thunkAPI) => {
	try {
		const resp = await customFetch('/jobs/stats')
		return resp.data
	} catch (error) {
		return checkForUnauthorizedResponse(error, thunkAPI)
	}
}
