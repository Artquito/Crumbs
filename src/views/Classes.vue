<template>
    <main>
        <transition name="fade">
            <div  v-if="make_session_show">
                <div class="popup" style="z-index:99">
                    <div class="popup-content">
                        <form class="teacherInsertForm" @submit.prevent="Make_New_Session()">
                            
                            <p style="padding-bottom:10px;"><b>Make New Session</b></p>

                            <!-- select teacher -->
                            <select class="select_button" required v-model="Teacher_Id">
                                <option value="null">Select Teacher</option>
                                <option :value="student.Teacher_Id" v-for="student in data.teachers">{{student.Teacher_Name}}</option>
                            </select>

                            <!-- select date -->
                            <vc-date-picker is-required v-model="Session_Date" mode="date" :model-config="modelConfig" :masks="masks" is-dark>
                                <template v-slot="{ inputValue, togglePopover }">
                                    <div class="flex items-center">
                                        <input class="select_button" style="position:relative;width:90%;color:#fff;border:1px solid rgb(118, 118, 118)" :value="inputValue"  placeholder="Select Date" @click="togglePopover({ placement: 'bottom' })" readonly/>
                                    </div>
                                </template>
                            </vc-date-picker>

                            <input required v-model="Session_Duration" class="select_button" placeholder="Duration (in Minutes)"  style="position:relative;width:90%;color:#fff;border:1px solid rgb(118, 118, 118)" type="number" />
                            
                            <!-- select time -->
                            <div style="display:flex">

                                <select class="select_button" required v-model="Hour">
                                    <option value="null">Hour</option>
                                    <option v-for="item in Generate_To(0,24)" :value="item">{{item}}</option>
                                </select>

                                <select class="select_button" required v-model="Minutes">
                                    <option value="null">Minute</option>
                                    <option v-for="item in Generate_To(0,60)" :value="item">{{item}}</option>
                                </select>

                            </div>
                            
                            <button class="big-button" @click="make_session_show = true" style="font-size:10px;" type="submit">Make Session</button>
                        </form>
                    </div>
                </div>
                <div class="overlay" @click="make_session_show = false" style="top:0;left:0;position:fixed"></div>
            </div>

            <!-- add student to session -->
            <div v-if="add_student_show">
                <div class="popup" style="z-index:99">
                    <p style="padding-bottom:10px;"><b>Students</b></p>

                    <!-- select student -->
                    <select class="select_button">
                        <option value="null">Select Student</option>
                        <option v-for="student in data.students">{{student.Student_Name}}</option>
                    </select>

                    <!-- select Curriculum -->
                    <select class="select_button" v-model="Curriculum_Id">
                        <option value="null">Select Curriculum</option>
                        <option  v-for="student in data.curriculum" :value="student.Curriculum_Id">{{student.Curriculum_Name}}</option>
                    </select>

                    <!-- select Lesson -->
                    <select class="select_button">
                        <option value="null">Select Curriculum Detail</option>
                        <option v-for="student in Curriculum_Detail">{{'Q:' + student.Quarter}} - {{'W:' + student.Week}} {{student.Lesson_Name}} </option>
                    </select>

                    <button class="big-button" @click="make_session_show = true" style="font-size:10px;margin-bottom:10px;" type="submit">Add Student</button>
                
                </div>
                <div class="overlay" @click="add_student_show = false" style="top:0;left:0;position:fixed"></div>
            </div>

        </transition>
    
        <h1>Class Management</h1>
        <button class="big-button" style="margin-right:10px;">Start a Session</button>
        <button class="big-button" @click="make_session_show = true">Make a Session</button>
        
        <h3 style="margin-top:60px;margin-bottom:-40px">On Progress</h3>
        <section class="card-list" style="margin-left:-50px;z-index:0">
            <article class="card" v-for="(To_Show_Session_Data, Session_Data_Index) in Session_Card_Data" :key="Session_Data_Index">
                <header class="card-header">
                    <h2 class="card-header-item">{{To_Show_Session_Data.Session_Date}}</h2>
                    <h3 class="card-header-item">{{To_Show_Session_Data.Session_Time}}</h3>
                    <p class="card-header-item">{{To_Show_Session_Data.Session_Durration + " Minutes"}}</p>
                </header>

                <div class="card-author">
                    <a class="author-avatar" href="#">
                        <img src="../assets/avatar.png" />
                    </a>
                    <svg class="half-circle" viewBox="0 0 106 57"><path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path></svg>

                    <div class="author-name">
                        <div class="author-name-prefix">Teacher</div>
                        {{To_Show_Session_Data.Teacher_Name}}
                    </div>
                </div>
                
                <div class="tags">
                    <a @click="Open_Add_Student(To_Show_Session_Data.Session_Id)" style="margin-right:5px">Add Student</a>
                    <a href="#" style="margin-right:5px" >Student List</a><br/>
                    <a href="#" style="margin-right:5px">Reasign Teacher</a>
                    <a href="#" style="margin-right:5px">Terminate</a>
                </div>
            </article>
        </section>
    </main>
