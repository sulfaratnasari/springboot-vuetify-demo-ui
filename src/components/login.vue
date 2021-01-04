<template>
	<v-app>
		<div
			class="d-flex flex-column justify-center align-center"
			style="
				background-size: cover;
				background-image : url(https://www.chewy.com/assets/img/pet-shop/banner-cat-shop-1250px.20191017.jpg);
				background-attachment: fixed;
				min-height: 100vh;
			"
		>
			<v-card width="350" height="350" style="margin-top:-170px">
				<v-card-title>Login to Cat Store</v-card-title>
				<v-card-text>
					<v-text-field prepend-icon="mdi-account" name="Username" v-model="username" label="Username"></v-text-field>
					<v-text-field prepend-icon="mdi-account-key" name="Password" v-model="password" label="Password" type="password"></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-btn primary large block @click="login()">Login</v-btn>
				</v-card-actions>
			</v-card>
		</div>
	</v-app>
</template>

<script>
export default {
	/* eslint-disable no-mixed-spaces-and-tabs */
	data() {
		return {
			username : null,
			password: null
		};
	},
	mounted() {
		this.username = "",
		this.password = ""
	},
	methods: {
		/* login() {
			console.log("try to login")
			ajax
				.post("http://localhost:8082/demo/public/token", {
					username: this.username,
					password: this.password,
				})
				.then((response) => {
					this.entity = response.data;
                    this.$store.state.isLogin=true;
                    this.$store.state.jwt_token=this.entity.token;
					this.$router.push('/dashboard')
					console.log(sessionStorage.getItem("token"))
				});
		}, */
		login() {
			this.$store
				.dispatch("login", {
					username: this.username,
					password: this.password,
				})
				.then(() =>{
					console.log("dassssssss")
					this.$router.push('/dashboard')
				} 
				)
				.catch(() => {});
		},
	},
};
/* eslint-enable no-mixed-spaces-and-tabs */
</script>
