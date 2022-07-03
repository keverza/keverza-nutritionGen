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
	$: totalCacao = 0;

	$: nutritionalValueList = {};
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
		// const a = Object.keys(formProps).map((element, index, array) => {
		// 	return editIngr.map((el, ind, arr) => {
		// 		if (el.name === element) {
		// 			let setCoef = Math.round((parseInt(formProps[element]) / totalWeight) * 1000) / 1000;
		// 			let ingrCoef = {
		// 				name: el.name,
		// 				id: el.id,
		// 				frfat: el.fat * setCoef,
		// 				frfatSat: el.fatSat * setCoef,
		// 				frcarbs: el.carbs * setCoef,
		// 				frsugar: el.sugar * setCoef,
		// 				frfiber: el.fiber * setCoef,
		// 				frprotein: el.protein * setCoef,
		// 				frsalt: el.salt * setCoef,
		// 				frcalories: el.calories * setCoef,
		// 				frjoules: el.joules * setCoef,
		// 				weight: parseInt(formProps[element]),
		// 				coef: setCoef
		// 			};

		// 			return ingrCoef;
		// 		} else {
		// 			return false;
		// 		}
		// 	});
		// });

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
		<p>Kakavos kiekis: {totalCacao} %</p>
	</article>
{/if}

{#if nutritionalValueList.frfat}
	<div class="flex flex-col w-60">
		<h3>100g energetine verte:</h3>
		<p>Riebalai: <span>{nutritionalValueList.frfat}</span></p>
		<p>Iš jų sočiųjų riebalų: <span>{nutritionalValueList.frfatSat}</span></p>
		<p>Angliavandeniai: <span>{nutritionalValueList.frcarbs}</span></p>
		<p>Iš jų cukrų <span>{nutritionalValueList.frsugar}</span></p>
		<p>Skaildulos: <span>{nutritionalValueList.frfiber}</span></p>
		<p>Baltymai: <span>{nutritionalValueList.frprotein}</span></p>
		<p>Druska: <span>{nutritionalValueList.frsalt}</span></p>
		<p>Kcal: <span>{nutritionalValueList.frcalories}</span></p>
		<p>Kj: <span>{nutritionalValueList.frjoules}</span></p>
	</div>
{/if}
