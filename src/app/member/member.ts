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
    eventCount: number;
    eventsReg: string[];
}

export interface MemberEvents {
    memberId: string;
    events: string[];
}