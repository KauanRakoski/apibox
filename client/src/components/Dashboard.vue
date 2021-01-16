<template>
    <div>
        <h1>Welcome, {{getUser().displayName}}</h1>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: "Dashboard",
    data(){
        return{
           
        }
    },
    methods: {
        getUser(){
            let userInfo = localStorage.getItem('AuthUser')
            return JSON.parse(userInfo)
        }
    },
    mounted(){
        this.user = firebase.auth().currentUser
        console.log(this.user)
        if(this.user !== null && this.user !== undefined){
            localStorage.setItem('AuthUser', JSON.stringify(this.user))
        }        
    }
}
</script>