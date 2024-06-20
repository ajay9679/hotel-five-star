import supabase,{supabaseUrl} from "./supabase";
import { v4 as uuidv4 } from 'uuid';
import {PAGE_SIZE} from './../utils/constants'


export async function getGuests(filter,sortBy,page){
	// console.log(sortBy)
	// console.log(page)
	let query = supabase.from("guests");
	if(filter){
		if(filter.value === 'no-bookings')
			query = query.select('*,bookings(status)',{count:'exact'}).filter('bookings','is',null);
		else
			query = query.select('*,bookings!inner(status)',{count:'exact'})[filter.method || 'eq'](filter.field,filter.value);
	}else
		query = query.select('*',{count:'exact'});
	if(sortBy)
		query = query.order(sortBy.field,{ascending:sortBy.direction === 'asc'});
	if(page){
		const from = (page-1)*PAGE_SIZE;
		const to = from + PAGE_SIZE - 1;
		query = query.range(from,to);
	}
	const { data, error,count } = await query;
	if(error){
    	console.error(error);
    	throw new Error("Guests could not be loaded");
  	}
  	console.log({data,count})
	return {data,count};
}

export async function getGuest(guestid){
	const {data,error } = await supabase.from('guests').select('*,bookings(*,cabins(name),guests(*))').eq('id',guestid).single();
	if(error){
    	console.error(error);
    	throw new Error("Guests not found");
  	}
  	// console.log(data)
	return data;
}

export async function createGuest(guest){
	console.log('guestApi',guest)
	const {data,error} = await supabase.from('guests').insert([guest]).select().single();
	if(error){
    	console.error(error);
    	throw new Error("Guest could not be created.");
  	}
  	// console.log(data)
	return data;
}

export async function updateGuest(obj){
	// console.log(id,obj)
	const {data,error} = await supabase.from('guests').update(obj).eq('id',obj.id).select();
	if(error){
    	console.error(error);
    	throw new Error("Guest could not be edited.");
  	}
  	// console.log(data)
	return data;
}

export async function deleteGuest(id){
	const { error } = await supabase.from('guests').delete().eq('id',id);
	if(error){
    	console.error(error);
    	throw new Error("Guest could not be deleted.");
  	}
}


