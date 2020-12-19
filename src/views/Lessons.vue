<template>
    <div class="container">
        <transition name="fade">
            <div class="overlay" v-if="Lesson_Add_Is_Show" @click="Lesson_Add_Is_Show = false"></div>
    </transition>

    <main>
        <transition name="fade">
                <div v-if="Lesson_Add_Is_Show" class="popup" style="z-index:6;">
                    <div class="popup-content">
                        <form @submit.prevent="Insert_Curriculum_Data()" class="teacherInsertForm">
                            <input type="text" required v-model="Curriculum_Data_Model.Curriculum_Name" name="nameInput" placeholder="Nama">
                            <!-- <input type="text" required v-model="Curriculum_Data_Model.Curriculum_Year" placeholder="Tahun"> --
                            <!-- <input type="text" required v-model="Curriculum_Data_Model.Category_Id" placeholder="Category"> -->
                            <div class="button">
                            <button type="submit" style="background:transparent;border:none" value="tes">
                                <div class="button" id="button-5">
                                    <div id="translate" @click="Lesson_Add_Is_Show=false"></div>
                                        <a href="#">Let's Go!</a>
                            </div>
                            </button>
                            
                            </div>  
                        </form>
                    </div>
                </div>
        </transition>

        <h1>Curricullum Box</h1>

        <button @click="Curriculum_Add_Is_Show=true">Make Curricullum</button>
        <table>
            <tr>
                <th>ID</th>
                <th>Curricullum</th>
                <th>Category</th>
                <th>Year</th>
                <th>Buttons</th>
            </tr>    
            <tr v-for="(Shown_Curriculum_Data, index) in Curriculum_Data"  :key='index' >
                <td>{{Shown_Curriculum_Data.Curriculum_Id}}</td>
                <td>{{Shown_Curriculum_Data.Curriculum_Name}}</td>
                <td>{{Shown_Curriculum_Data.Category_Name}}</td>
                <td>{{Shown_Curriculum_Data.Curriculum_Year}}</td>
                <td style="display: flex; ">
                    <button class="edit">
                    edit
                    </button>
                    <button class="delete">
                    delete
                    </button>
                </td>
            </tr>
        </table>
    </main>
    </div>

</template>

<style scoped>
    
</style>

<script>
export default {
    data() {
        return {
        /* Array */
        Lesson_Data:[],

        /* Objects */
        Lesson_Data_Model:{
            Lesson_Id:"",
            Lesson_Name:"",
            Lesson_Link:"",
            Lesson_Description:"",
            Platform_Id:""

        },

        /* Variables */
        Lesson_Add_Is_Show:false,    
        }
    },
    methods: {
        
    },
    created() {
        
    },
}
</script>