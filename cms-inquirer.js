var inquirer = require("inquirer");
const DB_Queries = require("./DB_Assests/dbqueries");

const queries = new DB_Queries();

class CMS_Prompt {
  constructor(questions) {
    this.questions = questions;
  }
  runPrompt() {
    inquirer
      .prompt([this.questions])
      .then(answers => {
        // Use user feedback for... whatever!!
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
