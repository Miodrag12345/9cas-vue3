import {defineStore} from "pinia";
import {getAllTasks, updateAllTasks} from "@/models/modeltasks";
import {TaskTypes} from "@/Types/TaskTypes";
import {BoardType} from "@/Types/Boards/BoardType";
import {prepareTask, sortTasks} from "@/services/taskservice";

export const useTaskStore=defineStore('taskStore', {
 state:() => ({
   tasks:getAllTasks() ?? [] as TaskTypes[],
     prioritySort: '' as '' | 'important' | 'notimportant'
 }),


    getters:{
        groupedTasks(state): Record<BoardType, TaskTypes[]> {
            return {
                todo: state.tasks.filter(t => t.board === 'todo'),
                doing: state.tasks.filter(t => t.board === 'doing'),
                done: state.tasks.filter(t => t.board === 'done')
            }
        }

          },

    actions: {
        deleteTask(id: string): void {
            this.tasks = this.tasks.filter((task) => task.id !== id)
            this.saveTasks();

        },
        changeSort() {
            this.tasks = sortTasks(this.tasks, this.prioritySort);
        },


        addTask(newTask: any) {
            const taskExists = this.tasks.some(
                (task) => task.title.trim() === newTask.title.trim()
            );

            if (taskExists) {
                alert("Zadatak sa ovim imenom vec postoji");
                return;
            }


            const preparedTask = prepareTask(newTask, this.tasks);

            this.tasks.push(preparedTask);
        },

        saveTasks (){
            updateAllTasks(this.tasks);
        }
    }
})