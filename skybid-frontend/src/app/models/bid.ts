import { Aircraft } from "./aircraft";
import { User } from "./user";

export interface Bid{
  _id : string;
    operator : User ;
    aircraft : Aircraft;
    price : number
  }
