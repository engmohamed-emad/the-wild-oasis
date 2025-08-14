import supabase from './supabase'
import { supabaseUrl } from './supabase'
export async function getCabins() {

   const { data, error } = await supabase
      .from('cabins')
      .select('*')
   if (error) {
       console.error('Error fetching cabins:', error)
   } 
    return data || []
}

export async function createEditCabin(cabinData,id) {

const hasImagePath = cabinData.image?.startsWith?.(supabaseUrl);
// console.log(Boolean(hasImagePath));
const imgName = `${Math.random()}-${cabinData.image.name}`.replace('/', "");
const imgPath = hasImagePath? cabinData.image :`${supabaseUrl}/storage/v1/object/public/cabin-images/${imgName}`;

let query = supabase
  .from('cabins')

if (!id) {
    query=query.insert([{...cabinData, image: imgPath}]);
} else {
    query=query.update([{...cabinData, image: imgPath}]).eq('id', id);
}

const { data, error } = await query.select().single();
  if (error) {
      console.error('Error creating cabin:', error)
      throw new Error('Failed to create cabin');
  }

 // upload image to Supabase storage
if(hasImagePath) {
  return data || []
}
const { error: storageError } = await supabase
  .storage
  .from('cabin-images')
  .upload(imgName, cabinData.image);

if (storageError) {
    await supabase
        .from('cabins')
        .delete()
        .eq('id', data.id)
    console.log('Error uploading image:', storageError);
    throw new Error('Failed to upload cabin image');
}

  return data || []
}

export async function deleteCabin(cabinId) {
    const {data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', cabinId)

    if (error) {
        console.error('Error deleting cabin:');
        throw new Error (`Failed to delete cabin with id ${cabinId}`);
    }

    return data || []
}