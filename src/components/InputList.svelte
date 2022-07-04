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
	$: totalCacao = cocoaContent
		? Math.round(
				(cocoaContent.reduce((acc, object) => {
					return acc + object.weight;
				}, 0) /
					totalWeight) *
					1000
		  ) / 10
		: 0;

	$: nutritionalValueList = {};

	$: cocoaContent = selectedIngredients?.filter(
		(el) => el.name === 'Kakavos sviestas' || el.name === 'Kakava'
	);

	$: isChanged = false;
	const labelStyleFalse = 'flex flex-col border border-gray-500 p-6 rounded-md ';
	const labelStyleTrue = 'flex flex-col border-1 border-red-500 p-6 rounded-md ';

	function handleChange(ingredient) {
		return (isChanged = true);
	}

	function calcIngredientFraction(el, formProps, element) {
		let setCoef = Math.round((parseInt(formProps[element]) / totalWeight) * 1000) / 1000;
		return {
			name: el.name,
			id: el.id,
			frfat: el.fat * setCoef,
			frfatSat: el.fatSat * setCoef,
			frcarbs: el.carbs * setCoef,
			frsugar: el.sugar * setCoef,
			frfiber: el.fiber * setCoef,
			frprotein: el.protein * setCoef,
			frsalt: el.salt * setCoef,
			frcalories: el.calories * setCoef,
			frjoules: el.joules * setCoef,
			weight: parseInt(formProps[element]),
			coef: setCoef
		};
	}

	function sumOfValue(previousValue, currentValue, currentIndex, array) {
		return previousValue + array.prop;
	}

	function formatWeight(weight) {
		return Math.round(weight * 100) / 100;
	}

	const handleForm = (e) => {
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		let b = totalWeight;

		const arrayOfArrays = Object.keys(formProps).map((element, index, array) => {
			return editIngr.reduce(function (arr, el) {
				if (el.name === element) {
					arr.push(calcIngredientFraction(el, formProps, element));
				}
				return arr;
			}, []);
		});

		const ingredientFractionArray = arrayOfArrays.map((el) => {
			return el[0];
		});

		console.log(formProps, totalWeight, ingredientFractionArray);

		const valKeys = Object.keys(ingredientFractionArray[0]).filter((el) => el.startsWith('fr'));

		nutritionalValueList = valKeys.reduce((result, field, index) => {
			const sum = ingredientFractionArray.reduce((acc, object) => {
				return acc + object[field];
			}, 0);
			result[valKeys[index]] = formatWeight(sum);
			return result;
		}, {});
		console.log(nutritionalValueList);

		isChanged = false;
	};
</script>

<div class="flex flex-row gap-3">
	{#each values as ingredient (ingredient.id)}
		<button class="form-control">
			<label class="label cursor-pointer relative ">
				<span class="label-text z-20 pl-2">{ingredient.name}</span>
				<input
					type="checkbox"
					class="appearance-none rounded-lg checked:bg-gray-500  absolute  w-full min-h-full z-10 "
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
			<h1 class="pt-4">Sunaudotų produktų kiekis gramais:</h1>
			{#each editIngr as ele}
				<div class="flex flex-row min-w-fit items-center justify-center">
					<label for={ele.id} class="input-group my-2">
						<span class="w-40">{ele.name}: </span>

						<input
							id={ele.name}
							name={ele.name}
							bind:value={ele.weight}
							on:change={() => handleChange(ele)}
							min="1"
							type="number"
							placeholder="Sunaudotas kiekis"
							class="input input-bordered max-w-xs"
						/>
						<span class="w-20">
							{Math.round((ele.weight / totalWeight) * 1000) / 1000} %
						</span>
					</label>
				</div>
			{/each}
			<button class="border rounded-lg py-2 px-4 ">Submit</button>
		</form>
	</article>
	<hr />
	<article class="my-6 text-sm flex flex-row justify-center items-center gap-5">
		<p class="flex flex-col items-center justify-between">
			Bendras svoris: <span class="font-bold text-lg py-6 px-6 border rounded-lg border-gray-500"
				>{totalWeight}g</span
			>
		</p>
		<p class="flex flex-col items-center justify-between">
			Kakavos kiekis: <span class="font-bold text-lg"
				><div class="radial-progress" style="--value:{totalCacao};">{totalCacao}%</div>
			</span>
		</p>
	</article>
{/if}

{#if nutritionalValueList.frfat}
	<div class={isChanged ? labelStyleTrue : labelStyleFalse}>
		<h3>
			100g energetine verte:
			<span class="font-bold min-w-fit">
				{nutritionalValueList.frcalories} kCal/ {nutritionalValueList.frjoules} kJ
			</span>
		</h3>
		<div class="flex flex-row justify-center items-center">
			<ul class="w-40">
				<li>Riebalai:</li>
				<li>Iš jų sočiųjų riebalų:</li>
				<li>Angliavandeniai:</li>
				<li>Iš jų cukrų:</li>
				<li>Skaidulos:</li>
				<li>Baltymai:</li>
				<li>Druska:</li>
			</ul>
			<ul class="w-30">
				<li>{nutritionalValueList.frfat} g</li>
				<li>{nutritionalValueList.frfatSat} g</li>
				<li>{nutritionalValueList.frcarbs} g</li>
				<li>{nutritionalValueList.frsugar} g</li>
				<li>{nutritionalValueList.frfiber} g</li>
				<li>{nutritionalValueList.frprotein} g</li>
				<li>{nutritionalValueList.frsalt} g</li>
			</ul>
		</div>
	</div>
{/if}

<style>
	.w-30 > li {
		font-weight: bold;
	}
</style>
