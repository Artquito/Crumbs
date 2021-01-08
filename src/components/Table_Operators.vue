<template>
    <div class="component-container">
        <h1 class ="Title" style="display:relative; margin: 0 0 0 0;margin-top:10px;">Lesson List</h1>
        <p style="margin-top:4px;">Manage curiculum lesson here</p>
        <section class="tools">
            <button class="big-button" @click="addLesson()">Add Lesson</button>
            <input class="search" type="text" name="search" v-model="searchEntry" placeholder="search" @keydown="sendSearchDataPacket()">
        </section>
    </div>    
</template>

<script>
export default {
    name:"Table_Operators",
    props:{
    },

    data() {
        return {
            searchEntry: "",
        }
    },

    methods: {


      sendSearchDataPacket(){
          this.$emit('sentDataPacket', this.searchEntry);
      },
      
      addLesson(){
          this.$emit('addLessonIsClicked', true)
      }

    },


}
</script>

<style scoped>

    .tools{
        margin: 5px 0;
        display: inline-block;
    }
    .search{
        position: relative;
        width: 20rem;
        left:10px;
        border-radius:5px;
        padding:10px 15px;
    }

    .search{
        background-color: var(--colorShadeE);
        
    }
    

</style>