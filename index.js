const CMS_Prompt = require("./cms-inquirer");

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

//const queries = new Queries();
const app = new CMS_Prompt(mainMenu);
app.runPrompt();
//queries.addDepartment("Human Resources");
//queries.addRole("Manager", 500.23, "Human Resources");
//queries.addEmployee("Savoir", "Perez", "Manager", "Alex");
