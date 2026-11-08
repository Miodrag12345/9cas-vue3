import { TaskTypes } from "@/Types/TaskTypes";
import { PriorityOrder as priorityOrder } from "@/Types/PriorityOrder";


export function sortTasks(tasks: TaskTypes[], importance: string): TaskTypes[] {
    const direction = importance === "important" ? 1 : -1;

    tasks.sort((a, b) => {
        const aPriority = priorityOrder[(a.priority ?? "nebitan") as keyof typeof priorityOrder] ?? 99;
        const bPriority = priorityOrder[(b.priority ?? "nebitan") as keyof typeof priorityOrder] ?? 99;

        return (aPriority - bPriority) * direction;
    });

    return tasks;
}