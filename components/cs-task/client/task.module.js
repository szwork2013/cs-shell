
/**
 * defines angular module cs-task dependencies.
 */
require("./styles/task.scss");

/**
* configures angular module cs-task.
*/
module.exports = function csTask(angular){
    var task = angular.module("cs.task",[]);
    task.config(require("./configs/task.routes"));
    task.controller("TaskController", require("./controllers/task.controller"));
    return task;
}