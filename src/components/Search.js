import React from "react";

const Search = (props) => {
	const { onChange } = props;
	return (
		<>
			<input
				type='text'
				placeholder='Поиск по имени'
				name='search'
				onChange={onChange}
			/>
		</>
	);
};

export default Search;
