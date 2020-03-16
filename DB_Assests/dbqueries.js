const mysql = require("mysql");

module.exports = class DB_Queries {
  getEmployees() {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query("SELECT * FROM employee", function(err, result, fields) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        console.log(result[0]);
        //return result[0].id;
      });
    });
  }

  getDeparmentByName(departmentName) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query(
        "Select id from department where name = '" + departmentName + "'",
        function(err, result, fields) {
          // if any error while executing above query, throw error
          if (err) throw err;
          // if there is no error, you have the result
          console.log(result[0].id);
          //return result[0].id;
          return result[0].id;
        }
      );
    });
  }

  getEmpManager(manager_name) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query(
        "Select id from employee where first_name = " + manager_name,
        function(err, result, fields) {
          // if any error while executing above query, throw error
          if (err) throw err;
          // if there is no error, you have the result
          let managerID = result[0].id;
          return managerID;
        }
      );
    });
  }

  getRoleByTitle(title) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query("Select id from role where title = " + title, function(
        err,
        result,
        fields
      ) {
        // if any error while executing above query, throw error
        if (err) throw err;
        // if there is no error, you have the result
        console.log(result);
        let roleID = result[0].id;
        return roleID;
      });
    });
  }

  addDepartment(dpname) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    // make to connection to the database.
    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query(
        "INSERT INTO department (name) values ('" + dpname + "')",
        function(err, result, fields) {
          // if any error while executing above query, throw error
          if (err) throw err;
          // if there is no error, you have the result
          console.log(result);
        }
      );
    });
  }

  addRole(title, salary, departmentName) {
    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful
      con.query(
        "Select id from department where name = '" + departmentName + "'",
        function(err, result, fields) {
          let departmentID = result[0].id;

          let con = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "Password@2020",
            database: "emsdb"
          });

          //inserting roles record
          con.connect(function(err) {
            if (err) throw err;
            // if connection is successful
            con.query(
              "INSERT INTO role (title, salary, department_id) values ('" +
                title +
                "', '" +
                salary +
                "', '" +
                departmentID +
                "')",
              function(err, result, fields) {
                // if any error while executing above query, throw error
                if (err) throw err;
                // if there is no error, you have the result
                console.log(result);
              }
            );
          });
        }
      );
    });
  }
  addEmployee(firstName, lastName, role, manager_name) {
    let roleID;
    let managerID;

    if (manager_name === null || manager_name === undefined) {
      managerID = null;
      manager_name = " ";
    }

    let con = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "Password@2020",
      database: "emsdb"
    });

    con.connect(function(err) {
      if (err) throw err;
      // if connection is successful

      con.query(
        "Select id from employee where first_name = '" + manager_name + "'",
        function(err, result, fields) {
          // if any error while executing above query, throw error
          if (err) throw err;
          // if there is no error, you have the result
          if (manager_name === " ") {
            console.log("I'm here");
          } else {
            managerID = result[0].id;
          }

          let con = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "Password@2020",
            database: "emsdb"
          });

          con.connect(function(err) {
            if (err) throw err;
            // if connection is successful
            con.query(
              "Select id from role where title = '" + role + "'",
              function(err, result, fields) {
                // if any error while executing above query, throw error
                if (err) throw err;
                // if there is no error, you have the result
                roleID = result[0].id;

                let con = mysql.createConnection({
                  host: "127.0.0.1",
                  user: "root",
                  password: "Password@2020",
                  database: "emsdb"
                });

                //inserting roles record
                let insertEmpString;
                if (managerID === null) {
                  insertEmpString =
                    "INSERT INTO employee (first_name, last_name, role_id) values ('" +
                    firstName +
                    "', '" +
                    lastName +
                    "', '" +
                    roleID +
                    "')";
                } else {
                  insertEmpString =
                    "INSERT INTO employee (first_name, last_name, role_id, manager_id) values ('" +
                    firstName +
                    "', '" +
                    lastName +
                    "', '" +
                    roleID +
                    "', '" +
                    managerID +
                    "')";
                }
                con.connect(function(err) {
                  if (err) throw err;
                  // if connection is successful
                  con.query(insertEmpString, function(err, result, fields) {
                    // if any error while executing above query, throw error
                    if (err) throw err;
                    // if there is no error, you have the result
                    console.log(result);
                  });
                });
              }
            );
          });
        }
      );
    });
  }
  viewDepartments() {}
  viewRoles() {}
  viewEmployees() {}
  updateEmployeeRole() {}
};
