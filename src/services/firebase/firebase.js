import app from "firebase/app";
import prodConfig from "../../envprod";
import devConfig from "../../envdev";
import AuthOperations from "../database/authOperations";
import UserOperations from "../database/userOperations";
import "firebase/auth";
import "firebase/firestore";

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.authOps=new AuthOperations(app.auth());
    this.userOps=new UserOperations(app.firestore());
  }
   authOps;
   userOps;

 
}

export default Firebase;
