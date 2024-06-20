import React from 'react';
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckin } from "./useCheckin";
import { useSettings } from "./../settings/useSettings";
import {formatCurrency} from "../../utils/helpers";
import {useBooking} from './../bookings/useBooking';


const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

export default function CheckinBooking(){
    const [confirmPaid,setConfirmPaid] = React.useState(false);
    const [addBreakfast,setAddBreakfast] = React.useState(false);
    const moveBack = useMoveBack();
    const {checkin,isCheckin} = useCheckin();
    const {settings,isLoading:isSettings} = useSettings();
    const {booking,isLoading} = useBooking();
    const {id: bookingId,guests,totalPrice,numGuests,hasBreakfast,numNights} = booking;
    const optionalBreakfastPrice = settings?.breakfastPrice*numGuests*numNights;

    function handleCheckin(){
        if(!confirmPaid) return;
        addBreakfast ? checkin({bookingId,breakfast:{hasBreakfast:true,extrasPrice:optionalBreakfastPrice,totalPrice:totalPrice+optionalBreakfastPrice}})
        : checkin({bookingId,breakfast:{}});
    }

    React.useEffect(function(){
        if(booking?.isPaid) setConfirmPaid(booking?.isPaid);
    },[booking]);

    if(isLoading) return <Spinner />
    
    return <>
        <Row type="horizontal">
            <Heading as="h1">
                Check in booking #{bookingId}
            </Heading>
            <ButtonText onClick={moveBack}>
                &larr; Back
            </ButtonText>
        </Row>
        <BookingDataBox booking={booking} />
        {!hasBreakfast && <Box>
            <Checkbox id='breakfast' disabled={addBreakfast || isCheckin} checked={addBreakfast} onChange={() => {
                    setConfirmPaid(false);
                    setAddBreakfast(add => !add)}} >
                Want to add Breakfast for {formatCurrency(optionalBreakfastPrice)}?.
            </Checkbox>
        </Box>}
        <Box>
            <Checkbox id='confirm' disabled={confirmPaid || isCheckin} checked={confirmPaid} onChange={() => setConfirmPaid(confirm => !confirm)} >
                I confirm that {guests.fullName} has paid the total amount of {!addBreakfast
                    ? formatCurrency(totalPrice)
                    : `${formatCurrency(
                    totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
            </Checkbox>
        </Box>
        <ButtonGroup>
            <Button disabled={!confirmPaid || isCheckin} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
            <Button variation="secondary" onClick={moveBack}>
                Back
            </Button>
        </ButtonGroup>
    </>
}

