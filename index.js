/*const express = require("express");

const path = require("path");

const PORT = process.env.PORT || 500;

const app = new express();

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});*/

const CMS_Prompt = require("./cms-inquirer");
const Queries = require("./DB_Assests/dbqueries");
const mysql = require("mysql");

const queries = new Queries();
//queries.addDepartment("Human Resources");
//queries.addRole("Manager", 500.23, "Human Resources");
queries.addEmployee("Alex", "Nuno", "Manager", null);
const prompt_runner = new CMS_Prompt();
