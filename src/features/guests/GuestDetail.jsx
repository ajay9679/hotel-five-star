import React from 'react';
import styled from 'styled-components';
import {formatCurrency} from './../../utils/helpers'

import {HiOutlineEnvelope,HiOutlineMapPin,HiOutlineIdentification,HiOutlineBanknotes,HiOutlineCurrencyRupee} from 'react-icons/hi2';

import BookingDataBox from './../bookings/BookingDataBox'

import HeadingGroup from './../../ui/HeadingGroup';
import Row from './../../ui/Row';
import DataItem from './../../ui/DataItem';
import {Flag} from './../../ui/Flag';
import Spinner from './../../ui/Spinner';
import Heading from './../../ui/Heading';
import Tag from './../../ui/Tag';
import ButtonText from './../../ui/ButtonText';

import {useMoveBack} from './../../hooks/useMoveBack'
import {useGuest} from './useGuest';
import GuestBookingActions from './GuestBookingActions';


const Section = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
	padding-top: 1rem;
`;

const Details = styled.div`
	display: flex;
	align-items: center;
	gap: 2rem;
	padding: 1.6rem 1rem;

	border: 1px solid var(--color-brand-500);
	border-radius: var(--border-radius-sm);
`;

const StyledText = styled.p`
	font-size: 2.4rem;
	line-height: 1.8;
	text-align: center;
`;

export default function GuestDetail(){
	const moveBack = useMoveBack();
	const {isGuest,guest} = useGuest();
	const {fullName,email,countryFlag,nationality,nationalID,bookings} = guest;
	const bookingsToTagName = {
		0:'silver',
		1:'yellow',
		2:'blue',
		3:'indigo',
	};
	const totalExtrasPrice = bookings?.reduce((acc,curr) => acc+curr.extrasPrice,0);
	const totalCabinPrice = bookings?.reduce((acc,curr) => acc+curr.cabinPrice,0);

	console.log(bookings)
	if(isGuest) return <Spinner />
	return <>
		<Row type='horizontal'>
			<HeadingGroup>
				<Flag type='big' src={countryFlag} alt={`Flag of ${nationality}`} />
				<Heading as='h1'>{fullName}</Heading>
				<Tag type={bookings?.length <= 3 ? bookingsToTagName[bookings.length] : 'green'} >
					{!bookings?.length && 'No Bookings'}
					{bookings?.length > 0 && bookings?.length <=3 && `${bookings?.length} bookings`}
					{bookings?.length > 3 && `${bookings?.length - 1}+ bookings`}
				</Tag>
			</HeadingGroup>
			<ButtonText onClick={moveBack} >&larr; Back</ButtonText>
		</Row>
		<Section>
			<Heading as='h2'>Personal Details</Heading>
			<Details>
				<DataItem icon={<HiOutlineEnvelope />} label='Email' >
					{email}
				</DataItem>
				<span>&bull;</span>
				<DataItem icon={<HiOutlineMapPin />} label='Nationality'>
					{nationality}
				</DataItem>
				<span>&bull;</span>
				<DataItem icon={<HiOutlineIdentification />} label='National ID'>
					{nationalID}
				</DataItem>
			</Details>
		</Section>
		{bookings?.length > 0 && <Section>
			<Heading as='h2' >Money spent</Heading>
			<Details>
				<DataItem icon={<HiOutlineBanknotes />} label='Extras Price' >
					{formatCurrency(totalExtrasPrice)}
				</DataItem>
				<span>&bull;</span>
				<DataItem icon={<HiOutlineBanknotes />} label='Cabin Price'>
					{formatCurrency(totalCabinPrice)}
				</DataItem>
				<DataItem icon={<HiOutlineCurrencyRupee />} label='Total Spent'>
					{formatCurrency(totalExtrasPrice + totalCabinPrice)}
				</DataItem>
			</Details>
		</Section>}
		<Section>
			<Heading as='h2' >All Bookings</Heading>
			{bookings?.length ? bookings?.map(booking => <BookingDataBox key={booking.id} booking={booking} >
				<GuestBookingActions status={booking.status} bookingId={booking.id} />
			</BookingDataBox>) : <StyledText>No bookings available! Please create a new booking.</StyledText>}
		</Section>
	</>
}
