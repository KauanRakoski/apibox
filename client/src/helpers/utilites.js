/* import axios from 'axios' */

const utilities = {
    checkUserSubscription:  (email) => {     

        return fetch(`http://localhost:3030/payment/list`, {method: 'POST'})
        .then(response => response.json())
        .then(customers => {
            return customers.find((customer) => customer.email == email)
        })
        
    }
}

export default utilities