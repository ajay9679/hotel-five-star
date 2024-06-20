import supabase,{supabaseUrl} from "./supabase";
import { v4 as uuidv4 } from 'uuid';


export async function getCabins(){
	const { data, error } = await supabase.from("cabins").select("*");
	if (error){
    	console.error(error);
    	throw new Error("Cabins could not be loaded");
  	}
  	// console.log(data)
	return data;
}

export async function createEditCabin(newCabin,id){
	const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);
	const imageName = `${uuidv4()}-${newCabin.image.name}`.replaceAll('/','');
	const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
	
	let query = supabase.from('cabins');
	
	//CREATE
	if(!id)
		query = query.insert([{...newCabin,image:imagePath}]);

	//EDIT
	if(id)
		query = query.update({...newCabin,image:imagePath}).eq('id',id);

	const { data, error } = await query.select().single();

	if(error)
    	throw new Error("Cabins could not be loaded");

	const {error:storageError} = await supabase.storage.from('cabin-images').upload(imageName,newCabin.image);
	if(storageError) {
		await supabase.from('cabins').delete().eq('id',data.id);
		throw new Error("Image could not be uploaded");
	}

	return data;
}

export async function deleteCabins(id){
	const {error,data} = await supabase.from('cabins').delete().eq('id',id);
	if (error)
    	throw new Error("Cabins could not be loaded");
	return data;
}
