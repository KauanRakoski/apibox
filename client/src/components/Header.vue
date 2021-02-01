<template>
    <header>
        <div class="logo">
            <img class="logoImg" src="../assets/controlLogo.svg">
            <h2 id="logo">Control</h2>
        </div>
        

        <div id="controls">
            <router-link to="/new">
                <button class="button btn-main">New task</button>
            </router-link>

            <router-link to="/subscribe">
                <button class="button btn-main">Subscribe</button>
            </router-link>
            
            <button class="button btn-second" @click="logOut">Sign out</button>
        </div>
    </header>
</template>

<script>
import firebase from 'firebase'

export default {
    name: "Header",
    methods: {
        logOut() {
            firebase.auth().signOut()
            localStorage.removeItem('AuthUser')
        }
    }
}
</script>

<style scoped>
header{
    box-shadow: 2px 2px 4px rgba(0,0,0,.3);
    margin: 0;
    padding: 1.5em 2em;
    display: flex;
    justify-content: space-between;
}
.logo{
    display: flex;
    align-items: center;
    width: 150px;
    justify-content: space-around;
}
#logo{
    font-family: "Inter", sans-serif;
    font-weight: 300;
    font-size: 30px;
}
#controls{
    display: flex;
    width: 250px;
    justify-content: space-around;
}
</style>