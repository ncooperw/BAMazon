# BAMazon
Created during Week 12 of the University of Denver Coding Bootcamp. The goal was to create an Amazon-like store front using Node.js and MySQL.

## Getting Started

- Clone repo.
- Make sure you have Node installed
- Run command in Terminal or Gitbash 'npm install'
- Run command depending which mode you would like to be on:
    * Customer - 'node bamazonCustomer.js'
    * Manager - 'node bamazonManager.js'
    * Exective - 'node bamazonSupervisor.js'
- Run 'ctrl + c' to exit each mode

### What Each JavaScript Does

1. `BamazonCustomer.js`
![alt text](assets\customer1.PNG?raw=true "View products and chose by ID")

    * Prints the products in the store.

    * Prompts customer which product they would like to purchase by ID number.

    * Asks for the quantity.

      * If there is a sufficient amount of the product in stock, it will return the total for that purchase.
      * However, if there is not enough of the product in stock, it will tell the user that there isn't enough of the product.
      * If the purchase goes through, it updates the stock quantity to reflect the purchase.
      * It will also update the product sales in the department table.

-----------------------

2. `BamazonManager.js`

    * Starts with a menu:
    ![alt text](assets/manager1.png "Menu")


    * If the manager selects `View Products for Sale`, it lists all of the products in the store including all of their details.
![alt text](assets/manager2.png "View Products")

    * If the manager selects `View Low Inventory`, it'll list all the products with less than five items in its StockQuantity column.
![alt text](assets/manager3.png "Low Inventory")

    * If the manager selects `Add to Inventory`, it allows the manager to select a product and add inventory.
![alt text](assets/manager4.png "Add Inventory")

    * If the manager selects `Add New Product`, it allows the manager to add a new product to the store.

    * If the manager selects `End Session`, it ends the session and doesn't go back to the menu.

-----------------------

3. `BamazonSupervisor.js`

    * Starts with a menu:
        * View Product Sales by Department
        * Create New Department
        * End Session
![alt text](assets/supervisor1.png "menu")

    * If the manager selects `View Product Sales by Department`, it lists the Department Sales and calculates the total sales from the overhead cost and product sales.
![alt text](assets/supervisor2.png "view sales by department")

    * If the manager selects `Create New Department`, it allows the manager to create a new department and input current overhead costs and product sales. If there are none, by default it will set at 0.

    * If the manager selects `End Session`, it ends the session and doesn't go back to the menu.


## Technologies used
- Node.js
- Inquire NPM Package (https://www.npmjs.com/package/inquirer)
- MYSQL NPM Package (https://www.npmjs.com/package/mysql)

### Prerequisites

```
- Node.js - Download the latest version of Node https://nodejs.org/en/
- Create a MYSQL database called 'Bamazon', reference schema.sql
```

## Built With

* Visual Studio Code - Text Editor
* MySQLWorkbench
* Terminal/Gitbash

##Video Example

https://drive.google.com/file/d/1v3G3mNGPDXdlwtgAOuNWixgBhM9fCbbg/view


## Authors

* **Nicole Cooper-White** - *JS/MySQL/Node.js* - [Nicole Cooper-White](https://github.com/ncooperw)