import swal from 'sweetalert'

const utilities = {
    checkUserSubscription: (email) => {
        return fetch(`${process.env.VUE_APP_DOMAIN}/payment/list`, { method: 'POST' })
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