import { Filter } from "../abstract/Filter.js";

export class SortFilter<T> extends Filter<T> {
  constructor(private comparer: (a: T, b: T) => number, id = "sort", order = 900) {
    super(id, order);
  }

  run(items: T[]) {
    return [...items].sort(this.comparer);
  }
}
