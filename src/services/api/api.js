class Api {
  getNotifications(userEmail) {
    return new Promise((resolve, reject) => {
      fetch(
        "https://us-central1-test-project-1-ba9d5.cloudfunctions.net/api/notifications"
      ).then(function(response) {
        response.json().then(res => resolve(res));
      }).catch((ex)=>{
          reject(ex);
      });
    });
  }
}
export default Api;