import React, { useState } from 'react'

const Search = (props)=>{
	const [searchValue, setSearchValue ] = useState('');

	const resetInputField = () => {
		setSearchValue("");
	};

	const handleSubmit = (e) => {
		e.preventDefault()
		props.search(searchValue)
		resetInputField();
	}

	const handleChange = (e)=> {
		setSearchValue(e.target.value)
	}
	return (
		<form className="search" >
			<input type="text" value={searchValue} onChange={handleChange}/>
			<input type="submit" onClick={handleSubmit} value="SEARCH" />
		</form>
	);
}

export default Search