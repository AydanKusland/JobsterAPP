import axios from 'axios'

export default axios.create({
	baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit'
})
