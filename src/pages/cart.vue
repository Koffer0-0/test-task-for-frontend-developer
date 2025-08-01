<template>
	<v-container class="h-100">
		<v-row>
			<v-col
				md="5"
			>
				<div v-if="appStore.cartItems.length > 0">
					<div
						v-for="product in appStore.cartItemsWithQuantity"
						:key="product.item.id"
						class="mb-1 text-h3"
					>
						<v-row>
							<v-col>
								<v-card>
									<v-img
										color="surface-variant"
										height="70"
										:src="product.item.image"
										cover
									/>
								</v-card>
							</v-col>
							<v-col>
								<v-card-title>
									{{ product.item.name }}
								</v-card-title>
								<v-card-subtitle>
									{{ product.item.category }}
								</v-card-subtitle>
							</v-col>
							<v-col>
								<v-card-text
									align="center"
									class="text-center"
								>
									{{ product.item.price }} KZT
								</v-card-text>
							</v-col>
							<v-col class="d-flex align-center justify-center mt-2">
								<v-btn
									size="x-small"
									icon
									variant="outlined"
									@click="decreaseQuantity(product.item)"
								>
									<v-icon>mdi-minus</v-icon>
								</v-btn>

								<v-text-field
									:model-value="product.quantity"
									@update:model-value="(value) => updateQuantity(product.item, value)"
									type="number"
									min="1"
									hide-details
									density="compact"
									style="width: 60px"
									class="mx-2 text-center"
								/>
								<v-btn
									size="x-small"
									icon
									variant="outlined"
									@click="increaseQuantity(product.item)"
								>
									<v-icon>mdi-plus</v-icon>
								</v-btn>
							</v-col>
							<v-col>
								<v-card-actions>
									<v-btn
										color="medium-emphasis"
										:icon="appStore.isInFavorites(product.item) ? 'mdi-cards-heart' : 'mdi-cards-heart-outline'"
										size="small"
										@click="addItemToFavorites(product.item)"
									/>
									<v-btn
										color="medium-emphasis"
										icon="mdi-trash-can"
										size="x-small"
										@click="appStore.removeItemFromCart(product.item)"
									/>
								</v-card-actions>
							</v-col>
						</v-row>
					</div>

					<v-row>
						<v-col>
							<v-btn
								variant="outlined"
								class="mt-2"
								@click="clearCart"
							>
								Clear Cart
							</v-btn>
						</v-col>
						<v-col>
							<p class="font-weight-bold">
								Total: {{ appStore.totalCartPrice }} KZT
							</p>
						</v-col>
					</v-row>
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

const appStore = useAppStore()

function clearCart() {
	if (window.confirm('Are you sure you want to clear the cart?')) {
		appStore.clearCart()
	}
}

const addItemToFavorites = (item) => {
	if (!item) return
	appStore.toggleFavorite(item)
}

const increaseQuantity = (item) => {
	appStore.addItemToCart(item)
}

const decreaseQuantity = (item) => {
	appStore.removeItemFromCart(item)
}

const updateQuantity = (item, newQuantity) => {
	const quantity = parseInt(newQuantity) || 0
	appStore.setCartItemQuantity(item, quantity)
}

</script>

<style scoped>

</style>
