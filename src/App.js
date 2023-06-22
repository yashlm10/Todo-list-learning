import React, {useState} from "react";
import Todo from "./components/Todo";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import { nanoid } from "nanoid";

const FILTER_MAP = {
   All: () => true,
   Active: (task) => !task.completed,
   Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);



function App(props) {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState(props.tasks);

  function addTask(name) {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks,newTask]);
  }
  
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if(id === task.id){
        return {...task, completed: !task.completed };
      }
      return task;
  });
  setTasks(updatedTasks);
  }

  function editTask(id, newName) {
    const editedTasks = tasks.map((task) => {
      if(id === task.id){
        return {...task, name: newName};
      }
      return task;
  });
  setTasks(editedTasks);
  }

  function deleteTask(id){
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const tasklist = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
    <Todo 
      id = {task.id}
      name = {task.name}
      completed = {task.completed}
      keys = {task.id}
      toggleTaskCompleted = {toggleTaskCompleted}
      deleteTask = {deleteTask}
      editTask = {editTask}
    />
  ));

  const filterlist = FILTER_NAMES.map((name) => (
    <FilterButton 
    key = {name}
    name = {name}
    isPressed = {name === filter}
    setFilter = {setFilter}
    />
  ))

  const taskNoun = tasklist.length !== 1 ? "tasks" : "task";
  const headingTask = `${tasklist.length} ${taskNoun} remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterlist}
      </div>
      <h2 id="list-heading">{headingTask}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {tasklist}
      </ul>
    </div>
  );
}


export default App;
