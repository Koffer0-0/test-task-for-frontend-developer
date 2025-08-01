<template>
	<v-app-bar class="px-3">
		<v-spacer />

		<v-btn
			:to="'/'"
			text="Home"
			slim
			class="ms-3"
		/>

		<v-btn
			:to="'table'"
			text="Table"
			slim
			class="ms-3"
		/>

		<v-btn
			:to="'favorites'"
			text="Favorites"
			slim
			class="ms-3"
		/>

		<v-btn
			:to="'cart'"
			text="Cart"
			slim
			class="ms-3"
		/>
	</v-app-bar>
</template>

<script setup>
//
</script>
