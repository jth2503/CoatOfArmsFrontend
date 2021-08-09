import {Deserializable} from "./deserializable";
import {Chain} from "./chain";

export class CoatOfArms implements Deserializable{
  public uuid: string = "";
  public name: string = "";
  public description: string = "";
  public location: string = "";
  public containedChains: [position: number, chain: Chain][] = [];

  deserialize(input: any): this {
    Object.assign(this, input);
    this.containedChains = input.containedChains.map((chain: any) => [chain.position, new Chain().deserialize(chain.chain)]);
    return this;
  }
}
