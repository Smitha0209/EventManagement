export interface Member {
    _id: string;
    age: number;
    name: {
        first: string;
        last: string;
    };
    company: string;
    email: string;
    phone: string;
    events: number;
}