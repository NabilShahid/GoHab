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
    updateHabit(useremail,habitObj,habitId){
      return this.fDatabase
      .collection(`UsersInfo/${useremail}/Habits`)
      .doc(habitId)
      .set(habitObj);
    }
    retrieveAllHabits(useremail) {
      return this.fDatabase.collection(`UsersInfo/${useremail}/Habits`).get();
    }
  }
  