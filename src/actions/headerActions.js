export function updateHeader(headerPayload) {
    return {
        type: "UPDATE_HEADER",
        payload: headerPayload
    };
}
export function updateFilterString(filterStringPayload) {
    return {
        type: "UPDATE_FITLER_STRING",
        payload: filterStringPayload
    };
}