export function favoritesReducer(state, { type, payload }) {
  switch (type) {
    case "TOGGLE_FAVORITE":
      return state.some(({ id }) => id === payload.id)
        ? state.filter(({ id }) => id !== payload.id)
        : [...state, payload];

    default:
      return state;
  }
}
