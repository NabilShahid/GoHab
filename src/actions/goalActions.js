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

export function filterGoalsByStatus(statusPayload){
    return {
        type: "FILTER_GOALS_BY_STATUS",
        payload: statusPayload
    };
}
export function updateSubItemsCount(itemsPayload){
    return {
        type: "UPDATE_SUB_ITEMS_COUNT",
        payload: itemsPayload
    };
}
