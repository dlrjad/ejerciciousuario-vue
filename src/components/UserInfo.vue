<template>
  <section>
    <h2>Datos del usuario {{this.user.user_id}}</h2>
    <ul>
      <li>Nombre: {{ this.user.name }}</li>
      <li>Email: {{ this.user.mail }}</li>
      <p>Roles:</p>
      <ul v-for="(role, index) in this.user.roles" :key="index">
        <li>
          {{ role.name }}
        </li>
      </ul>
    </ul>

    <h2>Roles a asignar:</h2>

    <div v-for="(role, index) in roles" :key="index">
        <input type="checkbox" :id="role.role_id" :value="role.role_id" v-model="checkedNames">
        <label :for="role.name">{{role.role_id}} {{role.name}}</label>
    </div>

    <button type="button" class="btn btn-primary" @click="assignRole(user.user_id, user.name, user.mail)">Asignar</button>

    <pre>{{ $data }}</pre>
  </section>
</template>

<script>
import axios from 'axios'

import UserServices from '../services/UserServices';
const restApiServices = new UserServices();

import RoleServices from '../services/RoleServices';
const restApiServices_ = new RoleServices();

export default {
  created() {
    console.log(this.id)
    /*restApiServices.getUser(this.id).then(
      users => {
        this.users = users
      }
    ).catch(
      error => {
        console.log(error),
        alert(error)
      }
    )*/
    restApiServices.getUser(this.id).then(res => {
      console.log(res.data)
      this.user = res.data
    })

    restApiServices_.getRoles().then(
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
      id: this.$route.params.id,
      user: [],
      roles: [],
      role: {},
      assignRoles: [],
      checkedNames: [],
    }
  },
  methods: {
    assignRole(id, name, mail) {
      for(let i=0; i<this.checkedNames.length; i++) {
        //console.log(this.checkedNames[i])
        restApiServices_.getRole(this.checkedNames[i]).then(res => {
          //console.log(res.data)
          this.assignRoles.push(res.data)
        }).catch(
          error => {
            console.log(error),
            alert(error)
          }
        ).then(res => {
          console.log(this.assignRoles)
          //console.log(id, name, mail)
          restApiServices.updateUser(id, name, mail, this.assignRoles).then(res => {
            //console.log("update: " + res.data)
            this.user=res.data
          })
        })
      }
    }
  }
}
</script>

<style>

</style>
