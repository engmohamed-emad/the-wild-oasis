import supabase from './supabase'
export async function getCabins() {

   const { data, error } = await supabase
      .from('cabins')
      .select('*')
   if (error) {
       console.error('Error fetching cabins:', error)
   } 
    return data || []

}