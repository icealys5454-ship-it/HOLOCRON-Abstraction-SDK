export abstract class Filter<T> {
  readonly id: string;
  readonly order: number;

  constructor(id = "", order = 500) {
    this.id = id;
    this.order = order;
  }

  abstract run(input: T[]): T[];
}
