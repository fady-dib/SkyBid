import { User } from "./user";

export class Aircraft {
    _id : string;
    operator : User;
    aircraft : string;
    image : {
        name : string;
        image_type : string;
        url :string
    };
    passengers : number;
    year_of_manufacture : number;
}