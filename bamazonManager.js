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

function start(){
    inquirer.prompt([{
        type: "list",
        name: "doThing",
        message: "What would you like to do?",
        choices: ["View All Products", "View Low Inventory", "Add Inventory", "Add New Product", "End Session"]
    }]).then(function(ans){
        switch(ans.doThing){
            case "View All Products": 
            //console.log("~~~~~View All Products~~~~~");
            viewProducts();
            break;
            case "Add Inventory":
            console.log("~~~~~Add Inventory~~~~~")
            //addToInventory();
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

function viewProducts(){
    console.log("~~~~~View All Products~~~~~");
}
function endConnection() {
    console.log("Thank you for shopping. Your connection is closed.");
    connection.end();
}