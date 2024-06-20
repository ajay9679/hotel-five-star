import React from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import {useDeleteBooking} from './../bookings/useDeleteBooking';

import Modal from './../../ui/Modal'
import HeadingGroup from './../../ui/HeadingGroup'
import Heading from './../../ui/Heading'
import Tag from './../../ui/Tag'
import ButtonGroup from './../../ui/ButtonGroup'
import Button from './../../ui/Button'
import ConfirmDelete from './../../ui/ConfirmDelete'

import CheckoutBooking from './../check-in-out/CheckoutBooking'

import { statusToTagName } from '../../utils/helpers';


const StyledActions = styled.div`
	display: flex;
	gap: 1.6rem;
	align-items: center;
	justify-content: space-between;
	padding: 1.2rem;
	margin-bottom: 2rem;
	background-color: var(--color-indigo-100);
`;

export default function GuestBookingActions({status,bookingId}){
	const {isDeleting,deleteBooking} = useDeleteBooking();

	return <Modal>
		<StyledActions>
			<HeadingGroup>
				<Heading as='h3'>Booking #{bookingId}</Heading>
				<Tag type={statusToTagName(status)}>{status.replace('-', ' ')}</Tag>
			</HeadingGroup>
			<ButtonGroup>
				<Button as={Link} to={`/bookings/${bookingId}`} >Details</Button>
				
				{status === 'unconfirmed' && <Button as={Link} to={`/checkin/${bookingId}`} >Check In</Button>}

				{status !== 'checked-in' && <Modal.Open opens='delete-booking' >
					<Button variation='danger' >Delete</Button>
				</Modal.Open>}
				<Modal.Window name='delete-booking'>
					<ConfirmDelete onConfirm={() => deleteBooking(bookingId)} resource={`booking #${bookingId}`} />
				</Modal.Window>
				{status === 'checked-in' && <Modal.Open opens='checkout-modal'>
					<Button>Checkout</Button>
				</Modal.Open>}
				<Modal.Window name='checkout-modal' >
					<CheckoutBooking bookingId={bookingId} />
				</Modal.Window>
			</ButtonGroup>
		</StyledActions>
	</Modal>
}