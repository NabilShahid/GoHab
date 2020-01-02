import app from "firebase/app";
// import firebaseConfig from "../../envdev";
import firebaseConfig from "../../envprod";
import AuthOperations from "../database/authOperations";
import UserOperations from "../database/userOperations";
import GoalOperations from "../database/goalOperations";
import HabitOperations from "../database/habitOperations";
import TaskOperations from "../database/taskOperations";
import "firebase/auth";
import "firebase/firestore";

 

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.authOps = new AuthOperations(
      app.auth(),
      new app.auth.GoogleAuthProvider(),
      new app.auth.FacebookAuthProvider()
    );
    let firestoreInstance = app.firestore();
    firestoreInstance.settings({ timestampsInSnapshots: true });
    this.userOps = new UserOperations(firestoreInstance);
    this.goalOps = new GoalOperations(firestoreInstance);
    this.habitOps = new HabitOperations(firestoreInstance);
    this.taskOps = new TaskOperations(firestoreInstance);
  }
}

export default Firebase;
