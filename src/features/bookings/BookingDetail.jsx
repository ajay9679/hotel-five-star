import styled from "styled-components";
import {useBooking} from './useBooking';
import {useNavigate,Link} from 'react-router-dom';

import {useCheckout} from './../check-in-out/useCheckout';

import {HiArrowUpOnSquare} from 'react-icons/hi2';

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Spinner from "../../ui/Spinner";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import {useDeleteBooking} from './useDeleteBooking'

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

export default function BookingDetail(){
    const navigate = useNavigate();
    const {deleteBooking,isDeleting} = useDeleteBooking();
    const {checkout,isCheckout} = useCheckout();
    const {booking,isLoading} = useBooking();
    // console.log(booking)
    // const booking = {};
    // const status = "checked-in";
    const {status,id:bookingId} = booking;

    const moveBack = useMoveBack();

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };
    if(isLoading) return <Spinner />
    // if(!booking.length) return <Empty resource='Bookings' />
    
    return <>
        <Row type="horizontal">
            <HeadingGroup>
                <Heading as="h1">Booking #{bookingId}</Heading>
                <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
            </HeadingGroup>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>
        <BookingDataBox booking={booking} />
        <ButtonGroup>
            {status === 'unconfirmed' && <Button onClick={() => navigate(`/checkin/${bookingId}`)} >
                    Check-in
            </Button>}
            {/*{status === 'checked-in' && <Button onClick={() => checkout(bookingId)} disabled={isCheckout} icon={<HiArrowUpOnSquare />} >
                    Check-out
            </Button>}*/}
            {status === 'checked-in' && <Button variation='primary' as={Link} to={`/checkout/${bookingId}`} >Check-out</Button>}
            <Modal>
                <Modal.Open opens='delete-booking'>
                    <Button variation='danger' >Delete</Button>
                </Modal.Open>
                <Modal.Window name='delete-booking' >
                    <ConfirmDelete resource='Booking' onConfirm={() => deleteBooking(bookingId,{onSettled:() => navigate(-1)})} />
                </Modal.Window>
            </Modal>
            <Button variation="secondary" onClick={moveBack}>
                Back
            </Button>
        </ButtonGroup>
    </>
}


