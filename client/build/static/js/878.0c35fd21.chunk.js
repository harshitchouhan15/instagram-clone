"use strict";(self.webpackChunkshopping=self.webpackChunkshopping||[]).push([[878],{1074:function(n,e,t){t(2791);e.Z=t.p+"static/media/black.18ab449a59f3895ab29553516206459d.svg"},3197:function(n,e,t){t.d(e,{b:function(){return a}});var a=t(1243).Z.create({baseURL:"https://instagram-acd82.web.app/api"})},4857:function(n,e,t){t.r(e),t.d(e,{default:function(){return R}});var a,i,r,s,d,o,c,l,p,u,x=t(168),h=t(4165),m=t(5861),f=t(4942),g=t(1413),w=t(9439),Z=t(2791),v=t(6487),b=t(1074),j=t(3197),y=t(8225),k=t(9434),P=t(9770),C=t(1087),S=t(8610),q=t(3746),U=t(8974),D=t(8029),E=t(8096),N=t(3400),A=t(4925),F=t(9009),I=t.p+"static/media/login.d688ff1f110b88f3c0c9.png",L=(t(5091),t(184)),R=function(){var n=(0,Z.useState)({}),e=(0,w.Z)(n,2),t=e[0],a=e[1],i=(0,k.I0)(),r=(0,Z.useState)(!1),s=(0,w.Z)(r,2),d=s[0],o=s[1],c=(0,Z.useState)(!1),l=(0,w.Z)(c,2),p=l[0],u=l[1],x=(0,Z.useState)(!1),v=(0,w.Z)(x,2),S=v[0],E=v[1],R=function(n){var e=n.target.value;a((function(t){return(0,g.Z)((0,g.Z)({},t),{},(0,f.Z)({},n.target.name,e))}))},O=function(n){var e=t.password.length>=8,a=/[A-Z]/.test(t.password),i=/[0-9]/.test(t.password),r=/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(t.password);return e&&a&&i&&r},Q=function(){var n=(0,m.Z)((0,h.Z)().mark((function n(){var e;return(0,h.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!O(t.password)){n.next=15;break}return i((0,P.h8)()),n.prev=2,n.next=5,j.b.post("/auth/register",t);case 5:e=n.sent,i((0,P.he)(e.data)),n.next=13;break;case 9:n.prev=9,n.t0=n.catch(2),i((0,P.UR)()),o(!0);case 13:n.next=17;break;case 15:E(!1),alert("Password is invalid. It must have at least 8 characters and include at least one capital letter, one number, and one special character.");case 17:case"end":return n.stop()}}),n,null,[[2,9]])})));return function(){return n.apply(this,arguments)}}();return(0,Z.useEffect)((function(){S&&Q()}),[S]),(0,Z.useEffect)((function(){d&&(E(!1),setTimeout((function(){return o(!1)}),3e3))}),[d]),(0,L.jsxs)(H,{children:[(0,L.jsx)(M,{src:I}),(0,L.jsxs)($,{children:[(0,L.jsxs)(_,{onSubmit:function(n){n.preventDefault(),E(!0)},children:[(0,L.jsx)(B,{src:b.Z}),(0,L.jsx)(G,{src:y}),(0,L.jsx)("p",{children:"Sign up to see photos and videos from your friends."}),(0,L.jsx)(T,{required:!0,type:"email",onChange:R,name:"email",id:"email",label:"Email"}),(0,L.jsx)(T,{required:!0,type:"text",onChange:R,name:"name",id:"fullname",label:"Full Name"}),(0,L.jsx)(T,{required:!0,type:"text",onChange:R,name:"username",id:"username",label:"Username"}),(0,L.jsxs)(z,{required:!0,variant:"outlined",children:[(0,L.jsx)(A.Z,{htmlFor:"outlined-adornment-password",children:"Password"}),(0,L.jsx)(D.Z,{id:"outlined-adornment-password",onChange:R,name:"password",type:p?"text":"password",endAdornment:(0,L.jsx)(F.Z,{position:"end",children:(0,L.jsx)(N.Z,{"aria-label":"toggle password visibility",onClick:function(){return u(!p)},onMouseDown:function(n){return n.preventDefault()},edge:"end",children:p?(0,L.jsx)(U.Z,{}):(0,L.jsx)(q.Z,{})})}),label:"Password"})]}),(0,L.jsx)(K,{click:S,disabled:S,type:"submit",children:S?(0,L.jsx)("div",{className:"spinner"}):"Sign up"}),d&&(0,L.jsx)("span",{children:"Try with unique username and email"})]}),(0,L.jsxs)(J,{children:[(0,L.jsx)("p",{children:"Have an account?"}),(0,L.jsx)(C.rU,{to:"/login",className:"link color",children:"Log in"})]})]})]})},T=(0,v.ZP)(S.Z)(a||(a=(0,x.Z)(["\n\n@media screen and (max-width:768px){\n margin-top: 5px;\n};\n"]))),z=(0,v.ZP)(E.Z)(i||(i=(0,x.Z)(["\n@media screen and (max-width:768px){\n margin-top: 5px;\n};\n"]))),H=v.ZP.div(r||(r=(0,x.Z)(["\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    justify-content: center;\n    align-items: center;\ngap: 10vw;\n\n"]))),M=v.ZP.img(s||(s=(0,x.Z)(["\n box-shadow: 1px 1px 2px 1px #d2d1d4;\n @media screen and (max-width:768px){\n  display: none;\n};\n"]))),$=v.ZP.div(d||(d=(0,x.Z)(["\n  display: flex;\n  flex-direction: column;\ngap: 15px;\n"]))),_=v.ZP.form(o||(o=(0,x.Z)(["\n     width: 23vw;\n     flex-direction: column;\n    display: flex;\n    justify-content: space-evenly;\n   height: 68vh;\n    padding: 3vh 2vw;\n    border: 1px solid #d3d2d2;\n    @media screen and (max-width:768px){\n  width: 80vw;\n  height: 65vh;\n  padding: 1.5vh 2vw;\n};\n    &>p{\n      color: #3b3a3a;\n      margin-bottom: 10px;\n      text-align: center;\n    };\n    &>span{\n      color: red;\n      margin-block: 5px;\n      text-align: center;\n    }\n"]))),B=v.ZP.img(c||(c=(0,x.Z)(["\nheight: 58px;\nmargin-bottom: 14px;\n@media screen and (max-width:768px){\n  display: none;\n}\n"]))),G=v.ZP.img(l||(l=(0,x.Z)(["\nalign-self: center;\nwidth: 60px;\ndisplay: none;\nmargin-bottom: 14px;\n@media screen and (max-width:768px){\n  display: block;\n}\n"]))),J=v.ZP.div(p||(p=(0,x.Z)(["\n  display: flex;\n  justify-content: center;\n    align-items: center;\n    padding: 3vh 2vw;\n    border: 1px solid #d3d2d2;\n    width: 23vw;\n    gap: 8px;\n    @media screen and (max-width:768px){\n  width: 80vw;\n}\n"]))),K=v.ZP.button(u||(u=(0,x.Z)(["\n  color: white;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border: none;\n  padding: 12px;\n  cursor: pointer;\n  border-radius: 8px;\n  background-color: #0095f6;\n  margin-top: 10px;\n  font-size: 15px;\n  &:hover{\n    background-color: #1877f2\n  };\n  &:focus{\n    cursor:not-allowed;\n    background-color: #1877f2\n  }\n"])))}}]);
//# sourceMappingURL=878.0c35fd21.chunk.js.map