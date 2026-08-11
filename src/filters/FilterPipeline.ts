import { Filter } from "../abstract/Filter.js";

export class FilterPipeline<T> {
  private filters: Filter<T>[] = [];

  use(filter: Filter<T>) {
    this.filters.push(filter);
    this.sort();
    return this;
  }

  private sort() {
    this.filters.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
  }

  run(params: { items: T[]; query?: string }) {
    let items = params.items;
    for (const f of this.filters) items = f.run(items, params as any);
    return items;
  }
}
