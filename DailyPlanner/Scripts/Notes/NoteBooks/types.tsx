export interface INotebook {
    id: string;
    name: string;
    createdAt: string;
    color: string;
    records: IRecord[];
}

export interface IRecord {
    name: string;
    body: string;
    id: string;
    createdAt: string;
}