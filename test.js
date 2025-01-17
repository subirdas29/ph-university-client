// import { ReactNode } from "react";
// import AdminDashboard from "../pages/admin/AdminDashboard";
// import CreateAdmin from "../pages/admin/CreateAdmin";
// import CreateFaculty from "../pages/admin/CreateFaculty";
// import CreateStudent from "../pages/admin/CreateStudent";


// type TRoute = {
//   path:string,
//   element:ReactNode
// }

 export const adminPaths =[
    {
        name:'Dashboard',
        path:'dashboard',
        element:'l'
    },
    {
        name:'User Management',
        children:[
            {
               name:'Create Admin',
               path:'create-admin',
               element:'d'
            },
            {
               name:'Create Faculty',
               path:'create-faculty',
               element:'d'
            },
            {
               name:'Create Student',
               path:'create-student',
               element:'w'
            },
           
        ]
    },
 ]

 const adminSideBar = adminPaths.reduce((acc,item)=>{
  if(item.name && item.path){
    acc.push({
      key:item.name,
      label:"Navlink"
    })
  }
  if(item.children){
    acc.push({
      key:item.name,
      label:'sidebar',
      children:item.children.map(child =>({
        key:child.name,
        label:child.path
      }))
    })
  }
  return acc
 },[])

 console.log(adminSideBar)

 const adminRoutes = adminPaths.reduce((acc,item)=>{
  
    if(item.path && item.element){
        acc.push({
          path:item.path,
          element:item.element
        })
      }
    
      if(item.children){
        item.children.forEach((child)=>{
          acc.push({
            path:child.path,
            element:child.element
          })
        })
      }
      
  return acc
  
 },[])

 console.log(adminRoutes)