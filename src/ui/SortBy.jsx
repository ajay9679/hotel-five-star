import React from 'react';
import Select from './Select'
import useUrl from './../hooks/useUrl'


export default function SortBy({options}){
	const {getUrl,setUrl} = useUrl('sortBy','');
	const sortBy = getUrl();

	function handleChange(e){
		setUrl(e.target.value);
	}
	
    return <Select options={options} value={sortBy} type='white' onChange={handleChange} />
}