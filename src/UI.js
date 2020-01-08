import * as eva from "eva-icons";
import { sidebar as Sidebar } from "./components/sidebar";
import { tasklist } from "./components/tasklist";
import { timelist } from "./components/timelist";
import { addTodo } from "./components/addTodo";
import { ADD_PROJECT } from "./actions";

const UI = (() => {
  // CONSTANTS

  const sidebar = (() => {
    const _sidebar = document.querySelector("#sidebar");
    const _clearSidebar = () => {
      while (_sidebar.firstElementChild) {
        _sidebar.removeChild(_sidebar.firstElementChild);
      }
    };
    const _loadSidebar = (...elements) => {
      elements.map(element => {
        _sidebar.appendChild(element);
      });
    };

    const refresh = projects => {
      _clearSidebar();
      _loadSidebar(...Sidebar(projects));
      eva.replace({
        width: "16px",
        height: "16px"
      });
    };
    return { refresh };
  })();

  const content = (() => {
    const _content = document.querySelector("#content");
    let _project = {};

    const getProject = () => _project;
    const setProject = proj => {
      _project = proj;
      refresh();
    };
    const _clearContent = () => {
      while (_content.firstElementChild) {
        _content.removeChild(_content.firstElementChild);
      }
    };

    const _loadContent = (...elements) => {
      elements.map(element => {
        _content.appendChild(element);
      });
    };

    const loadTimeView = (title, todos) => {
      _clearContent();
      _loadContent(...timelist(title, todos));
      eva.replace({
        width: "16px",
        height: "16px"
      });
    };

    const refresh = () => {
      _clearContent();
      _loadContent(...tasklist(_project), addTodo(_project));
      eva.replace({
        width: "16px",
        height: "16px"
      });
    };
    return { refresh, loadTimeView, setProject, getProject };
  })();

  const refresh = projects => {
    sidebar.refresh(projects);
    content.refresh(project);
    eva.replace({
      width: "16px",
      height: "16px"
    });
  };

  return { sidebar, content, refresh };
})();

export { UI };
