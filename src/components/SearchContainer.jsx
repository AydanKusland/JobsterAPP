import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { FormRow, FormRowSelect } from '../components'
import { handleChange, clearFilters } from '../features/allJobs/allJobsSlice'
import { useState, useMemo } from 'react'
const SearchContainer = () => {
	const [localSearch, setLocalSearch] = useState('')

	const dispatch = useDispatch()
	const { isLoading, searchStatus, searchType, sort, sortOptions } =
		useSelector(store => store.allJobs)
	const { jobTypeOptions, statusOptions } = useSelector(store => store.job)

	const handleSearch = e => {
		dispatch(handleChange({ name: e.target.name, value: e.target.value }))
	}
	const handleSubmit = e => {
		e.preventDefault()
		setLocalSearch('')
		dispatch(clearFilters())
	}

	const debounce = () => {
		console.log('debounce')
		let timeoutID
		return e => {
			console.log('aha!')
			setLocalSearch(e.target.value)
			clearTimeout(timeoutID)
			timeoutID = setTimeout(() => {
				dispatch(handleChange({ name: e.target.name, value: e.target.value }))
			}, 1000)
		}
	}

	const optimizedDebounce = useMemo(() => debounce(), [])

	return (
		<Wrapper>
			<form className='form'>
				<h4>search form</h4>
				<div className='form-center'>
					{/* Search position */}
					<FormRow
						type='text'
						name='search'
						value={localSearch}
						handleChange={optimizedDebounce}
					/>
					{/* Search by status */}
					<FormRowSelect
						labelText='status'
						name='searchStatus'
						value={searchStatus}
						handleChange={handleSearch}
						list={['all', ...statusOptions]}
					/>
					{/* Search by type */}
					<FormRowSelect
						labelText='type'
						name='searchType'
						value={searchType}
						handleChange={handleSearch}
						list={['all', ...jobTypeOptions]}
					/>
					{/* Sort */}
					<FormRowSelect
						name='sort'
						value={sort}
						handleChange={handleSearch}
						list={sortOptions}
					/>
					<button
						className='btn btn-block btn-danger'
						disabled={isLoading}
						onClick={handleSubmit}
					>
						clear filters
					</button>
				</div>
			</form>
		</Wrapper>
	)
}
export default SearchContainer

const Wrapper = styled.section`
	.form {
		width: 100%;
		max-width: 100%;
	}
	.form-input,
	.form-select,
	.btn-block {
		height: 35px;
	}
	.form-row {
		margin-bottom: 0;
	}
	.form-center {
		display: grid;
		grid-template-columns: 1fr;
		column-gap: 2rem;
		row-gap: 0.5rem;
	}
	h5 {
		font-weight: 700;
	}
	.btn-block {
		align-self: end;
		margin-top: 1rem;
	}
	@media (min-width: 768px) {
		.form-center {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (min-width: 992px) {
		.form-center {
			grid-template-columns: 1fr 1fr 1fr;
		}
		.btn-block {
			margin-top: 0;
		}
	}
`
