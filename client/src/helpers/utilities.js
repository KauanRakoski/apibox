import swal from 'sweetalert'

const utilities = {
    checkUserSubscription: (email) => {
        return fetch(`https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io/payment/list`, { method: 'POST' })
            .then(response => response.json())
            .then(customers => {
                return customers.find((customer) => customer.email == email)
            })
    },
    showError: (error) => {
        swal("Oops!", `Something went as unexpected. ${error ? 'More details at console' : ''}`, "error")
        if (error) console.error("Error:" + error.message)
    }
}

export default utilities