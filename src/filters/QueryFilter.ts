import { Filter } from "../abstract/Filter.js";

export class QueryFilter<T> extends Filter<T> {
  private selector: (item: T) => string;
  private query: string;

  constructor(selector: (item: T) => string, query = "", id = "query", order = 100) {
    super(id, order);
    this.selector = selector;
    this.query = query;
  }

  run(items: T[]): T[] {
    if (!this.query) return items;
    const q = this.query.toLowerCase();
    return items.filter(i => this.selector(i).toLowerCase().includes(q));
  }
}
