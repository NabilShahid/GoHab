export function toggleItemLoading(item, loading) {
  return {
    type: "TOGGLE_ITEM_LOADING",
    payload: {
      item,
      loading
    }
  };
}
