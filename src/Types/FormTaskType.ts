import { TaskTypes } from './TaskTypes';

export default interface FormTaskType extends TaskTypes {
    tasks: TaskTypes[];
    prioritySort: string;
}