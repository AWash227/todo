import { ADD_TODO } from "../actions";
export const addTodo = project => {
  const addTodoDiv = document.createElement("div");
  addTodoDiv.className = "add-todo-container";
  const todoAdd = document.createElement("input");
  todoAdd.placeholder = "Add Todo...";
  todoAdd.className = "add-todo";
  todoAdd.onkeydown = e => {
    if (e.key === "Enter") {
      PubSub.publish(ADD_TODO, { project: project, value: todoAdd.value });
    }
  };
  addTodoDiv.appendChild(todoAdd);
  return addTodoDiv;
};
