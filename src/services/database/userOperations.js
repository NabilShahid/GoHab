export default class UserOperations{
    fDatabase=null;
    constructor(fDb){
        this.fDatabase=fDb;
    }
    addUserInfo(){
        this.fDatabase.collection("UsersInfo/LA/MAMA").doc("M2").set({
            ABBUGEEE:"PAPA123",
            AVC:{
                a:1,b:2
            },
            DDD:[1,2,3]
        },{merge:true})
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    updateUserInfo(){
        this.fDatabase.collection("UsersInfo").doc("LA").update({
            ABBUGEEE:"PAPA12334",
            "AVC.b":"xxx"
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
}