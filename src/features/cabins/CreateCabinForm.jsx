import React from 'react'

import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import {Textarea} from "../../ui/Textarea";

import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import {useCreateCabin} from './useCreateCabin'
import {useEditCabin} from './useEditCabin'


export default function CreateCabinForm({cabinToEdit={},onCloseModal}){
	const {id:editId,...editValues} = cabinToEdit;
	const isEditSession = Boolean(editId);
	const {isCreating,createCabin} = useCreateCabin();
	const {isEditing,editCabin} = useEditCabin();
	const {register,handleSubmit,reset,formState,getValues} = useForm({defaultValues:isEditSession ? editValues : {}});
	const {errors} = formState;

	function onSubmit(data){
		const image = typeof data.image === 'string' ? data.image : data.image[0];
		isEditSession ? editCabin({newCabin:{...data,image},id:editId},{
			onSuccess:() => {
				reset();
				onCloseModal?.();
			}
		}) : createCabin({...data,image},{onSuccess:data => {
			reset();
			onCloseModal?.();
		}});
	}

	function onError(errors){
		console.error(errors);
	}

	const isWorking = isCreating || isEditing;
	
	return <Form type={onCloseModal ? 'modal' : 'regular'} onSubmit={handleSubmit(onSubmit,onError)} >
		<FormRow label='Cabin name' error={errors?.name?.message} >
	  		<Input disabled={isWorking} type="text" id="name" {...register('name',{required:'This field is required'})} />
		</FormRow>

		<FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
	  		<Input disabled={isWorking} type="number" id="maxCapacity" {...register('maxCapacity',{required:'This field is required',min:{value:1,message:'Capacity should be atleast 1'}})} />
		</FormRow>

		<FormRow label='Regular price' error={errors?.maxCapacity?.message}>
			<Input disabled={isWorking} type="number" id="regularPrice" {...register('regularPrice',{required:'This field is required'})} />
		</FormRow>

		<FormRow label='Discount' error={errors?.discount?.message}>
			<Input disabled={isWorking} type="number" id="discount" defaultValue={0} {...register('discount',{required:'This field is required',validate:value => +value <= +getValues().regularPrice || 'Discount should be less than regular price'})} />
		</FormRow>

		<FormRow label='Description'>
			<Textarea disabled={isWorking} type="number" id="description" {...register('description')} />
		</FormRow>

		<FormRow label='Cabin photo' error={errors?.image?.message} >
			<FileInput id="image" accept="image/*" {...register('image',{requierd:isEditSession ? false : 'This field is required'})} />
		</FormRow>

		<FormRow>
			{/* type is an HTML attribute! */}
			<Button disabled={isWorking} variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
				Cancel
			</Button>
			<Button disabled={isWorking}>{isEditSession ? 'Edit Cabin' : 'Add Cabin'}</Button>
		</FormRow>
  </Form>
}
