<template>
    <div>
        <Header mode="white" :img="getUser().photoURL"/>
        <main>
            <div class="basic-info">
                <img :src="getUser().photoURL" class="rounded" width="150px" height="150px">

                <div>
                    <h3>{{getUser().displayName}}</h3>
                    <p><span>id:</span>{{getUser().uid}}</p>
                </div>
            </div>

            <div class="routes rounded shadow">
                <h3>Here are your routes:</h3>
                <div class="route-container" v-for="router in usR" :key="router">
                    <p>{{router.route}}</p>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Header from '../components/multi-pages/Header'
import axios from 'axios'

export default {
    name: "Settings",
    components:{
        Header
    },
    data(){
        return {
            usR: null
        }
    },
    methods: {
        getUser(){
            return JSON.parse(localStorage.getItem('AuthUser'))
        }
    },
    mounted(){
         axios.post(
          "https://3030-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io/api/get-routes",
          { author: this.getUser().uid}
        ).then((routes) => {this.usR = routes.data})
    }
}
</script>

<style scoped>
main{
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.basic-info{
    display: flex;
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 2px 2px 4px rgb(164, 164, 164);
    width: 500px;
}
.basic-info h3{
    font-family: "Inter", sans-serif;
    margin-top: 10px;
    margin-left: 10px;
}
.basic-info p{
    margin-left: 15px;
    font-family: "Inter", sans-serif;
}
.basic-info p span{
    font-weight: 500;
} 
.routes{
    margin-top: 20px;
    width: 500px;
    padding: 1em;
}
.routes h3{
    font-family: "Inter", sans-serif;
    margin-top: 10px;
    margin-left: 10px;
}
.routes p{
    margin: 1px solid gray;
    padding: 0.1em;
    margin-left: 16px;
    font-family: "Inter", sans-serif;
}
.route-container{
    border: 0.7px solid rgb(207, 206, 206);
    display: flex;
    align-items: center;
}
</style>