export default class GoalOperations {
  fDatabase = null;
  constructor(fDb) {
    this.fDatabase = fDb;
  }
  addNewGoal(useremail, goalObj) {
    return this.fDatabase
      .collection(`UsersInfo/${useremail}/Goals`)
      .doc()
      .set(goalObj);
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
