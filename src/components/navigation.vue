<template>
	<v-app>
		<v-navigation-drawer absolute color="primary"
			clipped
			height="100%" app permanent>
			<v-list nav>
				<v-list-item style="color: white !important" :to="'/dashboard'" link>
					<v-list-item-icon>
						<v-icon>mdi-view-dashboard</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>Dashboard</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item style="color: white !important" :to="'/user'" link>
					<v-list-item-icon>
						<v-icon>mdi-account</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>User List</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item style="color: white !important" @click="signoutButtonPressed()">
					<v-list-item-icon>
						<v-icon>mdi-help-box</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{$store.state.principal.username}} - Logout</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-content>
			<v-container fluid>
				<router-view></router-view>
			</v-container>
		</v-content>
	</v-app>
</template>

<style scoped>
</style>

<script>
export default {
	components: {},
	data() {
		return {
			drawer: true,
			mini: false,
			active: false
		};
	},
	mounted: function () {},
	methods: {
		signoutButtonPressed() {
			this.$store.dispatch("logout").then(() => {
				this.$router.push("/login");
			});
			//this.$router.push("/login");
		}
	},
	computed: {}
};
</script>