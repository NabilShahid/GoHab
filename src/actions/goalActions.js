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
export function filterGoals(filterPayload) {
    return {
        type: "FILTER_GOALS",
        payload: filterPayload
    };
}
export function sortGoals(sortPayload) {
    return {
        type: "SORT_GOALS",
        payload: sortPayload
    };
}
export function removeGoalFilter() {
    return {
        type: "REMOVE_GOAL_FILTER"
    };
}