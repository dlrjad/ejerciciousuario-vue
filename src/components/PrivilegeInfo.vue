<template>
  <section>
    <h2>Datos del privilegio {{this.privilege.privilege_id}}</h2>
    <ul>
      <li>Nombre: {{ this.privilege.name }}</li>
    </ul>
    <pre>{{ $data }}</pre>
  </section>
</template>

<script>
import axios from 'axios'

import PrivilegeServices from '../services/PrivilegeServices';
const restApiServices = new PrivilegeServices();

export default {
  created() {
    console.log(this.id)
    restApiServices.getPrivilege(this.id).then(res => {
      console.log(res.data)
      this.privilege = res.data
    })
  },
  data() {
    return {
      id: this.$route.params.id,
      privilege: [],
    }
  }
}
</script>

<style>

</style>