export interface CustomizedMessage {
    _id: string | number;
    text: string;
    createdAt: Date | number;
    user: User;
    image?: string;
    video?: string;
    audio?: string;
    avaliability?:Schedule[];
    system?: boolean;
    sent?: boolean;
    received?: boolean;
    pending?: boolean;
}
export interface Schedule {
    id:  number;
    startDate:Date; 
    endDate: Date;
}
export interface User {
    _id: string | number;
    name?: string;
    avatar?: string | renderFunction;
}
declare type renderFunction = (x: any) => JSX.Element;
