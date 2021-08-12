import {Deserializable} from "./deserializable";
import {Term} from "./term";

export class Chain implements Deserializable{
  public uuid: string = "";
  public containedTerms: Term[] = [];

  deserialize(input: any): this {
    Object.assign(this, input);
    this.containedTerms = input.containedTerms.map((term: any) => new Term().deserialize(term));
    return this;
  }
}
