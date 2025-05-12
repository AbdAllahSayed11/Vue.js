<template>
    <div>
      
      <Track msg='welcome in our vue app' /> 
        <div class="container">
            
      
       <div class="row my-5">
        <div class="col-4">
            <Side/>
        </div>

        <div class="col-8">
            <Table :students="students"/>
            <Model @addStudent="addStudent"/>
        </div>
    
       </div>
        </div>
      <Footer  msg1='footer'>
        
      </Footer>
    </div>
  </template>
  
  <script>
  import Track from "./components/header.vue";
  import Footer from "./components/footer.vue";
  import Table from "./components/table.vue";
  import Side from "./components/side.vue";
  import Model from "./components/model.vue";
  
  export default {
    data:()=>({
     students:''
    }),
    components: {
      Track,
      Footer,
      Table,
      Side,
      Model
    },methods:{
      addStudent(data){
          this.students=data;
          console.log(data)
      }
    }
  };
  </script>
  
  <style>
  </style>
  