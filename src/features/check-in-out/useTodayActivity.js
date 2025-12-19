import {useQuery} from '@tanstack/react-query';
import {getStaysTodayActivity} from './../../services/apiBookings'


export function useTodayActivity(){
	const {isLoading:isStaying,data:activities={}} = useQuery({
		queryFn:getStaysTodayActivity,
		queryKey:['today-activity'],
	});
	console.log('today activities',activities)

	return {isStaying,activities};
}