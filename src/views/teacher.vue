<template >
    <div class="container">

        <transition name="fade">
            <div class="overlay" v-if="is_show" @click="is_show = false"></div>
        </transition>

        <main> 
            <div class="card">
                <p>Similar post </p>
                <h2>How I recreated a Polaroid camera with CSS gradients only </h2>
            </div>

            <!-- pop up -->
            <transition name="fade">
                <div v-if="is_show" class="popup" style="z-index:6;">
                    <div class="popup-content">
                        <form @submit.prevent="insertUpdate()" class="teacherInsertForm">
                            <input type="text" required v-model="teacher_model.nama_teacher" name="nameInput" placeholder="Nama">
                            <input type="text" required v-model="teacher_model.Status" placeholder="Status">
                            <input type="text" required v-model="teacher_model.kontak_teacher" placeholder="Kontak">
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
    :root {
        --primary: #22D2A0;
        --secondary: #192824;
        --background: #192824;
        --green: #1FC11B;
        --yellow: #FFD913;
        --orange: #FF9C55;
        --red: #FF5555;
    }
    body{
        background-color:#1e272e;
        color:#ecf0f1;
    }
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
        color: #BFC0C0;
        text-decoration: none;
        letter-spacing: 1px;
        position: relative;
        overflow: hidden;
        cursor: pointer;


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
        font-family: 'Open Sans';
        border-collapse: collapse;
        width: 100%;
        }

        td, th {
        border: 2px solid var(--green);
        text-align: left;
        padding: 8px;
        }

        tr:nth-child(even) {
        background-color: #2d3436;
        }
/*This Style is For Cards */
    .card {
        background-color: var(--background);
        color: var(--primary);
        display: none;
        width: 300px;
        min-height: 90px;
        cursor: pointer;
        padding: 15px;
        margin: calc(50vh - 30px) auto 0 auto;
        border: 3px solid var(--primary);
        box-shadow: 10px -10px 0 -3px var(--background), 10px -10px var(--green),
                20px -20px 0 -3px var(--background), 20px -20px var(--yellow),
                30px -30px 0 -3px var(--background), 30px -30px var(--orange),
                40px -40px 0 -3px var(--background), 40px -40px var(--red);
    }

    .card:hover {
    animation: shadow-wave 1s ease infinite;
    }


    @keyframes shadow-wave {
    0% {
        border: 3px solid var(--primary);
        box-shadow: 10px -10px 0 -3px var(--background), 10px -10px var(--green),
        20px -20px 0 -3px var(--background), 20px -20px var(--yellow),
        30px -30px 0 -3px var(--background), 30px -30px var(--orange),
        40px -40px 0 -3px var(--background), 40px -40px var(--red);
    }
    20% {
        border: 3px solid var(--red);
        box-shadow: 10px -10px 0 -3px var(--background), 10px -10px var(--primary),
        20px -20px 0 -3px var(--background), 20px -20px var(--green),
        30px -30px 0 -3px var(--background), 30px -30px var(--yellow),
        40px -40px 0 -3px var(--background), 40px -40px var(--orange);
    }
    40%{
        border: 3px solid var(--orange);
        box-shadow: 10px -10px 0 -3px var(--background), 10px -10px var(--red),
        20px -20px 0 -3px var(--background), 20px -20px var(--primary),
        30px -30px 0 -3px var(--background), 30px -30px var(--green),
        40px -40px 0 -3px var(--background), 40px -40px var(--yellow);
    }
    60%{
        border: 3px solid var(--yellow);
        box-shadow: 10px -10px 0 -3px var(--background), 10px -10px var(--orange),
        20px -20px 0 -3px var(--background), 20px -20px var(--red),
        30px -30px 0 -3px var(--background), 30px -30px var(--primary),
        40px -40px 0 -3px var(--background), 40px -40px var(--green);
    }
    80% {
        border: 3px solid var(--green);
        box-shadow: 10px -10px 0 -3px var(--background), 10px -10px var(--yellow),
        20px -20px 0 -3px var(--background), 20px -20px var(--orange),
        30px -30px 0 -3px var(--background), 30px -30px var(--red),
        40px -40px 0 -3px var(--background), 40px -40px var(--primary);
        }
    100% {
        border: 3px solid var(--primary);
        box-shadow: 10px -10px 0 -3px var(--background), 10px -10px var(--green),
        20px -20px 0 -3px var(--background), 20px -20px var(--yellow),
        30px -30px 0 -3px var(--background), 30px -30px var(--orange),
        40px -40px 0 -3px var(--background), 40px -40px var(--red);
        }
  
    }
    .card{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    /* body {
        background-image: radial-gradient(var(--secondary) 30%, var(--background) 30%);
        background-size: 2px 3px;
        font-family: "Archivo", sans-serif;
        color: var(--primary);
    } */

    .card p {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 10px;
        color: var(--primary);
    }

    .card h2 {
        font-size: 14px;;
        font-weight: normal;
    }

    /* Button Style */
    .button {
    display: inline-flex;
    height: 40px;
    width: 150px;
    border: 2px solid #BFC0C0;
    color: #BFC0C0;
    text-transform: uppercase;
    text-decoration: none;
    font-size: .8em;
    letter-spacing: 1.5px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

a {
  color: #BFC0C0;
  text-decoration: none;
  letter-spacing: 1px;
}
    #button-5 {
        position: relative;
        overflow: hidden;
        cursor: pointer;
    }

    #button-5 a {
        position: relative;
        transition: all .45s ease-Out;
    }

    #translate {
        transform: rotate(50deg);
        width: 100%;
        height: 250%;
        left: -200px;
        top: -30px;
        background: #BFC0C0;
        position: absolute;
        transition: all .3s ease-Out;
    }

    #button-5:hover #translate {
        left: 0;
    }

    #button-5:hover a {
        color: #2D3142;
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

            axios.get(base_url+'/getTeacher.php')
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