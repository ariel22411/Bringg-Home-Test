export default class Task {
    _id;
    title;
    scheduledFor;
    location;
  
    constructor(task) {
      this._id = task._id;
      this.title = task.title;
      this.scheduledFor = task.scheduledFor;
      this.location = task.location;
    }
  }
  