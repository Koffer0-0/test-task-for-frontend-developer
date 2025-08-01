<template>
	<v-container class="h-100">
		<div class="text-h3">
			<ag-grid-vue
				:rowData="rowData"
				:columnDefs="colDefs"
				style="height: 500px"
				:pagination="true"
				:pinnedBottomRowData="pinnedBottomRowData"
			>
			</ag-grid-vue>
		</div>
	</v-container>
</template>

<script setup lang="ts">
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridVue } from "ag-grid-vue3"; // Vue Data Grid Component
import { ref, onMounted, computed } from 'vue'
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

interface IRow {
	val1: string;
	val2: number;
	val3: number;
	val4: number;
	val5: number;
	val6: string;
	val7: string;
	val8: boolean;
}

// const rowData = ref<IRow[]>([]);

const rowData = ref([
	{ make: "Tesla", model: "Model Y", price: 64950, electric: true },
	{ make: "Ford", model: "F-Series", price: 33850, electric: false },
	{ make: "Toyota", model: "Corolla", price: 29600, electric: false },
]);

onMounted(async () => {
	rowData.value = generateRandomData()
});

const generateRandomData = (count = 100) => {
	const data = [];
	const stringOptions = ['str1', 'str2', 'str3', 'str4', 'str5'];

	for (let i = 0; i < count; i++) {
		data.push({
			val1: Math.random().toString(36).substring(2, 12),
			val2: parseFloat((Math.random() * 1000).toFixed(2)),
			val3: parseFloat((Math.random() * 1000).toFixed(4)),
			val4: Math.floor(Math.random() * 1000),
			val5: Math.floor(Math.random() * 1000),
			val6: `/images/img${Math.floor(Math.random() * 10) + 1}.jpg`,
			val7: Math.random().toString(36).substring(2, 12),
			val8: stringOptions[Math.floor(Math.random() * stringOptions.length)]
		});
	}

	return data;
};

const pinnedBottomRowData = computed(() => {
	if (rowData.value.length === 0) return [];

	const sumVal3 = rowData.value.reduce((sum, row) => sum + row.val3, 0);

	const avgVal4 = rowData.value.reduce((sum, row) => sum + row.val4, 0) / rowData.value.length;

	return [{
		val1: 'ИТОГО',
		val2: '',
		val3: parseFloat(sumVal3.toFixed(4)),
		val4: parseFloat(avgVal4.toFixed(2)),
		val5: '',
		val6: '',
		val7: '',
		val8: ''
	}];
})

const colDefs = ref([
	{ field: "val1" },
	{ field: "val2" },
	{
		field: "val3",
		aggFunc: 'sum',
	},
	{
		field: "val4",
		aggFunc: 'avg'
	},
	{ field: "val5" },
	{ field: "val6", filter: 'agTextColumnFilter' },
	{ field: "val7" },
	{ field: "val8" }
]);

</script>
