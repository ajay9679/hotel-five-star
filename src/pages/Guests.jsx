import Row from './../ui/Row'
import Heading from './../ui/Heading'

import GuestTable from './../features/guests/GuestTable'
import AddGuest from './../features/guests/AddGuest'
import GuestTableOperations from './../features/guests/GuestTableOperations'


export default function Guests(){
	return <>
		<Row type='horizontal' >
			<Heading as='h1' >Guests</Heading>
			<GuestTableOperations />
			<AddGuest />
		</Row>
		<GuestTable />
	</>
}