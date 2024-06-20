import React from 'react';


export function useKey(handler,listenEvent=false){
	React.useEffect(function(){
		function handleKey(e){
			if(e.key.toLowerCase() === 'escape') handler();
		}

		document.addEventListener("keydown",handleKey,listenEvent);
		return () => document.removeEventListener("keydown",handleKey,listenEvent);
	},[handler,listenEvent]);
}