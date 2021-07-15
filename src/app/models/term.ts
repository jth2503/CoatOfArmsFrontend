import {Deserializable} from "./deserializable";

export class Term implements Deserializable{
  public uuid: string;
  public name: string;
  public synonyms: string[];
  public hide: boolean;
  public comment: string;
  public children: Term[];
  public parents: Term[];

  deserialize(input: any): this {
    Object.assign(this, input);

    this.children = input.children.map(child => new Term().deserialize(child));

    this.parents = input.parents.map(parent => new Term().deserialize(parent));

    return this;
  }
}
