export class Request {
    _id : string;
    broker : {};
    trip: string;
    passengers : number;
    luggage: number;
    from: string;
    to: string;
    departure_date: Date;
    return_date: Date;
    status: string;
    createdAt : Date;
    bids : [];
    updatedAt : Date
}
