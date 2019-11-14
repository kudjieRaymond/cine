import React, { useState } from 'react'

const Search = (props)=>{
	const [searchValue, setSearchValue ] = useState('');

	const resetInputField = () => {
		setSearchValue("");
	};

	const handleSubmit = (e) => {
		e.prevent.default()
		props.search(searchValue)
		resetInputField();
	}

	const handleChange = (e)=> {
		setSearchValue(e.target.value)
	}
	return (
		<form className="search">
			<input type="text" value={searchValue} onChange={handleChange}/>
			<input type="submit" onClick={handleSubmit} />
		</form>
	);
}

export default Search