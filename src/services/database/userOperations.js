export default class UserOperations{
    fDatabase=null;
    constructor(fDb){
        this.fDatabase=fDb;
    }
    addUserInfo(email,name, authType){
       return this.fDatabase.collection("UsersInfo").doc(email).set({
            UserName:name,
            AuthType:authType
        });
        
    }
    retrieveUserName(email){
        return this.fDatabase.collection("UsersInfo").doc(email).get();
    }

}