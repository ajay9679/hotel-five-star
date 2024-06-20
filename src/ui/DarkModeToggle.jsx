import React from 'react';
import {HiOutlineMoon,HiOutlineSun} from 'react-icons/hi2';
import ButtonIcon from "./ButtonIcon";
import {DarkModeContext} from './../contexts/DarkModeContext'


export default function DarkModeToggle(){
	const {toggleDarkMode,isDark} = React.useContext(DarkModeContext);
	return <ButtonIcon onClick={toggleDarkMode} >
		{isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
	</ButtonIcon>
}