</template>

<style scoped>
.card-header .card-header-item:not(:first-child){
    width:6rem;

}
h3{
    margin-top:5px;
    margin-bottom:0;
    cursor: pointer;
}
h3:hover{}

a {
    text-decoration: none;
}

.card-list {
    display: flex;
    padding: 3rem;
    overflow-x: scroll;
}

.card-list::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}
/* body::-webkit-scrollbar{
      width: 0.25rem;
  } */
.card-list::-webkit-scrollbar-thumb {
    background: #6649b8;
    border-radius: 10px;
    box-shadow: inset 2px 2px 2px hsla(0,0%,100%,.25), inset -2px -2px 2px rgba(0,0,0,.25);
}

.card-list::-webkit-scrollbar-track {
    background: #1e1e24;
}


.card {
    z-index: 0;
    height: 350px;
    width: 400px;
    min-width: 250px;
    padding: 1.5rem;
    border-radius: 16px;
    background: #17141d;
    box-shadow: -1rem 0 3rem #000;
    display: flex;
    flex-direction: column;
    transition: .2s;
    margin: 0;
    margin-top: 25px;
    scroll-snap-align: start;
    clear: both;
    position: relative;
}

.card:focus-within~.card, .card:hover~.card {
    transform: translateX(130px);
}

.card:hover {
    transform: translateY(-1rem);
}

.card:not(:first-child) {
    margin-left: -130px;
}


.card-header {
    margin-bottom: auto;
}

.card-header p {
    font-size: 14px;
    margin: 0 0 1rem;
    cursor: pointer;
    color: #7a7a8c;
}

.card-header h2 {
    font-size: 20px;
    margin: .25rem 0 auto;
    text-decoration: none;
    color: inherit;
    border: 0;
    display: inline-block;
    cursor: pointer;
}

.card-header .card-header-item:hover {
    background: linear-gradient(90deg,#ff8a00,#e52e71);
    text-shadow: none;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
}

.card-author {
    margin: 3rem 0 0;
    display: grid;
    grid-template-columns: 75px 1fr;
    align-items: center;
    position: relative;
}

.author-avatar {
    grid-area: auto;
    align-self: start;
    position: relative;
    box-sizing: border-box;
}

.author-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    filter: grayscale(100%);
    display: block;
    overflow: hidden;
    margin: 16px 10px;
}

.author-name {
    grid-area: auto;
    box-sizing: border-box;
}

.author-name-prefix {
    font-style: normal;
    font-weight: 700;
    color: #7a7a8c;
}

.half-circle {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 48px;
    fill: none;
    stroke: #ff8a00;
    stroke-width: 8;
    stroke-linecap: round;
    pointer-events: none;
}

.tags, image {
    margin: 1rem 0 2rem;
    padding: .5rem 0 1rem;
    line-height: 2;
    margin-bottom: 0;
}

.tags a {
    font-style: normal;
    font-weight: 700;
    font-size: .5rem;
    color: #7a7a8c;
    text-transform: uppercase;
    font-size: .66rem;
    border: 3px solid #2d6856;
    border-radius: 2rem;
    padding: .2rem .85rem .25rem;
    position: relative;
}

