<script>
	export let error;
</script>

{#if error}
	<strong>{error.message}</strong>
{/if}
