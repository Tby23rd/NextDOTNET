"use client"
import {useState,ChangeEvent,FormEvent} from 'react';
import Head from 'next/head';

// Define an interface for the task object
interface Task {
    id: number;
    task: string;
    priority: string;
    deadline: string;
    done: boolean;
}

// Define an interface for the component's state
interface TaskSchedulerState {
    tasks: Task[];
    completedTasks: Task[];
    taskName: string;
    taskPriority: string;
    taskDeadline: string;
    searchKeyword: string;
    filterPriority: string;
}

export default function TaskScheduler() {
    // Use the TaskSchedulerState interface to type the state
    const [state,setState]=useState<TaskSchedulerState>({
        tasks: [],
        completedTasks: [],
        taskName: '',
        taskPriority: 'Top',
        taskDeadline: '',
        searchKeyword: '',
        filterPriority: '',
    });

    // Handlers for form inputs
    const handleInputChange=(event: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        const name=event.target.name;
        const value=event.target.value;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    // Function to add a new task
    const addTask=(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTask: Task={
            id: state.tasks.length+1,
            task: state.taskName,
            priority: state.taskPriority,
            deadline: state.taskDeadline,
            done: false,
        };
        setState({...state,tasks: [...state.tasks,newTask],taskName: '',taskPriority: 'Top',taskDeadline: ''});
    };

    // Function to mark a task as done
    const markDone=(id: number) => {
        const updatedTasks=state.tasks.map(task => {
            if(task.id===id) {
                return {...task,done: !task.done};
            }
            return task;
        });
        setState({...state,tasks: updatedTasks});
    };

    // Function to delete a task
    const handleDeleteTask=(id: number) => {
        const filteredTasks=state.tasks.filter(task => task.id!==id);
        setState({...state,tasks: filteredTasks});
    };

    // Function to filter tasks based on search keyword and priority
    const filteredTasks=state.tasks.filter((task) => {
        return (
            !task.done&&
            task.task.toLowerCase().includes(state.searchKeyword.toLowerCase())&&
            (state.filterPriority? task.priority===state.filterPriority:true)
        );
    });

    // JSX for the task manager interface
    return (
        <div >
            <Head>
                <title>Task Management</title>
            </Head>
            <form onSubmit={addTask} className="p-4 border rounded-lg  shadow-md">
                <div className="mb-4">
                    <input
                        type="text"
                        name="taskName"
                        value={state.taskName}
                        onChange={handleInputChange}
                        placeholder="Task Name"
                        className="w-full p-2 font-bold border rounded"
                    />
                </div>
                <div className="mb-4">
                    <select
                        name="taskPriority"
                        value={state.taskPriority}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="Top">Top</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div className="mb-4">
                    <input
                        type="date"
                        name="taskDeadline"
                        value={state.taskDeadline}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Add Task
                </button>
            </form>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-2">Tasks</h2>
                <ul>
                    {filteredTasks.map(task => (
                        <li key={task.id} className="flex justify-between items-center border-b border-gray-200 py-2">
                            <span>{task.task} - {task.priority} - {task.deadline}</span>
                            <div className="space-x-4">
                                <button onClick={() => markDone(task.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Done</button>
                                <button onClick={() => handleDeleteTask(task.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-8 space-y-4">
                <h2 className="text-2xl font-bold mb-2">Completed Tasks</h2>
                <ul>
                    {state.tasks.filter(task => task.done).map(task => (
                        <li key={task.id} className="flex justify-between items-center border-b border-gray-200 py-6">
                            <span>{task.task} - {task.priority} - {task.deadline}</span>
                            <button onClick={() => markDone(task.id)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Undone</button>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}
