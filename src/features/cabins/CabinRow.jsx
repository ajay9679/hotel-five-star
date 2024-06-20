import React from 'react'
import styled from 'styled-components';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import Modal from './../../ui/Modal'
import Table from './../../ui/Table'
import Button from './../../ui/Button'
import Menus from './../../ui/Menus'
import ConfirmDelete from './../../ui/ConfirmDelete'

import {formatCurrency} from './../../utils/helpers'

import { useDeleteCabin } from './useDeleteCabin';
import { useCreateCabin } from './useCreateCabin';
import CreateCabinForm from './CreateCabinForm';


const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:last-child){
		border-bottom: 1px solid var(--color-grey-100);
	}
	`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	/* transform: scale(1.66666) translateX(-2px); */
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Price = styled.div`
	font-family: 'Sono';
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: 'Sono';
	font-weight: 500;
	color: var(--color-green-700);
`;


export default function CabinRow({cabin}){
	const {id:cabinId,name,maxCapacity,regularPrice,discount,image,description} = cabin;
	const {isDeleting,deleteCabins} = useDeleteCabin();
	const {isCreating,createCabin} = useCreateCabin();
	function handleDelete(){
		deleteCabins(cabinId);
	}
	function handleDuplicate(){
		createCabin({
			name:`Copy of ${name}`,maxCapacity,regularPrice,discount,image,description});
	}

	return <>
		<Table.Row>
			<Img src={image} alt={name} />
			<Cabin>{name}</Cabin>
			<div>Fit upto {maxCapacity} guests</div>
			<Price>{formatCurrency(regularPrice)}</Price>
			<Discount>{discount === 0 ? <span>&mdash;</span> : discount}</Discount>
			<div>
				{/*<button onClick={handleDuplicate} >{<HiSquare2Stack />}</button>
				<Modal>
					<Modal.Open opens='edit-cabin' >
						<button><HiPencil /></button>
					</Modal.Open>
					<Modal.Window name='edit-cabin'>
						<CreateCabinForm cabinToEdit={cabin} />
					</Modal.Window>
					<Modal.Open opens='delete-cabin'>
						<button>{<HiTrash />}</button>
					</Modal.Open>
					<Modal.Window name='delete-cabin'>
						<ConfirmDelete resource='Cabins' disabled={isDeleting} onConfirm={() => deleteCabins(cabinId)} />
					</Modal.Window>
				</Modal>*/}
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={cabinId} />
						<Menus.List id={cabinId}>
							<Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate} >Duplicate
							</Menus.Button>
							<Modal.Open opens='edit-cabin' >
								<Menus.Button icon={<HiPencil />}>Edit
								</Menus.Button>
							</Modal.Open>
							<Modal.Open opens='delete-cabin'>
								<Menus.Button icon={<HiTrash />}>Delete
								</Menus.Button>
							</Modal.Open>
						</Menus.List>
						<Modal.Window name='edit-cabin'>
							<CreateCabinForm cabinToEdit={cabin} />
						</Modal.Window>
						<Modal.Window name='delete-cabin'>
							<ConfirmDelete resource='Cabins' disabled={isDeleting} onConfirm={() => deleteCabins(cabinId)} />
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</div>
		</Table.Row>
	</>
}

