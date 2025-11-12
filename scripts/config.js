export const DEFAULT_SEARCH_TERM = "Lovely";
export let CURRENT_PAGE = 1;
export let SEARCH_DEBOUNCE_FLAG = null;

export function resetPage() {
  CURRENT_PAGE = 1;
}

export function incrementPage() {
  CURRENT_PAGE++;
}