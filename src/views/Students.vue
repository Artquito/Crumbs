<template>
<div class="container">
    <transition name="fade">
            <div class="overlay" v-if="is_show" @click="is_show = false"></div>
    </transition>

    <main>  
        <div class="popup">
            <div class="popup-content">
                <form @submit.prevent="Insert_Update_Student_Data()" class="teacherInsertForm">
                    <input type="text" required v-model="Student_Data_Catch.Student_Name" name="nameInput" placeholder="Nama">
                    <input type="text" required v-model="Student_Data_Catch.Student_Age" placeholder="Umur">
                    <input type="text" required v-model="Student_Data_Catch.Student_Contact" placeholder="Kontak">
                    <input class="rounded-button" value="Go" type="submit">
                </form>
            </div>
        </div>
        
       <h1>Student Management</h1>
        <button>Tambah Murid</button>
        <button></button>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Contact</th>
            </tr>    
            <tr v-for="(Student_Data_Instance,index) in Student_Data" @click="Student_Data_Catch = Student_Data_Instance">
                    <td>{{Student_Data_Instance.Student_Id}}</td>
                    <td>{{Student_Data_Instance.Student_Name}}</td>
                    <td>{{Student_Data_Instance.Student_Age}}</td>
                    <td>{{Student_Data_Instance.Student_Contact}}</td>
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
        box-shadow: 0 2px 15px rgba(64,64,64,.7);
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
            background-color: #dddddd;
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
            is_show: false,
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
                app.is_show = false;
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