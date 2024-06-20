import React from 'react';

import ReactSelect from 'react-select';
import styles from '../../styles/ReactSelectStyles';
import {Controller,useForm} from 'react-hook-form';

import FormRow from './../../ui/FormRow'
import Input from './../../ui/Input'
import Form from './../../ui/Form'
import Button from './../../ui/Button'
import Select from './../../ui/Select'
import Spinner from './../../ui/Spinner'

import useCountries from './../../hooks/useCountries';

import {useCreateGuest} from './useCreateGuest';
import {useEditGuest} from './useEditGuest';


export default function CreateGuestForm({onCloseModal,guestToEdit={}}){
	const editSession = guestToEdit?.id ? true : false;
	// console.log(guestToEdit)
	// console.log(editSession)
	const {isCountries,countries} = useCountries();
	const {isCreating,createGuest} = useCreateGuest();
	const {isEditing,editGuest} = useEditGuest();
	const {register,handleSubmit,control,watch,formState:{errors}} = useForm({defaultValues:{...guestToEdit,nationality:guestToEdit?.nationality ? {label:guestToEdit?.nationality,value:guestToEdit?.countryFlag.slice(-6, -4).toUpperCase(),} : null},});
	const nationality = watch('nationality')?.label || null;
	const countryCode = watch('nationality')?.value || null;
	function onSubmit(data){
		console.log(data)
		if(editSession){
			editGuest({...data,nationality,countryFlag: `https://flagcdn.com/${countryCode?.toLowerCase()}.svg`},{onSuccess:() => onCloseModal?.()});
		}else{
			createGuest({...data,nationality,countryFlag:`https://flagcdn.com/${countryCode?.toLowerCase()}.svg`},{onSuccess:() => onCloseModal?.()});
		}
	}

	if(isCountries) return <Spinner />

	return <Form onSubmit={handleSubmit(onSubmit)} >
		<FormRow label='Full name' error={errors?.fullName?.message} >
			<Input type='text' id='fullName' {...register('fullName',{required:'This field is required'})} />
		</FormRow>
		<FormRow label='Email' error={errors?.email?.message} >
			<Input type='email' id='email' {...register('email',{required:'This field is required',pattern:{value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,message: 'Invalid email address',}})} />
		</FormRow>
		<FormRow label='Nationality' error={errors?.nationality?.message} >
			<Controller control={control} name='nationality' rules={{ required: 'This field is required' }} render={({field}) => <ReactSelect {...field} options={countries?.map(country => {
					return {
						label:country.name.common,
						value:country.cca2,}})} noOptionsMessage={() => 'Countries could not be loaded'} styles={styles} placeholder='Select a country' isLoading={isCountries} /> } 
				/>
		</FormRow>
		<FormRow label='National ID' error={errors?.nationalID?.message} >
			<Input type='text' id='nationalID' {...register('nationalID',{required:'This field is required',pattern:{value: /^[A-Za-z0-9]{9,16}$/,message:'Invalid National ID'},})} />
		</FormRow>
		<FormRow>
			<Button type='reset' variation='secondary' onClick={() => onCloseModal?.()} >
				Cancel
			</Button>
			<Button>{editSession ? 'Edit Guest' : 'Add Guest'}</Button>
		</FormRow>
	</Form>
}
