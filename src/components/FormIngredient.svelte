<script>
	import { addIngredient } from '$lib/services';

	let ingr = {
		name: 'Pavadinimas',
		fat: 0,
		fatSat: 0,
		carbs: 0,
		sugar: 0,
		fiber: 0,
		protein: 0,
		salt: 0,
		calories: 0,
		joules: 0
	};

	const handleSubmit = () => addIngredient(ingr);
	const cancel = () => console.log('cancel');
</script>

<form class="" on:submit|preventDefault={handleSubmit}>
	<div class="flex flex-col justify-around items-start p-4">
		{#each Object.keys(ingr) as key}
			<label for={key}> {key}:</label>
			<input type="text" name={key} id={key} bind:value={ingr[key]} />
		{/each}
		<button type="submit" class="my-2 py-2 px-4 border">Submit</button>
		<button type="button" class="my-2 py-2 px-4 border" on:click={cancel}>Cancel</button>
	</div>
</form>

<style>
	label {
		color: dimgrey;
		font-size: 10px;
	}
	input {
		border: solid 1px dimgrey;
		padding: 4px 2px;
		color: black;
		font-size: 12px;
	}
</style>
