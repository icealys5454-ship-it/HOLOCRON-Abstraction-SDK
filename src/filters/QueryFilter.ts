import { Filter } from "../abstract/Filter.js";

export class QueryFilter<T> extends Filter<T> {
  constructor(private extractor: (item: T) => string, id = "query", order = 100) {
    super(id, order);
  }

  run(items: T[], ctx?: Record<string, unknown>) {
    const q = (ctx?.query as string | undefined) || "";
    if (!q) return items;
    const lower = q.toLowerCase();
    return items.filter((i) => this.extractor(i).toLowerCase().includes(lower));
  }
}
