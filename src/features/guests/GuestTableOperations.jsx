import React from 'react';

import SortBy from './../../ui/SortBy';
import Filter from './../../ui/Filter';
import TableOperations from './../../ui/TableOperations';


export default function GuestTableOperations(){
	return <TableOperations>
		<Filter filterField='bookings' options={[
			{value:'all',label:'All'},
			{value:'checked-in',label:'Active'},
			{value:'unconfirmed',label:'Upcoming'},
			{value:'no-bookings',label:'No bookings'},
		]} />
		<SortBy options={[
			{value:'fullName-asc',label:'Sort by name (a-z)'},
			{value:'fullName-desc',label:'Sort by name (z-a)'},
			{value:'nationality-asc',label:'Sort by nationality (a-z)',},
			{value:'nationality-desc',label:'Sort by nationality (z-a)'},
        ]}
      />
	</TableOperations>
}
