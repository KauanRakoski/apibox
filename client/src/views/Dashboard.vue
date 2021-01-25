<template>
    <div>
        <Header/>
        <div class="hello">
            <h1>Welcome, {{getUser().displayName}}.</h1>
            <h2>Here are your tasks: </h2>
        </div>

        <div class="tasks">
            <div class="task-container" v-for="task in UserTasks" :key="task">
                <Task v-bind:content="task"/>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import Header from '../components/Header'
import Task from '../components/Task'

export default {
    name: "Dashboard",
    components: {
        Header, 
        Task
    },
    data(){
        return{
           fetchUrl: 'https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io/getdata/',
           UserTasks: []
        }
    },
    methods: {
        getUser(){
            let userInfo = localStorage.getItem('AuthUser')
            return JSON.parse(userInfo)
        },
        async fetchUserData(user){
            let tasks = await fetch(`${this.fetchUrl + user}/`, {method: 'POST'})
            let json = await tasks.json()
            
            this.UserTasks = json
        }
    },
    mounted(){
        this.user = firebase.auth().currentUser
        
        if(this.user !== null && this.user !== undefined){
            localStorage.setItem('AuthUser', JSON.stringify(this.user))
            this.fetchUserData(this.user.uid)            
        }else{
            this.fetchUserData(this.getUser().uid)  
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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.task-container{
    margin-bottom: 1em;
}
</style>
