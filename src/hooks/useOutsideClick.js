import React from 'react';


export function useOutsideClick(handler,listenEvent=true){
    // console.log('outside click')
	const ref = React.useRef();
    React.useEffect(function(){
        function handleClick(e){
            if(ref.current && !ref.current.contains(e.target)){
                handler();
            }
        }
        document.addEventListener('click',handleClick,listenEvent);
        
        return () => document.removeEventListener('click',handleClick,listenEvent);
    },[handler,listenEvent]);
    return ref;
}