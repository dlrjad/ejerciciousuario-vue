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
          <!--<td><h3>{{ user.user_id }}</h3></td>
          <td><h3>{{ user.name }}</h3></td>
          <td><h3>{{ user.mail }}</h3></td>-->
          <td colspan="3"><router-link :to="`/user/${user.user_id}`"><a>{{ user.user_id }} {{ user.name }} {{ user.mail }}</a></router-link></td>
          <td><button type="button" class="btn btn-primary" @click="showUpdateForm(user.user_id)">Modificar</button></td>
          <td><button type="button" class="btn btn-danger" @click="deleteUser(user.user_id)">Eliminar</button></td>
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
      <input v-model="userMail" placeholder="email">
      <input type="hidden" v-model="userId">
      
      <button type="button" class="btn btn-success" @click="addUser(userName, userMail)" v-show="showAdd">Aceptar</button>
      <button type="button" class="btn btn-success" @click="updateUser(userId, userName, userMail)" v-show="showUpdate">Aceptar</button>
    </form>

    <pre>{{ $data }}</pre>

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
        //console.log("Borrado")
        restApiServices.deleteUser(id).then(res => {
          this.users.splice(this.users.findIndex((id)=>{id.id=res.data.id}), 1)
          //this.$delete(this.users, id)
          //this.users.$remove(res.data)
        })
      } else {
        //console.log("Cancelado")
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
    showUpdateForm(id) {
      this.userId = id
      this.showForm = true
      this.showUpdate = true
      this.showAdd = false
    },
    updateUser(id, name, mail) {
      console.log(id, name, mail)
      restApiServices.updateUser(id, name, mail).then(response => {
        console.log(response)
        this.$set(this.users, id-1, response.data)
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
