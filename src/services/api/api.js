// import {apiUrl} from "../../envdev";
import {apiUrl, appUrl} from "../../envprod";
class Api {
  getNotifications(userEmail, items) {
    return new Promise((resolve, reject) => {
      fetch(
        `${appUrl}/${userEmail}/${items}`
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
