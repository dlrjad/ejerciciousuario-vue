<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <h1>{{ msg }}</h1>
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <router-link to="/users" class="nav-item nav-link" active-class="activo"><a id="nav-users-tab" data-toggle="tab" href = "#nav-roles"  role="tab" aria-controls="nav-users" aria-selected="true" @click="showComponent('users')">Usuarios</a></router-link>
        <router-link to="/roles" class="nav-item nav-link" active-class="activo"><a  id="nav-roles-tab" data-toggle="tab" href="#nav-roles" role="tab" aria-controls="nav-roles" aria-selected="false" @click="showComponent('roles')">Roles</a></router-link>
        <router-link to="/privileges" class="nav-item nav-link" active-class="activo"><a  id="nav-privileges-tab" data-toggle="tab" href="#nav-privileges" role="tab" aria-controls="nav-privileges" aria-selected="false" @click="showComponent('privileges')">Privilegios</a></router-link>
      </div>
    </nav>
    <!--<user v-show="showUser"></user>
    <role v-show="showRole"></role>
    <privilege v-show="showPrivilege"></privilege>-->
    <router-view></router-view>
  </div>
</template>

<script>
import User from './components/User.vue'
import Role from './components/Role.vue'
import Privilege from './components/Privilege.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'App ejerciciousuarios',
      showUser: true,
      showRole: false,
      showPrivilege: false
    }
  },
  components: {
    User,
    Role,
    Privilege
  },
  methods: {
    showComponent(nameComponent) {
      this.showUser = false;
      this.showRole = false;
      this.showPrivilege = false;
      if(nameComponent=="users") {
        this.showUser = true;
      }else if(nameComponent=="roles") {
        this.showRole = true;
      }else {
        this.showPrivilege = true;
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.activo a {
  color: blue;
  font-weight: bold
}
</style>
