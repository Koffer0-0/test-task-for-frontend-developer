<template>
	<v-container class="h-100">
		<v-row>
			<v-col
				md="3"
			>
				<v-card>
					<v-card-title>
						Фильтры
					</v-card-title>
					<v-card-text>
						<v-checkbox
							v-for="category in categoryFilter"
							:key="category"
							v-model="selectedCategories"
							:label="category"
							:value="category"
							color="primary"
							hide-details
							class="mb-2"
						/>
						<v-btn
							variant="outlined"
							size="small"
							class="mb-4"
							@click="clearFilters"
						>
							Очистить фильтры
						</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col
				md="9"
			>
				<div v-if="flags.isLoading">
					<v-row
						align="center"
						style="height: 150px;"
						no-gutters
					>
						<v-progress-circular
							color="primary"
							indeterminate></v-progress-circular>
					</v-row>
				</div>

				<div v-else>
					<v-row>
						<v-col
							md="3"
							v-for="product in filteredProducts" :key="product.id"
						>
							<div class="mb-4 text-h3">
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
											icon="mdi-heart"
											size="small"
											@click="addItemToFavorites(product)"
										></v-btn>

										<v-btn
											color="medium-emphasis"
											icon="mdi-cart"
											size="small"
											@click="addItemToCart(product)"
										></v-btn>
									</v-card-actions>
								</v-card>
							</div>
						</v-col>
					</v-row>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import useProducts from '@/composables/useProducts'
import {useAppStore} from "@/stores/app.js";

const {
	flags,
	products,
	getAllProducts,
} = useProducts()

onMounted(() => {
	getAllProducts()
})

const categoryFilter = [
	"Обувь",
	"Одежда",
	"Гаджеты",
	"Аксессуары",
	"Мебель",
]

const selectedCategories = ref([])

const filteredProducts = computed(() => {
	if (selectedCategories.value.length === 0) {
		return products.value
	}

	return products.value.filter(product =>
		selectedCategories.value.includes(product.category)
	)
})

const clearFilters = () => {
	selectedCategories.value = []
}

const cart = useAppStore()

function addItemToCart(item) {
	if (!item) return
	cart.addItem(item)
}

</script>
