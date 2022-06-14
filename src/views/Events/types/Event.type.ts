export type Event = {
    id: number
    name: string;
    description: string;
    endDate: string;
    startDate: string;
    image: string;
}

export type Links = {
    first: string;
    last: string;
    prev?: any;
    next?: any;
}

export type PageLink = {
    url: string;
    label: string;
    active: boolean;
}

export type Meta = {
    current_page: number;
    from: number;
    last_page: number;
    links: PageLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export type EventsApiResponse = {
    data: Event[];
    links: PageLink[];
    meta: Meta;
}

export type EventDetailsApiResponse = {
    data: Event;
    errors?: {
        name: '',
        startDate: '',
        endDate: '',
        description: '',
        image: '',
    }
}