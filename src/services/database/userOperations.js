export default class UserOperations{
    fDatabase=null;
    constructor(fDb){
        this.fDatabase=fDb;
    }
    addUserInfo(email,name){
       return this.fDatabase.collection("UsersInfo").doc(email).set({
            UserName:name
        });
        
    }
    retrieveUserName(email){
        return this.fDatabase.collection("UsersInfo").doc(email).get();
    }

}