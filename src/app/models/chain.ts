import {Deserializable} from "./deserializable";
import {Term} from "./term";

export class Chain implements Deserializable{
  public uuid: string = "";
  public containedTerms: {position: number, term: Term}[] = [];

  deserialize(input: any): this {
    Object.assign(this, input);
    this.containedTerms = input.containedTerms.map((term: any) => [term.position, new Term().deserialize(term.term)]);
    return this;
  }
}
