var inquirer = require("inquirer");
const Queries = require("./DB_Assests/dbqueries");

const queries = new Queries();

var mainMenu = {
  message: "What would you like to do?",
  type: "list",
  name: "Activity",
  choices: [
    "View All Employees",
    "View All Employees By Department",
    "View All Employess By Manager",
    "Add Employee",
    "Remove Employee",
    "Update Employee Role",
    "Update Employee Manager"
  ]
};

class CMS_Prompt {
  constructor() {
    this.questions = mainMenu;
  }
  runPrompt() {
    console.log(
      `\n===========================================================================\n`
    );
    inquirer
      .prompt([this.questions])
      .then(answers => {
        if (answers.Activity === "View All Employees") {
          queries.getEmployees(emplist => {
            console.log(emplist);
            this.runPrompt();
          });
        } else if (answers.Activity === "View All Employees By Department") {
          queries.getDepartments(departments => {
            //console.table(departments);
            //console.log(departments.length);
            departments = departments.map(eachRec => {
              return eachRec.name;
            });
            this.questions = {
              message: "Please select which department",
              type: "list",
              name: "Activity",
              choices: departments
            };
            //****************************************************************/
            inquirer
              .prompt([this.questions])
              .then(answers => {
                queries.getEmployeesByDepartmentName(
                  answers.Activity,
                  emplist => {
                    console.table(emplist);
                  }
                );
              })
              .catch(error => {
                if (error.isTtyError) {
                  // Prompt couldn't be rendered in the current environment
                } else {
                  // Something else when wrong
                }
              });
            /*****************************************************************/
          });
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
