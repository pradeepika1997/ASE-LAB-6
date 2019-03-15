const fs =  require('fs');


// ------------------Begin of Reusable functions ---------------------

var fetchCustomers = () => {
    try {                          //if file won't exist
        var customersString = fs.readFileSync('customers-data.json')
        return JSON.parse(customersString);
    } catch(e){
        return [];
    }
};

var saveCustomers = (customers) => {
    fs.writeFileSync('customers-data.json',JSON.stringify(customers));
};


// ------------------End of Reusable functions ---------------------


//  to add a new customer

var addCustomer = (id, name, email) => {
    var customers = fetchCustomers();
    var customer = {id, name, email}

    var duplicateCustomers =  customers.filter((customer) => { // to check if customer already exists
        return customer.id === id;
    });

    if (duplicateCustomers.length === 0){
        customers.push(customer);
        saveCustomers(customers);
        return customer;
    }

};


//to list all the customers

var getAll = () => {
    return fetchCustomers();
};


// to read a customer

var getCustomer = (id) => {

    var customers = fetchCustomers();

    var getCustomers =  customers.filter((customer) => {  // to check if customer exists and returns the customer
        return customer.id === id;
    });

    return getCustomers[0];

};

// to update a customer

var updateCustomer = (id, name, email) => {

    var customers = fetchCustomers();
    var customer = {id, name, email};

    var filteredCustomers = customers.filter((customer) => { // return all customers except the matched customer
        return customer.id !== id;
    });

    if ( customers.length !== filteredCustomers.length ) {
        filteredCustomers.push(customer);
        saveCustomers(filteredCustomers);
        return customer;
    }
};


// to delete a customer

var removeCustomer = (id) => {

    var customers = fetchCustomers(); // reusable func

    var filteredCustomers =  customers.filter((customer) => { // will return all other customers other than "note to be removed"
        return customer.id !== id;
    });

    saveCustomers(filteredCustomers); //save new notes array

    return customers.length !== filteredCustomers.length

};

// function just to print out customer to screen

var logCustomer = (customer) => {
    console.log('--');
    console.log(`Customer ID: ${customer.id}`);
    console.log(`Customer Name: ${customer.name}`);
    console.log(`Customer Email address: ${customer.email}`);
};

// add new function names here to be accessible from other modules

module.exports = {
    addCustomer, getAll, updateCustomer, removeCustomer, getCustomer,logCustomer
};
