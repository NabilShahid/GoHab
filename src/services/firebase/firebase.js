import app from "firebase/app";
import prodConfig from "../../envprod";
import devConfig from "../../envdev";
import AuthOperations from "../database/authOperations";
import UserOperations from "../database/userOperations";
import GoalOperations from "../database/goalOperations";
import HabitOperations from "../database/habitOperations";
import "firebase/auth";
import "firebase/firestore";

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.authOps=new AuthOperations(app.auth());
    let firestoreInstance=app.firestore();
    firestoreInstance.settings( { timestampsInSnapshots: true });
    this.userOps=new UserOperations(firestoreInstance);
    this.goalOps=new GoalOperations(firestoreInstance);
    this.habitOps=new HabitOperations(firestoreInstance);
  }   
}

export default Firebase;
