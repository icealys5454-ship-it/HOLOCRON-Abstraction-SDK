import { Filter } from "../abstract/Filter.js";

export class SortFilter<T> extends Filter<T> {
  private selector: (item: T) => string | number;

  constructor(selector: (item: T) => string | number, id = "sort", order = 900) {
    super(id, order);
    this.selector = selector;
  }

  run(items: T[]): T[] {
    return items.slice().sort((a, b) => {
      const A = this.selector(a);
      const B = this.selector(b);
      if (A === B) return 0;
      return A > B ? 1 : -1;
    });
  }
}
