<script>
	import { values } from '../lib/nutritionalValueDatabase';

	$: selectedIngredients = [];
	$: editIngr = [...selectedIngredients];

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
	const labelStyleTrue = 'flex flex-col border border-red-500 p-6 rounded-md ';

	$: formProps = [];
	const datetime = new Date().toLocaleString('lt-LT');

	$: recipeName = 'sokoladas';

	function handleChange() {
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

	const handleForm = async (e) => {
		const formData = new FormData(e.target);
		formProps = Object.fromEntries(formData);
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

		console.log(
			'props: ',
			formProps,
			totalWeight,
			ingredientFractionArray,
			Object.entries(formProps)
		);

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

		const test = 'testas';
		const test2 = 'testas2';

		//Send data endpoint
		const submit = await fetch('/write', {
			method: 'POST',
			body: JSON.stringify({
				recipeName,
				formProps,
				nutritionalValueList,
				totalWeight,
				totalCacao
			}),
			headers: { 'content-type': 'application/json', accept: 'application/json' }
		});
		const data = await submit.json();
		if (data) {
			console.log('success-', data.message);
		} else {
			console.log('error');
		}

		setTimeout(() => {
			window.print();
		}, 100);
	};
</script>

<div class="flex flex-row gap-3 no-print">
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
<div class="print">
	<section>
		{#if selectedIngredients.length}
			<article class="no-print">
				<form on:submit|preventDefault={handleForm}>
					<h1 class="pt-4">Įveskite produktų kiekis gramais:</h1>
					{#each editIngr as ele}
						<div class="flex flex-row min-w-fit items-center justify-center">
							<label for={ele.id} class="input-group my-2">
								<span class="w-40">{ele.name}: </span>
								<input
									id={ele.name}
									name={ele.name}
									bind:value={ele.weight}
									on:change={handleChange}
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
					<button
						class="border border-amber-800 rounded-lg py-2 px-4 hover:bg-amber-100 text-amber-800 "
						>Skaičiuoti</button
					>
				</form>
			</article>

			<article class="my-6 text-sm flex flex-row justify-between items-start gap-5">
				<div class="flex-col flex justify-start">
					<p class="flex flex-col"><small>Partijos numeris:</small> <span>{datetime}</span></p>
					<p class="flex flex-col">
						<small>Pavadinimas:</small>
						<span
							contenteditable="true"
							bind:innerHTML={recipeName}
							class="font-bold tracking-widest uppercase">sokoladas</span
						>
					</p>
				</div>
				<p class="flex flex-col items-start ">
					<small>Bendras svoris: </small>
					<span class="font-bold text-lg py-6 px-6 border rounded-lg border-gray-500"
						>{totalWeight}g</span
					>
				</p>
				<p class="flex flex-col items-start ">
					<small>Kakavos kiekis: </small>
					<span class="font-bold text-lg"
						><div class="radial-progress" style="--value:{totalCacao};">{totalCacao}%</div>
					</span>
				</p>
			</article>
		{/if}

		{#if nutritionalValueList.frfat}
			<div class={isChanged ? labelStyleTrue : labelStyleFalse}>
				<div class="flex flex-row justify-start items-center">
					<ul class="w-44 p-2">
						<li>100g energetine verte:</li>
						<li>Riebalai:</li>
						<li>Iš jų sočiųjų riebalų:</li>
						<li>Angliavandeniai:</li>
						<li>Iš jų cukrų:</li>
						<li>Skaidulos:</li>
						<li>Baltymai:</li>
						<li>Druska:</li>
					</ul>
					<ul class="w-30 p-2">
						<li>{nutritionalValueList.frcalories} kCal/ {nutritionalValueList.frjoules} kJ</li>
						<li>{nutritionalValueList.frfat} g</li>
						<li>{nutritionalValueList.frfatSat} g</li>
						<li>{nutritionalValueList.frcarbs} g</li>
						<li>{nutritionalValueList.frsugar} g</li>
						<li>{nutritionalValueList.frfiber} g</li>
						<li>{nutritionalValueList.frprotein} g</li>
						<li>{nutritionalValueList.frsalt} g</li>
					</ul>
				</div>
				<div>
					<h6 class="px-2 pt-2 text-xs">Sunaudoti produktai:</h6>
					<ul class=" px-2">
						{#each Object.entries(formProps) as [ingredient, quantity]}
							<li class="flex flex-row justify-start">
								<span class="w-44">
									{ingredient}:
								</span>
								<span class="font-bold "> {quantity} g </span>
								<span class="pl-2">| {Math.round((quantity / totalWeight) * 1000) / 10} %</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/if}
	</section>
</div>

<style>
	.w-30 > li {
		font-weight: bold;
	}
</style>
