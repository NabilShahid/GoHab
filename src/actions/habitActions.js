export function insertHabits(habitsPayload) {
    return {
        type: "INSERT_HABITS",
        payload: habitsPayload
    };
}
export function updateHabit(habitPayload) {
    return {
        type: "UPDATE_HABIT",
        payload: habitPayload
    };
}
export function addHabit(habitPayload) {
    return {
        type: "ADD_HABIT",
        payload: habitPayload
    };
}
export function filterHabits(filterPayload) {
    return {
        type: "FILTER_HABITS",
        payload: filterPayload
    };
}
export function sortHabits(sortPayload) {
    return {
        type: "SORT_HABITS",
        payload: sortPayload
    };
}
export function removeHabitFilter() {
    return {
        type: "REMOVE_HABIT_FILTER"
    };
}

export function filterHabitsByStatus(statusPayload){
    return {
        type: "FILTER_HABITS_BY_STATUS",
        payload: statusPayload
    };
}

export function changeHabitsViewType(){
    return {
        type: "UPDATE_HABITS_VIEW_TYPE"
    };
}