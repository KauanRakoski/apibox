<template>
    <div>
        <div @click="toogleOptions(taskId)" class="dot-container">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
        
        <ul class="options" v-bind:id="taskId">
            <li><a>Edit</a></li>
            <li><button @click="DeleteTask()">Delete</button></li>
        </ul>
    </div>
</template>

<script>

export default {
    name: "TaskOptions",
    data(){
        return {
            BaseDelUrl: 'https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io/delete/'
        }
    },
    props: {
        taskId: String,
    },
    methods: {
        toogleOptions(id){
            let optionsMenu = document.getElementById(id)
            if(optionsMenu.style.opacity > 0) optionsMenu.style.opacity = 0
            else optionsMenu.style.opacity = 1 
        },
        getUser(){
            let userInfo = localStorage.getItem('AuthUser')
            return JSON.parse(userInfo)
        },
        async DeleteTask(){
            console.log('1')            
            this.$emit('refetchData')
            await fetch(`${this.BaseDelUrl + this.taskId}`, {method: 'POST'})
        }
    }
}
</script>

<style scoped>
.dot-container{
    margin: 10px 0 8px 75px;
    height: 21px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.dot{
    width: 5px;
    height: 5px;
    border-radius: 100%;
    background-color: black;
}
.options{
    opacity: 0;
    list-style: none;
    padding: none;   
}
.options li{
    border-radius: 3px;
    text-align: center;
    border-bottom: 1px solid rgb(187, 178, 178);
    font-family: "Inter", sans-serif;
    margin-right: 40px;
    background-color: rgb(236, 228, 228);
    padding: 0.1em 1em;
}
.options li a{
    text-decoration: none;
    cursor: pointer;
}
</style>