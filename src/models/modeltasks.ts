import { TaskTypes } from "@/Types/TaskTypes";

export const getAllTasks = (): TaskTypes[] | null => {
    const tasks = localStorage.getItem("tasks");

    if (tasks === null || tasks === "undefined") {
        return null;
    }

    return JSON.parse(tasks);
};

export const saveTask = (task:TaskTypes):void => {
const tasks=getAllTasks() ?? [];
tasks.push(task);
localStorage.setItem("tasks" , JSON.stringify(tasks));


}

export const updateAllTasks  =(task:TaskTypes[]):void => {
  localStorage.setItem("tasks" , JSON.stringify(task));
}

export  const generateRandomId = (): string=> {
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let id='';

    for(let i=0; i<16; i++ ) {
        id+= chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return  id;

}