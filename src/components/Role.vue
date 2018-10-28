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
      <table>
        <tr>
          <!--td><h3>{{ role.role_id }}</h3></td>
          <td><h3>{{ role.name }}</h3></td>-->
          <td colspan="2"><a href="#">{{ role.role_id }} {{ role.name }} </a></td>
          <td><button type="button" class="btn btn-primary" @click="showUpdateForm(role.role_id)">Modificar</button></td>
          <td><button type="button" class="btn btn-danger"  @click="deleteRole(role.role_id)">Eliminar</button></td>
        </tr>
      </table>
    </div>

    <div class="clear"></div>

    <button class="btn btn-info btn-sm" @click="prevPage">
      &lt;
    </button>
    <button class="btn btn-info btn-sm" @click="nextPage">
      &gt;
    </button>
    
    <div class="clear"></div>

    <button type="button" class="btn btn-success" @click="showRegisterForm()">Añadir</button>

    <form action="" v-show="showForm">
      <h4 v-show="showAdd">Registrar</h4>
      <h4 v-show="showUpdate">Actualizar</h4>
      <input v-model="roleName" placeholder="nombre">
      <input type="hidden" v-model="roleId">
      
      <button type="button" class="btn btn-success" @click="addRole(roleName)" v-show="showAdd">Aceptar</button>
      <button type="button" class="btn btn-success" @click="updateRole(roleId, roleName)" v-show="showUpdate">Aceptar</button>
    </form>

    <pre>{{ $data }}</pre>

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
      role: {},
      roleId: null,
      roleName: null,
      showForm: false,
      showAdd: false,
      showUpdate: false,
      pageNumber: 0
    }
  },
  props: {
    size:{
      type:Number,
      required:false,
      default: 5
    }
  },
  methods: {
    deleteRole(id) {
      if(confirm("¿Desea eliminar el role con id: "+ id + "?")){
        console.log(id)
        restApiServices.deleteRole(id).then(res => {
          console.log(res.data)
          this.roles.splice(this.roles.findIndex((id)=>{id.id=res.data.id}), 1)
        })
      }
    },
    addRole(name) {
      restApiServices.addRole(name).then(res => {
        this.roles.push(res.data);
        this.showForm = false
        this.showAdd = false
      })
    },
    showRegisterForm() {
      this.showForm = true
      this.showAdd = true
      this.showUpdate = false
    },
    showUpdateForm(id) {
      this.roleId = id
      this.showForm = true
      this.showUpdate = true
      this.showAdd = false
    },
    updateRole(id, name) {
      console.log(id, name)
      restApiServices.updateRole(id, name).then(response => {
        console.log(response)
        this.$set(this.roles, id-1, response.data)
        this.showForm = false
        this.showUpdate = false
      })
    },
    nextPage(){
      if(this.pageNumber < this.pageCount)
        this.pageNumber++;
    },
    prevPage(){
      if(this.pageNumber > 0)
        this.pageNumber--;
    }
  },
  computed: {
    pageCount(){
      let l = this.roles.length,
      s = this.size;
      return Math.floor(l/s);
    },
    paginatedData(){
      const start = this.pageNumber * this.size,
      end = start + this.size;
      return this.roles.slice(start, end);
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

.clear {
  clear: both;
  margin-top: 20px;
}
</style>