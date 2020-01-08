import PubSub from "pubsub-js";
import { TODO_DELETED, TODO_ADDED, GET_TODOS } from "./actions";

//ACTIONS

function Project(todos, name) {
  this._todos = todos;
  this._name = name;

  this.addTodo = todo => {
    this._todos.push(todo);
    PubSub.publish(TODO_ADDED, todo);
  };
  this.removeTodo = todo => {
    for (let i = 0; i < this._todos.length; i++) {
      if (todo === this._todos[i].id) {
        this._todos.splice(i, 1);
        console.log("Deleted todo successfuly");
      }
    }
  };
  this.getTodos = () => {
    PubSub.publish(GET_TODOS, this._todos);
    return this._todos;
  };
  this.getName = () => this._name;
}

export { Project };
