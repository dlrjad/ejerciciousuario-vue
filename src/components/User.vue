<template>
  <section class="data" data-css>
    <table class="header">
      <tr>
        <th><h2>ID</h2></th>
        <th><h2>Usuario</h2></th>
        <th><h2>Mail</h2></th>
        <th><h2>Modificar</h2></th>
        <th><h2>Eliminar</h2></th>
      </tr>
    </table>
    <div v-for="(user, index) in users" :key="index">
      <tr>
        <td><h3>{{ user.user_id }}</h3></td>
        <td><h3>{{ user.name }}</h3></td>
        <td><h3>{{ user.mail }}</h3></td>
        <td><button type="button" class="btn btn-primary">Modificar</button></td>
        <td><button type="button" class="btn btn-danger" @click="deleteUser(user.user_id)">Eliminar</button></td>
      </tr>
    </div>
    <button type="button" class="btn btn-success">Añadir</button>
  </section>
</template>

<script>
import axios from 'axios'

import UserServices from '../services/UserServices';
const restApiServices = new UserServices();

export default {
  created() {
    restApiServices.getUsers().then(
      users => {
        this.users = users
      }
    ).catch(
      error => {
        console.log(error),
        alert(error)
      }
    )
  },
  data() {
    return {
      users: [],
      user: {}
    }
  },
  methods: {
    deleteUser(id) {
      console.log(id)
      restApiServices.deleteUser(id).then(res => {
        this.users.splice(this.users.findIndex((id)=>{id.id=res.data.id}), 1)
      })
    }
  }
}
  
</script>

<style>
.data[data-css] {
  margin: auto;
  margin-top: 50px;
  width: 50%;
  padding: 10px;
}
.header {
  background-color: grey;
  color: white;
}
 tr, td {
  margin: auto;
  width: 10%;
  padding: 10px;
}
th {
  margin: auto;
  width: 10%;
  padding: 10px;
}

.data h2 {
  color: white;
  font: bold;
  font-size: 21px;
}
.data h3 {
  font-size: 18px;
  color: blue;
}
</style>
