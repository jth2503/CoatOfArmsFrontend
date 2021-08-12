import {Deserializable} from "./deserializable";
import {Chain} from "./chain";

export class CoatOfArms implements Deserializable{
  public uuid: string = "";
  public name: string = "";
  public description: string = "";
  public location: string = "";
  public containedChains: Chain[] = [];

  deserialize(input: any): this {
    Object.assign(this, input);
    this.containedChains = input.containedChains.map((chain: any) => new Chain().deserialize(chain));
    return this;
  }
}
