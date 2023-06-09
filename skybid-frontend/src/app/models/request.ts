export class Request {
    _id: string;
    broker: {
        company_name:string;
        role:string;
        email: string;
        country: string;
        city:string
        address: string;
        phone:number;
        bio?:string;
        _id: string
    };
    trip: string;
    passengers: number;
    luggage: number;
    from: string;
    to: string;
    departure_date: string;
    return_date: string;
    status: string;
    createdAt: Date;
    bids: [];
    updatedAt: Date
    isNew : boolean
}
