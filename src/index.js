import { isWithinInterval, getDate } from "date-fns";
import * as eva from "eva-icons";
import { Todo } from "./todo";
import { Project } from "./project";
import { UI } from "./UI";
import {
  LOAD_PROJECT,
  LOAD_TIME,
  LOAD_TIME_ANYTIME,
  ADD_PROJECT,
  ADD_TODO,
  DELETE_TODO,
  MOUSE_ENTER_TODO,
  MOUSE_LEAVE_TODO,
  UPDATE_STORAGE
} from "./actions";

const Defaults = (() => {
  let todos = [
    new Todo("Welcome to Todo!", "", Date.now(), 0, false),
    new Todo(
      "Here you can manage and organize all of your tasks and todos.",
      "",
      0,
      0,
      false
    ),
    new Todo(
      "Get started by making a new todo by typing something into the field above.",
      "",
      0,
      0,
      false
    )
  ];
  let todos2 = [
    new Todo("Congratz! You switched to a new project!", "", null, 0, false),
    new Todo("How does it feel to be awesome!?!?", "", 0, 0, false)
  ];
  let project = new Project(todos, "Getting Started");
  let project2 = new Project(todos2, "Let's GO!");
  return { project, project2, todos };
})();

const App = (() => {
  console.log(JSON.parse(window.localStorage.getItem("_projects")));
  let _projects = [];
  if (window.localStorage.getItem("_projects")) {
    JSON.parse(window.localStorage.getItem("_projects")).map(project => {
      _projects.push(
        new Project(
          [
            ...project._todos.map(
              todo =>
                new Todo(
                  todo.title,
                  todo.description,
                  todo.duedate,
                  todo.priority,
                  todo.complete
                )
            )
          ],
          project._name
        )
      );
    });
  } else {
    _projects = [Defaults.project, Defaults.project2];
  }
  let _hovering = "";
  let _isInTimeView = false;
  const updateStorage = () =>
    window.localStorage.setItem("_projects", JSON.stringify(_projects));
  const loadProject = (msg, project) => {
    _isInTimeView = false;
    UI.content.setProject(project);
    eva.replace({
      width: "16px",
      height: "16px"
    });
    updateStorage();
  };
  const getAllTodos = projects => {
    let _todos = [];
    projects.map(project => {
      _todos.push(...project.getTodos());
    });
    updateStorage();
    return _todos;
  };
  const intervalQuery = (interval, todos) =>
    todos.filter(todo => isWithinInterval(todo.duedate, interval));
  updateStorage();

  const loadTimeView = (msg, { title, interval }) => {
    _isInTimeView = true;
    UI.content.loadTimeView(
      title,
      intervalQuery(interval, getAllTodos(_projects))
    );
    eva.replace({
      width: "16px",
      height: "16px"
    });
    updateStorage();
  };

  const loadAnytimeView = (msg, title) => {
    _isInTimeView = true;
    UI.content.loadTimeView(
      title,
      getAllTodos(_projects).filter(todo => !todo.duedate)
    );
    eva.replace({
      width: "16px",
      height: "16px"
    });
    updateStorage();
  };
  const addProject = (msg, data) => {
    console.log(msg);
    _projects.push(new Project([], data));
    UI.sidebar.refresh(_projects);
    updateStorage();
  };

  const addTodo = (msg, data) => {
    console.log(msg);
    data.project.addTodo(new Todo(data.value, "", null, 0, false));
    UI.content.refresh();
    updateStorage();
  };

  document.onkeypress = ev => {
    if (
      _hovering &&
      (ev.key === "c" || ev.key === "C") &&
      ev.target.nodeName !== "INPUT"
    ) {
      PubSub.publish(DELETE_TODO, _hovering);
      updateStorage();
    }
  };

  PubSub.subscribe(ADD_PROJECT, addProject);
  PubSub.subscribe(DELETE_TODO, (msg, data) => {
    if (!_isInTimeView) {
      UI.content.getProject().removeTodo(data);
      UI.content.refresh();
      updateStorage();
    } else {
      console.log("Project is undefined or you are in a time view");
    }
  });
  PubSub.subscribe(MOUSE_ENTER_TODO, (msg, data) => {
    _hovering = data;
    console.log(_hovering);
  });
  PubSub.subscribe(MOUSE_LEAVE_TODO, (msg, data) => (_hovering = ""));
  PubSub.subscribe(ADD_TODO, addTodo);
  PubSub.subscribe(LOAD_PROJECT, loadProject);
  PubSub.subscribe(LOAD_TIME, loadTimeView);
  PubSub.subscribe(LOAD_TIME_ANYTIME, loadAnytimeView);
  PubSub.subscribe(UPDATE_STORAGE, updateStorage);
  UI.sidebar.refresh(_projects);
  eva.replace({
    width: "16px",
    height: "16px"
  });
})();
