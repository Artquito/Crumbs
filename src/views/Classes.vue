<template>
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
        <h1>Class Management</h1>
        <button>Start a Session</button>
        <button>Make a Session</button>
        <table>
            <tr>
                <th>Quarter</th>
                <th>Week</th>
                <th>Lessons</th>
                <th>Lesson Description</th>
                <th>Link</th>
                <th>Platform</th>
                <th>Milestones</th>
            </tr>    
            <tr>
                <td>intro</td>
                <td>Week 3</td>
                <td>Minecraft Adventurer</td>
                <td>Program animals and other Minecraft creatures in your own version of Minecraft.</td>
                <td>Copy</td>
                <td>Code.org</td>
                <td>Q1</td>
            </tr>
        </table>
        
    </main>
</template>

<style scoped>
    /*table style*/
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


</script>