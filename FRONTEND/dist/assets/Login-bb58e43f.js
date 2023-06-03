import{e as x,f as k,u as y,o as w,c as _,a as t,g as v,h as g,v as b,d as S,i as f}from"./index-0807e81b.js";const L=o=>x.post("/staff/auth/signin",o),R={class:"bg-gray-50 dark:bg-gray-900"},V={class:"flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"},q=t("a",{href:"#",class:"flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"},[t("img",{class:"w-8 h-8 mr-2",src:"https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg",alt:"logo"}),S(" CRM-OPERATOR ")],-1),B={class:"w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"},I={class:"p-6 space-y-4 md:space-y-6 sm:p-8"},M=t("h1",{class:"text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"}," Admin dashboard ",-1),T=["onSubmit"],U=t("label",{for:"email",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},"Login",-1),j=t("label",{for:"password",class:"block mb-2 text-sm font-medium text-gray-900 dark:text-white"},"Parol",-1),z=t("div",{class:"flex items-center justify-between"},[t("a",{href:"#",class:"text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"},"esingizdan chiqdimi?")],-1),A=t("button",{type:"submit",class:"w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"}," Kirish ",-1),N={__name:"Login",setup(o){const a=k({username:"",password:""}),p=y(),h=()=>{let r={login:a.username,password:a.password};L(r).then(e=>{var s,d,l,i,n,c,u,m;if(localStorage.setItem("id",(l=(d=(s=e==null?void 0:e.data)==null?void 0:s.data)==null?void 0:d.staff)==null?void 0:l.id),localStorage.setItem("role",(c=(n=(i=e==null?void 0:e.data)==null?void 0:i.data)==null?void 0:n.staff)==null?void 0:c.role),localStorage.setItem("token",(m=(u=e==null?void 0:e.data)==null?void 0:u.data)==null?void 0:m.token),e.status===200)return f.success("Login successful"),p.push("/")}).catch(e=>{f.error("Login failed")})};return(r,e)=>(w(),_("section",R,[t("div",V,[q,t("div",B,[t("div",I,[M,t("form",{class:"space-y-4 md:space-y-6",action:"#",onSubmit:v(h,["prevent"])},[t("div",null,[U,g(t("input",{type:"text",name:"email",id:"email",class:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"name@company.com",required:"","onUpdate:modelValue":e[0]||(e[0]=s=>a.username=s)},null,512),[[b,a.username]])]),t("div",null,[j,g(t("input",{type:"password",name:"password",id:"password",placeholder:"••••••••",class:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",required:"","onUpdate:modelValue":e[1]||(e[1]=s=>a.password=s)},null,512),[[b,a.password]])]),z,A],40,T)])])])]))}};export{N as default};
