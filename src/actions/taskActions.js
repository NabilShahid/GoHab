export function insertTasks(tasksPayload) {
    return {
        type: "INSERT_TASKS",
        payload: tasksPayload
    };
}
export function updateTask(taskPayload) {
    return {
        type: "UPDATE_TASK",
        payload: taskPayload
    };
}
export function addTask(taskPayload) {
    return {
        type: "ADD_TASK",
        payload: taskPayload
    };
}
export function filterTasks(filterPayload) {
    return {
        type: "FILTER_TASKS",
        payload: filterPayload
    };
}
export function sortTasks(sortPayload) {
    return {
        type: "SORT_TASKS",
        payload: sortPayload
    };
}
export function removeTaskFilter() {
    return {
        type: "REMOVE_TASK_FILTER"
    };
}

export function filterTasksByStatus(statusPayload){
    return {
        type: "FILTER_TASKS_BY_STATUS",
        payload: statusPayload
    };
}