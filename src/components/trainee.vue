<template>
    <div>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">City</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="std in students" :key="std.id">
      
      <td>{{std.id}}</td>
      <td>{{std.name}}</td>
      <td>{{ std.city }}</td>
    </tr>
 

  </tbody>
</table>

    </div>
    
    </template>
    
    <script>
      import students from "./students" 
          export default {
        data:()=>({
          students:[],
        }),
        async mounted(){
          let response= await fetch("http://localhost:3000/students");
          this.students= await response.json(); 
        },
        props: {
      
      },
    }
    
    </script>
    
    <style>
 
    </style>