import { format } from "date-fns";
import { Todo } from "./Todo";
export const tasklist = project => {
  let header2 = document.createElement("h2");
  header2.innerText = project.getName();
  let tasklistUI = document.createElement("ul");
  tasklistUI.className = "todos";

  project.getTodos().map(todo => tasklistUI.appendChild(Todo({ todo })));

  return [header2, tasklistUI];
};
