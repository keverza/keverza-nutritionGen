<!-- <script context="module">
	import { getIngredients } from '$lib/services';

	export async function load({ url, params }) {
		const { data, error } = await getIngredients();
		return {
			props: {
				ingredients: data,
				error
			}
		};
	}
</script> -->
<script>
	import { ingredientStore, getIngredients } from '$lib/services';

	import Error from '$components/Error.svelte';
	import Ingredient from '../components/Ingredient.svelte';
	import FormIngredient from '../components/FormIngredient.svelte';

	// export let ingredients, error;

	let editState = false;
	const edit = () => {
		editState = !editState;
		console.log('edit');
	};

	getIngredients();
</script>

<!-- <Error {error} /> -->

<section class="grid grid-rows-1">
	{#each $ingredientStore as ingredient}
		<Ingredient {ingredient} />
	{:else}
		<p>No products found</p>
	{/each}

	<button type="button" class="hover:font-bold" on:click={edit}
		>{editState ? 'Close Editor' : 'Edit Ingredient'}</button
	>

	<FormIngredient />
</section>
