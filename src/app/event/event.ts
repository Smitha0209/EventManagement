export interface Event {
    _id: string;
    organizer: {
        first: string;
        last: string;
    };
    company: string;
    about: string;
    scheduled_at: string;
    duration: number;
    capacity: number;
}