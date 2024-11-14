//module imports
const fs = require('fs')

/**********************************************************************
 ***********************************Functions**************************
 **********************************************************************/

//File read function
const readGroceryList = (file) => {
    try {
        const data = fs.readFileSync(file, 'utf8')
        return JSON.parse(data)

      } catch (err) {
        console.error('Error reading file:', err)
    }
}

//Receipt processing function
const processReceipt = (grocery_list, price_list) => {
    var shopping_receipt_content = "" 
    var grand_total = 0

    grocery_list.items.forEach(item => {
        let total_price = 0
        
        Object.keys(price_list).forEach(key => {
            if(key == item.name){
                total_price = item.quantity * price_list[key]
                grand_total += total_price
            }
        });

        shopping_receipt_content += (`${item.name} - ${item.quantity} ${item.unit} - $${total_price} \n`)
    });


const shopping_receipt_format = `
Grocery List:
---------------------------------------

${shopping_receipt_content}
---------------------------------------
Total: $${grand_total.toFixed(2)}
`
return shopping_receipt_format

}

//Create file function
const createReceiptFile = (content) => {
    try {
        fs.writeFileSync('./shopping_receipt.txt', content);
        console.log(`The receipt has been created successfully!`);
      } catch (err) {
        console.error('Error writing file:', err);
    }
}



/**********************************************************************
 ***********************************Implementations**************************
 **********************************************************************/


//grocery list file import
const grocery_list_file = './grocery_list.json'

//getting grocery list as js object
const grocery_list = readGroceryList(grocery_list_file)

//price list object
const price_list = {
   "Milk":     1.5,
   "Eggs":     3.0,       
   "Bread":    2.0,
   "Apples":   3.5,
   "Bananas":  1.2,
   "Tomatoes": 2.0,
   "Onions":   0.5,
   "Potatoes": 2.0,
   "Carrots":  1.0,
   "Lettuce":  1.5,
   "Cucumber": 0.8,
   "Yogurt":   2.0,
   "Cheese":   5.0,
   "Coffee":   4.0,
   "Tea":      3.0,
   "Pasta":    1.5,
   "Rice":     2.5
};

//get processed receipt
const processed_receipt = processReceipt(grocery_list, price_list)

//creating the shopping receipt file
createReceiptFile(processed_receipt)


