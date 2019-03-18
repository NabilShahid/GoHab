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
    updateGoal(useremail,goalObj,goalId){
      return this.fDatabase
      .collection(`UsersInfo/${useremail}/Goals`)
      .doc(goalId)
      .set(goalObj);
    }
    retrieveAllGoals(useremail) {
      return this.fDatabase.collection(`UsersInfo/${useremail}/Goals`).get();
    }
  }
  