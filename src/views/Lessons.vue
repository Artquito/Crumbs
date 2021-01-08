<template>
    <div class="container">
        <transition @click="Lesson_Add_Is_Show = true" name="fade">
            <div class="overlay" v-if="Lesson_Add_Is_Show" @click="Lesson_Add_Is_Show = false"></div>
        </transition>

        <main>
            <transition class="Lesson-Adder" name="fade">
                    <!-- this is the lesson adder popup -->
                    <div v-if="Lesson_Add_Is_Show" class="popup" style="z-index:6;">
                        <div class="popup-content" style="padding : 2rem 2rem;">
                            <form @submit.prevent="Insert_Update_Curriculum_Lesson_Data()" class="teacherInsertForm">
                                <!-- <div @click="Class_Picker_Is_Show=true, Lesson_Add_Is_Show=false" class="class-picker">
                                    <p>{{Lesson_Data_Model.Lesson_Name}}</p>
                                </div> -->
                                <input  class = "input-field class-picker" type="text"      v-model="Lesson_Data_Model.Lesson_Name"             required    placeholder="Lessons" @click="Class_Picker_Is_Show=true, Lesson_Add_Is_Show=false">
                                <input  class = "input-field"              type="text"      v-model="Curriculum_Detail_Data_Model.Week"         required    placeholder="Week">
                                <input  class = "input-field"               type="text"     v-model="Curriculum_Detail_Data_Model.Quarter"      required    placeholder="Quarter">
                                
                                <div class="milestone-checkbox">
                                    <input name="milestone-checkbox" class = "input-field" type="checkbox" v-model="Is_a_Milestone" @click="Set_Milestone()">
                                    <label for="milestone-checkbox">Is a Milestone</label><br>
                                </div>

                                <input  class = "input-field" style="margin-bottom:10px;" v-if="Is_a_Milestone" type="text" :value="Curriculum_Detail_Data_Model.Milestone_Name" placeholder="Milestone" @click="Milestoone_Picker_Is_Show = true, Lesson_Add_Is_Show= false">
                            
                                <div class="button">
                                    <button type="submit" style="background:transparent;border:none" value="tes">
                                        <div class="button" id="button-5">
                                            <div id="translate"></div>
                                                <a href="#">Let's Go!</a>
                                        </div>
                                    </button>

                                </div> 

                            </form>
                        </div>
                    </div>
            </transition>

            <transition @click="Class_Picker_Is_Show = true" name="fade">
                <div class="overlay" v-if="Class_Picker_Is_Show" @click="Class_Picker_Is_Show = false"></div>
            </transition>
            <transition class="Class-Picker" name="fade">
                    <!-- this is the class picker component -->
                    <div v-if="Class_Picker_Is_Show" class="popup" style="z-index:6;">
                        <div class="popup-content">
                            <div class="search">
                                <input type="text" v-model="Lesson_Search" placeholder="Search">
                            </div>
                            <ul class="class-item">
                                <li v-for="(To_Show_Lesson_Name_Data,studentIndex) in filteredLesson" :key="studentIndex"
                                @click="Get_Lesson_Data_Index(To_Show_Lesson_Name_Data)">
                                    <div class="lesson-item" :style="{border : '2px solid ' + To_Show_Lesson_Name_Data.color}" style="padding:5px">
                                        <p :style="{color : To_Show_Lesson_Name_Data.color}">
                                        {{'Lesson : '+To_Show_Lesson_Name_Data.Lesson_Name}}
                                        </p>
                                        <p style="font-size:10px;font-weight:bold">DESCRIPTION<p>
                                        <p style="font-size:12px;opacity:0.6">{{To_Show_Lesson_Name_Data.Lesson_Description}}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
            </transition>
            <transition class="Milestone-Picker" name="fade">
                    <!-- this is the milestone picker component -->
                    <div v-if="Milestoone_Picker_Is_Show" style="z-index:10;" class=popup>
                        <div class="popup-content">
                            <div class="search">
                                <input type="text" v-model="Milestone_Search" placeholder="Search">
                            </div>
                            <ul>
                                <li v-for="(To_Show_Milestone_Name_Data,Milestone_Index) in filteredMilestone" :key="Milestone_Index"
                                @click="Get_Milestone_Data_Index(To_Show_Milestone_Name_Data)">
                                    <p :style="{border : '2px solid ' + Generate_Color()} "
                                    >{{To_Show_Milestone_Name_Data.Milestone_Name}} 
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>   
            </transition>
            <div class="fixed_element" style="position:fixed; top:0; background:#1e272e; width:100%; padding-bottom:20px">
                <h1 style="margin-bottom: 0;">Lesson Box</h1>
                <h2 style="margin: 0em 0 .5em 0;">{{Show_Curriculum_Data()}}</h2>

                <button @click="Lesson_Add_Is_Show=true" class="big-button">Add a Lesson</button>
            </div>
            
            <table style="margin-top:170px;">
                <tr>
                    <th>Num</th>
                    <th>Quarter</th>
                    <th>Week</th>
                    <th>Lesson</th>
                    <th>Link</th>
                    <th>Description</th>
                    <th>Platform</th>
                    <th>Buttons</th>
                </tr>
                <tbody>  

                    <tr v-for="(To_Show_Lesson_Data,index) in Lesson_Data.curiculum " :key="index">
                        <td>{{index+1}}</td>
                        <td style="text-align:center; white-space:nowrap;">{{"Quarter-"+To_Show_Lesson_Data.Quarter}}</td>
                        <td style="teext-align:center; white-space: nowrap;">{{"Week-" + To_Show_Lesson_Data.Week}}</td>
                        <td style="white-space: nowrap">{{To_Show_Lesson_Data.Lesson_Name}}</td>
                        <td><a :href="To_Show_Lesson_Data.Lesson_Link">{{To_Show_Lesson_Data.Lesson_Link}}</a></td>
                        <td>{{To_Show_Lesson_Data.Lesson_Description}}</td>
                        <td>{{To_Show_Lesson_Data.Platform_Name}}</td>
                        <td>
                            <div class="button_container">
                            <button class="edit">
                            edit
                            </button>
                            <button class="delete" @click="deleteLesson(To_Show_Lesson_Data)">
                            delete
                            </button>
                            </div>
                            
                        </td>

                    </tr>
                </tbody>
            </table>
        </main>
    </div>

