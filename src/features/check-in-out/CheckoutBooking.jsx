import React from 'react';

import { HiMiniShare } from "react-icons/hi2";
import {saveAs} from 'file-saver';
import {useCheckout} from './useCheckout';
import {BlobProvider,PDFDownloadLink,PDFViewer,StyleSheet} from '@react-pdf/renderer';
import styled from 'styled-components';

import BookingDataBox from './../bookings/BookingDataBox';

import Button from './../../ui/Button'
import Row from './../../ui/Row'
import Heading from './../../ui/Heading'
import Spinner from './../../ui/Spinner'
import ButtonText from './../../ui/ButtonText'
import ButtonGroup from './../../ui/ButtonGroup'
import InvoicePDF from './../../ui/InvoicePDF'

import {useMoveBack} from './../../hooks/useMoveBack'

import {formatCurrency} from './../../utils/helpers'

import {useBooking} from './../bookings/useBooking'


const StyledCheckoutBooking = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
	padding: 3.2rem;
`;

const StyledText = styled.p`
	font-size: 1.8rem;
	line-height: 1.8;
	text-align: center;
`;

const Box = styled.div`
	display: flex;
	gap: 1.2rem;
	align-items: center;
	justify-content: flex-end;
`;

const styles = StyleSheet.create({
	viewer:{
    	width:'100%', //the pdf viewer will take up all of the width and height
    	height: window.innerHeight,
    }
});

export default function CheckoutBooking(){
	const moveBack = useMoveBack();
	const {booking,isLoading} = useBooking();
	const {checkout,isCheckout} = useCheckout();
	const {id:bookingId,created_at,startDate,endDate,numNights,numGuests,cabinPrice,extrasPrice,totalPrice,hasBreakfast,observations,isPaid,guests:{fullName:guestName,email,country,countryFlag,nationalID}={},cabins:{name:cabinName}={}} = booking;

	function handleCheckout(){
		checkout(bookingId);
	}

	async function handleShare(url,blob){
		await saveAs(blob, `invoice-${bookingId}.pdf`);
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Your Invoice-${bookingId}`)}&body=${encodeURIComponent(`Kindly find attached invoice`)}`;
	}

	const invoiceData = {
		date:new Date().toISOString().split('T')[0],
		invoiceNumber:bookingId,
		checkInDate:startDate,
		checkOutDate:endDate,
		numberOfNights:numNights,
		guestName,
		guestEmail:email,
		numberOfGuests:numGuests,
		roomName:cabinName,
		roomPrice:formatCurrency(cabinPrice),
		extrasPrice:formatCurrency(extrasPrice),
		totalPrice:formatCurrency(totalPrice),
	};

	if(isLoading || isCheckout) return <Spinner />

	return <>
		<Row type="horizontal">
            <Heading as="h1">Booking #{bookingId} summary to check out</Heading>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>
        <BookingDataBox booking={booking} />
        <ButtonGroup>
        	<BlobProvider document={<InvoicePDF invoiceData={invoiceData} />}>
        		{({url,blob}) => <div style={styles.btn} onClick={() => handleShare(url, blob)} >
        				<span style={{cursor:'pointer'}} ><HiMiniShare color='blue' size={30} /></span>
        			</div>}
        	</BlobProvider>
        	<PDFDownloadLink style={{
    			border: '1px solid var(--color-grey-200)',
    			backgroundColor:'var(--color-indigo-700)',
                color: 'var(--color-green-700)',
                fontSize: '1.4rem',
                textTransform:'uppercase',
                padding: '1.2rem 1.6rem',
                fontWeight: '500',
                background: 'var(--color-grey-0)',
                borderRadius: 'var(--border-radius-sm)',
                boxShadow: 'var(--shadow-sm)',
            }} document={<InvoicePDF invoiceData={invoiceData} />} fileName={`invoice-${bookingId}.pdf`} >
            	{({blob,url,loading,error}) => loading ? 'loading...' : 'Download Invoice'}
        	</PDFDownloadLink>
        	<Button disabled={isCheckout} onClick={handleCheckout} >Checkout Booking #{bookingId}</Button>
        	<Button onClick={moveBack} >Back</Button>
        </ButtonGroup>
        <PDFViewer style={styles.viewer} >
        	<InvoicePDF invoiceData={invoiceData} />
        </PDFViewer>
	</>
}

/*export default function CheckoutBooking({bookingId,onCloseModal}){
	const {checkout,isCheckout} = useCheckout();

	return <StyledCheckoutBooking>
		<StyledText>
			Are you sure you want to checkout booking #{bookingId}
		</StyledText>
		<Box>
			<Button variation='secondary' onClick={onCloseModal} >Cancel</Button>
			<Button onClick={() => {
				checkout(bookingId);
				onCloseModal?.();
			}} >Check Out</Button>
		</Box>
	</StyledCheckoutBooking>
}*/


