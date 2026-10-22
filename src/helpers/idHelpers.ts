import { TaskTypes } from "@/Types/TaskTypes";

export const isIdUsed = (id: string, tasks: TaskTypes[]): boolean => {
  return tasks.some(task=>task.id === id);
};