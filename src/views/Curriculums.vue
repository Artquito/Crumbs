<template>

<div class="container">
    <transition name="fade">
            <div class="overlay" v-if="Curriculum_Add_Is_Show" @click="Curriculum_Add_Is_Show = false"></div>
    </transition>
    <main>
        <transition name="fade">
                <div v-if="Curriculum_Add_Is_Show" class="popup" style="z-index:6;">
                    <div class="popup-content">
                        <form @submit.prevent="Insert_Curriculum_Data()" class="teacherInsertForm">
                            <input type="text" required v-model="Curriculum_Data_Model.Curriculum_Name" name="nameInput" placeholder="Nama">
                            <!-- <input type="text" required v-model="Curriculum_Data_Model.Curriculum_Year" placeholder="Tahun"> -->
                            <vc-date-picker is-required  mode="date" v-model="Curriculum_Data_Model.Curriculum_Year" :model-config="modelConfig" :masks="masks" is-dark>
                                <template v-slot="{ inputValue, togglePopover }">
                                    <div class="flex items-center">
                                    <input
                                    :value="inputValue"
                                    placeholder="Pilih tanggal"
                                    @click="togglePopover({ placement: 'bottom' })"
                                    readonly/>
                                    </div>
                                </template>
                            </vc-date-picker>
                            <!-- <input type="text" required v-model="Curriculum_Data_Model.Category_Id" placeholder="Category"> -->
                            <select  class="Category_List" v-model="Curriculum_Data_Model.Category_Id">
                                <option value="" selected disabled hidden>Curricullum Category</option>
                                <option 
                                v-for="(Category_Item,index) in Category_Data" :key='index' :value="Category_Item.Category_Id">
                                <!-- list item -->{{Category_Item.Category_Name}}
                                </option>
                            </select>

                            <div class="button" style="margin: 10px 0 15px 0">
                            <button type="submit" style="background:transparent;border:none" value="tes">
                                <div class="button" id="button-5">
                                    <div id="translate" @click="Curriculum_Add_Is_Show=false"></div>
                                        <a href="#">Let's Go!</a>
                                </div>
                            </button>
                            
                            </div>  
                        </form>
                    </div>
                </div>
        </transition>

        <h1>Curricullum List</h1>

        <button style="margin: 0 10px 10px 0px;" class="big-button" @click="Curriculum_Add_Is_Show=true">Make Curricullum</button>
        <table style="margin-top:28px;">
            <tr>
                <th>ID</th>
                <th>Curricullum</th>
                <th>Category</th>
                <th>Year</th>
                <th style="text-align:center;">Buttons</th>
            </tr>    
            <tr v-for="(Shown_Curriculum_Data, index) in Curriculum_Data"  :key='index' >
                    <td>{{Shown_Curriculum_Data.Curriculum_Id}}</td>
                    <td>
                            <router-link v-bind:to="'/lessons/' +  Shown_Curriculum_Data.Curriculum_Id + '/' + Shown_Curriculum_Data.Curriculum_Name + '/' + Shown_Curriculum_Data.Curriculum_Year" style="color: solid #ff6188;">
                                <p style="color: var(--colorShadeA); margin:0;"><b>{{Shown_Curriculum_Data.Curriculum_Name}}</b></p>
                            </router-link>
                    </td>
                    <td>{{Shown_Curriculum_Data.Category_Name}}</td>
                    <td>{{Shown_Curriculum_Data.Curriculum_Year}}</td>
                <td style="white-space:nowrap; width: 1.5rem;">
                    <button class="edit big-button" style="font-size:0.6rem;margin-right:0px" @click="alert('tes')">
                    edit
                    </button>
                    <button class="delete big-button" style="font-size:0.6rem;" @click="Delete_Curriculum_Data(Shown_Curriculum_Data.Curriculum_Id)">
                    delete
                    </button>
                </td>
            </tr>
        </table>
    </main>
</div>

</template>

<style scoped>


.Category_List{
    background: #141418;
    color: #b6b6b6;
    margin-top: 10px;
    width: 100%;
    height: 2.5em;
}

button{
    margin: 10px 10px;
}

/*table style*/
table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
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
import { base_url } from '../functions/global';
const axios = require('axios');

export default {
    
    data() {
        return {
        /* Arrays */
            Curriculum_Data:[],
            Category_Data:[],

        /* Object */
            modelConfig: {
            type: 'string',
            mask: 'YYYY-MM-DD',
            },

            masks : {
            input: 'DD-MM-YYYY',
            },

            Curriculum_Data_Model:{
                Curriculum_Id:"",
                Curriculum_Name:"",
                Curriculum_Year:"",
                Category_Id:"",

            },

        /* Varriables */
            Curriculum_Add_Is_Show: false,

            
        }
    },
    methods: {
        
        Get_Curriculum_Data : function(){
            var app = this;

            axios.get(base_url+'/Get_Curriculum_Data.php')
            .then(function(response){
                console.log(response.data);
                app.Curriculum_Data = response.data;
            })
            .catch(function(){
                
            });
        },
        Get_Category_Data : function(){
            var app = this;

            axios.get(base_url+'/Get_Category_Data.php')
            .then(function(response){
                console.log(response.data);
                app.Category_Data = response.data;
            })
            .catch(function(error){
              console.log(error)  
            });
        },

        Insert_Curriculum_Data:function(){
            var app= this;
            var Get_Parameter  = "?Curriculum_Id ="  +app.Curriculum_Data_Model.Curriculum_Id;
            Get_Parameter     += "&Curriculum_Name=" +app.Curriculum_Data_Model.Curriculum_Name;
            Get_Parameter     += "&Curriculum_Year=" +app.Curriculum_Data_Model.Curriculum_Year;
            Get_Parameter     += "&Category_Id="     +app.Curriculum_Data_Model.Category_Id;

            axios.get(base_url+'/Insert_Data_Curriculum.php'+Get_Parameter)
            .then(function(response){
                console.log(response);
                app.Curriculum_Data=response.data;
                app.Curriculum_Add_Is_Show=false;
                
            })
            .catch(function(error){
                console.log(error);
            });
        },

        Delete_Curriculum_Data:function(Id){
            var app= this;
            alert("aku bekerja abang!!!"+Id);

        }

    },
    created() {
        this.Get_Curriculum_Data();
        this.Get_Category_Data();
    },
}
</script>