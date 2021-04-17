<template>
    <div></div>    
</template>

<script>
import axios from 'axios';

export default {
    name: 'Qresponse',
    data(){
        return {
            baseUrl: process.env.VUE_APP_DOMAIN
        }
    },
    mounted(){
        let userString = localStorage.getItem("AuthUser")
        let userInfo = JSON.parse(userString)
        let user = userInfo.uid
        var task_id = this.$route.params.id
        alert(task_id)

        try{
            axios.post(`${this.baseUrl}/qr`, {task_id, user})
        }catch(e){
            alert(e)
        }
    }
}
</script>