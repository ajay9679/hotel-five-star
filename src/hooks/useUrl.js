import {useSearchParams} from 'react-router-dom';


export default function useUrl(field,defaultValue){
	// console.log(field,defaultValue)
	const [searchParams,setSearchParams] = useSearchParams();
	
	function getUrl(){
		return searchParams.get(field) || defaultValue;
	}

	function setUrl(value){
		searchParams.set(field,value);
		setSearchParams(searchParams);
	}

	return {getUrl,setUrl};
}

