"use strict";(globalThis["webpackChunkiqjobs"]=globalThis["webpackChunkiqjobs"]||[]).push([[991],{4991:(e,a,l)=>{l.r(a),l.d(a,{default:()=>w});var t=l(9835);const n={class:"q-pa-md"};function o(e,a,l,o,r,i){const c=(0,t.up)("q-btn"),d=(0,t.up)("q-space"),s=(0,t.up)("q-icon"),u=(0,t.up)("q-input"),m=(0,t.up)("q-table");return(0,t.wg)(),(0,t.iD)("div",n,[(0,t.Wm)(m,{flat:"",bordered:"",title:"Treats",rows:o.rows,columns:o.columns,"row-key":"name",filter:o.filter,loading:o.loading,selection:"multiple",selected:o.selected,"onUpdate:selected":a[1]||(a[1]=e=>o.selected=e)},{top:(0,t.w5)((()=>[(0,t.Wm)(c,{color:"primary",disable:o.loading,label:"Add Profile",onClick:o.addRow},null,8,["disable","onClick"]),o.selected.length>0?((0,t.wg)(),(0,t.j4)(c,{key:0,class:"q-ml-sm",color:"negative",disable:o.loading,label:"Remove Profile",onClick:o.removeRow},null,8,["disable","onClick"])):(0,t.kq)("",!0),(0,t.Wm)(d),(0,t.Wm)(u,{borderless:"",dense:"",debounce:"300",color:"primary",modelValue:o.filter,"onUpdate:modelValue":a[0]||(a[0]=e=>o.filter=e)},{append:(0,t.w5)((()=>[(0,t.Wm)(s,{name:"search"})])),_:1},8,["modelValue"])])),_:1},8,["rows","columns","filter","loading","selected"])])}var r=l(499);const i=[{name:"name",align:"center",label:"Name",field:"name",sortable:!0},{name:"area",label:"area",field:"area",sortable:!0},{name:"createdAt",label:"created",align:"center",field:"createdAt",sortable:!0}],c=[{name:"Giancarlo Profile Standard",area:"FrontEnd Developer",createdAt:"2022-05-02"},{name:"Maria Profile Pro",area:"Full Stack Developer",createdAt:"2021-11-15"},{name:"John Doe",area:"UI/UX Designer",createdAt:"2023-01-30"},{name:"Elena Rodriguez",area:"Data Scientist",createdAt:"2022-08-20"},{name:"Samuel Lee",area:"Mobile App Developer",createdAt:"2022-02-10"},{name:"Sophie Johnson",area:"Digital Marketing Specialist",createdAt:"2021-09-05"},{name:"Alexandra Smith",area:"Project Manager",createdAt:"2023-03-18"},{name:"Michael Brown",area:"Software Engineer",createdAt:"2021-06-12"}],d={setup(){const e=(0,r.iH)(!1),a=(0,r.iH)(""),l=(0,r.iH)(10),t=(0,r.iH)([...c]),n=(0,r.iH)([]);return{selected:n,columns:i,rows:t,loading:e,filter:a,rowCount:l,addRow(){e.value=!0,setTimeout((()=>{const a=Math.floor(Math.random()*(t.value.length+1)),n=c[Math.floor(Math.random()*c.length)];0===t.value.length&&(l.value=0),n.id=++l.value;const o={...n};t.value=[...t.value.slice(0,a),o,...t.value.slice(a)],e.value=!1}),500)},removeRow(){e.value=!0,setTimeout((()=>{n.value.length>0&&n.value.forEach((e=>{const a=t.value.findIndex((a=>a.name===e.name));t.value.splice(a,1)})),e.value=!1}),500)}}}};var s=l(1639),u=l(1463),m=l(8879),p=l(136),v=l(6611),b=l(2857),g=l(9984),f=l.n(g);const h=(0,s.Z)(d,[["render",o]]),w=h;f()(d,"components",{QTable:u.Z,QBtn:m.Z,QSpace:p.Z,QInput:v.Z,QIcon:b.Z})}}]);