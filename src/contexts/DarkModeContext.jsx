import React from 'react';
import {useLocalStorageState} from './../hooks/useLocalStorageState'


export const DarkModeContext = React.createContext();

export default function DarkModeProvider({children}){
	const [isDark,setIsDark] = useLocalStorageState(false,'isDark');
	
	function toggleDarkMode(){
		setIsDark(dark => !dark);
	}

	React.useEffect(function(){
		if(isDark){
			document.documentElement.classList.add('dark-mode');
			document.documentElement.classList.remove('light-mode');
		}else{
			document.documentElement.classList.add('light-mode');
			document.documentElement.classList.remove('dark-mode');
		}
	},[isDark]);

	return <DarkModeContext.Provider value={{isDark,toggleDarkMode}} >
		{children}
	</DarkModeContext.Provider>
}

