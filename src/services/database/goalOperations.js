export default class GoalOperations{
    fDatabase=null;
    constructor(fDb){
        this.fDatabase=fDb;
    }
    addNewGoal(useremail,goalObj){      
        return this.fDatabase.collection(`UsersInfo/${useremail}/Goals`).doc().set(
            goalObj
        );
        
    }
    retrieveAllGoals(useremail){
        return this.fDatabase.collection(`UsersInfo/${useremail}/Goals`).get();
        this.fDatabase.collection(`UsersInfo/${useremail}/Goals`).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        });

       
    }
 
}