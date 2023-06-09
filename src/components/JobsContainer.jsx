import styled from 'styled-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Job from './Job'
import Loading from './Loading'
import { getAllJobs } from '../features/allJobs/allJobsSlice'
import PageBtnContainer from './PageBtnContainer'

const JobsContainer = () => {
	const dispatch = useDispatch()
	const {
		isLoading,
		jobs,
		page,
		totalJobs,
		numOfPages,
		search,
		searchStatus,
		searchType,
		sort
	} = useSelector(store => store.allJobs)

	useEffect(() => {
		dispatch(getAllJobs())
	}, [page, search, searchStatus, searchType, sort])

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
			<h5>
				{totalJobs} job{jobs.length > 1 && 's'}
			</h5>
			<div className='jobs'>
				{jobs.map(job => {
					return <Job key={job._id} {...job}></Job>
				})}
			</div>
			{numOfPages > 1 && <PageBtnContainer />}
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
