import React from 'react';
import Button from './../../ui/Button';
import Modal from './../../ui/Modal';

import CreateGuestForm from './CreateGuestForm';


export default function AddGuest(){
	return <div>
		<Modal>
			<Modal.Open opens='guest-form' >
				<Button>Add Guest</Button>
			</Modal.Open>
			<Modal.Window name='guest-form' >
				<CreateGuestForm />
			</Modal.Window>
		</Modal>
	</div>
}

