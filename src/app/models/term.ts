import {Deserializable} from "./deserializable";

export class Term implements Deserializable{
  public uuid: string = "";
  public name: string = "Kein Begriff ausgewählt";
  public synonyms: string[] = [];
  public hide: boolean = true;
  public comment: string = "";
  public children: Term[] = [];
  public parents: Term[] = [];

  deserialize(input: any): this {
    Object.assign(this, input);

    this.children = input.children.map((child: any) => new Term().deserialize(child));

    this.parents = input.parents.map((parent: any) => new Term().deserialize(parent));

    return this;
  }
}