</template>

<style scoped>
    input {
        margin-top: 10px;
    }
    .milestone-checkbox{
        padding: 1px 2px;
        margin-top:5px;
        margin-bottom: 20px;
    }
    .class_Picker:hover{
        cursor: pointer;
    }

    .search{
        margin-left  : 20px;   
        border-bottom: 1px solid #496683;
        width        : 300px;
    }
    textarea:focus, input:focus{
    outline: none;
    }
    ::-webkit-input-placeholder {
    font-style: italic;
    }
    .search input{
        border-radius: 0%;
        background: none;
        display: block;
        margin-left: .6em;
        font-size: 1em;
        width: 20em;
        height: 2em;
    }

    .popup{
        width      : 350px;
        height     : 400px;
        background : #2c3e50;
        position   : absolute;
        border-top-left-radius: 1em;
        border-top-right-radius: 1em;
        border-bottom-left-radius: .4em;
        border-bottom-right-radius: .4em;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        padding: 0;
    }

    .popup-content ul{
        margin-right:20px;
        margin-left: 20px;
        padding: 0px;
    }

    .popup-content li :hover{
        cursor: pointer;

    }
    
    .class-item{
        padding: 0;
        height: 18rem;
        overflow-y: scroll ;
    }

    .is-a-milestone{
        display: inline-block;
    }

    ul p{
        padding:10px;
    }

    ul{
        list-style-type: none;
    }

    .lesson-item {
        display : relative;
        height  : 8rem;
        margin-right: 10px;
        margin-top:0;
        overflow-y: scroll;
        overflow-x: hidden;
        
    }
    .lesson-item::-webkit-scrollbar{
      width: 0.25rem;
    }

    .lesson-item::-webkit-scrollbar-track{
        background: #1e1e24;
    }

    .lesson-item::-webkit-scrollbar-thumb{
        background: #6c6483;
    }
    .class-item::-webkit-scrollbar {
    width: 0.25rem;
    height: 10px;
    }

    .class-item::-webkit-scrollbar-thumb {
        background: #938ea3;
        border-radius: 10px;
    }

    .class-item::-webkit-scrollbar-track {
        background: #1e1e24;
    }

    .lesson-item p{
        display: relative;
        margin-top:.5rem;
        margin-bottom: .5rem;
        margin-left: .7rem;
        margin-right: .7rem;
        padding: 0px;
        white-space: wrap;
        
    }
    .lesson-item:last-child{
        text-align: justify;
        margin-top: 1rem;
    }
    

