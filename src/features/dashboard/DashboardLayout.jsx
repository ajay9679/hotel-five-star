import React from 'react';
import styled from "styled-components";

import Spinner from './../../ui/Spinner';

import {useRecentBookings} from './useRecentBookings'
import {useRecentStays} from './useRecentStays'
import Stats from './Stats'
import SalesChart from './SalesChart'
import DurationChart from './DurationChart'

import {useCabin} from './../cabins/useCabin'

import TodayActivity from './../check-in-out/TodayActivity'


const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

/*
We need to distinguish between two types of data here:
1) BOOKINGS: the actual sales. For example, in the last 30 days, the hotel might have sold 10 bookings online, but these guests might only arrive and check in in the far future (or not, as booking also happen on-site)
2) STAYS: the actual check-in of guests arriving for their bookings. We can identify stays by their startDate, together with a status of either 'checked-in' (for current stays) or 'checked-out' (for past stays)
*/

export default function DashboardLayout(){
    const {isLoading,bookings} = useRecentBookings();
    const {isLoading:isStays,stays,confirmedStays,numDays} = useRecentStays();
    // console.log(confirmedStays)
    const {isLoading:isCabins,cabins} = useCabin();

    if(isLoading || isStays || isCabins) return <Spinner />

    return <StyledDashboardLayout>
        <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length} />
        <TodayActivity />
        <DurationChart confirmedStays={confirmedStays} />
        <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
}