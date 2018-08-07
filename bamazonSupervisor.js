var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    post: 3306,
    user: "root",
    password: "myn3wpass",
    database: "BAMazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    inquirer.prompt([{
        type: "list",
        name: "doThing",
        message: "What would you like to do?",
        choices: ["View Product Sales by Department", "Create New Department", "End Session"]
    }]).then(function (ans) {
        switch (ans.doThing) {
            case "View Product Sales by Department":
                viewProductByDept();
                break;
            case "Create New Department":
                createNewDept();
                break;
            case "End Session":
                reprompt();
                console.log("Bye!");
        }
    });
}
//view product sales by department
function viewProductByDept() {
    //prints the items for sale and their details
    connection.query("SELECT * FROM Departments", function (err, res) {
        if (err) throw err;
        console.log('>>>>>>Product Sales by Department<<<<<<');
        console.log('----------------------------------------------------------------------------------------------------');
        for (var i = 0; i < res.length; i++) {
            console.log("Department ID: " + res[i].DepartmentID + " | " + "Department Name: " + res[i].DepartmentName + " | " + "Over Head Cost: " + (res[i].OverHeadCosts).toFixed(2) + " | " + "Product Sales: " + (res[i].TotalSales - res[i].OverHeadCosts).toFixed(2));
            console.log('--------------------------------------------------------------------------------------------------');
        }
        reprompt();
    })
}

function reprompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to do something else?"
    }]).then(function (ans) {
        if (ans.reply) {
            console.log("this is the reply " + ans.reply);

            start();
        } else {
            console.log("See you soon!");
            endConnection();
        }
    });
};

function endConnection() {
    console.log("Your connection is closed.");
    connection.end();
}