<template>

    
    <div class="Component-Container">

        <transition name="fade">

            <div v-if="lessonIsShow" class="popup" style="z-index:6;">
                
                <div class="popup-content">
                    
                    
                    <form @submit.prevent="packLessonDataModel()" class="teacherInsertForm">
                        <input type="text" required v-model="lessonInputModel.Lesson_Name"  name="nameInput" placeholder="Lesson Name">
                        <input class="input-field" type="url" required v-model="lessonInputModel.Lesson_Link" placeholder="Lesson Link">
                        
                        
                        <!-- <input type="text-area" maxlength="300" required v-model="lessonInputModel.Lesson_Description" placeholder="Category"> -->
                        <select  class="Category_List" v-model="lessonInputModel.Platform_Id">
                            

                            <!-- this is a placeholder -->
                            <option value="" selected disabled hidden>Pick a Platform</option>

                            <!-- this is for the platform input -->
                            <option 
                            v-for="(lessonDataArray, lessonDataIndex) in platformBoxParcel" :key='lessonDataIndex' :value="lessonDataArray.Platform_Id" >
                            <!-- item Preview -->
                            {{ lessonDataArray.Platform_Name}}
                            </option>


                        </select>

                        <textarea style="height: 10em; margin: 1.5em 0" class="input-field" v-model="lessonInputModel.Lesson_Description" maxlength="300" cols="30" rows="10"></textarea>

                        <!-- this is the submit button -->
                        <div class="button" style="margin: 10px 0 15px 0">


                            <button type="submit" style="background:transparent;border:none" value="tes">
                                <div class="button" id="button-5">
                                    <div id="translate"></div>
                                    <p>Let's Go!</p>
                                </div>
                            </button>
                        </div> 
                    </form>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: ['lessonBoxParcel2', 'platformBoxParcel', 'lessonIsShow'],

    data() {
        return {
            lessonInputModel:{
                Lesson_Id:'',
                Lesson_Name:'',
                Lesson_Link:'',
                Lesson_Description:'',
                Platform_Id: '',
                Platform_Name:'',
            },
        }
    },


    methods: {

        packLessonDataModel(){
            this.$emit('lessonEntry', this.lessonInputModel);
            this.lessonInputModel.Lesson_Id='';
            this.lessonInputModel.Lesson_Name='';
            this.lessonInputModel.Lesson_Link='';
            this.lessonInputModel.Lesson_Description='';
            this.lessonInputModel.Platform_Id='';
            this.lessonInputModel.Platform_Name='';
        }

    },

    
}


</script>



<style scoped>


    .Category_List{
    background: #141418;
    color: #b6b6b6;
    margin-top: 10px;
    width: 100%;
    height: 2.5em;
    }

    .input-field{
        background: #141418;
        margin-top: 10px;
        width : 100%;
        border-radius: 3.5px;
        border: none;
        height: 2.5em;
        color:#b6b6b6;
    }

    textarea::-webkit-scrollbar{
        width: 0.25rem;
    }

    textarea::-webkit-scrollbar-track{
        background: #1e1e24;
    }

    textarea::-webkit-scrollbar-thumb{
        background: #b0b4bd;
    }

    input{
        width:200px;
    }


</style>