// Utilities
import {defineStore} from 'pinia'

export const useAppStore = defineStore('app', {
	state: () => ({
		rawItems: [],
	}),
	getters: {
		items: (state) =>
			state.rawItems.reduce((items, item) => {
				const existingItem = items.find((it) => it.name === item)

				if (!existingItem) {
					items.push({name: item, amount: 1})
				} else {
					existingItem.amount++
				}

				return items
			}, []),
	},
	actions: {
		addItem(item) {
			this.rawItems.push(item)
		},

		removeItem(item) {
			const i = this.rawItems.lastIndexOf(item)
			if (i > -1) this.rawItems.splice(i, 1)
		},
	},
})
