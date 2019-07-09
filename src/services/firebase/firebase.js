import app from "firebase/app";
import prodConfig from "../../envprod";
import devConfig from "../../envdev";
import AuthOperations from "../database/authOperations";
import UserOperations from "../database/userOperations";
import GoalOperations from "../database/goalOperations";
import HabitOperations from "../database/habitOperations";
import TaskOperations from "../database/taskOperations";
import "firebase/auth";
import "firebase/firestore";

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);
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
