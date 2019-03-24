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
    updateTask(useremail,goalObj,goalId){
      return this.fDatabase
      .collection(`UsersInfo/${useremail}/Tasks`)
      .doc(goalId)
      .set(goalObj);
    }
    retrieveAllTasks(useremail) {
      return this.fDatabase.collection(`UsersInfo/${useremail}/Tasks`).get();
    }
  }
  