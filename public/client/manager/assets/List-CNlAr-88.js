var e=Object.defineProperty,t=Object.defineProperties,l=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable,r=(t,l,a)=>l in t?e(t,l,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[l]=a,o=(e,t)=>{for(var l in t||(t={}))s.call(t,l)&&r(e,l,t[l]);if(a)for(var l of a(t))i.call(t,l)&&r(e,l,t[l]);return e},n=(e,a)=>t(e,l(a)),u=(e,t,l)=>r(e,"symbol"!=typeof t?t+"":t,l),c=(e,t,l)=>new Promise(((a,s)=>{var i=e=>{try{o(l.next(e))}catch(t){s(t)}},r=e=>{try{o(l.throw(e))}catch(t){s(t)}},o=e=>e.done?a(e.value):Promise.resolve(e.value).then(i,r);o((l=l.apply(e,t)).next())}));import{_ as d,n as p}from"./index-BUNx4JnC.js";/* empty css                   */import{as as m,t as g,r as h,f as v,v as f,I as b,J as y,L as _,u as w,A as S,a2 as k,x as C,ah as P,O as T,G as j,aD as O,c as V,F as x,R as I,U as q}from"./vue-vendor-DLFc8NEb.js";/* empty css                */import{S as U,T as z,t as F,B as D,G as A,U as B,V as L,H as E,j as N,s as J,W as R,b as $,K as G,R as H,X as K,r as W,l as X,m as Y,i as Z,I as M,Y as Q,Z as ee,_ as te,$ as le,a0 as ae,a1 as se,a2 as ie,a3 as re,O as oe,a as ne,d as ue,E as ce,k as de}from"./element-plus-Df8vcUUO.js";import{O as pe,m as me}from"./mutation-Dq-nSxHH.js";/* empty css                        */import"./other-vendor-BLeOv60h.js";const ge=e=>{const t={};return Object.entries(e).forEach((([e,l])=>{l.selected.length>0&&(t[e]=Array.from(l.selected))})),t},he="tutor_filter_selections",ve=()=>{try{const e=localStorage.getItem(he);return e?JSON.parse(e):{}}catch(e){return{}}},fe=e=>{try{localStorage.setItem(he,JSON.stringify(e))}catch(t){}},be=m("tutor",{state:()=>({currentTutor:null,tutorList:[],total:0,loading:!1,filterSelections:ve(),searchParams:{page:1,pageSize:20,keyword:"",filters:{}}}),actions:{setCurrentTutor(e){this.currentTutor=e},setTutorList(e){this.tutorList=e},setTotal(e){this.total=e},setLoading(e){this.loading=e},initFilterSelections(e){const t=ve();e.filter((e=>{var t;return"multiple"===(null==(t=e.select)?void 0:t.type)}));e.forEach((e=>{var l;"multiple"===(null==(l=e.select)?void 0:l.type)&&(t[e.prop]?this.filterSelections[e.prop]=t[e.prop]:this.filterSelections[e.prop]={selected:[],checkAll:!1,isIndeterminate:!1})})),fe(this.filterSelections),this.updateSearchParams(n(o({},this.searchParams),{filters:ge(this.filterSelections)}))},updateFilterSelection(e,t){this.filterSelections[e]&&(this.filterSelections[e].selected=t,fe(this.filterSelections),this.updateSearchParams(n(o({},this.searchParams),{filters:ge(this.filterSelections)})))},updateFilterCheckAll(e,t,l){this.filterSelections[e]&&(this.filterSelections[e].checkAll=t,this.filterSelections[e].isIndeterminate=l,fe(this.filterSelections),this.updateSearchParams(n(o({},this.searchParams),{filters:ge(this.filterSelections)})))},clearFilterSelections(){Object.keys(this.filterSelections).forEach((e=>{this.filterSelections[e].selected=[],this.filterSelections[e].checkAll=!1,this.filterSelections[e].isIndeterminate=!1})),localStorage.removeItem(he),this.updateSearchParams(n(o({},this.searchParams),{filters:{}}))},initSearchParams(){this.searchParams={page:1,pageSize:20,keyword:"",filters:ge(this.filterSelections)}},updateSearchParams(e){this.searchParams=n(o(o({},this.searchParams),e),{filters:ge(this.filterSelections)})},resetSearchParams(){this.searchParams={page:1,pageSize:20,keyword:"",filters:ge(this.filterSelections)}}}}),ye=110,_e=[{prop:"tutor_code",label:"订单编号",width:120,visible:!0,comment:"订单的唯一编号"},{prop:"order_tags",label:"订单标签",width:ye,visible:!0,comment:"订单标签",select:{type:"multiple",options:[...pe.order_tags]}},{prop:"student_gender",label:"学生性别",width:ye,visible:!0,comment:"学生的性别",select:{type:"multiple",options:[...pe.gender_options]}},{prop:"teaching_type",label:"教学类型",width:120,visible:!0,comment:"一对一或一对多",select:{type:"multiple",options:[...pe.teaching_types]}},{prop:"student_grade",label:"学生年级",width:ye,visible:!0,comment:"学生所在年级",select:{type:"multiple",options:[...pe.student_grades]}},{prop:"subjects",label:"补习科目",width:ye,formatter:e=>Array.isArray(e.subjects)?e.subjects.join("、"):e.subjects,visible:!0,comment:"需要补习的科目",select:{type:"multiple",options:[...pe.subjects]}},{prop:"teacher_type",label:"教师类型",width:ye,visible:!0,comment:"期望的教师类型",select:{type:"multiple",options:[...pe.teacher_types]}},{prop:"teacher_gender",label:"教师性别",width:ye,visible:!0,comment:"期望的教师性别",select:{type:"multiple",options:["男","女","无"]}},{prop:"district",label:"区域",width:90,visible:!0,comment:"所在区域",select:{type:"multiple",options:[...pe.districts["天津"]]}},{prop:"city",label:"城市",width:90,visible:!0,comment:"所在城市"},{prop:"address",label:"地址",width:200,visible:!0,comment:"详细地址"},{prop:"phone_number",label:"联系电话",width:200,visible:!0,comment:"联系电话"},{prop:"order_source",label:"订单来源",width:200,visible:!0,comment:"订单来源"},{prop:"grade_score",label:"成绩情况",width:ye,visible:!0,comment:"学生当前成绩"},{prop:"student_level",label:"学生水平",width:ye,visible:!0,comment:"学生整体水平",select:{type:"multiple",options:[...pe.student_levels]}},{prop:"tutoring_time",label:"辅导时间",width:150,visible:!0,comment:"期望的辅导时间"},{prop:"salary",label:"课时费",width:ye,visible:!0,comment:"每小时费用"},{prop:"is_visible",label:"可见状态",width:ye,visible:!0,comment:"是否对外可见",select:{type:"multiple",options:["1","0"]}},{prop:"status",label:"订单状态",width:ye,slot:"status",visible:!0,comment:"订单成交状态",select:{type:"multiple",options:["已成交","未成交"]}},{prop:"created_at",label:"创建时间",width:180,formatter:e=>e.created_at?new Date(e.created_at).toLocaleString("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}):"",visible:!0,comment:"创建时间"},{prop:"created_by_name",label:"创建人",width:100,visible:!0,comment:"创建人姓名"},{prop:"updated_at",label:"更新时间",width:180,formatter:e=>e.updated_at?new Date(e.updated_at).toLocaleString("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}):"",visible:!0,comment:"最后更新时间"},{prop:"updated_by_name",label:"更新人",width:100,visible:!0,comment:"更新人姓名"},{prop:"deal_staff_name",label:"成交员工",width:100,visible:!0,comment:"成交员工姓名"},{prop:"deal_teacher_name",label:"成交教师",width:100,visible:!0,comment:"成交教师姓名"},{prop:"operation",label:"操作",width:160,fixed:"right",slot:"operation",visible:!0,comment:"操作按钮"}],we=_e.filter((e=>["tutor_code","student_grade","subjects","status","created_at","city","district","operation"].includes(e.prop))),Se={columns:we,showPagination:!0,pageSize:20,border:!0,stripe:!0},ke={class:"column-selector"},Ce=d(g({__name:"ColumnSelector",emits:["change"],setup(e,{emit:t}){const l=_e,a=()=>{const e=localStorage.getItem("tutorTableColumns");if(e)try{return JSON.parse(e)}catch(t){}return we.map((e=>e.prop))},s=h(a()),i=h(!1),r=h(!0),o=e=>{s.value=e?l.map((e=>e.prop)):[],r.value=!1,c()},n=e=>{const t=e.length;i.value=t===l.length,r.value=t>0&&t<l.length,c()},u=t,c=()=>{(e=>{try{localStorage.setItem("tutorTableColumns",JSON.stringify(e))}catch(t){}})(s.value),u("change",s.value)};return v((()=>{const e=a();s.value=e,i.value=e.length===l.length,r.value=e.length>0&&e.length<l.length})),(e,t)=>{const a=F,u=D,c=A,d=B,p=L,m=E,g=N;return f(),b(g,{placement:"bottom",width:300,trigger:"click"},{reference:y((()=>[_(u,{type:"primary",class:"icon-button"},{default:y((()=>[_(a,null,{default:y((()=>[_(w(U))])),_:1}),t[2]||(t[2]=S("span",{class:"button-text"},"列表设置",-1))])),_:1})])),default:y((()=>[S("div",ke,[_(c,{modelValue:i.value,"onUpdate:modelValue":t[0]||(t[0]=e=>i.value=e),indeterminate:r.value,onChange:o},{default:y((()=>t[3]||(t[3]=[k(" 全选 ")]))),_:1},8,["modelValue","indeterminate"]),_(d),_(m,{modelValue:s.value,"onUpdate:modelValue":t[1]||(t[1]=e=>s.value=e),onChange:n},{default:y((()=>[(f(!0),C(j,null,P(w(l),(e=>(f(),C("div",{key:e.prop,class:"column-item"},[_(c,{value:e.prop},{default:y((()=>[k(T(e.label)+" ",1),_(p,{content:e.comment,placement:"right"},{default:y((()=>[_(a,null,{default:y((()=>[_(w(z))])),_:1})])),_:2},1032,["content"])])),_:2},1032,["value"])])))),128))])),_:1},8,["modelValue"])])])),_:1})}}}),[["__scopeId","data-v-c8f991de"]]),Pe={class:"tutor-search"},Te=g({__name:"tutorSearch",emits:["search","column-change"],setup(e,{emit:t}){const l=t,a=be(),{filterSelections:s,searchParams:i}=O(a),r=h({keyword:""});h(!1);const u=()=>{const e=o({},r.value),t={};Object.entries(s.value).forEach((([e,l])=>{l.selected.length>0&&(t[e]=l.selected)}));const i=n(o({},e),{page:1,pageSize:20,filters:t});a.updateSearchParams(i),l("search",i)},c=()=>{r.value={keyword:""},a.clearFilterSelections(),a.resetSearchParams(),l("search",{page:1,pageSize:20})};return v((()=>{a.initSearchParams(),r.value.keyword=i.value.keyword||"",l("search",i.value)})),(e,t)=>{const l=$,a=G,s=F,i=D,o=H;return f(),C("div",Pe,[_(o,{model:r.value,class:"search-form"},{default:y((()=>[_(a,{label:"关键词"},{default:y((()=>[_(l,{modelValue:r.value.keyword,"onUpdate:modelValue":t[0]||(t[0]=e=>r.value.keyword=e),placeholder:"请输入关键词"},null,8,["modelValue"])])),_:1}),_(a,null,{default:y((()=>[_(i,{type:"primary",class:"icon-button",onClick:u},{default:y((()=>[_(s,null,{default:y((()=>[_(w(J))])),_:1}),t[2]||(t[2]=S("span",{class:"button-text"},"搜索",-1))])),_:1}),_(i,{class:"icon-button",onClick:c},{default:y((()=>[_(s,null,{default:y((()=>[_(w(R))])),_:1}),t[3]||(t[3]=S("span",{class:"button-text"},"重置",-1))])),_:1}),_(Ce,{onChange:t[1]||(t[1]=t=>e.$emit("column-change",t))})])),_:1})])),_:1},8,["model"])])}}}),je={key:0,class:"filter-tags"},Oe={class:"filter-label"},Ve=d(g({__name:"FilterTags",props:{config:{}},setup(e){const t=e,l=be(),{filterSelections:a}=O(l),s=V((()=>Object.values(a.value).some((e=>e.selected.length>0)))),i=V((()=>{const e={};return Object.entries(a.value).forEach((([t,l])=>{l.selected.length>0&&(e[t]=l.selected)})),e})),r=e=>{var l;return(null==(l=t.config.columns.find((t=>t.prop===e)))?void 0:l.label)||e};return(e,o)=>{const n=K;return f(),C("div",null,[s.value?(f(),C("div",je,[(f(!0),C(j,null,P(i.value,((e,s)=>(f(),C("div",{key:s,class:"filter-group"},[S("span",Oe,T(r(s))+":",1),(f(!0),C(j,null,P(e,(e=>(f(),b(n,{key:e,closable:"",onClose:i=>((e,s)=>{var i,r;const o=a.value[e].selected.filter((e=>e!==s));l.updateFilterSelection(e,o);const n=(null==(r=null==(i=t.config.columns.find((t=>t.prop===e)))?void 0:i.select)?void 0:r.options)||[];l.updateFilterCheckAll(e,o.length===n.length,o.length>0&&o.length<n.length)})(s,e)},{default:y((()=>[k(T(e),1)])),_:2},1032,["onClose"])))),128))])))),128))])):x("",!0)])}}}),[["__scopeId","data-v-4828fe08"]]),xe={class:"column-header"},Ie=d(g({__name:"TableHeader",props:{column:{}},setup(e){const t=e,l=be(),{filterSelections:a}=O(l),s=V((()=>t.column.label)),i=V((()=>{var e;return(null==(e=a.value[t.column.prop])?void 0:e.selected)||[]})),r=V((()=>{var e;return(null==(e=a.value[t.column.prop])?void 0:e.checkAll)||!1})),o=V((()=>{var e;return(null==(e=a.value[t.column.prop])?void 0:e.isIndeterminate)||!1})),n=e=>{var a;const s=(null==(a=t.column.select)?void 0:a.options)||[];l.updateFilterSelection(t.column.prop,Boolean(e)?[...s]:[]),l.updateFilterCheckAll(t.column.prop,Boolean(e),!1)};return(e,u)=>{var c;const d=F,p=A,m=X,g=B,h=Y,v=Z;return f(),C("div",xe,[k(T(s.value)+" ",1),"multiple"===(null==(c=e.column.select)?void 0:c.type)?(f(),b(v,{key:0,trigger:"click",onCommand:u[1]||(u[1]=t=>{e.column.prop})},{dropdown:y((()=>[_(h,null,{default:y((()=>[_(m,null,{default:y((()=>[_(p,{modelValue:r.value,"onUpdate:modelValue":u[0]||(u[0]=e=>r.value=e),indeterminate:o.value,onChange:n},{default:y((()=>u[2]||(u[2]=[k(" 全选 ")]))),_:1},8,["modelValue","indeterminate"])])),_:1}),_(g,{style:{margin:"4px 0"}}),(f(!0),C(j,null,P(e.column.select.options,(e=>(f(),b(m,{key:e},{default:y((()=>[_(p,{"model-value":i.value.includes(e),"onUpdate:modelValue":s=>((e,s)=>{var i,r;const o=(null==(i=a.value[t.column.prop])?void 0:i.selected)||[],n=e?[...o,s]:o.filter((e=>e!==s));l.updateFilterSelection(t.column.prop,n);const u=(null==(r=t.column.select)?void 0:r.options)||[];l.updateFilterCheckAll(t.column.prop,n.length===u.length,n.length>0&&n.length<u.length)})(s,e),label:e},{default:y((()=>[k(T(e),1)])),_:2},1032,["model-value","onUpdate:modelValue","label"])])),_:2},1024)))),128))])),_:1})])),default:y((()=>[_(d,{class:"filter-icon"},{default:y((()=>[_(w(W))])),_:1})])),_:1})):x("",!0)])}}}),[["__scopeId","data-v-779fb53f"]]),qe={class:"tutor-table"},Ue={key:0,class:"pagination"},ze=d(g({__name:"tutorTable",props:{loading:{type:Boolean},data:{},total:{},config:{}},emits:["page-change","edit","delete","visibility-change","status-change"],setup(e,{emit:t}){const l=e,a=t,s=h(1),i=V((()=>l.config||Se)),r=V((()=>i.value.columns.filter((e=>e.visible)))),o=e=>{a("page-change",e)},n=be();return v((()=>{n.initFilterSelections(_e)})),(e,t)=>{const l=K,n=F,u=D,c=oe,d=M,p=Q,m=ee;return f(),C("div",qe,[_(Ve,{config:i.value},null,8,["config"]),I((f(),b(d,{data:e.data,border:i.value.border,stripe:i.value.stripe,style:{width:"100%"}},{default:y((()=>[(f(!0),C(j,null,P(r.value,(e=>(f(),b(c,{key:e.prop,prop:e.prop,label:e.label,width:e.width,fixed:e.fixed},{header:y((()=>[_(Ie,{column:e},null,8,["column"])])),default:y((t=>["status"===e.slot?(f(),b(l,{key:0,type:"已成交"===t.row.status?"success":"warning"},{default:y((()=>[k(T(t.row.status),1)])),_:2},1032,["type"])):"is_visible"===e.prop?(f(),b(l,{key:1,type:t.row.is_visible?"success":"warning"},{default:y((()=>[k(T(t.row.is_visible?"可见":"隐藏"),1)])),_:2},1032,["type"])):"operation"===e.slot?(f(),C(j,{key:2},[_(u,{link:"",type:"primary",onClick:e=>{return l=t.row,void a("edit",l);var l},class:"icon-button"},{default:y((()=>[_(n,null,{default:y((()=>[_(w(te))])),_:1})])),_:2},1032,["onClick"]),_(u,{link:"",type:"danger",onClick:e=>{return l=t.row,void a("delete",l);var l},class:"icon-button"},{default:y((()=>[_(n,null,{default:y((()=>[_(w(le))])),_:1})])),_:2},1032,["onClick"]),_(u,{link:"",type:t.row.is_visible?"info":"warning",onClick:e=>{return l=t.row,void a("visibility-change",l);var l},class:"icon-button"},{default:y((()=>[_(n,null,{default:y((()=>[t.row.is_visible?(f(),b(w(ae),{key:0})):(f(),b(w(se),{key:1}))])),_:2},1024)])),_:2},1032,["type","onClick"]),_(u,{link:"",type:"已成交"===t.row.status?"success":"info",onClick:e=>{return l=t.row,void a("status-change",l);var l},class:"icon-button"},{default:y((()=>[_(n,null,{default:y((()=>["已成交"===t.row.status?(f(),b(w(ie),{key:0})):(f(),b(w(re),{key:1}))])),_:2},1024)])),_:2},1032,["type","onClick"])],64)):e.formatter?(f(),C(j,{key:3},[k(T(e.formatter(t.row)),1)],64)):(f(),C(j,{key:4},[k(T(t.row[e.prop]),1)],64))])),_:2},1032,["prop","label","width","fixed"])))),128))])),_:1},8,["data","border","stripe"])),[[m,e.loading]]),i.value.showPagination?(f(),C("div",Ue,[_(p,{"current-page":s.value,"onUpdate:currentPage":t[0]||(t[0]=e=>s.value=e),total:e.total,"page-size":i.value.pageSize,onCurrentChange:o},null,8,["current-page","total","page-size"])])):x("",!0)])}}}),[["__scopeId","data-v-00a416da"]]),Fe=e=>c(void 0,null,(function*(){const t=(e=>{const t={page:e.page||1,pageSize:e.pageSize||20};return e.keyword&&(t.keyword=e.keyword),e.filters&&Object.entries(e.filters).forEach((([e,l])=>{l.length>0&&(t[e]=l)})),t})(e),l=ne.service({lock:!0,text:"加载中...",background:"rgba(0, 0, 0, 0.7)"});try{return yield p.get({url:"/api/manager/tutors/list",params:t})}catch(a){throw a}finally{l.close()}})),De=e=>p.get({url:`/api/manager/tutors/detail/${e}`});class Ae{}u(Ae,"getTutorList",Fe),u(Ae,"getTutorDetail",De),u(Ae,"addTutor",me.addTutor),u(Ae,"updateTutor",me.updateTutor),u(Ae,"deleteTutor",me.deleteTutor),u(Ae,"updateTutorStatus",me.updateTutorStatus);const Be=g({__name:"CreateDialog",props:{visible:{type:Boolean}},emits:["update:visible","success"],setup(e,{emit:t}){const l=t,a=h(!1),s=h(),i=q({}),r=q({tutor_code:[{required:!0,message:"请输入订单编号",trigger:"blur"}],student_gender:[{required:!0,message:"请选择学生性别",trigger:"change"}],teaching_type:[{required:!0,message:"请选择教学类型",trigger:"change"}],student_grade:[{required:!0,message:"请选择学生年级",trigger:"change"}],subjects:[{required:!0,message:"请选择补习科目",trigger:"change"}],district:[{required:!0,message:"请选择区域",trigger:"change"}],city:[{required:!0,message:"请输入城市",trigger:"blur"}],address:[{required:!0,message:"请输入详细地址",trigger:"blur"}],tutoring_time:[{required:!0,message:"请输入辅导时间",trigger:"blur"}],salary:[{required:!0,message:"请输入课时费",trigger:"blur"}]}),o=()=>{l("update:visible",!1)},n=()=>c(this,null,(function*(){}));return(e,t)=>{const u=H,c=D,d=ue;return f(),b(d,{title:"新增订单",modelValue:e.visible,"onUpdate:modelValue":t[0]||(t[0]=e=>l("update:visible",e)),width:"600px","close-on-click-modal":!1,onClose:o},{footer:y((()=>[_(c,{onClick:o},{default:y((()=>t[1]||(t[1]=[k("取消")]))),_:1}),_(c,{type:"primary",loading:a.value,onClick:n},{default:y((()=>t[2]||(t[2]=[k("确定")]))),_:1},8,["loading"])])),default:y((()=>[_(u,{ref_key:"formRef",ref:s,model:i,rules:r,"label-width":"100px"},null,8,["model","rules"])])),_:1},8,["modelValue"])}}}),Le=g({__name:"EditDialog",props:{visible:{type:Boolean},data:{}},emits:["update:visible","success"],setup(e,{emit:t}){const l=t,a=h(!1),s=h(),i=q({}),r=q({tutor_code:[{required:!0,message:"请输入订单编号",trigger:"blur"}],student_gender:[{required:!0,message:"请选择学生性别",trigger:"change"}],teaching_type:[{required:!0,message:"请选择教学类型",trigger:"change"}],student_grade:[{required:!0,message:"请选择学生年级",trigger:"change"}],subjects:[{required:!0,message:"请选择补习科目",trigger:"change"}],district:[{required:!0,message:"请选择区域",trigger:"change"}],city:[{required:!0,message:"请输入城市",trigger:"blur"}],address:[{required:!0,message:"请输入详细地址",trigger:"blur"}],tutoring_time:[{required:!0,message:"请输入辅导时间",trigger:"blur"}],salary:[{required:!0,message:"请输入课时费",trigger:"blur"}]}),o=()=>{l("update:visible",!1)},n=()=>c(this,null,(function*(){}));return(e,t)=>{const u=H,c=D,d=ue;return f(),b(d,{title:"编辑订单",modelValue:e.visible,"onUpdate:modelValue":t[0]||(t[0]=e=>l("update:visible",e)),width:"600px","close-on-click-modal":!1,onClose:o},{footer:y((()=>[_(c,{onClick:o},{default:y((()=>t[1]||(t[1]=[k("取消")]))),_:1}),_(c,{type:"primary",loading:a.value,onClick:n},{default:y((()=>t[2]||(t[2]=[k("确定")]))),_:1},8,["loading"])])),default:y((()=>[_(u,{ref_key:"formRef",ref:s,model:i,rules:r,"label-width":"100px"},null,8,["model","rules"])])),_:1},8,["modelValue"])}}}),Ee=d(g({__name:"DeleteDialog",props:{visible:{type:Boolean},id:{}},emits:["update:visible","success"],setup(e,{emit:t}){const l=e,a=t,s=h(!1),i=()=>{a("update:visible",!1)},r=()=>c(this,null,(function*(){if(l.id){s.value=!0;try{yield Ae.deleteTutor(l.id),ce.success("删除成功"),a("success"),a("update:visible",!1)}catch(e){ce.error("删除失败")}finally{s.value=!1}}}));return(e,t)=>{const l=D,o=ue;return f(),b(o,{title:"删除确认",modelValue:e.visible,"onUpdate:modelValue":t[0]||(t[0]=e=>a("update:visible",e)),width:"400px","close-on-click-modal":!1,onClose:i},{footer:y((()=>[_(l,{onClick:i},{default:y((()=>t[1]||(t[1]=[k("取消")]))),_:1}),_(l,{type:"danger",loading:s.value,onClick:r},{default:y((()=>t[2]||(t[2]=[k("确定删除")]))),_:1},8,["loading"])])),default:y((()=>[t[3]||(t[3]=S("div",{class:"delete-content"}," 确定要删除这条订单吗？此操作不可恢复。 ",-1))])),_:1},8,["modelValue"])}}}),[["__scopeId","data-v-369b4f9b"]]),Ne={class:"tutor-list"},Je={class:"table-header"},Re=d(g({__name:"List",setup(e){const t=be(),l=h(!1),a=h([]),s=h(0);h({page:1,pageSize:20});const i=h(!1),r=h(!1),u=h(!1),d=h(void 0),p=h(),m=h(o({},Se)),g=e=>c(this,null,(function*(){try{const i=e||t.searchParams,r=yield Ae.getTutorList(i);200===r.code&&(l.value=!0,a.value=r.data.list.map((e=>n(o({},e),{status:e.status||"未成交"}))),s.value=r.data.total,t.setTutorList(a.value),t.setTotal(r.data.total))}catch(i){}finally{l.value=!1}})),b=e=>{g(e)},y=e=>{const l=n(o({},t.searchParams),{page:e});t.updateSearchParams(l),g(l)};v((()=>{O(),g(t.searchParams)}));const k=()=>c(this,null,(function*(){try{yield g(t.searchParams)}catch(e){ce.error("刷新列表失败")}})),P=e=>{d.value=e,r.value=!0},T=e=>{p.value=e.id,u.value=!0},j=e=>{m.value=n(o({},Se),{columns:_e.filter((t=>e.includes(t.prop)))})},O=()=>{const e=localStorage.getItem("tutorTableColumns");if(e)try{const t=JSON.parse(e);m.value=n(o({},Se),{columns:_e.filter((e=>t.includes(e.prop)))})}catch(t){m.value=o({},Se)}else m.value=o({},Se)},V=e=>c(this,null,(function*(){try{yield Ae.updateTutor(n(o({},e),{is_visible:!e.is_visible})),g()}catch(t){}})),x=e=>c(this,null,(function*(){try{const t="已成交"===e.status?"未成交":"已成交";if("已成交"===t)de.prompt("请输入成交教师ID","标记成交",{confirmButtonText:"确定",cancelButtonText:"取消"}).then((l=>c(this,[l],(function*({value:l}){const a={teacherId:l?parseInt(l):null,status:t};yield me.updateOrderDealStatus(e.id,a),ce.success("更新成功"),g()}))));else{if(yield de.confirm("确定要取消该订单的成交状态吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).catch((()=>!1))){const l={teacherId:null,status:t};yield me.updateOrderDealStatus(e.id,l),ce.success("更新成功"),g()}}}catch(t){ce.error("更新失败")}}));return(e,t)=>{const o=ee;return f(),C("div",Ne,[S("div",Je,[_(Te,{onSearch:b,onColumnChange:j})]),I((f(),C("div",null,[_(ze,{loading:l.value,data:a.value,total:s.value,config:m.value,onPageChange:y,onEdit:P,onDelete:T,onVisibilityChange:V,onStatusChange:x},null,8,["loading","data","total","config"])])),[[o,l.value]]),_(w(Be),{visible:i.value,"onUpdate:visible":t[0]||(t[0]=e=>i.value=e),onSuccess:k},null,8,["visible"]),_(w(Le),{visible:r.value,"onUpdate:visible":t[1]||(t[1]=e=>r.value=e),data:d.value,onSuccess:k},null,8,["visible","data"]),_(w(Ee),{visible:u.value,"onUpdate:visible":t[2]||(t[2]=e=>u.value=e),id:p.value,onSuccess:k},null,8,["visible","id"])])}}}),[["__scopeId","data-v-85fb166f"]]);export{Re as default};