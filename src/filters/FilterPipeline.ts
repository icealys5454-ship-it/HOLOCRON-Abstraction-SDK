import { Filter } from '../abstract/Filter.js';

/**
 * A pipeline for chaining multiple filters together.
 * Processes input sequentially through each filter.
 */
export class FilterPipeline {
  private filters: Filter[] = [];

  /**
   * Add a filter to the pipeline.
   */
  addFilter(filter: Filter): this {
    this.filters.push(filter);
    return this;
  }

  /**
   * Remove a filter from the pipeline by index.
   */
  removeFilter(index: number): this {
    this.filters.splice(index, 1);
    return this;
  }

  /**
   * Get all filters in the pipeline.
   */
  getFilters(): Filter[] {
    return [...this.filters];
  }

  /**
   * Process data through all filters in sequence.
   */
  process(data: Uint8Array): Uint8Array {
    let result = data;
    for (const filter of this.filters) {
      result = filter.process(result);
    }
    return result;
  }

  /**
   * Clear all filters from the pipeline.
   */
  clear(): void {
    this.filters = [];
  }

  /**
   * Get the number of filters in the pipeline.
   */
  length(): number {
    return this.filters.length;
  }
}
