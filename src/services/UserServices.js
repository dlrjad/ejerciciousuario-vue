import axios from 'axios'
export default class RestResource {
  getUsers() {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:8090/api/users').then(
        response => {
          let myData = response.data.map(e => {
            return {
              "user_id": e.user_id,
              "name": e.name,
              "mail": e.mail
            };
          });
          resolve(myData);
        },
        error => {
          reject('No se pudieron obtener los usuarios');
        },
        () => {
          console.info("Peticion completa");
        })
    })
  }

  getUser(id) {
    /*return new Promise((resolve, reject) => {
      axios.get('http://localhost:8090/api/user/' + id + '').then(
        response => {
          let myData = response.data.map(e => {
            return {
              "user_id": e.user_id,
              "name": e.name,
              "mail": e.mail
            };
          });
          resolve(myData);
        },
        error => {
          reject('No se pudo obtener el usuario con id: '+ id);
        },
        () => {
          console.info("Peticion completa");
        })
    })*/
    return axios.get('http://localhost:8090/api/user/' + id + '')
  }

  deleteUser(id) {
    return axios.delete('http://localhost:8090/api/user/' + id + '');
  }

  addUser(name, mail) {
    return axios.post('http://localhost:8090/api/user/', {
      name: name,
      mail: mail
    });
  }

  updateUser(id, name, mail) {
    return axios.put('http://localhost:8090/api/user/' + id + '', {
      name: name,
      mail: mail
    })
    /*.then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });*/
  }

  updateUser(id, name, mail, roles) {
    return axios.put('http://localhost:8090/api/user/' + id + '', {
      name: name,
      mail: mail,
      roles: roles
    })
  }

}