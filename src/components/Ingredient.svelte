<script>
	import { deleteIngredient } from '$lib/services';

	export let ingredient;
</script>

<div class="font-bold px-2 py-4 border bg-stone-400 flex flex-row gap-2">
	<h1>{ingredient.name}</h1>
	<button type="button" class="hover:text-red-800" on:click={() => deleteIngredient(ingredient.id)}
		>delete</button
	>
</div>
