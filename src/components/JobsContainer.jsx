import styled from 'styled-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Job from './Job'
import Loading from './Loading'
import { getAllJobs } from '../features/allJobs/allJobsSlice'

const JobsContainer = () => {
	const dispatch = useDispatch()
	const { isLoading, jobs } = useSelector(store => store.allJobs)

	useEffect(() => {
		dispatch(getAllJobs())
	}, [])

	if (isLoading) {
		return <Loading center={false} />
	}
	if (jobs.length < 1) {
		return (
			<Wrapper>
				<h2>There are no jobs to display</h2>
			</Wrapper>
		)
	}

	return (
		<Wrapper>
			<h5>jobs info</h5>
			<div className='info'>
				{jobs.map(job => {
					return <Job key={job._id} {...job}></Job>
				})}
			</div>
		</Wrapper>
	)
}
export default JobsContainer

const Wrapper = styled.section`
	margin-top: 4rem;
	h2 {
		text-transform: none;
	}
	& > h5 {
		font-weight: 700;
	}
	.jobs {
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 2rem;
	}
	@media (min-width: 992px) {
		.jobs {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
		}
	}
`
