import { TaskTypes } from "@/Types/TaskTypes";
import { PriorityOrder as priorityOrder } from "@/Types/PriorityOrder";
import { generateRandomId } from "@/models/modeltasks";
import { isIdUsed } from "@/helpers/idHelpers";

export function sortTasks(tasks: TaskTypes[], importance: string): TaskTypes[] {
    const direction = importance === "important" ? 1 : -1;

    tasks.sort((a, b) => {
        const aPriority = priorityOrder[(a.priority ?? "nebitan") as keyof typeof priorityOrder] ?? 99;
        const bPriority = priorityOrder[(b.priority ?? "nebitan") as keyof typeof priorityOrder] ?? 99;

        return (aPriority - bPriority) * direction;
    });

    return tasks;
}


export function prepareTask(newTask: any, tasks: TaskTypes[]): TaskTypes {
    let tempId = generateRandomId();
    if (isIdUsed(tempId, tasks)) {
        tempId = generateRandomId();
    }

    return {
        id: tempId,
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        board: newTask.board || "todo",
    };
}