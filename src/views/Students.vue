<template>
<div class="container">
    <transition name="fade">
            <div v-if="show_popup">
                <div class="popup" style="z-index:5">
                    <p style="position:absolute;right:20px;top:0;color:red;cursor:pointer;"  @click="openClosePopup()">X</p>
                    <p><b>Add Student</b></p>
                    <div class="popup-content" style="margin-top:30px">
                        <form @submit.prevent="Insert_Update_Student_Data()" class="teacherInsertForm">
                            <input type="text" required v-model="Student_Data_Catch.Student_Name" name="nameInput" placeholder="Nama">
                            <input type="text" required v-model="Student_Data_Catch.Student_Age" placeholder="Umur">
                            <input type="text" required v-model="Student_Data_Catch.Student_Contact" placeholder="Kontak">
                            <input class="rounded-button" value="Go" type="submit">
                        </form>
                    </div>
                </div>
                <div class="overlay" v-if="show_popup"  style="position:fixed" @click="openClosePopup()"></div>
            </div>

            <div v-if="show_student_progress">
                <div class="popup" style="z-index:5;width:300px">
                    <p><b>Student Progress</b></p>
                     <p style="position:absolute;right:20px;top:0;color:red;cursor:pointer;"  @click="show_student_progress = false">X</p>
                    <div v-for="item in Student_Progress" style="border:1px solid var(--backgroundColor);padding:8px 12px">
                        {{item.Curriculum_Name}}<br/>
                        {{item.Curriculum_Year}}
                    </div>
                    <div v-if="Student_Progress.length == 0" style="background-color:#FEE2E2;color:#EF4444;padding: 5px 14px;position:relative">
                        <p style="font-size:12px"><b>Students doesn't have progress yet</b></p>
                    </div>
                </div>
                <div class="overlay" v-if="show_student_progress" style="position:fixed" @click="show_student_progress = false"></div>
            </div>
    </transition>

    <main>  

        <h1>Student Management</h1>
        <button @click="openClosePopup()" class="big-button">Tambah Murid</button>
        <table style="margin-top:40px;margin-bottom:50px;">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Contact</th>
                <th>Aksi</th>
            </tr>    
            <tr v-for="(Student_Data_Instance,index) in Student_Data" >
                    <td>{{Student_Data_Instance.Student_Id}}</td>
                    <td @click="Student_Data_Catch = Student_Data_Instance; show_popup = true" style="cursor:pointer"><u>{{Student_Data_Instance.Student_Name}}</u></td>
                    <td>{{Student_Data_Instance.Student_Age}}</td>
                    <td>{{Student_Data_Instance.Student_Contact}}</td>
                    <td>
                        <div style="margin-bottom:10px;font-size:0.5rem">
                            <button class="big-button" style="margin-right:5px" @click="Student_Data_Catch = Student_Data_Instance; show_popup = true">Edit</button>
                            <button class="big-button" @click="Get_Student_Progress(Student_Data_Instance.Student_Id)">View</button>
                        </div>
                    </td>
            </tr>
        </table>
   </main> 
</div>
   
</template>

<style scoped>
/* popup style */
.fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    main{
        font-family: ;
    }

    .container{
        width: 100%;
        height:100%;
    }

    .overlay {
        background-color: #000;
        z-index:4;
        position:absolute;
        width:100%;
        height:100%;
        opacity:0.5;
    }

    .popup {
        width: 250px;
        background : #23232e;
        position:fixed;
        border-top-left-radius: 1em;
        border-top-right-radius: 1em;
        border-bottom-left-radius: .4em;
        border-bottom-right-radius: .4em;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        padding-right: 30px;
        padding-left: 30px;
        padding-bottom:30px;
        padding-top: 30px;
    }
    .popup input{
        background: #141418;
        margin-top: 10px;
        width : 100%;
        border-radius: 3.5px;
        border: none;
        height: 2.5em;
        color:#b6b6b6;
        
    }

    .popup input:last-child {
        background: #b6b6b6;
        color:black;
        width:35px;
        height:35px;
        margin-top:10px;
        border-radius: 100%;
        text-align: center;
        margin-left: auto;
        margin-right: auto;


    }

    .popup-content {
        margin-top: 10px;
    }

    input{
    display: block;
    }

    .teacherInsertForm input{
        margin-top: 15;
    }
/* table styles */
    table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
            }

            td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
            }

            tr:nth-child(even) {
            background-color: #27ae60;
            }

</style>

<script>
const axios = require('axios')
export default {
    data() {
        return {
            Student_Data:[],
            Student_Data_Catch:{
                Student_Name:"",
                Student_Age :"",
                Student_Contact:"",
                Student_Id:"",
            },
            Student_Progress : [],
            is_show: false,
            show_popup : false,
            show_student_progress : false
        }
    },
    methods: {
        Get_Student_Data:function(){
            var app = this;

            axios.get('http://localhost/CrumbsAPI/Get_Students_Data.php')
            .then(function (response){
                console.log(response.data);
                app.Student_Data = response.data;
                is_show = false;
            })
            .catch(function(error){
                console.log(error);

            });
        },

        Get_Student_Progress:function(id){
            var app = this;
            app.show_student_progress = true;
            axios.get('http://localhost/CrumbsAPI/Get_Students_Progress.php?id=' + id)
            .then(function (response){
                app.Student_Progress = response.data;
            })
            .catch(function(error){
                console.log(error);
            });
        },

        openClosePopup : function(){
            this.Student_Data_Catch = {
                Student_Name : "",
                Student_Age : "",
                Student_Contact : "",
                Student_Id:"",
            }
            if(this.show_popup == true){
                this.show_popup = false;
            }
            else{
                this.show_popup = true;
            }
        },
        Insert_Update_Student_Data:function(){

            var app = this;
            var get_parameter = "?Student_Name=" + app.Student_Data_Catch.Student_Name;//why did cleon use this instead of app?
            get_parameter     += "&Student_Contact=" + app.Student_Data_Catch.Student_Contact;
            get_parameter     += "&Student_Id=" + app.Student_Data_Catch.Student_Id;//not used yet
            get_parameter     += "&Student_Age=" + app.Student_Data_Catch.Student_Age;

            axios.get('http://localhost/CrumbsAPI/Insert_Update_Student_Data.php' + get_parameter)
            .then(function (response){
                console.log(response.data);
                app.Student_Data = response.data;
                app.Student_Data_Catch = {
                    Student_Name : "",
                    Student_Age : "",
                    Student_Contact : "",
                    Student_Id:"",
                }
                app.show_popup = false;
            })
            .catch(function(error){
                console.log(error);
                console.log("something went wrong");

            });
            
        },
    },
    created() {
        this.Get_Student_Data();
    },
    
}
</script>