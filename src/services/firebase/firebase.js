import app from "firebase/app";
import prodConfig from "../../envprod";
import devConfig from "../../envdev";
import "firebase/auth";

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
