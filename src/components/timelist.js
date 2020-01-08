import { format } from "date-fns";
import { Todo } from "./Todo";
export const timelist = (title, todos) => {
  const header = document.createElement("h2");
  header.innerText = title;
  header.className = "header";

  const subHeader = document.createElement("h5");
  subHeader.innerText =
    title === "Today"
      ? "(12:00am - 11:59pm)"
      : title === "Upcoming"
      ? "(12:00am Today - 11:59pm Sunday)"
      : title === "Anytime"
      ? "(No Due-date Added)"
      : "(1 Year - 1 Decade)";

  const todosUI = document.createElement("ul");
  todosUI.className = "todos";
  todos.map(todo => todosUI.appendChild(Todo({ todo })));

  return [header, subHeader, todosUI];
};
