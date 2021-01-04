<template>
<v-container fluid>
	<v-card class="mx-auto" max-width="100%">
		<v-card-title style="font-size:24px"><b>Cat Store</b></v-card-title>
		<v-img src="https://www.chewy.com/assets/img/pet-shop/banner-cat-shop-1250px.20191017.jpg"></v-img>
		<v-card-text class="text--primary">
			<div style="font-size:24px">Hi, cat slave!! welcome to Cat Store.</div>
		</v-card-text>
	</v-card>
</v-container>
</template>

<script>
export default {
	components: {},
	data() {
		return {};
	},
	mounted() {
		this.test();
	},
	methods: {
		test() {
			console.log("dashhh");
		},
	},
};
</script>
