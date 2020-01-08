import uuid from "uuid/v1";
import { UPDATE_STORAGE } from "./actions";
function Todo(
  title = "Task",
  description = "Default Description...",
  duedate = Date.now(),
  priority = 1,
  complete = false
) {
  this.id = uuid();
  this.title = title;
  this.description = description;
  this.duedate = duedate;
  this.priority = priority;
  this.complete = complete;

  this.setComplete = value => {
    this.complete = value;
    PubSub.publish(UPDATE_STORAGE, null);
  };
  this.setDueDate = value => {
    this.duedate = value;
    PubSub.publish(UPDATE_STORAGE, null);
  };
  this.setPriority = value => {
    this.priority = value;
    PubSub.publish(UPDATE_STORAGE, null);
  };
  this.setDescription = value => {
    this.description = value;
    PubSub.publish(UPDATE_STORAGE, null);
  };
}

export { Todo };
