import { TaskTypes } from "@/Types/TaskTypes";

export const  getAllTasks = (): TaskTypes [] | null =>{
    const tasks=localStorage.getItem("tasks");

    return tasks === null ? null:JSON.parse(tasks);

};

export const saveTask = (task:TaskTypes):void => {
const tasks=getAllTasks() ?? [];
tasks.push(task);
localStorage.setItem("tasks" , JSON.stringify(tasks));


}

export const updateAllTasks  =(task:TaskTypes[]):void => {
  localStorage.setItem("tasks" , JSON.stringify(task));
}