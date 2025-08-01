<template>
	<v-container class="h-100">
		<v-row>
			<v-col
				md="5"
			>
				<div v-if="cart.rawItems.length > 0">
					<div
						v-for="product in cart.rawItems"
						:key="product.id"
						class="mb-1 text-h3"
					>
						<v-row>
							<v-col>
								<v-card>
									<v-img
										color="surface-variant"
										height="70"
										:src="product.image"
										cover
									/>
								</v-card>
							</v-col>
							<v-col>
								<v-card-title>
									{{ product.name }}
								</v-card-title>
								<v-card-subtitle>
									{{ product.category }}
								</v-card-subtitle>
							</v-col>
							<v-col>
								<v-card-text
									align="center"
									class="text-center"
								>
									{{ product.price }} KZT
								</v-card-text>
								<v-number-input control-variant="split" />
							</v-col>
							<v-col>
								<v-card-actions>
									<v-btn
										color="medium-emphasis"
										:icon="isFavorite ? 'mdi-cards-heart-outline' : 'mdi-cards-heart-outline'"
										size="small"
									/>
									<v-btn
										color="medium-emphasis"
										icon="mdi-trash-can"
										size="small"
										@click="cart.removeItem(product)"
									/>
								</v-card-actions>
							</v-col>
						</v-row>
					</div>
					<v-btn
						variant="outlined"
						class="mt-2"
						@click="clearCart"
					>
						Clear Cart
					</v-btn>
				</div>

				<div v-else>
					<h2 class="font-weight-bold">
						Cart is Empty.
					</h2>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>

import {useAppStore} from "@/stores/app.js";

const cart = useAppStore()

function clearCart() {
	if (window.confirm('Are you sure you want to clear the cart?')) {
		cart.rawItems = []
	}
}
</script>

<style scoped>

</style>
