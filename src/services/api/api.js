// import {apiUrl} from "../../envdev";
import {apiUrl} from "../../envprod";
class Api {
  getNotifications(userEmail, items) {
    return new Promise((resolve, reject) => {
      fetch(
        `${apiUrl}/${userEmail}/${items}`
      )
        .then(function(response) {
          response.json().then(res => resolve(res));
        })
        .catch(ex => {
          reject(ex);
        });
    });
  }
}
export default Api;
