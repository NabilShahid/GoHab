export default class AuthOperations {
  fAuth = null;
  constructor(fAuth) {
    this.fAuth = fAuth;
  }

  doSignInWithEmailAndPassword = (email, password) =>
    this.fAuth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.fAuth.signOut();

  doPasswordReset = email => this.fAuth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.fAuth.currentUser.updatePassword(password);
}
