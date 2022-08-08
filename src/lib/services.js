import supabase from './supabase'
import {writable} from 'svelte/store'

// export async function createProduct({content}) {
// const {data, error} = await supabase.from('nutritionVals')
// .insert({content})
// return {data, error}
// }

//ingredient datastore
export const ingredientStore = writable([])


export async function addIngredient(content) {
    const {data, error} = await supabase.from('nutritionVals')
    .insert(content)
    console.log(content);
    if(error) return {data, error} 
    
    //rerender ingredient list
    ingredientStore.update((cur)=>[...cur, data[0]])  
}

export async function deleteIngredient(id) {
    const {error} = await supabase.from('nutritionVals').delete().match({id})
    if(error) return console.log(error);

    //rerender ingredient list
    ingredientStore.update(ingredientStore => ingredientStore.filter(ingredient => ingredient.id !== id))

}

export async function getIngredients(){
    const {data, error} = await supabase
    .from('nutritionVals') //select table
    .select('*') //get all columns

    if (error) return {error}
    return ingredientStore.set(data)
}

