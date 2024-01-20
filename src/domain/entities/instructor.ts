import { randomUUID } from "node:crypto";

export class instructor {
  public id: string;
  public name: string;

  constructor(id: string, name: string) {
    this.id = id ?? randomUUID();
    this.name = name;
  }
}
