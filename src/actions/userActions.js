export function updateUser(userPayload) {
    return {
        type: "UPDATE_USER",
        payload: userPayload
    };
}
export function resetCounters() {
    return {
        type: "RESET_COUNTERS",
        payload: {}
    };
}