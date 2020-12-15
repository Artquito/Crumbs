<template>
<main>
    <h1>Curricullum Box</h1>
    <button>Add Lessons+</button>
    <button>Change Curricullum</button>
    <button>Make Curricullum</button>
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
<style>


button{
    margin: 0 10px 10px 0px;
}

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
export default {
    
}
</script>