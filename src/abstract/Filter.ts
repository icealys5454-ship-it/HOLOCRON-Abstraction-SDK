/**
 * Abstract base class for filter operations in the pipeline.
 * Filters are applied in order based on their priority.
 */
export interface FilterResult<T> {
  items: T[];
  query?: string;
  total: number;
}

export abstract class Filter<T> {
  /**
   * Unique identifier for this filter.
   */
  abstract get id(): string;

  /**
   * Execution order. Lower values execute first.
   * Recommended bands:
   *   0-99: security/entitlement
   *   100-199: text query
   *   200-399: metadata/platform
   *   400-599: compatibility
   *   600-799: user preferences
   *   800-899: grouping
   *   900-999: final sorting
   */
  abstract get order(): number;

  /**
   * Apply the filter to items.
   */
  abstract apply<U extends T>(items: U[], context?: Record<string, unknown>): U[];
}
