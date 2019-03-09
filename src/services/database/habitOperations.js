export default class HabitOperations {
    fDatabase = null;
    constructor(fDb) {
      this.fDatabase = fDb;
    }
    addNewHabit(useremail, habitObj) {
      return this.fDatabase
        .collection(`UsersInfo/${useremail}/Habits`)
        .add(habitObj);
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
  