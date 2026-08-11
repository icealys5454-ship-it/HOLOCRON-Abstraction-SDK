export abstract class Filter<T> {
  constructor(public id = '', public order = 1000) {}
  abstract run(items: T[], ctx?: Record<string, unknown>): T[];
}
