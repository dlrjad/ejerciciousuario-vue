import axios from 'axios'
export default class RestResource {
  getPrivileges() {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:8090/api/privileges').then(
        response => {
          let myData = response.data.map(e => {
            return {
              "privilege_id": e.privilege_id,
              "name": e.name
            };
          });
          resolve(myData);
        },
        error => {
          reject('No se pudieron obtener los privilegios');
        },
        () => {
          console.info("Peticion completa");
        })
    })
  }

  deletePrivilege(id) {
    return axios.delete('http://localhost:8090/api/privilege/' + id + '');
  }

  addPrivilege(name) {
    return axios.post('http://localhost:8090/api/privilege/', {
      name: name
    });
  }

  updatePrivilege(id, name) {
    return axios.put('http://localhost:8090/api/privilege/' + id + '', {
      name: name
    });
  }

}