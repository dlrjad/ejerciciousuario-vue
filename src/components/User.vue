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
    <div v-for="(user, index) in paginatedData" :key="index">
      <table>
        <tr>
          <router-link :to="`/user/${user.user_id}`">
          <td><h3>{{ user.user_id }}</h3></td>
          <td style="padding-left: 200px"><h3>{{ user.name }}</h3></td>
          <td style="padding-left: 100px"><h3>{{ user.mail }}</h3></td></router-link>
          <!--<td colspan="3"><router-link :to="`/user/${user.user_id}`"><a>{{ user.user_id }} {{ user.name }} {{ user.mail }}</a></router-link></td>-->
          <td style="padding-left: 0px"><button type="button" class="btn btn-primary" @click="showUpdateForm(user.user_id, user.roles)">Modificar</button></td>
          <td style="padding-left: 100px"><button type="button" class="btn btn-danger" @click="deleteUser(user.user_id)">Eliminar</button></td>
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
      <input v-model="userName" placeholder="nombre">
      <input type="email" v-model="userMail" placeholder="email">
      <input type="hidden" v-model="userId">
      <input type="hidden" v-model="userRoles">

      <button type="button" class="btn btn-success" @click="addUser(userName, userMail)" v-show="showAdd">Aceptar</button>
      <button type="button" class="btn btn-success" @click="updateUser(userId, userName, userMail, userRoles)" v-show="showUpdate">Aceptar</button>
    </form>
    
    <!--<pre>{{ $data }}</pre>-->
    
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
      user: {},
      userId: null,
      userName: null,
      userMail: null,
      userRoles: null,
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
    deleteUser(id) {
      if(confirm("¿Desea eliminar el usuario con id: "+ id + "?")){
        restApiServices.deleteUser(id).then(res => {
          this.users.splice(this.users.findIndex(e=>e.user_id==id), 1)
          //this.$delete(this.users, id)
          //this.users.$remove(res.data)
        })
      }
    },
    addUser(name, mail) {
      restApiServices.addUser(name, mail).then(res => {
        this.users.push(res.data);
        this.showForm = false
        this.showAdd = false
      })
    },
    showRegisterForm() {
      this.showForm = true
      this.showAdd = true
      this.showUpdate = false
    },
    showUpdateForm(id, roles) {
      this.userId = id
      this.userRoles = roles
      this.showForm = true
      this.showUpdate = true
      this.showAdd = false
    },
    updateUser(id, name, mail, roles) {
      console.log(id, name, mail, roles)
      restApiServices.updateUser(id, name, mail, roles).then(response => {
        console.log(response)
        this.$set(this.users, this.users.findIndex(e=>e.user_id==id), response.data)
        this.showForm = false
        this.showUpdate = false
        //this.users.$set(id, res.data)
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
      let l = this.users.length,
      s = this.size;
      return Math.floor(l/s);
    },
    paginatedData(){
      const start = this.pageNumber * this.size,
      end = start + this.size;
      return this.users.slice(start, end);
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
  text-align: justify
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
