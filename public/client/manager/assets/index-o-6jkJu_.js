import{_ as e,u as t,S as a,a as s,g as l,h as i,b as r,c as o,d as n,e as c,f as u,i as d,j as p,k as m,l as h,s as b}from"./index-BUNx4JnC.js";import{x as g,O as f,v,t as y,c as w,U as x,G as V,ah as _,A as S,L as k,u as O,P as F,r as T,w as D,f as j,C as A,a2 as L,J as C,h as E}from"./vue-vendor-DLFc8NEb.js";import{u as q,e as N}from"./el-progress-Cas91EB8.js";/* empty css                        *//* empty css                       */import{M as P,N as B,O as z,P as I,G as R}from"./element-plus-Df8vcUUO.js";import"./other-vendor-BLeOv60h.js";import"./echarts-D3MOyOT_.js";let G=0;const W="webkit moz ms o".split(" ");let U,$;if("undefined"==typeof window)U=function(){},$=function(){};else{let e;U=window.requestAnimationFrame,$=window.cancelAnimationFrame;for(let t=0;t<W.length&&(!U||!$);t++)e=W[t],U=U||window[e+"RequestAnimationFrame"],$=$||window[e+"CancelAnimationFrame"]||window[e+"CancelRequestAnimationFrame"];U&&$||(U=function(e){const t=(new Date).getTime(),a=Math.max(0,16-(t-G)),s=window.setTimeout((()=>{e(t+a)}),a);return G=t+a,s},$=function(e){window.clearTimeout(e)})}const M=e({props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:e=>e>=0},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:(e,t,a,s)=>a*(1-Math.pow(2,-10*e/s))*1024/1023+t}},data(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown(){return this.startVal>this.endVal}},watch:{startVal(){this.autoplay&&this.start()},endVal(){this.autoplay&&this.start()}},mounted(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=U(this.count)},pauseResume(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause(){$(this.rAF)},resume(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,U(this.count)},reset(){this.startTime=null,$(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count(e){this.startTime||(this.startTime=e),this.timestamp=e;const t=e-this.startTime;this.remaining=this.localDuration-t,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(t,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(t,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(t/this.localDuration):this.printVal=this.localStartVal+(this.endVal-this.localStartVal)*(t/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),t<this.localDuration?this.rAF=U(this.count):this.$emit("callback")},isNumber:e=>!isNaN(parseFloat(e)),formatNumber(e){e=e.toFixed(this.decimals);const t=(e+="").split(".");let a=t[0];const s=t.length>1?this.decimal+t[1]:"",l=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;l.test(a);)a=a.replace(l,"$1"+this.separator+"$2");return this.prefix+a+s+this.suffix}},destroyed(){$(this.rAF)}},[["render",function(e,t,a,s,l,i){return v(),g("span",null,f(l.displayValue),1)}]]);function H(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function J(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,s)}return a}M.unmounted=M.destroyed,Reflect.deleteProperty(M,"destroyed");var K=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?J(Object(a),!0).forEach((function(t){H(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):J(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({name:"CountTo",emits:["callback","mountedCallback"]},M);const Q={class:"des custom-text subtitle"},X=e(y({__name:"CardList",setup(e){const l=t(),i=w((()=>l.showWorkTab)),r=w((()=>s.indexOf(l.systemThemeColor))),o=x([{des:"总访问次数",icon:"",startVal:0,duration:1e3,num:9120,change:"+20%",color:a[r.value]},{des:"在线访客数",icon:"",startVal:0,duration:1e3,num:182,change:"+10%",color:"linear-gradient(310deg,#3BDBFF,#61DAE1)"},{des:"点击量",icon:"",startVal:0,duration:1e3,num:9520,change:"-12%",color:"linear-gradient(310deg,#F56A58,#F55540)"},{des:"新用户",icon:"",startVal:0,duration:1e3,num:156,change:"+30%",color:"linear-gradient(310deg,#A38BE4,#825ee4)"}]);return(e,t)=>(v(),g("ul",{class:"card",style:F({marginTop:O(i)?"0":"10px"})},[(v(!0),g(V,null,_(O(o),((e,t)=>(v(),g("li",{class:"console-box-2",key:t},[S("span",Q,f(e.des),1),S("div",null,[k(O(K),{class:"number custom-text box-title",endVal:e.num,duration:1e3,separator:""},null,8,["endVal"]),S("span",{class:"change",style:F({color:-1===e.change.indexOf("+")?"red":"#52c41a"})},f(e.change),5)]),S("i",{class:"iconfont custom-text",style:F({backgroundImage:`${e.color} !important`})},f(e.icon),5)])))),128))],4))}}),[["__scopeId","data-v-1f4404bd"]]),Y={class:"region active-user console-box"},Z={class:"list"},ee={class:"custom-text subtitle"},te=e(y({__name:"ActiveUser",setup(e){const a=T(null),{setOptions:s,removeResize:i,resize:r}=q(a),o=t(),n=w((()=>o.menuOpen));D(n,(()=>{[100,200,300].forEach((e=>{setTimeout(r,e)}))}));const c=t(),u=w((()=>c.isDark)),d=[{name:"总用户量",num:"32k"},{name:"总访问量",num:"128k"},{name:"日访问量",num:"1.2k"},{name:"周同比",num:"+5%"}];return j((()=>{s({grid:{left:"0",right:"4%",bottom:"0%",top:"5px",containLabel:!0},yAxis:{type:"value",axisLabel:{show:!0,color:u.value?"#999":"#fff",fontSize:13,fontWeight:"bold"},splitLine:{show:!0,lineStyle:{color:u.value?"#444":"rgba(255, 255, 255, 0.2)",width:1,type:"dashed"}},axisLine:{show:!1}},xAxis:{type:"category",data:[1,2,3,4,5,6,7,8,9],boundaryGap:[0,.01],splitLine:{show:!1},axisLine:{show:!1},axisLabel:{show:!0,color:u.value?"#999":"#fff",fontSize:13,fontWeight:"bold"}},series:[{data:[160,100,150,80,190,100,175,120,160],type:"bar",barMaxWidth:20,color:u.value?l("--main-color"):"#fff",itemStyle:{borderRadius:[6,6,6,6]}}]})})),A((()=>{i()})),(e,t)=>(v(),g("div",Y,[S("div",{class:"chart",ref_key:"chartRef",ref:a},null,512),t[0]||(t[0]=S("div",{class:"text"},[S("h3",{class:"custom-text box-title"},"用户概述"),S("p",{class:"custom-text subtitle"},[L("比上周 "),S("span",null,"+23%")]),S("p",{class:"custom-text subtitle"},"我们为您创建了多个选项，可将它们组合在一起并定制为像素完美的页面")],-1)),S("div",Z,[(v(),g(V,null,_(d,((e,t)=>S("div",{key:t},[S("p",null,f(e.num),1),S("p",ee,f(e.name),1)]))),64))])]))}}),[["__scopeId","data-v-e69bbe9a"]]),ae={class:"region sales-overview console-box"},se=e(y({__name:"SalesOverview",setup(e){const a=T(),{setOptions:s,removeResize:o,resize:n}=q(a),c=t(),u=w((()=>c.systemThemeType)),d=w((()=>u.value===r.LIGHT)),p=t(),m=w((()=>p.menuOpen));D(m,(()=>{[100,200,300].forEach((e=>{setTimeout(n,e)}))})),j((()=>{h()})),A((()=>{o()}));const h=()=>{s({grid:{left:"2.2%",right:"3%",bottom:"0%",top:"5px",containLabel:!0},tooltip:{trigger:"axis"},xAxis:{type:"category",boundaryGap:!1,data:["2013","2014","2015","2016","2017","2018","2019","2020","2021"],axisLabel:{show:!0,color:"#999",margin:20,interval:0,fontSize:13,fontWeight:"bold"},axisLine:{show:!1}},yAxis:{type:"value",axisLabel:{show:!0,color:"#999",fontSize:13,fontWeight:"bold"},axisLine:{show:!!d.value,lineStyle:{color:"#E8E8E8",width:1}},splitLine:{show:!0,lineStyle:{color:d.value?"#e8e8e8":"#444",width:1,type:"dashed"}}},series:[{name:"销售",color:l("--main-color"),type:"line",stack:"总量",data:[80,40,300,200,500,250,160,304,180],smooth:!0,symbol:"none",lineStyle:{width:2.6},areaStyle:{color:new N.graphic.LinearGradient(0,0,0,1,[{offset:0,color:i(l("--el-color-primary"),.2).rgba},{offset:1,color:i(l("--el-color-primary"),.01).rgba}])}}]})};return(e,t)=>(v(),g("div",ae,[t[0]||(t[0]=S("div",{class:"card-header"},[S("div",{class:"title"},[S("h4",{class:"custom-text box-title"},"访问量"),S("p",{class:"custom-text subtitle"},[L("今年增长"),S("span",null,"+15%")])])],-1)),S("div",{class:"chart",ref_key:"chartRef",ref:a},null,512)]))}}),[["__scopeId","data-v-4744c8ba"]]),le={class:"region new-user console-box"},ie={class:"card-header"},re={style:{display:"flex","align-items":"center"}},oe=["src"],ne={class:"user-name"},ce={style:{display:"flex","align-items":"center"}},ue={style:{"margin-left":"10px"}},de=e(y({__name:"NewUser",setup(e){const t=T("本月"),a=x([{username:"中小鱼",province:"北京",sex:0,age:22,percentage:60,pro:0,color:"#2C90FF !important",avatar:o},{username:"何小荷",province:"深圳",sex:1,age:21,percentage:20,pro:0,color:"#BC7FEB !important",avatar:n},{username:"誶誶淰",province:"上海",sex:1,age:23,percentage:60,pro:0,color:"#95DE64 !important",avatar:c},{username:"发呆草",province:"长沙",sex:0,age:28,percentage:50,pro:0,color:"#B7CBE2 !important",avatar:u},{username:"甜筒",province:"浙江",sex:1,age:26,percentage:70,pro:0,color:"#909399 !important",avatar:d},{username:"冷月呆呆",province:"湖北",sex:1,age:25,percentage:90,pro:0,color:"#9BB4F3 !important",avatar:p}]);j((()=>{s()}));const s=()=>{setTimeout((()=>{for(let e=0;e<a.length;e++){let t=a[e];a[e].pro=t.percentage}}),100)};return(e,s)=>{const l=P,i=B,r=z,o=I,n=m;return v(),g("div",le,[S("div",ie,[s[1]||(s[1]=S("div",{class:"title"},[S("h4",{class:"custom-text box-title"},"新用户"),S("p",{class:"custom-text subtitle"},[L("这个月增长"),S("span",null,"+20%")])],-1)),k(i,{modelValue:O(t),"onUpdate:modelValue":s[0]||(s[0]=e=>E(t)?t.value=e:null)},{default:C((()=>[k(l,{value:"本月",label:"本月"}),k(l,{value:"上月",label:"上月"}),k(l,{value:"今年",label:"今年"})])),_:1},8,["modelValue"])]),k(n,{data:O(a)},{default:C((()=>[k(r,{label:"头像",prop:"avatar",width:"150px"},{default:C((e=>[S("div",re,[S("img",{class:"avatar",src:e.row.avatar},null,8,oe),S("span",ne,f(e.row.username),1)])])),_:1}),k(r,{label:"地区",prop:"province"}),k(r,{label:"性别",prop:"avatar"},{default:C((e=>[S("div",ce,[S("span",ue,f(1===e.row.sex?"男":"女"),1)])])),_:1}),k(r,{label:"进度",width:"240"},{default:C((e=>[k(o,{percentage:e.row.pro,color:e.row.color,"stroke-width":4},null,8,["percentage","color"])])),_:1})])),_:1},8,["data"])])}}}),[["__scopeId","data-v-ab0437ec"]]),pe={class:"region dynamic console-box"},me={class:"list"},he={class:"user"},be={class:"type"},ge={class:"target"},fe=e(y({__name:"Dynamic",setup(e){const t=x([{username:"中小鱼",type:"关注了",target:"誶誶淰"},{username:"何小荷",type:"发表文章",target:"Vue3 + Typescript + Vite 项目实战笔记"},{username:"誶誶淰",type:"提出问题",target:"主题可以配置吗"},{username:"发呆草",type:"兑换了物品",target:"《奇特的一生》"},{username:"甜筒",type:"关闭了问题",target:"发呆草"},{username:"冷月呆呆",type:"兑换了物品",target:"《高效人士的七个习惯》"}]);return(e,a)=>(v(),g("div",pe,[a[0]||(a[0]=S("div",{class:"card-header"},[S("div",{class:"title"},[S("h4",{class:"custom-text box-title"},"动态"),S("p",{class:"custom-text subtitle"},[L("新增"),S("span",null,"+6")])])],-1)),S("div",me,[(v(!0),g(V,null,_(O(t),((e,t)=>(v(),g("div",{key:t},[S("span",he,f(e.username),1),S("span",be,f(e.type),1),S("span",ge,f(e.target),1)])))),128))])]))}}),[["__scopeId","data-v-6c90e2d8"]]),ve={class:"region todo-list console-box"},ye={class:"list"},we={class:"title"},xe={class:"date custom-text subtitle"},Ve=e(y({__name:"TodoList",setup(e){const t=x([{username:"查看今天工作内容",date:"上午 09:30",complate:!0},{username:"回复邮件",date:"上午 10:30",complate:!0},{username:"工作汇报整理",date:"上午 11:00",complate:!0},{username:"产品需求会议",date:"下午 02:00",complate:!1},{username:"整理会议内容",date:"下午 03:30",complate:!1},{username:"明天工作计划",date:"下午 06:30",complate:!1}]);return(e,a)=>{const s=R;return v(),g("div",ve,[a[0]||(a[0]=S("div",{class:"card-header"},[S("div",{class:"title"},[S("h4",{class:"custom-text box-title"},"代办事项"),S("p",{class:"custom-text subtitle"},[L("待处理"),S("span",null,"+6")])])],-1)),S("div",ye,[(v(!0),g(V,null,_(O(t),((e,t)=>(v(),g("div",{key:t},[S("p",we,f(e.username),1),S("p",xe,f(e.date),1),k(s,{modelValue:e.complate,"onUpdate:modelValue":t=>e.complate=t},null,8,["modelValue","onUpdate:modelValue"])])))),128))])])}}}),[["__scopeId","data-v-0c1cb7e6"]]),_e={class:"console"},Se={class:"column column2"},ke={class:"column column3"},Oe={class:"bottom-wrap console-box"},Fe={class:"button-wrap"},Te=e(y({__name:"index",setup(e){const a=t(),s=w((()=>a.systemThemeType));D(s,(()=>{a.reload()}));const l=h.name;b();const i=e=>{window.open(e)};return(e,t)=>(v(),g("div",_e,[k(X),S("div",Se,[k(te),k(se)]),S("div",ke,[k(de),k(fe),k(Ve)]),S("div",Oe,[S("div",null,[t[8]||(t[8]=S("h2",{class:"custom-text box-title"},"关于项目",-1)),S("p",null,f(O(l))+" 是一套企业级的高颜值、高性能、高体验的通用型后台前端解决方案",1),t[9]||(t[9]=S("p",null,"使用了 Vue3、TypeScript、Vite、Element Plus 等前沿技术",-1)),S("div",Fe,[S("div",{class:"btn",onClick:t[0]||(t[0]=e=>i("https://www.lingchen.kim/art-design-pro/docs/"))},t[4]||(t[4]=[S("span",null,"项目官网",-1),S("i",{class:"iconfont"},"",-1)])),S("div",{class:"btn",onClick:t[1]||(t[1]=e=>i("https://www.lingchen.kim/art-design-pro/docs/guide/introduce.html"))},t[5]||(t[5]=[S("span",null,"文档",-1),S("i",{class:"iconfont"},"",-1)])),S("div",{class:"btn",onClick:t[2]||(t[2]=e=>i("https://github.com/Daymychen"))},t[6]||(t[6]=[S("span",null,"Github",-1),S("i",{class:"iconfont"},"",-1)])),S("div",{class:"btn",onClick:t[3]||(t[3]=e=>i("https://www.lingchen.kim"))},t[7]||(t[7]=[S("span",null,"博客",-1),S("i",{class:"iconfont"},"",-1)]))])]),t[10]||(t[10]=S("img",{class:"right-img",src:"/manager/assets/draw1-Ce1WF34i.png"},null,-1))])]))}}),[["__scopeId","data-v-5b9203ec"]]);export{Te as default};