/*not*/
    .button_container{
        display: flex;
    }
    button{
        margin-bottom: 5px;
    }
    .button button{
    margin: 10px 10px 10px 10px;
    }


/* this is the table style */


table   {
            font-family: arial, sans-serif;
            width: 100%;
            height: 100%;
            overflow-y: scroll;
        }

        td, th {
            border: 2px solid #2ecc71;
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #2d3436;
        }
</style>

<script>

import { base_url } from '../functions/global'
const axios = require('axios');

export default {
    data() {
        return {
        /* Array */
        Lesson_Data    : [],
        Lesson_List    : [],
        Milestone_List : [],

        /* Objects */
        Curriculum_Header:{
            Curriculum_Name:this.$route.params.Curriculum_Name,
            Curriuculum_Year:this.$route.params.Curriculum_Year,
        },

        Curriculum_Detail_Data_Model:{
            Curriculum_Detail_Id :"",
            Lesson_Id            :"",
            Curriculum_Id        :this.$route.params.Id,
            Milestone_Id         :"",
            Milestone_Name       :"",
            Quarter              :"",
            Week                 :"",
        },

        Lesson_Data_Model:{
            Lesson_Id          :"",
            Lesson_Name        :"",
            Lesson_Link        :"",
            Lesson_Description :"",
            Platform_Id        :""

        },

        /* Variables */
        Class_Picker_Is_Show        :false,
        Lesson_Add_Is_Show          :false,
        Lesson_Search               :"",
        Is_a_Milestone              :false,
        Milestoone_Picker_Is_Show   :false,
        Milestone_Search            :"",
        Previous_Number             :0,
        }
    },
    computed: {
        filteredLesson(){
            return this.Lesson_List.filter(data => {
                return data.Lesson_Name.toLowerCase().includes(this.Lesson_Search.toLowerCase());
            });
        },

        filteredMilestone(){
            return this.Milestone_List.filter(data =>{
                return data.Milestone_Name.toLowerCase().includes(this.Milestone_Search.toLowerCase());
            });
        },
    },
    methods: {

        Set_Milestone:function(){
            var app = this;
            console.log("Set_Milestone()--Fire!");

            // resetting milestone on uncheck
            if(this.Is_a_Milestone == true){
                this.Curriculum_Detail_Data_Model.Milestone_Id = "";
                this.Curriculum_Detail_Data_Model.Milestone_Name = "";
            }

            console.log(this.Curriculum_Detail_Data_Model);
        },

        Show_Curriculum_Data:function() {
            var str = this.Curriculum_Header.Curriuculum_Year;
            str     = str.split("-" );
            var Curriculum_Parameter=  this.Curriculum_Header.Curriculum_Name + " - " 
            Curriculum_Parameter+= str[2];
            return Curriculum_Parameter;
        },

        Get_Lesson_Data_Index:function(Lesson_Data){
            this.Lesson_Data_Model = Lesson_Data;
            this.Curriculum_Detail_Data_Model.Lesson_Id = Lesson_Data.Lesson_Id;
            this.Class_Picker_Is_Show=false;
            this.Lesson_Add_Is_Show=true;
                  
        },

        Get_Milestone_Data_Index:function(Milestone_Data){
            console.log("Get_Milestone_Data_Index  Fire!");
            console.log("Milestone_Data :");
            console.log(Milestone_Data);
            this.Curriculum_Detail_Data_Model.Milestone_Id   = Milestone_Data.Milestone_Id;
            this.Curriculum_Detail_Data_Model.Milestone_Name = Milestone_Data.Milestone_Name;
            this.Milestoone_Picker_Is_Show                  = false;
            this.Lesson_Add_Is_Show                         = true;
            console.log(this.Curriculum_Detail_Data_Model);
        },

        Generate_Color : function(){
            var Color_Hex = ["#ff6188", "#fc9867", "#a9dc76", "#78dce8", "#ab9df2"];
            var random_Number = Math.floor(Math.random() * 5);
            return Color_Hex[random_Number];
        },

        Insert_Update_Curriculum_Lesson_Data:function(){
            // console.log(this.Curriculum_Detail_Data_Model);
            var app=this;
            var Get_Parameter =    "?Curriculum_Detail_Id="    + app.Curriculum_Detail_Data_Model.Curriculum_Detail_Id;
            Get_Parameter     +=    "&Lesson_Id="              + app.Curriculum_Detail_Data_Model.Lesson_Id;
            Get_Parameter     +=    "&Curriculum_Id="          + app.Curriculum_Detail_Data_Model.Curriculum_Id;
            
            if(app.Is_a_Milestone){
                Get_Parameter     +=    "&Milestone_Id="            + app.Curriculum_Detail_Data_Model.Milestone_Id;
            }

            Get_Parameter     +=    "&Quarter="                 + app.Curriculum_Detail_Data_Model.Quarter;
            Get_Parameter     +=    "&Week="                    + app.Curriculum_Detail_Data_Model.Week; 

            axios.get(base_url+"/Insert_Update_Curriculum_Lesson_Data.php" +Get_Parameter)
            .then(function(response){
                console.log(response);
                app.Curriculum_Detail_Data_Model.Curriculum_Detail_Id = "";
                app.Curriculum_Detail_Data_Model.Lesson_Id = "";
                app.Curriculum_Detail_Data_Model.Milestone_Id = "";
                app.Curriculum_Detail_Data_Model.Quarter = "";
                app.Curriculum_Detail_Data_Model.Week = "";

                app.Lesson_Data_Model.Lesson_Id="";
                app.Lesson_Data_Model.Lesson_Name="";
                app.Lesson_Data_Model.Lesson_Link="";
                app.Lesson_Data_Model.Lesson_Description="";
                app.Lesson_Data_Model.Lesson_Id="";

                app.Lesson_Data    = response.data;
                app.Milestone_List = response.data.milestones;
                app.Lesson_List    = response.data.lessons;
                app.Lesson_Add_Is_Show = false;

                for(let i = 0; i < app.Lesson_List.length; i++){
                    app.Lesson_List[i].color = app.Generate_Color();    
                }
            })
            .catch(function(error){
                console.log(error);
                console.log("something went wrong");
            });
        },

        deleteLesson : function(data){
            var app = this;
            var get_parameter = data.Curiculum_Detail_Id;
            axios.get(base_url+"/deleteLessonFromCuriculum.php?id=" + get_parameter)
                 .then(response => {
                    alert("Lesson deleted successfully!");
                    app.Lesson_Data    = response.data;
                    app.Milestone_List = response.data.milestones;
                    app.Lesson_List    = response.data.lessons;
                 })

        },

        Get_Lesson_Data:function(){
            var app=this;
            var Get_Parameter = "?Curriculum_Id=" + app.Curriculum_Detail_Data_Model.Curriculum_Id;
            axios.get(base_url+"/Get_Lessons_Data.php" + Get_Parameter)
            .then(function(response){
                console.log(response.data);
                app.Lesson_Data    = response.data;
                app.Milestone_List = response.data.milestones;
                app.Lesson_List    = response.data.lessons;

                for(let i = 0; i < app.Lesson_List.length; i++){
                    app.Lesson_List[i].color = app.Generate_Color();    
                }
            })
            .catch(function(error){
                console.log(error);
                
            });
        },

    },
    created() {
        console.log(this.Curriculum_Detail_Data_Model.Curriculum_Id);
        this.Get_Lesson_Data();
    },
}
</script>