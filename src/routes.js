import Users from './components/User.vue'
import User from './components/UserInfo.vue'
import Roles from './components/Role.vue'
import Role from './components/RoleInfo.vue'
import Privileges from './components/Privilege.vue'
import Privilege from './components/PrivilegeInfo.vue'

export const routes = [
  {path: '/users', component: Users},
  {path: '/user/:id', component: User},
  {path: '/roles', component: Roles},
  {path: '/role/:id', component: Role},
  {path: '/privileges', component: Privileges},
  {path: '/privilege/:id', component: Privilege},
];