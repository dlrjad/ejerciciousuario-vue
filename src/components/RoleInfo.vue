<template>
  <section>
    <h2>Datos del rol {{this.role.role_id}}</h2>
    <ul>
      <li>Nombre: {{ this.role.name }}</li>
      <p>Privilegios:</p>
      <ul v-for="(privilege, index) in this.role.privileges" :key="index">
        <li>
          {{ privilege.name }}
        </li>
      </ul>
      
    </ul>

    <h2>Privilegios a asignar:</h2>

    <!--<div v-for="(privilege_, indexado) in this.role.privileges" :key="indexado">

      <div v-for="(privilege, index) in privileges" :key="index">

        {{privilege_.privilege_id}} {{privilege.privilege_id}}

        <input type="checkbox" :id="privilege.privilege_id" :value="privilege.privilege_id" v-model="checkedNames">
        <label :for="privilege.name">{{privilege.privilege_id}} {{privilege.name}}</label>
  
      </div>

    </div>-->

    <div v-for="(privilege, index) in privileges" :key="index">

        <input type="checkbox" :id="privilege.privilege_id" :value="privilege.privilege_id" v-model="checkedNames">
        <label :for="privilege.name">{{privilege.privilege_id}} {{privilege.name}}</label>
  
    </div>

    <button type="button" class="btn btn-primary" @click="assignPrivilege(role.role_id, role.name)">Asignar</button>
    
    <pre>{{ $data }}</pre>
  </section>
</template>

<script>
import axios from 'axios'

import RoleServices from '../services/RoleServices';
const restApiServices = new RoleServices();

import PrivilegeServices from '../services/PrivilegeServices';
const restApiServices_ = new PrivilegeServices();

export default {
  created() {
    console.log(this.id)
    restApiServices.getRole(this.id).then(res => {
      //console.log(res.data)
      this.role = res.data
    })

    restApiServices_.getPrivileges().then(
      privileges => {
        this.privileges = privileges
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
      role: [],
      privileges: [],
      privilege: {},
      assignPrivileges: [],
      checkedNames: [],
    }
  },
  methods: {
    assignPrivilege(id, name) {
      for(let i=0; i<this.checkedNames.length; i++) {
        //console.log(this.checkedNames[i])
        restApiServices_.getPrivilege(this.checkedNames[i]).then(res => {
          //console.log(res.data)
          this.assignPrivileges.push(res.data)
        }).catch(
          error => {
            console.log(error),
            alert(error)
          }
        ).then(res => {
          //console.log(this.assignPrivileges)
          //console.log(id, name)
          restApiServices.updateRole(id, name, this.assignPrivileges).then(res => {
            //console.log("update: " + res.data)
            this.role=res.data
          })
        })
      }
    }
  }
}
</script>

<style>

</style>