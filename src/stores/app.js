// Utilities
import {defineStore} from 'pinia'

export const useAppStore = defineStore('app', {
	state: () => ({
		cartItems: [],
		favorites: [],
	}),
	getters: {
		items: (state) =>
			state.cartItems.reduce((items, item) => {
				const existingItem = items.find((it) => it.name === item)

				if (!existingItem) {
					items.push({name: item, amount: 1})
				} else {
					existingItem.amount++
				}

				return items
			}, []),

		cartItemsWithQuantity: (state) => state.cartItems,

		totalCartPrice: (state) =>
			state.cartItems.reduce((total, cartItem) =>
				total + (cartItem.item.price * cartItem.quantity), 0),

		favoriteItems: (state) => state.favorites,

		isInFavorites: (state) => (item) =>
			state.favorites.some(fav => fav.id === item.id),

		getCartItemQuantity: (state) => (item) => {
			const cartItem = state.cartItems.find(cartItem => cartItem.item.id === item.id)
			return cartItem ? cartItem.quantity : 0
		}
	},
	actions: {
		addItemToCart(item) {
			const existingCartItem = this.cartItems.find(
				cartItem => cartItem.item.id === item.id
			)

			if (existingCartItem) {
				existingCartItem.quantity++
			} else {
				this.cartItems.push({
					item: item,
					quantity: 1
				})
			}
		},

		removeItemFromCart(item) {
			const cartItemIndex = this.cartItems.findIndex(
				cartItem => cartItem.item.id === item.id
			)

			if (cartItemIndex > -1) {
				const cartItem = this.cartItems[cartItemIndex]

				if (cartItem.quantity > 1) {
					cartItem.quantity--
				} else {
					this.cartItems.splice(cartItemIndex, 1)
				}
			}
		},

		setCartItemQuantity(item, quantity) {
			const cartItemIndex = this.cartItems.findIndex(
				cartItem => cartItem.item.id === item.id
			)

			if (quantity <= 0) {
				// Если количество 0 или меньше, удаляем товар
				if (cartItemIndex > -1) {
					this.cartItems.splice(cartItemIndex, 1)
				}
			} else {
				if (cartItemIndex > -1) {
					// Обновляем количество существующего товара
					this.cartItems[cartItemIndex].quantity = quantity
				} else {
					// Добавляем новый товар с указанным количеством
					this.cartItems.push({
						item: item,
						quantity: quantity
					})
				}
			}
		},

		clearCart() {
			this.cartItems = []
		},

		addItemToFavorites(item) {
			const existingFavorite = this.favorites.find(fav => fav.id === item.id)

			if (!existingFavorite) {
				this.favorites.push(item)
			}
		},

		removeItemFromFavorites(item) {
			const i = this.favorites.lastIndexOf(item)
			if (i > -1) this.favorites.splice(i, 1)
		},

		toggleFavorite(item) {
			if (this.isInFavorites(item)) {
				this.removeItemFromFavorites(item)
			} else {
				this.addItemToFavorites(item)
			}
		},
	},
})
