import React from 'react';
import Table from './../../ui/Table';
import Menus from './../../ui/Menus';
import Spinner from './../../ui/Spinner';
import Pagination from './../../ui/Pagination';

import {useGuests} from './useGuests';
import GuestRow from './GuestRow';


export default function GuestTable(){
	const {isLoadingGuests,guests={},count} = useGuests();
	// console.log(count)
	if(isLoadingGuests) return <Spinner />

	return <Menus>
		<Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr' >
			<Table.Header>
				<div></div>
				<div>Name</div>
				<div>Email</div>
				<div>Nationality</div>
				<div></div>
			</Table.Header>
			<Table.Body data={guests} render={guest => <GuestRow guest={guest} key={guest.id} />} />
			<Table.Footer>
				<Pagination count={count} />
			</Table.Footer>
		</Table>
	</Menus>
}
