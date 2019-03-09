export function updateHeader(headerPayload) {
    return {
        type: "UPDATE_HEADER",
        payload: headerPayload
    };
}