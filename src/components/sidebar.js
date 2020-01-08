import { Project } from "../project";
import {
  LOAD_PROJECT,
  LOAD_TIME,
  LOAD_TIME_ANYTIME,
  ADD_PROJECT
} from "../actions";
import {
  endOfDay,
  startOfDay,
  endOfWeek,
  endOfDecade,
  endOfYear
} from "date-fns";
import PubSub from "pubsub-js";
export const sidebar = projects => {
  const APPNAME = "To Do";
  const appendChildren = (parent, children) => {
    children.map(child => parent.appendChild(child));
  };
  const times = [
    { name: "Inbox", func: () => console.log("Inbox Loaded") },
    {
      name: "Today",
      func: () =>
        PubSub.publish(LOAD_TIME, {
          title: "Today",
          icon: "Sun",
          interval: {
            start: startOfDay(Date.now()),
            end: endOfDay(Date.now())
          }
        })
    },
    {
      name: "Upcoming",
      func: () =>
        PubSub.publish(LOAD_TIME, {
          title: "Upcoming",
          icon: "calendar-outline",
          interval: {
            start: startOfDay(Date.now()),
            end: endOfWeek(Date.now())
          }
        })
    },
    {
      name: "Anytime",
      func: () => PubSub.publish(LOAD_TIME_ANYTIME, "Anytime")
    },
    {
      name: "Someday",
      func: () =>
        PubSub.publish(LOAD_TIME, {
          title: "Someday",
          icon: "compass-outline",
          interval: {
            start: endOfDay(Date.now()),
            end: endOfDecade(Date.now())
          }
        })
    }
  ];

  const header = document.createElement("h2");
  header.className = "header";
  header.innerText = APPNAME;

  const timesUI = document.createElement("ul");
  timesUI.className = "times";

  times.map(time => {
    let timeUI = document.createElement("li");
    timeUI.className = "time";
    let timeUIText = document.createElement("p");
    timeUIText.innerText = time.name;
    let icon = document.createElement("i");
    icon.setAttribute(
      "data-eva",
      time.name === "Today"
        ? "sun"
        : time.name === "Upcoming"
        ? "calendar-outline"
        : time.name === "Anytime"
        ? "arrowhead-right-outline"
        : time.name === "Someday"
        ? "compass-outline"
        : "inbox-outline"
    );

    appendChildren(timeUI, [icon, timeUIText]);
    timeUI.addEventListener("click", time.func);
    timesUI.appendChild(timeUI);
  });

  const header2 = document.createElement("h3");
  header2.className = "header";
  header2.innerText = "Projects";

  const projectsUI = document.createElement("ul");
  projectsUI.className = "times";

  projects.map(project => {
    let projectUI = document.createElement("li");
    projectUI.className = "project";
    let icon = document.createElement("i");
    icon.setAttribute("data-eva", "cube-outline");
    let text = document.createElement("p");
    text.innerText = project.getName();
    appendChildren(projectUI, [icon, text]);
    projectUI.addEventListener("click", () =>
      PubSub.publish(LOAD_PROJECT, project)
    );
    projectsUI.appendChild(projectUI);
  });

  const projectsAddDiv = document.createElement("div");
  projectsAddDiv.className = "add-project-container";
  const projectsAdd = document.createElement("input");
  projectsAdd.placeholder = "Add Project...";
  projectsAdd.className = "add-project";
  projectsAdd.onkeydown = e => {
    if (e.key === "Enter") {
      PubSub.publish(ADD_PROJECT, projectsAdd.value);
    }
  };
  projectsAddDiv.appendChild(projectsAdd);

  return [header, timesUI, header2, projectsUI, projectsAddDiv];
};
