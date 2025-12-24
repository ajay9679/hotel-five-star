import React from 'react';

import supabase from './../services/supabase'
import {subtractDates} from './../utils/helpers'
import { isFuture, isPast, isToday } from 'date-fns';

import Button from './../ui/Button';

import { bookings } from './data-bookings';
import { cabins } from './data-cabins';
import { guests } from './data-guests';
import {DarkModeContext} from './../contexts/DarkModeContext'


async function deleteBookings(){
	const {error} = await supabase.from('bookings').delete().gt('id',0);
	if(error) console.error(error.message);
}

async function deleteGuests(){
	const {error} = await supabase.from('guests').delete().gt('id',0);
	if(error) console.error(error.message);
}

async function deleteCabins(){
	const {error} = await supabase.from('cabins').delete().gt('id',0);
	if(error) console.error(error.message);
}

async function createCabins(){
	const {error} = await supabase.from('cabins').insert(cabins);
	if(error) console.error(error.message);
}

async function createGuests(){
	const {error} = await supabase.from('guests').insert(guests);
	if(error) console.error(error.message);
}

async function createBookings(){
	const {data:guestsIds} = await supabase.from('guests').select('id').order('id');
	const allGuestIds = guestsIds.map(cabin => cabin.id);
	const {data:cabinsIds} = await supabase.from('cabins').select('id').order('id');
	const allCabinIds = cabinsIds.map(cabin => cabin.id);
	const finalBookings = bookings.map(booking => {
		const cabin = cabins[booking.cabinId-1];
		const numNights = subtractDates(booking.endDate,booking.startDate);
		const cabinPrice = numNights*(cabin.regularPrice-cabin.discount);
		const extrasPrice = booking.hasBreakfast ? numNights*15*booking.numGuests : 0;
		const totalPrice = cabinPrice+extrasPrice;
		let status;
		if(isPast(new Date(booking.endDate)) && !isToday(new Date(booking.endDate)))
			status = 'checked-out';
		if(isFuture(new Date(booking.startDate)) || isToday(new Date(booking.startDate)))
			status = 'unconfirmed';
		if((isFuture(new Date(booking.endDate)) || isToday(new Date(booking.endDate))) && isPast(new Date(booking.startDate)) && !isToday(new Date(booking.startDate)))
			status = 'checked-in';
		return {
			...booking,
			numNights,
			cabinPrice,
			extrasPrice,
			totalPrice,
			guestId:allGuestIds[booking.guestId-1],
			cabinId:allCabinIds[booking.guestId-1],
			status,
		};
	});
	console.log(finalBookings);
	const {error} = await supabase.from('bookings').insert(finalBookings);
	if(error) console.error(error.message);
}

export default function Upload(){
	const [isLoading,setIsLoading] = React.useState(false);
	const {toggleDarkMode,isDark} = React.useContext(DarkModeContext);

	async function uploadAll(){
		setIsLoading(true);
		await deleteBookings();
		await deleteGuests();
		await deleteCabins();

		await createCabins();
		await createGuests();
		await createBookings();
		setIsLoading(false);
	}

	async function uploadBookings(){
		setIsLoading(true);
		await deleteBookings();

		await createBookings();
		setIsLoading(false);
	}

	return <div style={{marginTop:'auto',backgroundColor:'var(--color-indigo-100)',padding:'8px',borderRadius:'5px',textAlign:'center',boxShadow: '0 0 5px #ccc'}} >
		<h3>DEV AREA</h3>
		<Button variation='danger' size='small' onClick={uploadAll} disabled={true} >Upload all sample data</Button>
		<small>Only run this once</small>
		<small><em>(Cabin images need to be uploaded manually)</em></small>
		<hr style={{marginBottom:'15px',marginTop:'15px'}} />
		<Button variation='danger' size='small' onClick={uploadBookings}  >Upload CURRENT bookings</Button>
		<small>You can run this every day you develop the app</small>
	</div>
}
