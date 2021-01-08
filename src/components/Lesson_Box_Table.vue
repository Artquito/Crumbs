<template>
    <div class="component-container">

        <table style="margin-top:5px;">

            <tr>
                <th>Num</th>
                <th>Lesson</th>
                <th>Link</th>
                <th>Description</th>
                <th>Platform</th>
                <th>Buttons</th>
            </tr>

            <tbody>  

                <tr v-for="(lessonDataItem, lessonItemIndex) in lessonBoxParcel" :key="lessonItemIndex">
                    <td style="text-align:center;">{{lessonItemIndex}}</td>
                    <td style="white-space:nowrap;">{{lessonDataItem.Lesson_Name}}</td>
                    <td>{{lessonDataItem.Lesson_Link}}</td>
                    <td>{{lessonDataItem.Lesson_Description}}</td>
                    <td>{{lessonDataItem.Platform_Name}}</td>
                    <td>
                    <div style="white-space: nowrap;margin-bottom:10px;" class="button_container">
                        <button style="margin-right:10px;font-size:0.6rem;" class="edit big-button">edit</button>
                        <button class="delete big-button" style="font-size:0.6rem;" >delete</button>
                    </div>
                    </td>
                </tr>

                <tr v-if="lessonBoxParcel.length == 0" style="background-color:#FEE2E2;color:#EF4444;padding:20px;position:relative">
                    <td colspan="6">
                        <p ><b>Tidak ada hasil untuk pencarian ini</b></p>
                    </td>
                </tr>

            </tbody>
            
        </table>
        
        
    </div>


</template>

<script>
export default {
    name:'Lesson_Box_Table',
    props : ['lessonBoxParcel'],
}


</script>

<style scoped>
    
</style>