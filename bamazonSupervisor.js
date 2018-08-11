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
    console.log('_.~"~._.~"~._.~BAMamazon Supervisor Site~._.~"~._.~"~._');
    
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

//create a new department
function createNewDept() {
    console.log('>>>>>>Creating New Department<<<<<<');
    //prompts to add deptName and numbers. If no value is then by default = 0
    inquirer.prompt([{
        type: "input",
        name: "deptName",
        message: "Department Name: "
    }, {
        type: "input",
        name: "overHeadCost",
        message: "Over Head Cost: ",
        default: 0,
        validate: function (val) {
            if (isNaN(val) === false) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        type: "input",
        name: "prodSales",
        message: "Product Sales: ",
        default: 0,
        validate: function (val) {
            if (isNaN(val) === false) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function (ans) {
        connection.query('INSERT INTO Departments SET ?', {
            DepartmentName: ans.deptName,
            OverHeadCosts: ans.overHeadCost,
            TotalSales: ans.prodSales
        }, function (err, res) {
            if (err) throw err;
            console.log('Another department was added.');
        })
        reprompt();
    });
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