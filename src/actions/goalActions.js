export function insertGoals(goalsPayload) {
    return {
        type: "INSERT_GOALS",
        payload: goalsPayload
    };
}
export function updateGoal(goalPayload) {
    return {
        type: "UPDATE_GOAL",
        payload: goalPayload
    };
}
export function addGoal(goalPayload) {
    return {
        type: "ADD_GOAL",
        payload: goalPayload
    };
}