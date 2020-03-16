var inquirer = require("inquirer");
const Queries = require("./DB_Assests/dbqueries");

const queries = new Queries();

class CMS_Prompt {
  constructor(questions) {
    this.questions = questions;
  }
  runPrompt() {
    inquirer
      .prompt([this.questions])
      .then(answers => {
        if (answers.Activity === "View All Employees") {
          queries.getEmployees();
        }
      })
      .catch(error => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else when wrong
        }
      });
  }
}

module.exports = CMS_Prompt;
