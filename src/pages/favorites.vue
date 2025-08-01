<template>
	<v-container class="h-100">
		<v-row>
			<v-col
				v-for="product in appStore.favoriteItems"
				:key="product.id"
				md="3"
			>
				<div v-if="appStore.favorites.length > 0">
					<div

						class="mb-4 text-h3"
					>
						<v-card>
							<v-img
								color="surface-variant"
								height="200"
								:src="product.image"
								cover
							>
							</v-img>
							<v-card-title>
								{{ product.name }}
							</v-card-title>
							<v-card-subtitle>
								{{ product.category }}
							</v-card-subtitle>
							<v-card-text>
								{{ product.price }} KZT
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									color="medium-emphasis"
									icon="mdi-trash-can"
									size="small"
									@click="appStore.removeItemFromFavorites(product)"
								/>
							</v-card-actions>
						</v-card>
					</div>
				</div>

				<div v-else>
					<h2 class="font-weight-bold">
						There is no Favorites Products.
					</h2>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>

import {useAppStore} from "@/stores/app.js";

const appStore = useAppStore()

</script>

<style scoped>

</style>
