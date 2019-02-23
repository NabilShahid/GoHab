export function updateGoals(goalsPayload) {
    return {
        type: "UPDATE_GOALS",
        payload: goalsPayload
    };
}
export function updateGoal(goalPayload) {
    return {
        type: "UPDATE_GOAL",
        payload: goalPayload
    };
}
export function resetCounters() {
    return {
        type: "RESET_COUNTERS",
        payload: {}
    };
}