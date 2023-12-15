"use strict";(self.webpackChunkshopping=self.webpackChunkshopping||[]).push([[686],{2686:function(n,e,t){t.r(e),t.d(e,{Flex:function(){return V},default:function(){return Q}});var i,r,o,s,c,a,d,l,u,p,f,x,h,v,Z=t(168),m=t(4165),g=t(5861),w=t(9439),k=t(1074),j=t(718),b=t(6487),y=t(680),P=t(1087),C=t(2255),I=t(165),S=t(2791),_=t(3197),M=t(9434),F=t(498),E=t(6783),B=t(8970),O=t(9720),T=t(6730),z=t(6043),A=t(4866),U=t(3044),D=t(9770),R=t(184),N=function(n){var e=n.socket,t=(0,S.useState)([]),i=(0,w.Z)(t,2),r=i[0],o=i[1],s=(0,M.v9)((function(n){return n.user.currentUser})),c=(0,M.v9)((function(n){return n.darkMode})),a=(0,S.useState)([]),d=(0,w.Z)(a,2),l=d[0],u=d[1],p=(0,S.useState)(!1),f=(0,w.Z)(p,2),x=f[0],h=f[1],v=(0,S.useState)([]),Z=(0,w.Z)(v,2),k=Z[0],j=Z[1],b=(0,M.I0)(),y=(0,S.useState)([]),C=(0,w.Z)(y,2),I=C[0],F=C[1];(0,S.useEffect)((function(){j(Array(l.length).fill(null)),F(Array(l.length).fill(!1))}),[l]);return(0,S.useEffect)((function(){var n=function(){var n=(0,g.Z)((0,m.Z)().mark((function n(t){var i,r,o;return(0,m.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return i={userId:s._id,profileId:t,text:"".concat(s.username," started following you.")},n.prev=1,n.next=4,_.b.post("/noti/create",{notificationId:t,message:i},{headers:{token:"Bearer "+s.accessToken}});case 4:return null===e||void 0===e||null===(r=e.current)||void 0===r||r.emit("startedFollowing",i),n.next=7,_.b.put("/users/follow/"+t,{userId:s._id},{headers:{token:"Bearer "+s.accessToken}});case 7:o=n.sent,h(null),b((0,D.he)(o.data)),n.next=15;break;case 12:n.prev=12,n.t0=n.catch(1),console.log("");case 15:case"end":return n.stop()}}),n,null,[[1,12]])})));return function(e){return n.apply(this,arguments)}}();k[x]&&n(k[x])}),[x,k]),(0,S.useEffect)((function(){var n=function(){var n=(0,g.Z)((0,m.Z)().mark((function n(){var e;return(0,m.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,_.b.get("/users/friends/"+(null===s||void 0===s?void 0:s._id),{headers:{token:"Bearer "+(null===s||void 0===s?void 0:s.accessToken)}});case 2:e=n.sent,o(e.data.allFollowing);case 4:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()}),[]),(0,S.useEffect)((function(){var n=function(){var n=(0,g.Z)((0,m.Z)().mark((function n(){var e,t;return(0,m.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,_.b.get("/users/suggestions/users",{headers:{token:"Bearer "+(null===s||void 0===s?void 0:s.accessToken)}});case 2:e=n.sent,t=[],e.data.filter((function(n){return n._id!==(null===s||void 0===s?void 0:s._id)})).forEach((function(n){r.every((function(e){return e._id!==(null===n||void 0===n?void 0:n._id)}))&&t.push(n)})),u(t);case 7:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()}),[r]),(0,R.jsxs)(L,{children:[0!==r.length&&(0,R.jsx)("h2",{children:"You are following"}),(0,R.jsx)(W,{show:0!==r.length,children:r.map((function(n,e){return(0,R.jsxs)(Y,{children:[(0,R.jsxs)(P.rU,{to:"/account/?user=".concat(n._id),children:["  ",(0,R.jsx)(U.Z,{sx:{width:"3.4vw",height:"3.4vw"},src:n.profilePic})," "]}),(0,R.jsx)("span",{children:n.username})]},e)}))}),(0,R.jsx)("h2",{children:"Suggested for you"}),(0,R.jsx)(q,{children:l.map((function(n,e){return(0,R.jsxs)(H,{darkMode:c,children:[(0,R.jsxs)(K,{children:["     ",(0,R.jsx)(P.rU,{to:"/account/?user=".concat(n._id),className:"link",style:{color:"white"},children:(0,R.jsx)(U.Z,{sx:{width:"3.4vw",height:"3.4vw"},src:n.profilePic})}),(0,R.jsx)(J,{darkMode:c,children:n.username})]}),(0,R.jsx)(G,{isFollowing:I[e],onClick:function(){h(e),function(n,e){var t=k.slice();t[n]=e,j(t);var i=I.slice();i[n]=!i[n],F(i)}(e,n._id)},children:I[e]?"UnFollow":"Follow"})]},e)}))})]})},L=b.ZP.div(i||(i=(0,Z.Z)(["\n    padding: 30px 0 30px 80px;\n    display: flex;\n    flex-direction: column;\n    width: 34%;\n    gap: 15px;\n    height: 100vh;\n    position: sticky;\n    overflow-y:scroll;\n    top: 0;\n    scrollbar-width:none;\n    &::-webkit-scrollbar{\n        display: none;\n    };\n    &>h2{\n        font-family: 'Poppins';\n        font-weight: 400;\n    }\n    @media screen and (max-width:768px){\n        display: none;\n   \n\n }\n"]))),W=b.ZP.div(r||(r=(0,Z.Z)(["\ndisplay: ",";\nflex-wrap: wrap;\ngap: 20px;\nmargin-bottom: 8vh;\n"])),(function(n){return n.show?"flex":"none"})),Y=b.ZP.div(o||(o=(0,Z.Z)(["\ndisplay: flex;\nflex-direction: column;\nalign-items: center;\ngap: 10px;\n"]))),q=b.ZP.div(s||(s=(0,Z.Z)(["\n    display: flex;\nflex-direction: column;\ngap: 8px;\n\n"]))),G=b.ZP.button(c||(c=(0,Z.Z)(["\n  border: none;\n  padding: 10px;\n  font-size: 15px;\n  \n  background-color: transparent;\n text-decoration: none;\n  transition:all 0.5s ease;\n  cursor: pointer;\n  opacity:1;\n \n  color:",";\n  &:hover{\n    color: #171717;\n  }\n"])),(function(n){return n.isFollowing?"#222":"#0095f6"})),H=b.ZP.div(a||(a=(0,Z.Z)(["\ndisplay: flex;\nalign-items: center;\ngap: 10px;\nposition:relative;\njustify-content: space-between;\npadding: 8px;\n\nwidth: 80%;\ntransition:all 0.5s ease;\nborder-radius: 3px;\n\n"]))),J=b.ZP.h3(d||(d=(0,Z.Z)(["\n color:#2b2a2b;\n font-weight: 400;\n font-size: 16px;\ncolor:","\n"])),(function(n){return n.darkMode&&"#e8e8e9"})),K=b.ZP.div(l||(l=(0,Z.Z)(["\ndisplay: flex;\nalign-items: center;\ngap: 15px;\n"]))),Q=function(n){var e=n.socket,t=(0,M.v9)((function(n){return n.user.currentUser})),i=(0,S.useState)([]),r=(0,w.Z)(i,2),o=r[0],s=r[1],c=(0,S.useState)(!1),a=(0,w.Z)(c,2),d=a[0],l=a[1],u=(0,S.useState)(!1),p=(0,w.Z)(u,2),f=p[0],x=p[1],h=(0,S.useState)(0),v=(0,w.Z)(h,2),Z=v[0],b=v[1],P=(0,S.useState)(!1),U=(0,w.Z)(P,2),D=U[0],L=U[1],W=(0,M.v9)((function(n){return n.darkMode})),Y=(0,S.useState)(!1),q=(0,w.Z)(Y,2),G=q[0],H=q[1],J=(0,S.useState)(!0),K=(0,w.Z)(J,2),Q=K[0],rn=K[1],on=(0,S.useState)([]),sn=(0,w.Z)(on,2),cn=sn[0],an=sn[1],dn=(0,S.useState)([]),ln=(0,w.Z)(dn,2),un=ln[0],pn=ln[1];return(0,S.useEffect)((function(){var n=function(){var n=(0,g.Z)((0,m.Z)().mark((function n(){var e;return(0,m.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,_.b.get("/noti/get/"+(null===t||void 0===t?void 0:t._id),{headers:{token:"Bearer "+(null===t||void 0===t?void 0:t.accessToken)}});case 2:e=n.sent,pn(e.data);case 4:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()}),[t]),(0,S.useEffect)((function(){var n=function(){var n=(0,g.Z)((0,m.Z)().mark((function n(){var e,i,r;return(0,m.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,_.b.get("/posts/timeline/"+(null===t||void 0===t?void 0:t._id),{headers:{token:"Bearer "+(null===t||void 0===t?void 0:t.accessToken)}});case 2:e=n.sent,i=e.data,r=i.sort((function(n,e){return new Date(e.createdAt)-new Date(n.createdAt)})),s(r);case 6:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()}),[f]),(0,S.useEffect)((function(){var n=function(){var n=(0,g.Z)((0,m.Z)().mark((function n(){var e,i,r;return(0,m.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,_.b.get("/posts/random/posts",{headers:{token:"Bearer "+(null===t||void 0===t?void 0:t.accessToken)}});case 2:e=n.sent,i=e.data,r=i.sort((function(n,e){return new Date(e.createdAt)-new Date(n.createdAt)})),an(r);case 6:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()}),[f]),(0,R.jsxs)(V,{children:[o.length>0&&(0,R.jsx)(I.Z,{open:d,socket:e,setIndex:b,index:Z,length:o.length,setOpen:l,selected:o[Z],fetch:f,setFetch:x}),(0,R.jsx)(F.Z,{socket:e}),(0,R.jsxs)(X,{children:[(0,R.jsx)(O.Z,{fetch:f,setFetch:x,setOpenComment:L,socket:e,openComment:D,selected:o[Z]}),(0,R.jsx)($,{children:0!==o.length?o.map((function(n,t){return(0,R.jsx)(T.Z,{setFetch:x,fetch:f,socket:e,setIndex:b,index:t,setMuted:rn,muted:Q,item:n,setOpen:l,setOpenComment:L},t)})):cn.map((function(n,t){return(0,R.jsx)(T.Z,{setFetch:x,fetch:f,socket:e,setIndex:b,index:t,setMuted:rn,muted:Q,item:n,setOpen:l,setOpenComment:L},t)}))}),(0,R.jsx)(N,{socket:e})]}),(0,R.jsxs)(nn,{darkMode:W,children:[(0,R.jsx)("img",{src:W?y.Z:k.Z,alt:""}),(0,R.jsxs)(tn,{children:[(0,R.jsx)(z.Z,{badgeContent:un.length,color:"primary",children:(0,R.jsx)("img",{src:W?j.Z:B.Z,onClick:function(){return H(!G)}})}),(0,R.jsxs)(en,{to:"/direct-inbox",children:[" ",(0,R.jsx)("img",{src:W?C.Z:E.Z})]})]}),(0,R.jsx)(A.Z,{noti:G,setNotifications:pn,notifications:un,setNoti:H})]})]})},V=b.ZP.div(u||(u=(0,Z.Z)(["\ndisplay: flex;width: 100vw;\njustify-content: space-between;\nheight: max-content;\n"]))),X=b.ZP.div(p||(p=(0,Z.Z)(["\n   \n    width: 84vw;\n    \n    display: flex;\n  \n    position: relative;\n\n    @media screen and (max-width:768px){\n      width: 100vw;\n    }\n   \n"]))),$=b.ZP.div(f||(f=(0,Z.Z)(["\npadding: 0px 0 0px 4vw;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 15px;\n    width: 66%;\n    \n    height: 100vh;\n    overflow-y: auto;\n    scrollbar-width: none;\n    &::-webkit-scrollbar{\n      display: none;\n    };\n    @media screen and (max-width:768px){\n       width: 100%;\n       padding: 0 0 7.5vh 0;\n       &>:first-child{\n        margin-top: 7vh;\n    }\n    };\n\n    &>:first-child{\n        margin-top: 8vh;\n    };\n    &>:last-child{\n        margin-bottom: 30px;\n    }\n\n"]))),nn=b.ZP.div(x||(x=(0,Z.Z)(["\n     display: none;\n    justify-content: space-between;\n    align-items: center;\n    padding: 0px 15px;\n    position: fixed;\n    height: 7vh;\n    width: 100vw;\n    color: ",";\n    top: 0;\n    background-color: white;\n    background-color: ",";\n    z-index: 1;\n    @media screen and (max-width:768px){\n        display: flex;\n    }\n"])),(function(n){return n.darkMode&&"white"}),(function(n){return n.darkMode&&"black"})),en=(0,b.ZP)(P.rU)(h||(h=(0,Z.Z)(["\n    text-decoration: none;\n    color: #494747;\n"]))),tn=b.ZP.div(v||(v=(0,Z.Z)(["\n    display: flex;\n   gap: 10px;\n    align-items: center;\n  \n"])))},6730:function(n,e,t){var i,r,o,s,c,a,d,l,u,p,f,x,h,v,Z=t(168),m=t(3433),g=t(4165),w=t(5861),k=t(9439),j=t(3044),b=t(7229),y=t(7488),P=t(6487),C=t(8263),I=t(7237),S=t(1671),_=t(2961),M=t(1942),F=t(2791),E=t(3197),B=t(9434),O=t(6614),T=t(8720),z=t(2442),A=t(3688),U=t(6682),D=t(6338),R=t(184);e.Z=function(n){var e,t=n.setFetch,i=n.fetch,r=n.item,o=n.setIndex,s=n.setOpen,c=n.setOpenComment,a=n.socket,d=n.index,l=n.setMuted,u=n.muted,p=(0,B.v9)((function(n){return n.user.currentUser})),f=(0,F.useState)(r.likes),x=(0,k.Z)(f,2),h=x[0],v=x[1],Z=(0,F.useState)(!1),P=(0,k.Z)(Z,2),en=P[0],tn=P[1],rn=null===h||void 0===h?void 0:h.find((function(n){return n===p._id})),on=(0,B.v9)((function(n){return n.darkMode})),sn=(0,F.useRef)(),cn=(0,F.useState)(!1),an=(0,k.Z)(cn,2),dn=an[0],ln=an[1],un=(0,F.useState)(!1),pn=(0,k.Z)(un,2),fn=pn[0],xn=pn[1],hn=(0,F.useRef)(null);(0,F.useEffect)((function(){var n=new IntersectionObserver((function(n){n.forEach((function(n){n.isIntersecting?ln(!0):ln(!1)}))}));return null!==sn&&void 0!==sn&&sn.current&&n.observe(null===sn||void 0===sn?void 0:sn.current),function(){n.disconnect()}}),[]);var vn=function(){var n=(0,w.Z)((0,g.Z)().mark((function n(e){var r,o;return(0,g.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r={profileId:e.postId,postId:e._id,text:"".concat(p.username," liked your post")},n.prev=1,!rn||e.postId===(null===p||void 0===p?void 0:p._id)){n.next=6;break}return null===a||void 0===a||null===(o=a.current)||void 0===o||o.emit("postLiked",r),n.next=6,E.b.post("/noti/create",{notificationId:e.postId,message:r},{headers:{token:"Bearer "+p.accessToken}});case 6:return n.next=8,E.b.put("/posts/like/"+e._id,{userId:p._id},{headers:{token:"Bearer "+p.accessToken}});case 8:t(!i),tn(!1),n.next=15;break;case 12:n.prev=12,n.t0=n.catch(1),console.log("");case 15:case"end":return n.stop()}}),n,null,[[1,12]])})));return function(e){return n.apply(this,arguments)}}();(0,F.useEffect)((function(){var n,e;dn?(null===hn||void 0===hn||null===(n=hn.current)||void 0===n||n.play(),xn(!0)):(null===hn||void 0===hn||null===(e=hn.current)||void 0===e||e.pause(),xn(!1))}),[dn]),(0,F.useEffect)((function(){v(r.likes)}),[r]),(0,F.useEffect)((function(){en&&vn(r)}),[en]);return(0,R.jsxs)(Y,{ref:sn,children:[(0,R.jsxs)(q,{children:[(0,R.jsx)(M.F,{to:"/account/?user=".concat(r.postId),children:(0,R.jsxs)(G,{children:[(0,R.jsx)(j.Z,{src:r.profilePic}),(0,R.jsx)(M.F,{darkMode:on,children:r.username})]})}),(0,R.jsx)("img",{src:C.Z,alt:""})]}),(0,R.jsxs)(H,{children:[r.isReel&&(0,R.jsx)(R.Fragment,{children:(0,R.jsx)(N,{onClick:function(){return l(!u)},children:u?(0,R.jsx)(D.Z,{htmlColor:"white"}):(0,R.jsx)(U.Z,{htmlColor:"white"})})}),r.isReel?dn&&(0,R.jsx)(K,{onClick:function(){var n;fn?(null===hn||void 0===hn||null===(n=hn.current)||void 0===n||n.pause(),xn(!1)):(null===hn||void 0===hn||hn.current.play(),xn(!0))},muted:u,ref:hn,loop:!0,src:r.video}):(0,R.jsx)(J,{onClick:function(){o(d),s(!0)},src:r.image})]}),(0,R.jsxs)(Q,{children:[(0,R.jsxs)(V,{children:[(0,R.jsxs)(X,{children:[rn?(0,R.jsx)(I.Z,{htmlColor:"crimson",onClick:function(){v(h.filter((function(n){return n!==(null===p||void 0===p?void 0:p._id)}))),tn(!0)}}):(0,R.jsx)(y.Z,{onClick:function(){v((function(n){return[].concat((0,m.Z)(n),[null===p||void 0===p?void 0:p._id])})),tn(!0)}}),(0,R.jsx)("img",{src:on?b.Z:S.Z,alt:"",onClick:function(){c(!0),o(d),s(!0)}}),(0,R.jsx)("img",{src:on?z.Z:_.Z,alt:"",onClick:function(){o(d),s(!0)}})]}),(0,R.jsx)($,{src:on?T.Z:O.Z})]}),(0,R.jsxs)("span",{children:[h.length," likes"]}),(0,R.jsxs)(W,{children:[(0,R.jsx)("span",{children:r.username})," ",(0,R.jsx)("p",{children:r.caption})]}),(0,R.jsx)(L,{darkMode:on,children:(0,A.WU)(r.createdAt)}),(0,R.jsxs)("span",{onClick:function(){o(d),s(!0),c(!0)},children:["view all ",null===(e=r.comments)||void 0===e?void 0:e.length," comments"]}),(0,R.jsx)(nn,{darkMode:on,onClick:function(){o(d),s(!0)},type:"text",placeholder:"Add a comment"})]})]})};var N=P.ZP.button(i||(i=(0,Z.Z)(["\n  position: absolute;\n  top: 15px;\n  right: 15px;\n  border:none;\n background-color: transparent;\n  opacity:1;\n transition: all 0.6s ease;\n z-index: 99;\n  cursor: pointer;\n \n  @media screen and (max-width:768px){\n        opacity: 1;\n    }\n \n \n"]))),L=P.ZP.p(r||(r=(0,Z.Z)(["\n  font-size: 13px;\n  font-family:'Poppins';\n  color:#545252;\n  color:","\n\n"])),(function(n){return n.darkMode&&"#b5b5b5"})),W=P.ZP.div(o||(o=(0,Z.Z)(["\ndisplay: flex;\n    gap: 5px;\n    font-size: 16px;\n    font-weight: 500;\n    \n   &>p{\n    font-size: 14px;\n    font-weight: 300;\n\n    \n   }\n"]))),Y=P.ZP.div(s||(s=(0,Z.Z)(["\n    display: flex;\n    flex-direction: column;\n    width: 55%;\n    gap: 10px;\n    padding-bottom: 10px;\n    border-bottom: 0.8px solid #cac8cc;\n    \n    @media screen and (max-width:768px){\n        width: 100%;\n        \n    }\n"]))),q=P.ZP.div(c||(c=(0,Z.Z)(["\n    display: flex;\n   justify-content: space-between;\n   align-items: center;\n   @media screen and (max-width:768px){\n        padding: 0 15px;\n        \n    }\n   &>*{\n        cursor: pointer;\n    }\n"]))),G=P.ZP.span(a||(a=(0,Z.Z)(["\n    display: flex;\n    gap: 8px;\n    align-items: center;\n    padding-left: 8px;\n    @media screen and (max-width:768px){\n        padding: 0 ;\n        \n    }\n   \n"]))),H=P.ZP.div(d||(d=(0,Z.Z)(["\n    display: flex;\n    position: relative;\n   height: 70vh;\n  align-items: flex-end;\n   cursor: pointer;\n   \n   @media screen and (max-width:768px){\n        height: 63vh;\n      \n    }\n"]))),J=P.ZP.img(l||(l=(0,Z.Z)(["\n    width: 100%;\n    height: 100%;\n    border-radius: 2px;\n"]))),K=P.ZP.video(u||(u=(0,Z.Z)(["\n    width: 100%;\n    height: 100%;\n    border-radius: 2px;\n    object-fit: cover;\n   \n"]))),Q=P.ZP.div(p||(p=(0,Z.Z)(["\n   display: flex;\n   flex-direction: column;\n   gap: 6px;\n   font-size: 15px;\n   @media screen and (max-width:768px){\n        padding: 0 15px;\n        gap: 4px;\n    }\n"]))),V=P.ZP.div(f||(f=(0,Z.Z)(["\n    display: flex;\n   justify-content: space-between;\n   align-items: center;\n"]))),X=P.ZP.div(x||(x=(0,Z.Z)(["\n    display: flex;\n  gap: 18px;\n   align-items: center;\n   &>*{\n        cursor: pointer;\n    }\n"]))),$=P.ZP.img(h||(h=(0,Z.Z)(["\n    cursor: pointer;\n"]))),nn=P.ZP.input(v||(v=(0,Z.Z)(["\n  border: none;\n  background-color:",";\n  &:focus{\n    outline: none;\n  };\n  @media screen and (max-width:768px){\n       display: none;\n    }\n"])),(function(n){return n.darkMode?"black":"white"}))}}]);
//# sourceMappingURL=686.29891183.chunk.js.map