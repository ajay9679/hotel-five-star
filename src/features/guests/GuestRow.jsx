import React from 'react';

import {HiEye,HiPencil,HiTrash,HiArrowDownOnSquare,HiArrowUpOnSquare} from 'react-icons/hi2';
import {useNavigate} from 'react-router-dom';

import Table from './../../ui/Table';
import Modal from './../../ui/Modal';
import Menus from './../../ui/Menus';
import {Flag} from './../../ui/Flag';
import ConfirmDelete from './../../ui/ConfirmDelete';

import CreateGuestForm from './CreateGuestForm'
import {useDeleteGuest} from './useDeleteGuest'


export default function GuestTable({guest}){
	const {isDeleting,deleteGuests} = useDeleteGuest();
	const navigate = useNavigate();
	const {id:guestId,fullName,email,countryFlag,nationality} = guest;
	// console.log(guestId)
	return <Table.Row>
		<Flag type='big' src={countryFlag} alt={`Flag of ${nationality}`} />
		<div>{fullName}</div>
		<div>{email}</div>
		<div>{nationality}</div>
		<Modal>
			<Menus.Menu>
				<Menus.Toggle id={guestId} />
				<Menus.List id={guestId}>
					<Menus.Button icon={<HiEye />} onClick={() => navigate(`/guests/${guestId}`)} >
						See Details
					</Menus.Button>
					<Modal.Open opens='edit-guest' >
						<Menus.Button icon={<HiPencil />} >
							Edit
						</Menus.Button>
					</Modal.Open>
					<Modal.Open opens='delete-guest' >
						<Menus.Button icon={<HiTrash />} >
							Delete
						</Menus.Button>
					</Modal.Open>
				</Menus.List>
				<Modal.Window name='edit-guest' >
					<CreateGuestForm guestToEdit={guest} />
				</Modal.Window>
				<Modal.Window name='delete-guest' >
					<ConfirmDelete resource='Guest' disabled={isDeleting} onConfirm={() => deleteGuests(guestId)} />
				</Modal.Window>
			</Menus.Menu>
		</Modal>
	</Table.Row>
}