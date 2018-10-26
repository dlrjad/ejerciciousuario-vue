<template>
  <section class="data" data-css>
    <table class="header">
      <tr>
        <th><h2>ID</h2></th>
        <th><h2>Rol</h2></th>
        <th><h2>Modificar</h2></th>
        <th><h2>Eliminar</h2></th>
      </tr>
    </table>
    <div v-for="(role, index) in roles" :key="index">
      <tr>
        <td><h3>{{ role.role_id }}</h3></td>
        <td><h3>{{ role.name }}</h3></td>
        <td><button type="button" class="btn btn-primary">Modificar</button></td>
        <td><button type="button" class="btn btn-danger"  @click="deleteRole(role.role_id)">Eliminar</button></td>
      </tr>
    </div>
    <button type="button" class="btn btn-success">Añadir</button>
  </section>
</template>

<script>
import axios from 'axios'

import RoleServices from '../services/RoleServices';
const restApiServices = new RoleServices();

export default {
  created() {
    restApiServices.getRoles().then(
      roles => {
        this.roles = roles
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
      roles: [],
      role: {}
    }
  },
  methods: {
    deleteRole(id) {
      console.log(id)
      restApiServices.deleteRole(id).then(res => {
        this.roles.splice(this.roles.findIndex((id)=>{id.id=res.data.id}), 1)
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