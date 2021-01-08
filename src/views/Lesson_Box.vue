<template>
    <div class="component-container">
        <transition name="fade">
            <div class="overlay" v-if="addLessonIsShow" @click="addLessonIsShow = false"></div>
        </transition>
        <main>
            <tableOperators v-on:sentDataPacket="getSearchData($event)" v-on:addLessonIsClicked="getLessonState($event)" :props="search"></tableOperators>
            <lessonTable :lessonBoxParcel="filteredLesson" style="margin-top:30px"></lessonTable>
            <lessonForm v-on:lessonEntry="insertLesson($event)" :lessonBoxParcel2="lessons.lessons" :platformBoxParcel="lessons.platform" :lessonIsShow="addLessonIsShow"></lessonForm>
        </main>
    </div>
</template>


<script>

import lessonTable    from '@/components/Lesson_Box_Table.vue'
import tableOperators from '@/components/Table_Operators.vue'
import lessonForm     from '@/components/Add_Lesson_Form.vue'
import { base_url } from '../functions/global';
const axios = require('axios');

export default {
    name        :'Lesson_Box',
    components  :{
        lessonTable,
        tableOperators,
        lessonForm,
    },


    data() {
        return {
            lessons         :[],
            search          :"",
            lessonParcel    : [],
            addLessonIsShow : false,
        }
    },


    methods:{

        getLessonsDataFromDB(){
            var app = this;
            axios.get(base_url+'/lessonBoxGetData.php')
            .then(response=>{
                console.log("response returned : " + response.Lesson_Name);
                console.log(response);
                app.lessons = response.data;
                app.lessonParcel = app.lessons.lessons;
                // console.log("lesson object");
                // console.log(app.lessons);
            })
            .catch(error=>{
                console.log("something went wrong :");
                console.log(error);
            });
        },

        getSearchData(searchData){
            console.log("You Searched for :");
            console.log(searchData);
            this.search = searchData;
        },

        getLessonState($event){
            this.addLessonIsShow = true;
        },

        insertLesson(lessonDataModel){
            console.log("Data:");
            console.log(lessonDataModel);
            var app= this;
            var Get_Parameter  = "?Lesson_Id ="             +lessonDataModel.Lesson_Id;
            Get_Parameter     += "&Lesson_Name="            +lessonDataModel.Lesson_Name;
            Get_Parameter     += "&Lesson_Link="            +lessonDataModel.Lesson_Link;
            Get_Parameter     += "&Lesson_Description="     +lessonDataModel.Lesson_Description;
            Get_Parameter     += "&Platform_Id="            +lessonDataModel.Platform_Id;

            axios.get(base_url+'/insertLessonData.php'+Get_Parameter)
            .then(function(response){
                console.log(response);
                app.lessons           = response.data;
                app.lessonParcel      = response.data.lessons;
                app.lessonBoxParcel   = response.data.lessons;
                app.platformBoxParcel = response.data.plataform;
                app.addLessonIsShow   = false;
                app.lessonIsShow      = false;
            })
            .catch(function(error){
                console.log(error);
            });

        }


    },

      computed: {
    
       
       filteredLesson(){
            return this.lessonParcel.filter(data => {
                return data.Lesson_Name.toLowerCase().includes(this.search.toLowerCase());
            });

        },


    },

    created(){
        this.getLessonsDataFromDB();

    },
}
</script>