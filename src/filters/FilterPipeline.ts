import { Filter } from "../abstract/Filter.js";

export class FilterPipeline<T> {
  private filters: Filter<T>[] = [];

  use(filter: Filter<T>): this {
    this.filters.push(filter);
    this.filters.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
    return this;
  }

  run(options: { items: T[] }): T[] {
    return this.filters.reduce((items, f) => f.run(items), options.items.slice());
  }
}
