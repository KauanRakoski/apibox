<template>
    <div>
        <Header mode="white" :img="getUser().photoURL"/>
        <main>
            <div class="basic-info">
                <img :src="getUser().photoURL" class="rounded" width="150px" height="150px">

                <div>
                    <h3>{{getUser().displayName}}</h3>
                    <span>{{getUser().uid}}</span>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Header from '../components/multi-pages/Header'

export default {
    name: "Settings",
    components:{
        Header
    },
    methods: {
        getUser(){
            return JSON.parse(localStorage.getItem('AuthUser'))
        }
    }
}
</script>

<style scoped>

.basic-info{
    display: flex;
    background-color: #EEECF1;
}
</style>