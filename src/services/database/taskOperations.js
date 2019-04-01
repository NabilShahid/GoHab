export default class TaskOperations {
    fDatabase = null;
    constructor(fDb) {
      this.fDatabase = fDb;
    }
    addNewTask(useremail, taskObj) {
      return this.fDatabase
        .collection(`UsersInfo/${useremail}/Tasks`)
        .add(taskObj);
    }
    updateTask(useremail,taskObj,taskId){
      return this.fDatabase
      .collection(`UsersInfo/${useremail}/Tasks`)
      .doc(taskId)
      .set(taskObj);
    }
    retrieveAllTasks(useremail) {
      return this.fDatabase.collection(`UsersInfo/${useremail}/Tasks`).get();
    }
  }
  