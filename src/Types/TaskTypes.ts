
import { BoardType } from './Boards/BoardType';

export interface TaskTypes {
    id?:string,
    title: string,
    description: string,
    dueDate: string,
    priority: "hitan" | "vazan" | "bitan" | "nebitan" | null,
    board:BoardType
}


