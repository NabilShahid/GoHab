export function updateHeaderOptions(headerOptionsPayload) {
    return {
        type: "UPDATE_HEADER_OPTIONS",
        payload: headerOptionsPayload
    };
}
export function updateHeaderFilterString(filterStringPayload) {
    return {
        type: "UPDATE_HEADER_FITLER_STRING",
        payload: filterStringPayload
    };
}
