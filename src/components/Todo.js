import { format, parse, isValid } from "date-fns";
import { MOUSE_ENTER_TODO, MOUSE_LEAVE_TODO } from "../actions";
import PubSub from "pubsub-js";

export const Todo = props => {
  // METHODS
  const handleDateClick = () => {
    let newDate = prompt(`Complete '${props.todo.title}' on: `, "mm/dd/yyyy");
    let parsedDate = parse(newDate, "MM/dd/yyyy", new Date());
    if (isValid(parsedDate)) {
      props.todo.setDueDate(parsedDate);
      _date.innerText = format(props.todo.duedate, "MMM d");
      console.log(props.todo.duedate);
    } else if (!newDate) {
      return null;
    } else {
      alert("The date you entered was not valid, try again.");
    }
  };
  const handlePriorityClick = () => {
    let newPriority = prompt(
      `Insert a number from 0-2: (0= Low, 1= Medium, 2= High): `,
      0
    );
    if (parseInt(newPriority) >= 0 && parseInt(newPriority) <= 2) {
      props.todo.setPriority(parseInt(newPriority));
    }
  };
  const handleDescriptionClick = () => {
    let newDescription = prompt("Type a description for the task here: ", "");
    if (newDescription) {
      props.todo.setDescription(newDescription);
    }
  };
  handleDateClick.bind(this);
  handlePriorityClick.bind(this);
  handleDescriptionClick.bind(this);

  // ELEMENTS
  // Todo
  let _break = document.createElement("div");
  _break.className = "break";

  let _todo = document.createElement("li");
  _todo.className = "todo";
  _todo.style.borderLeft = `3px solid ${
    props.todo.priority === 0
      ? "blue"
      : props.todo.priority === 1
      ? "yellow"
      : "red"
  }`;
  _todo.onclick = () => {
    _todo.toggleAttribute("expanded");
  };

  // Checkbox
  let _checkbox = document.createElement("input");
  _checkbox.type = "checkbox";
  _checkbox.checked = props.todo.complete;

  _checkbox.onclick = e => {
    props.todo.setComplete(_checkbox.checked);
    _title.setAttribute("strike", props.todo.complete ? "true" : "false");
  };

  _todo.appendChild(_checkbox);

  // DateIcon
  let _dateIcon = document.createElement("i");
  _dateIcon.setAttribute("data-eva", "calendar-outline");

  // Date
  let _date = document.createElement("span");
  _date.className = "date-tag";
  _date.innerText = props.todo.duedate
    ? format(props.todo.duedate, "MMM d")
    : "";

  _date.onclick = handleDateClick;

  _todo.appendChild(_date);
  if (!props.todo.duedate) {
    _date.setAttribute("hidden", "true");
  }

  // Title
  let _title = document.createElement("p");
  _title.innerText = props.todo.title;
  _title.setAttribute("strike", props.todo.complete ? "true" : "false");

  _title.onmouseleave = e => {
    PubSub.publish(MOUSE_LEAVE_TODO, props.todo.id);
  };
  _title.onmouseenter = e => {
    PubSub.publish(MOUSE_ENTER_TODO, props.todo.id);
  };

  // Expand
  let _expand = document.createElement("i");
  _expand.className = "expand";
  _expand.setAttribute("data-eva", "arrow-ios-downward-outline");

  // Propline
  let _propLine = document.createElement("div");
  _propLine.className = "prop-line";

  let _setDate = document.createElement("button");
  _setDate.className = "set-date";
  _setDate.onclick = handleDateClick;
  _setDate.innerText = "Set date";
  _propLine.appendChild(_setDate);

  let _setPriority = document.createElement("button");
  _setPriority.className = "set-priority";
  _setPriority.onclick = handlePriorityClick;
  _setPriority.innerText = "Set priority";
  _propLine.appendChild(_setPriority);
  let _setDescription = document.createElement("button");
  _setDescription.className = "set-description";
  _setDescription.onclick = handleDescriptionClick;
  _setDescription.innerText = "Set description";
  _propLine.appendChild(_setDescription);

  let _description = document.createElement("p");
  _description.innerText = props.todo.description;

  // More Info
  let _moreInfo = document.createElement("div");
  _moreInfo.className = "more-info";
  _moreInfo.appendChild(_propLine);
  _moreInfo.appendChild(_description);

  _todo.appendChild(_title);
  _todo.appendChild(_expand);
  _todo.appendChild(_break);
  _todo.appendChild(_moreInfo);

  return _todo;
};
