/* import axios from 'axios' */

const utilities = {
    checkUserSubscription:  (email) => {     

        return fetch(`https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io/payment/list`, {method: 'POST'})
        .then(response => response.json())
        .then(costumers => {
            return costumers.find((costumer) => costumer.email == email)
        })
        
    }
}

export default utilities