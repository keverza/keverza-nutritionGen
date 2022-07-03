<script>
	import { values } from '../lib/nutritionalValueDatabase';

	$: selectedIngredients = [];
	$: editIngr = [...selectedIngredients];
	console.log(editIngr);

	$: ingredientWeight = editIngr.map((element, index, array) => {
		if (element.weight) {
			return element.weight;
		}
	});
	$: console.log(ingredientWeight, totalWeight);
	$: totalWeight = ingredientWeight.reduce((prev, cur) => prev + cur, 0);
	// let curIngr;
	// let test;
	// let notcur = editIngr;
	function handleChange(ingredient) {
		// 	curIngr = editIngr.filter((el) => el.id === ingredient.id);
		// 	notcur = editIngr.filter((el) => el.id !== ingredient.id);
		// 	test = curIngr.map((key) => {
		// 		return {
		// 			coef: Math.round((ingredient.weight / totalWeight) * 1000) / 1000,
		// 			weight: ingredient.weight,
		// 			name: ingredient.name,
		// 			id: ingredient.id,
		// 			fat: ingredient.fat,
		// 			fatSat: ingredient.fatSat,
		// 			carbs: ingredient.carbs,
		// 			sugar: ingredient.sugar,
		// 			fiber: ingredient.fiber,
		// 			protein: ingredient.protein,
		// 			salt: ingredient.salt,
		// 			calories: ingredient.calories,
		// 			joules: ingredient.joules
		// 		};
		// 	});
		// 	// editIngr = [];
		// 	// editIngr = [notcur, test];
		// 	editIngr = notcur.concat(test);
		// 	console.log(test, 'not: ', notcur, editIngr);
	}

	const handleForm = (e) => {
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		const a = parseInt(formProps['Kakava']) / totalWeight;
		console.log(formProps, totalWeight, a);
	};
</script>

<div class="flex flex-row gap-3">
	{#each values as ingredient (ingredient.id)}
		<button class="form-control">
			<label class="label cursor-pointer">
				<span class="label-text">{ingredient.name}</span>
				<input
					type="checkbox"
					class="checkbox"
					bind:group={selectedIngredients}
					name="ingredients"
					value={ingredient}
				/>
			</label>
		</button>
	{/each}
</div>
<hr />
{#if selectedIngredients.length}
	<article>
		<form on:submit|preventDefault={handleForm}>
			<h1 class="pt-4">Kiekis sunaudotas:</h1>
			{#each editIngr as ele}
				<div class="flex flex-row min-w-fit items-center justify-center">
					<label for={ele.id} class="p-5">{ele.name}:</label>
					<input
						id={ele.name}
						name={ele.name}
						bind:value={ele.weight}
						on:change={() => handleChange(ele)}
						type="number"
						placeholder="Sunaudotas kiekis"
						class="input input-bordered w-full max-w-xs"
					/>
					<p>
						% dalis: <span>{Math.round((ele.weight / totalWeight) * 1000) / 1000}</span>
					</p>
				</div>
			{/each}
			<button class="border rounded-lg py-2 px-4 ">Submit</button>
		</form>
	</article>
	<hr />
	<article>
		<p>Bendras svoris: {totalWeight}</p>
		<h3>100g energetine verte:</h3>
	</article>
{/if}