.tags a:hover {
    background: linear-gradient(90deg,#ff8a00,#e52e71);
    text-shadow: none;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-box-decoration-break: clone;
    background-clip: text;
    border-color: white;
}
/* this is the rainbow card code */
.card {
        background-color: var(--background);
        color: var(--primary);
        border: 3px solid var(--primary);
    }

    .card:hover {
    box-shadow: 10px -10px 0 -3px var(--background), 10px -10px var(--green),
                20px -20px 0 -3px var(--background), 20px -20px var(--yellow),
                30px -30px 0 -3px var(--background), 30px -30px var(--orange);
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
    body {
        background-image: radial-gradient(var(--secondary) 30%, var(--background) 30%);
        background-size: 2px 3px;
        font-family: "Archivo", sans-serif;
        color: var(--primary);
    }
    /*table style*/

    .select_button{
        background:transparent; 
        width:100%;
        color:#adadad;;
        padding:10px 11px;
        margin-bottom:10px;
    }
</style>

<script>
import { base_url } from '../functions/global';
const axios = require('axios');

export default {
data() {
    return {

        // new session data
        Teacher_Id : null,
        Session_Date : "",
        Session_Duration : "",
        Minutes : null,
        Hour : null,

        // curriculum bind
        Curriculum_Id : null,
        Session_Id : null,

        Student_Data:[],
        Session_Card_Data:[],
        Curriculum_Detail : [],

        Student_Data_Catch:{
            Student_Id     :"",
            Student_Name   :"",
            Student_Contact:"",
            Student_Age    :"",
        },
        Session_Card_Data_Model:{

        },

        data : [],
        modelConfig: {
            type: 'string',
            mask: 'YYYY-MM-DD',
        },

        masks : {
            input: 'DD-MM-YYYY',
        },

        make_session_show : false,
        add_student_show : false,
        list_student_show : false
    }
},

watch : {

    Curriculum_Id : function(oldval, newval){
        var app = this;
        let url = base_url + '/Get_Curriculum_Detail.php?id=' + this.Curriculum_Id;

        axios.get(url)
             .then(response => {
                 app.Curriculum_Detail = response.data;
                 console.log(response.data);
             })
    }

},

methods: {
    
    Open_Add_Student : function(id){
        this.add_student_show = true;
        this.Session_Id = id;
    },
    
    Get_Session_Card_Data(){
        var app = this;
        axios.get(base_url + '/Get_Session_Data.php')
        .then(function(response){
            app.Session_Card_Data=response.data;
            console.log(response.data);
        })
        .catch(function(error){
            console.log();
        });
    },

    Generate_To : function(from, to){
        var data = [];
        for(from; from <= to; from++){
            data[from] = from;
        }
        return data;
    },

    Get_Class_Data:function(){
        var app = this;
        axios.get(base_url + '/Get_Session_Requirenment.php')
             .then(response => {
                 app.data = response.data;
                 console.log(app.data);
             })

    },

    Add_Student : function(){
        var app = this;
        var get_parameter  = "?Teacher_Id=" + this.Teacher_Id;
    },

    Make_New_Session : function(){
        var app = this;
        var get_parameter  = "?Teacher_Id=" + this.Teacher_Id;
        get_parameter     += "&Session_Date=" + this.Session_Date;
        get_parameter     += "&Session_Duration=" + this.Session_Duration;
        get_parameter     += "&Session_Time=" + this.Hour + ":" + this.Minutes + ":00.0000";
        var url = base_url + '/Make_New_Session.php' + get_parameter;
 
        axios.get(base_url + '/Make_New_Session.php' + get_parameter)
             .then(response => {
                alert("Session Created Successfully!");
                app.Session_Card_Data=response.data;
                app.make_session_show = false;
                console.log(response.data);
             });
    },


    Insert_Upadate_Student_Data:function(){
        console.log("Hi,I insert and update student data, I'm not yet complete, ehe :')");
    }


},

created() {
    this.Get_Session_Card_Data();
    this.Get_Class_Data();
},

}


</script>