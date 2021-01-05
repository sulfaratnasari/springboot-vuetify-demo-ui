<template>
	<v-container fluid>
		<v-card>
			<v-simple-table dark>
				<template v-slot:top>
					<v-toolbar flat color="white">
						<v-toolbar-title style="color:black">User List</v-toolbar-title>
						<v-divider class="mx-4" inset vertical></v-divider>
						<v-spacer></v-spacer>
						<v-btn color="primary" dark class="mb-2" @click="addUser()">Add User</v-btn>
					</v-toolbar>
				</template>
				<template v-slot:default>
					<thead>
						<tr>
							<th class="text-left">Id</th>
							<th class="text-left">Username</th>
							<th class="text-left">Email</th>
							<th class="text-left">Role</th>
							<th class="text-left">Action</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in userList" :key="item.id">
							<td class="text-left">{{ item.id }}</td>
							<td class="text-left">{{ item.username }}</td>
							<td class="text-left">{{ item.email }}</td>
							<td class="text-left">{{ item.role }}</td>
							<td class="text-left"><v-icon @click= deleteUser(item.id)>mdi-delete</v-icon></td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
		</v-card>

		<v-dialog v-model="add" width="500">
			<v-card>
			<v-col cols="12">
			<v-text-field label="Username" type="text" v-model="user.username"></v-text-field>
			</v-col>
			<v-col cols="12">
				<v-tooltip top :open-on-hover="false" color="white">
					<template v-slot:activator="{ on }">
						<v-text-field @blur="on.blur" @click="on.click" type="password" v-model="user.password">
							<template v-slot:label>
								<div v-html="passwordlabel">
								</div>
								</template>
						</v-text-field>
					</template>
					<span>Enter a strong password. It must be at least 8 characters, and contain at least one number and  one special character (e.g. , . _ & ? etc.)</span>
				</v-tooltip>
			</v-col>
			<v-col cols="12">
			<v-text-field label="Email" type="text" v-model="user.email"></v-text-field>
			</v-col>
			<v-col cols="12">
			<v-select :items="roles" label="Role" v-model="user.role"></v-select>
			</v-col>
			<v-col cols="2">
			<v-btn @click="saveUser()" color="primary">Save and Close</v-btn>
			</v-col>
			</v-card>
		</v-dialog>

		<v-snackbar v-model="snackbar">
			{{ snackbarContent }}
			<template v-slot:action="{ attrs }">
				<v-btn color="red" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
			</template>
		</v-snackbar>
	</v-container>
</template>

<style scoped>
.v-tooltip__content {
  color: red;
  display: block !important;
  width: 300px;
  margin-right: 0;
}
</style>

<script>
import axios from "axios";
export default {
	/* eslint-disable no-mixed-spaces-and-tabs */
	data() {
		return {
			userList: [],
			user : {},
			add : false,
			roles : ['Admin', 'User'],
			passwordlabel: '<p>Password<span style="color:red">*</span></p>',
			snackbar: false,
			snackbarContent: null,
		};
	},
	mounted() {
		this.getUserList();
	},
	methods: {
		getUserList() {
			axios.post("http://localhost:8082/demo/user/list", {}).then((response) => {
				this.userList = response.data;
			});
		},
		addUser(){
			this.add = true;
			this.user = {
				username : null,
				email : null,
				password : null,
				role : null
			}
		},
		saveUser(){
			axios.post("http://localhost:8082/demo/add/user", {
				username : this.user.username,
				email : this.user.email,
				password : this.user.password,
				role : this.user.role
			}).then(() => {
				this.getUserList();
				this.user = {};
				this.add = false;
			}).catch((error) =>{
				this.snackbar = true;
				this.snackbarContent = error + ", You don't have any permission to add user";
				
			});
		},
		deleteUser(userId){
			axios.post("http://localhost:8082/demo/delete/user", {
				id: userId
			}).then(() => {
				this.getUserList();
			}).catch((error) =>{
				this.snackbar = true;
				this.snackbarContent = error + ", You don't have any permission to delete user";
				
			});
		}
	}
};
</script>