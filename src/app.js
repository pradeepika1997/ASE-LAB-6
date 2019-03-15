
const fs =  require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const customers = require('./customers.js');

// ------------ Begin - command configuration -----------------


const idOptions = {
    describe: 'Customer ID',
    demand : true,
    alias : 'i'
}

const nameOptions = {
    describe: 'Customer Name',
    demand : true,
    alias : 'n'
}

const emailOptions = {
    describe: 'Customer Email',
    demand : true,
    alias : 'e'
}

const argv =  yargs

    .command('add','Add a new customer details',{
      id: idOptions,
      name: nameOptions,
      email: emailOptions
    })
    .command('list','List all customer details')
    .command('read','Get a customer details by ID',{
      id: idOptions
    })
    .command('update', "Update customer details", {
        id: idOptions,
        name:nameOptions,
        email: emailOptions
    })
    .command('remove','Remove customer by ID',{
      id:idOptions
    })
    .help()
    .argv;


// ------------ End - command configuration -----------------


var command = argv._[0];


if (command === 'add'){
    var customer = customers.addCustomer(argv.id, argv.name, argv.email);
    if (customer){
      customers.logCustomer(customer)  // print added Customer
    } else{
      console.log("Customer already exists");
    }
}

else if (command === 'list') {
  var AllCustomers = customers.getAll();
  console.log(`Printing ${AllCustomers.length} customer(s).`);

  AllCustomers.forEach((customer)=>{                                //list all customer(s)
    customers.logCustomer(customer);
  });
}

else if (command === 'read') {
   var customer = customers.getCustomer(argv.id);
   if(customer){
    customers.logCustomer(customer);                                //print customer details
          }
   else{
    console.log("Customer not found");
   }
}

else if (command === 'update') {
    var customer = customers.updateCustomer(argv.id, argv.name, argv.email);
    if(customer){
        customers.logCustomer(customer);
    }
    else{
        console.log("Customer not found");
    }
}

else if (command === 'remove'){
    var customer = customers.removeCustomer(argv.id);
    if(customer){
        console.log("Removed the customer details");
    }
    else{
        console.log("Customer not found");
    }
}

else{
  console.log('command note recognized'); 
}
