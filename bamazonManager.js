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
        choices: ["View All Products", "View Low Inventory", "Add Inventory", "Add New Product", "End Session"]
    }]).then(function (ans) {
        switch (ans.doThing) {
            case "View All Products":
                //console.log("~~~~~View All Products~~~~~");
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add Inventory":

                addToInventory();
                break;
            case "Add New Product":
                console.log("~~~~~Add New Product~~~~~")
                //addNewProduct();
                break;
            case "End Session":
                endConnection();
        }
    });
}

function viewProducts() {
    console.log("~~~~~View All Products~~~~~");
    connection.query("SELECT * FROM Products", function (err, res) {
        if (err) throw err;


        console.log('----------------------------------------------------------------------------------------------------');
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].ItemID + " | " + "Product: " + res[i].ProductName + " | " + "Department: " + res[i].DepartmentName + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].StockQuantity);
            console.log('--------------------------------------------------------------------------------------------------')
        }
        console.log(" ");
        reprompt();
    });
}
//view inventory lower than 5
function viewLowInventory() {
    console.log("~~~~~View Low Inventory~~~~~")
    connection.query("SELECT * FROM Products", function (err, res) {
        if (err) throw err;

        console.log('----------------------------------------------------------------------------------------------------');
        for (var i = 0; i < res.length; i++) {
            if (res[i].StockQuantity <= 5) {
                console.log("ID: " + res[i].ItemID + " | " + "Product: " + res[i].ProductName + " | " + "Department: " + res[i].DepartmentName + " | " + "Price: " + res[i].Price + " | " + "QTY: " + res[i].StockQuantity);
                console.log('--------------------------------------------------------------------------------------------------');
            }
        }
        reprompt();
    });
}
//displays prompt to add more of an item to the store and asks how much
function addToInventory() {
    console.log("~~~~~Add Inventory~~~~~");
    connection.query("SELECT * FROM Products", function (err, res) {
            if (err) throw err;

            var itemArr = [];
            //pushes each item into an array
            for (var i = 0; i < res.length; i++) {
                itemArr.push(res[i].ProductName);
            }
            inquirer.prompt([{
                type: "list",
                name: "product",
                choices: itemArr,
                message: "Which item would you like to add to the inventory?"
            }, {
                type: "input",
                name: "qty",
                message: "How much would you like to add?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }]).then(function (ans) {
                    var currentQty;
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].ProductName === ans.product) {
                            currentQty = res[i].StockQuantity;
                        }
                    }
                connection.query("UPDATE Products SET ? WHERE ?", [{
                        StockQuantity: currentQty + parseInt(ans.qty)
                    },
                    {
                        ProductName: ans.product
                    }
                ], function (err, res) {
                    if (err) throw err;
                    console.log("The quantity was updated.");
                    reprompt();
                });
            })
    });
}


//function to re start the process or end
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
    console.log("Thank you for shopping. Your connection is closed.");
    connection.end();
}