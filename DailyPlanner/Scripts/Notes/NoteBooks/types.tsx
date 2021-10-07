export interface INotebook {
    id: string;
    title: string;
    createdAt: string;
    color: string;
    records: IRecord[];
}

export interface IRecord {
    name: string;
    body: string;
    id: string;
    created_at: string;
}