<template>
    <div>
        <Header/>
        <div class="hello">
            <h1>Welcome, {{getUser().displayName}}.</h1>
            <h2>Here are your tasks: </h2>
        </div>

        <div class="tasks">
            <div class="task">
                <div class="content">
                    <h2 class="task-title">Lamp 1</h2>
                    <p>Turns on and off lamp 1</p>
                </div>
                <div class="key">
                    <Button type="slider"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import Header from '../components/Header'
import Button from '../components/Button'
export default {
    name: "Dashboard",
    components: {
        Header, 
        Button
    },
    data(){
        return{
           fetchUrl: 'https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io/get/'
        }
    },
    methods: {
        getUser(){
            let userInfo = localStorage.getItem('AuthUser')
            return JSON.parse(userInfo)
        },
        fetchUserData(user){
            let tasks = fetch(`${this.fetchUrl + user}`, {method: 'POST'})
            console.log(tasks)
        }
    },
    mounted(){
        this.user = firebase.auth().currentUser
        
        if(this.user !== null && this.user !== undefined){
            localStorage.setItem('AuthUser', JSON.stringify(this.user))
            this.fetchUserData(this.user.email)            
        }else{
            this.fetchUserData(this.getUser().email)  
        }       
    }
}
</script>

<style>
.hello{
    padding: 1.5em 1em;
    font-family: "Inter", sans-serif;
    
}
h1{
    font-weight: 400;
    font-size: 30px; 
    margin-bottom: 9px;
}
h2{
    font-weight: 300;
    font-size: 25px; 
}
.tasks{
    padding: 1em;
}
.task{
    height: 200px;
    padding: 0 2em;
    border-radius: 8px;
    border: 1px solid #EAECEF;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.task .content{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.task .content h2{
    font-family: "Inter", sans-serif;
    margin-bottom: 15px;
    font-weight: 500;
}
.task .content p{
    font-family: "Inter", sans-serif;
    font-size: 20px;
}
</style>
