<template>
    <div class="task">
                <div class="content">
                    <h2 class="task-title">{{content.name}}</h2>
                    <p>{{content.description}}</p>
                </div>
                <div class="key">
                    <Button 
                    v-bind:type="content.key" 
                    v-bind:taskID="content._id"
                    v-bind:action="content.action"/>
                </div>
            </div>
</template>

<script>
import Button from './Button'
export default {
    name: "Task",
    components:{
        Button
    },
    props: {
        content: Object
    },
}
</script>
<style scoped>
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