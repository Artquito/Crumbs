<template >
    <div class="container">

        <transition name="fade">
            <div class="overlay" v-if="is_show" @click="is_show = false"></div>
        </transition>

        <main> 

            <!-- pop up -->
            <transition name="fade">
                <div v-if="is_show" class="popup" style="z-index:6;">
                    <div class="popup-content">
                        <form @submit.prevent="insertUpdate()" class="teacherInsertForm">
                            <input type="text" required v-model="teacher_model.nama_teacher" name="nameInput" placeholder="Nama">
                            <input type="text" required v-model="teacher_model.Status" placeholder="Status">
                            <input type="text" required v-model="teacher_model.kontak_teacher" placeholder="Kontak">
                            <input class="rounded-button" value="Go" type="submit">
                        </form>
                    </div>
                </div>
            </transition>

            <!-- table -->
            <h1>Teacher Management</h1>
            <button @click="is_show=true">Tambah</button>
            <button @click="is_show=true">Assign</button>

            <table>
                <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Status</th>
                    <th>Kontak</th>
                </tr>    
                <tr v-for="(teacher,index) in TeacherData" @click="teacher_model = teacher">
                    <td>{{teacher.Teacher_Id}}</td>
                    <td>{{teacher.Teacher_Name}}</td>
                    <td>{{teacher.Teacher_Status}}</td>
                    <td>{{teacher.Teacher_Contact}}</td>
                </tr>
            </table>

        </main>
    
    </div>

</template>

<style>

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
/*this is the style for the tabel */
    
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

    import {base_url} from '../functions/global.js';

    const axios = require('axios');
    export default {
    data(){
        return{
            TeacherData:[],
            is_show:false,
            teacher_model : {
                nama_teacher   : "",
                Status         : "",
                kontak_teacher : "",
                Id_teacher : ""
            },
        }
    },
    methods: {
        getData:function(){
            var app = this;

            axios.get(base_url + '/getTeacher.php')
            .then(function (response){
                console.log(response.data);
                app.TeacherData = response.data;
            })
            .catch(function(error){
                console.log(error);
                console.log("something went wrong");
            });
            
        },

        insertUpdate:function(){

            var app = this;
            var get_parameter = "?nama_teacher=" + app.teacher_model.nama_teacher;//why did cleon use this instead of app?
            get_parameter     += "&kontak_teacher=" + app.teacher_model.kontak_teacher;
            get_parameter     += "&Id_teacher=" + app.teacher_model.Id_teacher;
            get_parameter     += "&Status=" + app.teacher_model.Status;

            axios.get('http://localhost/CrumbsAPI/insert_updateTeacher.php' + get_parameter)
            .then(function (response){
                console.log(response.data);
                app.TeacherData = response.data;
                app.is_show = false;
            })
            .catch(function(error){
                console.log(error);
                console.log("something went wrong");
            });
            
        },
    },
    created() {
        this.getData();
  
    },
    
    }
</script>