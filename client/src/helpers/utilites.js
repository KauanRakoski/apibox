import axios from 'axios'

const utilities = {
    checkUserSubscription: (email) => {
        
        axios.post(`https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io/payment/list`)
            .then((res) => {
                var data = res.data
                for (var user in data) {
                    if (user.email == email){
                        return {
                        status: "active",
                        email: email,
                        id: user.id
                        }
                    } 
                }
            })
    }
}

export default utilities