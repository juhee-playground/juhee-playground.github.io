"use strict";(self.webpackChunkjuhee_playground=self.webpackChunkjuhee_playground||[]).push([[473],{6064:function(e,a,n){n.r(a),n.d(a,{default:function(){return ie}});var t=n(3433),c=n(4165),r=n(5861),i=n(1413),s=n(9439),o=n(2791),d=n(3228),l=n(3545),p=n(7812),u=n(1243),f=function(e){0};var m=function(e){var a=e.method,n=e.url;return f("\ud83d\ude80 [API] ".concat(null===a||void 0===a?void 0:a.toUpperCase()," ").concat(n," | Request")),e},b=function(e){var a=e.config,n=a.method,t=a.url,c=e.status;return f("\ud83d\ude80 [API] ".concat(null===n||void 0===n?void 0:n.toUpperCase()," ").concat(t," | Response ").concat(c)),e},x=function(e){var a;return null!==(a=null===e||void 0===e?void 0:e.response)&&void 0!==a&&a.data&&console.log("handleErrror@@@@@@@@@",a),Promise.reject(e)};var h,v=u.Z.create({baseURL:"".concat("https://uts64qkqjg.execute-api.ap-northeast-2.amazonaws.com/Prod"),timeout:6e3,headers:{"Content-Type":"application/json"}});(h=v).interceptors.request.use(m),h.interceptors.response.use(b,x);var _=v;function g(){return(g=(0,r.Z)((0,c.Z)().mark((function e(){var a;return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.get("/company");case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(){return j.apply(this,arguments)}function j(){return(j=(0,r.Z)((0,c.Z)().mark((function e(){var a;return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.get("/project");case 2:return a=e.sent,e.abrupt("return",a.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Z(){return(Z=(0,r.Z)((0,c.Z)().mark((function e(a){var n;return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.get("/options",{params:a});case 2:return n=e.sent,e.abrupt("return",n.data.multi_select.options);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var N=n(1933),k=n(3967),O=n(9891),w=n(2009),C=n(4925),S=n(8096),P=n.p+"static/media/apng_loader-ball.8fc06c3523def6e864ee.png",D=n(184),I=function(){return(0,D.jsx)("div",{className:"loading__container",children:(0,D.jsx)("img",{src:P,loading:"lazy",alt:"loadingImage"})})},A=n(5567),R=n(1582),H=n(6723),M=n(4507),J=n(1918),E=n(872),Q=n(2460),V=n(6656),z=n(1798),T=n(1637),U=n(7),W=n(427),F=n(1258),L=n(7596),q=n(3771),G=n(4378),B={red:{bg:Q.Z[100],text:Q.Z[600]},brown:{bg:V.Z[100],text:V.Z[600]},purple:{bg:z.Z[100],text:z.Z[600]},yellow:{bg:T.Z[100],text:T.Z[900]},green:{bg:U.Z[100],text:U.Z[600]},blue:{bg:W.Z[100],text:W.Z[600]},orange:{bg:F.Z[100],text:F.Z[600]},default:{bg:L.Z[100],text:L.Z[600]},gray:{bg:q.Z[100],text:q.Z[600]},pink:{bg:G.Z[100],text:G.Z[600]}};var X=function(e){var a,n=e.selected,t=e.color,c=e.size,r=e.label,i=e.clickable,s=e.parentFunction;n&&(a=(0,D.jsx)(E.Z,{}));var o={bg:"default",text:"grey"};B[t]&&(o=B[t]);var d=n||!i,l=(0,H.Z)({components:{MuiChip:{styleOverrides:{root:{backgroundColor:d?o.bg:"default",color:d?o.text:"grey",borderColor:d?o.text:"grey"}}}}});return(0,D.jsx)(M.Z,{theme:l,children:(0,D.jsx)(J.Z,{label:(0,D.jsxs)("div",{className:"dChip__label",children:[" ",r]}),size:c,variant:"outlined",icon:a,clickable:i,onClick:function(){s&&s(r)}})})};var K=function(e){var a=e.info,n=a.id,t=a.name,c=a.numberOfParticipants,r=a.explain,i=a.period,s=a.stacks,o=a.contents,d=a.url;return(0,D.jsxs)("div",{className:"project__container",children:[(0,D.jsxs)("div",{className:"list__item list__item--vertical",children:[(0,D.jsxs)("a",{className:"title__link",onClick:function(){window.open(d)},children:[(0,D.jsx)(A.Z,{fontSize:"small",className:"text text__icon--pre"}),(0,D.jsx)("span",{className:"text text__subTitle",children:t})]}),(0,D.jsxs)("span",{className:"numbers text__sub",children:["| \ucc38\uc5ec\uc778\uc6d0: ",(0,D.jsx)("span",{className:"text__sub",children:c})]})]}),(0,D.jsx)("div",{className:"list__item explain",children:(0,D.jsx)("span",{className:"text text__plain",children:r})}),(0,D.jsx)("div",{className:"list__item period",children:(0,D.jsx)("span",{className:"text text__plain",children:i})}),(0,D.jsx)("div",{className:"list__item stacks",children:(0,D.jsx)("ul",{className:"list__container",children:(0,D.jsx)(R.Z,{className:"stacks",direction:"row",spacing:1,children:s.map((function(e){return(0,D.jsx)(X,{size:"small",color:e.color,label:e.name,clickable:!1},e.id)}))})})}),(0,D.jsx)("div",{className:"list__item results",children:o.map((function(e,a){return(0,D.jsx)("span",{className:"text text__plain",children:e},"result_content".concat(a))}))})]},n)};var Y=function(e){var a=e.info,n=a.startDate,t=a.endDate,c=a.period,r=a.name,i=a.role,s=a.department,d=a.id,l=(0,o.useMemo)((function(){return""!==n?"~":null}),[]);return(0,D.jsxs)("div",{className:"box__container",children:[(0,D.jsxs)("div",{className:"left",children:[(0,D.jsx)("span",{className:"text text__sub period",children:n}),(0,D.jsxs)("span",{className:"text text__plain period",children:[" ",l," "]}),(0,D.jsx)("span",{className:"text text__sub period",children:t}),(0,D.jsx)("div",{className:"text text__plain",children:c})]}),(0,D.jsxs)("div",{className:"right",children:[(0,D.jsx)("span",{className:"text text__title",children:r}),(0,D.jsxs)("div",{className:"list chip",children:[(0,D.jsx)("span",{className:"text text__plain",children:i}),(0,D.jsx)("span",{className:"text text__plain",children:" / "}),(0,D.jsx)("span",{className:"text text__plain",children:s})]}),(0,D.jsx)("div",{className:"projects",children:e.subInfo?e.subInfo.filter((function(e){return e.companyId===d})).map((function(e){return(0,D.jsx)(K,{info:e},e.id)})):null})]})]},d)},$=n(9434),ee=function(e){var a,n=e.selected,t=e.label,c=e.clickable,r=e.parentFunction,i=(0,$.v9)((function(e){return e.pointColor})).pointColor,s=(0,k.Z)();return n&&(a=(0,D.jsx)(E.Z,{})),(0,D.jsx)(J.Z,{className:"chip__toggle chip__toggle--".concat(s.palette.mode),sx:{borderRadius:1},style:n?{color:i,borderColor:i}:{color:"grey"},label:(0,D.jsxs)("div",{className:"dChip__label",children:[" ",t]}),size:"small",variant:"outlined",color:n?"primary":"default",icon:a,clickable:c,onClick:function(){r&&r(t)}})};var ae=function(e){var a,n=e.type,t=e.options,c=e.colorOptions,r=e.selected,i=e.onChange,s=function(e){i(e,n)};return(0,D.jsxs)("li",{className:"list__item",children:[(0,D.jsx)("div",{className:"filter__left",children:(0,D.jsx)("span",{className:"text",children:(a=n,a.replace(/\b[a-z]/,(function(e){return e.toUpperCase()})))})}),(0,D.jsx)("div",{className:"filter__chips",children:(0,D.jsx)(R.Z,{direction:"row",flexWrap:"wrap",spacing:1,useFlexGap:!0,children:c?c.map((function(e){var a=e.id,t=e.name,c=e.color;return(0,D.jsx)(X,{selected:-1!==r[n].indexOf(t),label:t,size:"small",color:c,parentFunction:s},a)})):t.map((function(e,a){return(0,D.jsx)(ee,{selected:-1!==r[n].indexOf(e),label:e,color:"primary",clickable:!0,parentFunction:s},"".concat(n,"_").concat(a))}))})})]})},ne=JSON.parse('[{"id":"02458f34-9632-4ee9-9363-ec9b4dd9af2f","name":"\ud1a0\uc774\ud504\ub85c\uc81d\ud2b8","startDate":"","endDate":"","department":"\ubc31\uc8fc\ud76c\ud300","role":"\uc6f9 \uac1c\ubc1c\uc790","period":"."},{"id":"ac39715c-45de-4b35-9daa-30cf52a10664","name":"\ud54f\ud22c\uac8c\ub354","startDate":"2018/07","endDate":"2022/11","department":"\uc18c\ud504\ud2b8\uc6e8\uc5b4\ud300","role":"\ud504\ub7f0\ud2b8 \uac1c\ubc1c\uc790","period":"\uae30\uac04: ( \\n            4\ub144\\n            4\uac1c\uc6d4 \\n            )"},{"id":"f194e7b4-3174-4fd2-8dfc-17ea186dd8ed","name":"\uc640\uc774\uc720\ud30c\ud2b8\ub108\uc2a4","startDate":"2017/03","endDate":"2018/02","department":"\uc18c\ud504\ud2b8\uc6e8\uc5b4\ud300","role":"\uc6f9 \uac1c\ubc1c\uc790","period":"\uae30\uac04: ( \\n            \\n            11\uac1c\uc6d4 \\n            )"}]'),te=JSON.parse('["Vue","React","Javascript","TypeScript","php","MySQL"]'),ce=JSON.parse('[{"id":"7015d12d-81b8-4344-a2b5-0522d6a3a80a","companyId":"ac39715c-45de-4b35-9daa-30cf52a10664","name":"DataManager(\ub370\uc2a4\ud06c\ud0d1 \uc5b4\ud50c\ub9ac\ucf00\uc774\uc158)","period":"2022-05-01~2022-09-30","stacks":[{"id":"877802a8-8154-409d-a0e0-f10ac71c0b8c","name":"Vue","color":"green"},{"id":"254c4a7a-4c56-49d3-a7f2-92635f9b60ee","name":"TypeScript","color":"yellow"},{"id":"d88c41a9-be7d-4bfc-9b57-ffdcc482d63a","name":"electron","color":"blue"}],"explain":"\ud558\ub4dc\uc6e8\uc5b4 \uae30\uae30 \ub370\uc774\ud130 \uc5c5\ub85c\ub4dc, \ud38c\uc6e8\uc5b4, \uae30\uae30 \uc5f0\uacb0 \ub4f1\uc758 \uae30\ub2a5\uc744 \uac00\uc9c4 \ub370\uc2a4\ud06c\ud0d1 \uc5b4\ud50c\ub9ac\ucf00\uc774\uc158","contents":["\u2022 \ub370\uc2a4\ud06c\ud0d1 \uc5b4\ud50c\ub9ac\ucf00\uc774\uc158 \uacbd\ud5d8.","\u2022 Typescript \uc801\uc6a9\ud55c \ud504\ub85c\uc81d\ud2b8","\u2022 \ud558\ub4dc\uc6e8\uc5b4 \uae30\uae30 \ud38c\uc6e8\uc5b4 \uc5c5\ub370\uc774\ud2b8 \uae30\ub2a5 \uac1c\ubc1c","    - \uace0\uac1d\uc5d0\uac8c \ubc29\ubb38\ud558\uc5ec \uc5c5\uadf8\ub808\uc774\ub4dc\ud574\uc8fc\ub358 \uc77c\uc744 \uae30\ub2a5\uc744 \uac1c\ubc1c\ud568\uc73c\ub85c\uc368 \uc0ac\uc6a9\uc790\ub4e4\uc774 \uc9c1\uc811 \uc5c5\ub370\uc774\ud2b8\ub97c \ud560 \uc218 \uc788\uac8c \ud55c \uc791\uc5c5."],"numberOfParticipants":3,"url":"https://dino100.notion.site/DataManager-7015d12d81b84344a2b50522d6a3a80a"},{"id":"fd838cf1-31fc-4d71-8d2b-4d89e7d42dd8","companyId":"ac39715c-45de-4b35-9daa-30cf52a10664","name":"OHCOACH Ultimate(\uc790\uc0ac\uc11c\ube44\uc2a4)","period":"2020-09-01~2022-11-30","stacks":[{"id":"877802a8-8154-409d-a0e0-f10ac71c0b8c","name":"Vue","color":"green"},{"id":"f8094f60-d8c1-438a-be6c-7698c392804b","name":"Javascript","color":"yellow"},{"id":"749ec31e-d31e-4f1f-9d01-535f1b580b8a","name":"D3","color":"gray"},{"id":"04e253fa-81d3-452d-979d-0599ddf68d7b","name":"Highcharts.js","color":"gray"},{"id":"13fb0684-7bee-4ee6-8de0-a8e5258b14bf","name":"Scss","color":"pink"},{"id":"d1d01b78-51c2-4595-8b43-80420bea5729","name":"GoogleMap API","color":"gray"},{"id":"99183b8f-896b-470f-a159-2cbb24333280","name":"Vuex","color":"brown"}],"explain":"\uc790\uc0ac\uc758 \uc8fc\uc694 \uc11c\ube44\uc2a4\ub85c \ucd95\uad6c \ub370\uc774\ud130\ub97c \uc2dc\uac01\ud654\ud558\uc5ec \uc0ac\uc6a9\uc790\uc5d0\uac8c \ub370\uc774\ud130\ub97c \ud6a8\uacfc\uc801\uc73c\ub85c \uc804\ub2ec \ubc0f \uc5c5\ubb34 \ud6a8\uc728\uc744 \ub192\uc5ec\uc8fc\uae30 \uc704\ud55c \uc11c\ube44\uc2a4.","contents":["\u2022 PHP\ub85c \ub9cc\ub4e4\uc5b4\uc9c4 \uc11c\ube44\uc2a4\ub97c SPA\ub85c \ubcc0\uacbd\ud558\uc5ec \uc0c8\ub85c\uc6b4 \ubc84\uc804\uc73c\ub85c \uad6c\ucd95.","    - \ucd08\uae30 \uae30\ubcf8 \uc138\ud305 \uc791\uc5c5","\u2022 \ucc28\ud2b8 \ub77c\uc774\ube0c\ub7ec\ub9ac\ub97c \uc0ac\uc6a9\ud558\uc5ec \ub370\uc774\ud130 \uc2dc\uac01\ud654 \uadf9\ub300\ud654\ud558\ub294 \uc791\uc5c5.","    - \ucd94\ud6c4 D3\ub97c \uc0ac\uc6a9\ud558\uc5ec \ub77c\uc774\ube0c\ub7ec\ub9ac\uc5d0 \uad6d\ud55c\ub418\uc9c0 \uc54a\uace0 \ub354 \ub2e4\uc591\ud55c \uc2dc\uac01\ud654\ub97c \ud45c\ud604.","\u2022 \ube44\uc2b7\ud55c \ucef4\ud3ec\ub10c\ud2b8\ub97c \uacf5\ud1b5 \ucef4\ud3ec\ub10c\ud2b8\ub85c \uad6c\ud604\ud558\uc5ec \ucf54\ub4dc \uac1c\uc120.","\u2022 PDF \uae30\ub2a5\uc744 \ubd99\uc5ec \uc0ac\uc6a9\uc790\ub4e4\uc774 \uc27d\uac8c \uc0ac\uc6a9\ud558\ub3c4\ub85d \ub9ac\ud3ec\ud2b8 \uae30\ub2a5 \uad6c\ud604.","\u2022 \ucf54\ub4dc \uac1c\uc120 \ubc0f \ub9ac\ud399\ud1a0\ub9c1 \uc791\uc5c5","\u2022 Playground \ub77c\ub294 \uac1c\ubc1c\uc790 \ud398\uc774\uc9c0\uc5d0\uc11c \uc774\ub7f0 \uae30\ub2a5\uc774 \uc788\uc5c8\uc73c\uba74 \uc88b\uaca0\ub2e4 \ud558\ub294 \uae30\ub2a5\uc744 \ubbf8\ub9ac \ubd99\uc5ec\ubcf4\uace0 \uc5ed\uc73c\ub85c \uae30\ud68d\ud300\uc5d0 \uc81c\uc548\ud558\ub294 \uc2dc\uc2a4\ud15c\uc744 \ub9cc\ub4e4\uc5b4\uc11c \uc0ac\uc6a9\ud568."],"numberOfParticipants":3,"url":"https://dino100.notion.site/OHCOACH-Ultimate-fd838cf131fc4d718d2b4d89e7d42dd8"},{"id":"19c653a2-c55e-4ff7-a3ae-601aef929362","companyId":"ac39715c-45de-4b35-9daa-30cf52a10664","name":"OHCOACH Admin(\ubc31\uc624\ud53c\uc2a4)","period":"2020-01-02~2021-03-31","stacks":[{"id":"877802a8-8154-409d-a0e0-f10ac71c0b8c","name":"Vue","color":"green"},{"id":"99183b8f-896b-470f-a159-2cbb24333280","name":"Vuex","color":"brown"}],"explain":"\uae30\ubcf8 \uc11c\ube44\uc2a4\ud398\uc774\uc9c0\uc640 \uad00\ub9ac\uc790 \ud398\uc774\uc9c0\uac00 \ud558\ub098\ub85c \ub418\uc5b4 \uc788\uc5c8\ub294\ub370 \uad00\ub9ac\uc790 \ud398\uc774\uc9c0\ub97c \ub530\ub85c \ubd84\ub9ac\ud558\ub294 \uc791\uc5c5.","contents":["\u2022 \uc18c\uc2a4\uad00\ub9ac \ubc0f \ubc30\ud3ec \uc6b4\uc601 \uacbd\ud5d8.","    - main: \uc6b4\uc601 \ube0c\ub79c\uce58","    - develop : \uc791\uc5c5 \ube0c\ub79c\uce58","    - test : QA \ube0c\ub79c\uce58","\u2022 \uac01\uc885 \ubb38\uc11c(\ucd9c\uace0, \uc785\uace0, \uac80\uc218 \ub4f1) \ub2e4\uc6b4\ub85c\ub4dc \uae30\ub2a5 \uad6c\ud604","\u2022 \uc0ac\ub78c\uc758 \uc2e4\uc218\ub85c \ub098\uc628 \uc624\ub958 \ubc31\uc624\ud53c\uc2a4\uc5d0\uc11c \ud574\uacb0 \ud560 \uc218 \uc788\ub3c4\ub85d \uad6c\ud604","    - CS\ud300\uc5d0\uc11c \ud65c\uc6a9\ud558\uc5ec \uace0\uac1d \ub300\uc751 \uc18d\ub3c4 \ube68\ub77c\uc9d0."],"numberOfParticipants":2,"url":"https://dino100.notion.site/OHCOACH-Admin-19c653a2c55e4ff7a3ae601aef929362?pvs=4"},{"id":"469c852e-8f8a-45f8-8501-08ec7a22c38c","companyId":"ac39715c-45de-4b35-9daa-30cf52a10664","name":"DataHub(\uc815\ubd80\uacfc\uc81c)","period":"2019-11-01~2019-12-31","stacks":[{"id":"5768898a-63ef-47b2-ba46-ec949b014307","name":"php","color":"purple"},{"id":"07714c07-815c-4289-8206-c25e388edfec","name":"MySQL","color":"purple"}],"explain":"\uc57d \ud55c \ub2ec \uc548\uc5d0 \uc790\uc0ac \uc11c\ube44\uc2a4\uc640 \ube44\uc2b7\ud55c \uc11c\ube44\uc2a4\ub97c \ub9cc\ub4e4\uc5c8\uc5b4\uc57c \ud558\ub294 \uc544\uc8fc \uadf9\uc545\ubb34\ub3c4\ud55c \ud504\ub85c\uc81d\ud2b8.","contents":["\u2022 CSS \uc2a4\ud0c0\uc77c \uaddc\uce59 \ud1b5\uc77c \ubc0f \uacf5\ud1b5 CSS\ub85c \uaddc\uaca9\ud654 \uc791\uc5c5,","\u2022 \uce98\ub9b0\ub354 \ub77c\uc774\ube0c\ub7ec\ub9ac \uc0ac\uc6a9\ud558\uc5ec \uc77c\uc815 \uad00\ub9ac \uae30\ub2a5 \uad6c\ud604."],"numberOfParticipants":2,"url":"https://dino100.notion.site/DataHub-469c852e8f8a45f8850108ec7a22c38c"},{"id":"3e2c2b03-001f-4989-b541-64f087c9f269","companyId":"ac39715c-45de-4b35-9daa-30cf52a10664","name":"\uc0ac\ub0b4 ERP \uc2dc\uc2a4\ud15c","period":"2019-01-02~2019-04-30","stacks":[{"id":"877802a8-8154-409d-a0e0-f10ac71c0b8c","name":"Vue","color":"green"},{"id":"ba3b3815-dc62-4aee-bec5-b6337e235417","name":"GoogleSheet API","color":"gray"}],"explain":"\ud0c0\uc0ac \uc11c\ube44\uc2a4\ub97c \uc0ac\uc6a9\ud558\uc9c0 \uc54a\uace0 \uc790\uccb4\uc801\uc73c\ub85c \uc2dc\uc2a4\ud15c\uc744 \uad6c\ud604\ud558\uc5ec \ud68c\uc0ac\uc5d0 \ub9de\uac8c \ucee4\uc2a4\ud140 \ud558\uae30 \uc704\ud574 \uac1c\ubc1c\ub41c \uc0ac\ub0b4 \uc2dc\uc2a4\ud15c(\uad6c\uba54, \uadfc\ud0dc, \uc0dd\uc0b0, \ucd9c\uace0 \ub4f1\uc758 \ubaa8\ub4c8\uc744 \ud0d1\uc7ac\ud55c \uc2dc\uc2a4\ud15c)","contents":["\u2022 \uacbd\uc601\uc9c0\uc6d0\ud300\uc744 \uc9c0\uc6d0\ud558\uae30 \uc704\ud55c \uc0ac\ub0b4 \ucd5c\uc801\ud654 \uad6c\ub9e4 \ubaa8\ub4c8 \uc81c\uc791","    - \uad6c\uae00 Sheet API\ub97c \uc0ac\uc6a9\ud558\uc5ec \uc27d\uac8c \uc218\uc815 \uac00\ub2a5","\u2022 \uadfc 2\ub144\uc744 \uadfc\ud0dc \ubaa8\ub4c8\uc744 \uc0ac\uc6a9\ud558\uc5ec \ucd9c\ud1f4\uadfc \ucc98\ub9ac\ub97c \ud558\uace0 \uc5c5\ubb34 \uae30\ub85d\uc744 \ud568.","    - \uc5c5\ubb34 \uae30\ub85d\uc73c\ub85c 1\ub144 \uc815\ub9ac \ub9ac\ud3ec\ud2b8\ub97c \ub9cc\ub4e4\uc5b4 \uc8fc\uace0 \uadf8\uac78 \uc5f0\ubd09\ud611\uc0c1\uc5d0 \uc0ac\uc6a9\ud568.","\u2022 QR code \ub300\ub7c9 \uc0dd\uc0b0 \ubc0f QR \uc774\ubbf8\uc9c0 \ub2e4\uc6b4\ub85c\ub4dc\ud558\uc5ec \uc5c5\ubb34 \ud6a8\uc728\uc131 \ub192\uc784.","    - \uc218\uc791\uc5c5\uc73c\ub85c \ud558\ub358 \uc77c\uc744 QR \ucf54\ub4dc \ub9cc\ub4e4\uc5b4 \uc774\ubbf8\uc9c0\ub85c \uc800\uc7a5\uae4c\uc9c0 \ud55c\ubc88\uc5d0 \ud574\uacb0."],"numberOfParticipants":2,"url":"https://dino100.notion.site/ERP-3e2c2b03001f4989b54164f087c9f269"},{"id":"d8267476-4f3e-40f6-818a-aab191950c69","companyId":"ac39715c-45de-4b35-9daa-30cf52a10664","name":"OHCOACH Essential","period":"2018-07-02~2019-12-31","stacks":[{"id":"5768898a-63ef-47b2-ba46-ec949b014307","name":"php","color":"purple"},{"id":"07714c07-815c-4289-8206-c25e388edfec","name":"MySQL","color":"purple"},{"id":"04e253fa-81d3-452d-979d-0599ddf68d7b","name":"Highcharts.js","color":"gray"}],"explain":"\uc790\uc0ac \uc11c\ube44\uc2a4\uc758 \ucd08\uae30 \ubc84\uc804 \uc11c\ube44\uc2a4. \uad00\ub9ac\uc790 \uba54\ub274\uc640 \uc0ac\uc6a9\uc790 \uba54\ub274\uac00 \ud55c\ubc88\uc5d0 \uc788\ub358 \uc11c\ube44\uc2a4","contents":["\u2022 \ub808\uac70\uc2dc \ucf54\ub4dc\ub85c \uac00\ub3c5\uc131 \ub5a8\uc5b4\uc9c0\uace0 \uc5ec\ub7ec \uc678\uc8fc \uac1c\ubc1c\uc790\ub4e4\uc758 \uae30\uc6cc\uc11c \ub9cc\ub4e0 \ucf54\ub4dc \ub9ac\ud399\ud1a0\ub9c1.","\u2022 \uc804\uc2dc\ud68c \ucd9c\ud488\ud560 \ub370\ubaa8 \ud398\uc774\uc9c0 \uad6c\ud604","    - \uc790\uc0ac \uc11c\ube44\uc2a4\uc5d0 \ud2b9\ud654\ub41c \ucc28\ud2b8 \uad6c\ud604","\u2022 <span>\ud0dc\uadf8\ub85c \ub9cc\ub4e4\uc5b4\uc9c4 \ucc28\ud2b8 \u21d2 \ub77c\uc774\ube0c\ub7ec\ub9ac(highcharts.js) \uc0ac\uc6a9\ud558\uc5ec \ub2e4\uc591\ud55c \ucc28\ud2b8 \uad6c\ud604."],"numberOfParticipants":2,"url":"https://dino100.notion.site/OHCOACH-Essential-d82674764f3e40f6818aaab191950c69"},{"id":"135e25ad-cbe6-4a1d-a56c-5510688fd50c","companyId":"02458f34-9632-4ee9-9363-ec9b4dd9af2f","name":"\uc774\ub825\uc11c-\ud3ec\ud2b8\ud3f4\ub9ac\uc624","period":"2023-03-30~","stacks":[{"id":"af40e4bf-c112-4451-bb62-2897117b04d2","name":"React","color":"green"},{"id":"254c4a7a-4c56-49d3-a7f2-92635f9b60ee","name":"TypeScript","color":"yellow"},{"id":"32998093-c710-4210-81d1-509df0e0d654","name":"Redux","color":"brown"}],"explain":"notion\uc5d0 \uc815\ub9ac\ud574\ub454 \uacbd\ub825\uc744 API\ub85c \ubd88\ub7ec\uc640\uc11c \uc0ac\uc774\ud2b8\uc5d0\uc11c \uc774\ub825\uc11c\ub85c \ubcf4\uc5ec\uc8fc\ub294 \uc0ac\uc774\ud2b8","contents":["\u2022 \ud14c\ub9c8 \uae30\ub2a5, \ub2e4\ud06c\ubaa8\ub4dc \uae30\ub2a5 \uad6c\ud604"],"numberOfParticipants":1,"url":"https://dino100.notion.site/135e25adcbe64a1da56c5510688fd50c"},{"id":"7e5af315-4a71-4251-a8c9-96b9242ee925","companyId":"02458f34-9632-4ee9-9363-ec9b4dd9af2f","name":"Paragon_info","period":"2023-01-09~2023-02-20","stacks":[{"id":"af40e4bf-c112-4451-bb62-2897117b04d2","name":"React","color":"green"},{"id":"254c4a7a-4c56-49d3-a7f2-92635f9b60ee","name":"TypeScript","color":"yellow"},{"id":"32998093-c710-4210-81d1-509df0e0d654","name":"Redux","color":"brown"}],"explain":"\uac8c\uc784 \uacf5\ub7b5 \uc0ac\uc774\ud2b8","contents":["\u2022 React, Typescript \uac1c\ubc1c \uacbd\ud5d8 \uc313\uae30","\u2022 \uc601\uc6c5 \ud398\uc774\uc9c0 - \uc0c1\uc138\ud398\uc774\uc9c0","\u2022 \uc6f9 \ud504\ub7f0\ud2b8\uc564\ub4dc \ucd5c\uc801\ud654 \uc801\uc6a9","    - \uc774\ubbf8\uc9c0 \ucd5c\uc801\ud654"],"numberOfParticipants":2,"url":"https://dino100.notion.site/Paragon_info-7e5af3154a714251a8c996b9242ee925"},{"id":"587102b3-8173-4784-9198-51a49bbd2a6c","companyId":"02458f34-9632-4ee9-9363-ec9b4dd9af2f","name":"Rna-frontend","period":"2021-09-06~2022-01-31","stacks":[{"id":"877802a8-8154-409d-a0e0-f10ac71c0b8c","name":"Vue","color":"green"},{"id":"f8094f60-d8c1-438a-be6c-7698c392804b","name":"Javascript","color":"yellow"},{"id":"99183b8f-896b-470f-a159-2cbb24333280","name":"Vuex","color":"brown"}],"explain":"\ud55c\uc591\ub300\ud559\uad50 \uc5f0\uad6c \uacfc\uc81c \uc0ac\uc774\ud2b8","contents":["\u2022 \uc0ac\uc6a9\uc790, \uacfc\uc81c \uad00\ub9ac \ud398\uc774\uc9c0 \uad6c\ucd95","\u2022 \uc5d1\uc140 \uacfc\uc81c \uc5c5\ub85c\ub4dc \ubc0f \ub2e4\uc6b4\ub85c\ub4dc \ud398\uc774\uc9c0 \uad6c\ud604","\u2022 JWT \ud1a0\ud070 \uc0ac\uc6a9\ud558\uc5ec \ub85c\uadf8\uc778 \uae30\ub2a5 \uad6c\ucd95"],"numberOfParticipants":2,"url":"https://dino100.notion.site/Rna-frontend-587102b381734784919851a49bbd2a6c"},{"id":"465ebd26-b8f0-44dc-9dd8-42adcfb68082","companyId":"02458f34-9632-4ee9-9363-ec9b4dd9af2f","name":"NNNN(\ub3d9\ud638\ud68c\uad00\ub9ac)","period":"2020-01-01~2021-07-31","stacks":[{"id":"877802a8-8154-409d-a0e0-f10ac71c0b8c","name":"Vue","color":"green"},{"id":"055f592f-c6d8-41b7-b769-d764b6310d53","name":"AWS","color":"orange"},{"id":"13fb0684-7bee-4ee6-8de0-a8e5258b14bf","name":"Scss","color":"pink"},{"id":"99183b8f-896b-470f-a159-2cbb24333280","name":"Vuex","color":"brown"}],"explain":"\ud48b\uc0b4\ub3d9\ud638\ud68c \uad00\ub9ac\ud504\ub85c\uadf8\ub7a8","contents":["\u2022 \ud68c\uc6d0 \ubc0f \ucd9c\uc11d\ubd80 \uad00\ub9ac\ub97c \ud1b5\ud55c \uc720\ub839\ud68c\uc6d0 \uc815\ub9ac","\u2022 \ub79c\ub364 \ud300 \ub098\ub204\uae30 \uc54c\uace0\ub9ac\uc998 \uac1c\ubc1c","\u2022 \uacbd\uae30 \uc774\ubca4\ud2b8 \ub4f1\ub85d\uc73c\ub85c \ub098\uc640 \ubc1c \ub9de\ub294 \uc120\uc218 \ucc3e\ub294 \uae30\ub2a5 \uac1c\ubc1c","\u2022 \ub4f1\ub85d\ud55c \ub370\uc774\ud130\ub85c \ub7ad\ud0b9(\uace8, \uc5b4\uc2dc, \ucd9c\uc11d)\uc73c\ub85c \uc5f0\ub9d0 \uc2dc\uc0c1\uc2dd \uc9c4\ud589","\u2022 AWS EC2 \uc11c\ubc84 \uc138\ud305, RDS DB \uc0ac\uc6a9"],"numberOfParticipants":2,"url":"https://dino100.notion.site/NNNN-465ebd26b8f044dc9dd842adcfb68082"},{"id":"8a48a0df-27a6-4498-b496-b5012a80cfb3","companyId":"f194e7b4-3174-4fd2-8dfc-17ea186dd8ed","name":"\uc790\uc0ac \uc2e4\uc801 \uad00\ub9ac \ud504\ub85c\uadf8\ub7a8(\ubc31\uc624\ud53c\uc2a4)","period":"2017-09-01~2017-12-29","stacks":[{"id":"f8094f60-d8c1-438a-be6c-7698c392804b","name":"Javascript","color":"yellow"},{"id":"055f592f-c6d8-41b7-b769-d764b6310d53","name":"AWS","color":"orange"},{"id":"a6ca21e3-ce6e-4ec0-8b29-c7dd7d4f7c93","name":"AngularJS","color":"green"}],"explain":"\uace0\uac1d \uc2e4\uc801 \uad00\ub9ac \ud504\ub85c\uadf8\ub7a8.","contents":["\u2022 \ubc31\uc624\ud53c\uc2a4 \ud398\uc774\uc9c0 \uae30\ubcf8 \ub808\uc774\uc544\uc6c3 \uad6c\ucd95","\u2022 AWS EC2 \uc11c\ubc84 \uc138\ud305, RDS DB \uc0ac\uc6a9"],"numberOfParticipants":2,"url":null},{"id":"e0c1949b-a3da-4af1-8efc-13261ce4ca9c","companyId":"f194e7b4-3174-4fd2-8dfc-17ea186dd8ed","name":"\uace0\ub3c4\ubab0 \uad00\ub9ac(\uc790\uc0ac \uc1fc\ud551\ubab0)","period":"2017-05-01~2018-02-28","stacks":[{"id":"5768898a-63ef-47b2-ba46-ec949b014307","name":"php","color":"purple"}],"explain":"cafe24 \uac19\uc740 \uc6f9 \uc1fc\ud551\ubab0","contents":["\u2022 \uc6f9 \uc1fc\ud551\ubab0 \uc720\uc9c0\ubcf5\uc218","\u2022 \ub514\uc790\uc778 \ub9ac\ub274\uc5bc - UI/UX \uac1c\uc120\uc73c\ub85c \ubd88\ud544\uc694\ud55c \uae30\ub2a5 \uc81c\uac70","\u2022 \ubc30\ub108 \uc2ac\ub77c\uc774\ub4dc \ucef4\ud3ec\ub10c\ud2b8 UI\uc218\uc815 \ub4f1"],"numberOfParticipants":1,"url":null}]'),re={company:[],stack:[]};function ie(){var e=(0,o.useState)("N"),a=(0,s.Z)(e,2),n=a[0],u=a[1],f=(0,o.useState)(re),m=(0,s.Z)(f,2),b=m[0],x=m[1],h=(0,k.Z)(),v=(0,N.useQuery)(["getCompanies"],(function(){return function(){return g.apply(this,arguments)}()}),{select:function(e){return e.map((function(e){return(0,i.Z)((0,i.Z)({},e.properties),{},{id:e.id})}))}}),_=(0,N.useQuery)(["getProjects"],(0,r.Z)((0,c.Z)().mark((function e(){var a;return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y();case 2:return a=e.sent,e.abrupt("return",a);case 4:case"end":return e.stop()}}),e)}))),{select:function(e){return e.map((function(e){return(0,i.Z)((0,i.Z)({},e.properties),{},{id:e.id})}))}}),j=_.data,P=_.isLoading,A=(0,N.useQuery)(["getStackOptions"],(function(){return function(e){return Z.apply(this,arguments)}({property:"mainStack"})})),R=(0,o.useMemo)((function(){if(!v.data)return"O"===n&&ne.reverse(),ne.filter((function(e){var a,n=e.name;return null===(a=b.company)||void 0===a?void 0:a.includes(n)}));var e=v.data.filter((function(e){var a,n=e.name.title;return null===(a=b.company)||void 0===a?void 0:a.includes(n[0].plain_text)})).map((function(e){var a=e.period.date,n=0,t=0,c="";if(null!==a&&void 0!==a&&a.start){n=(0,d.Z)(new Date(a.end),new Date(a.start)),t=(0,l.Z)(new Date(a.end),new Date(a.start));var r=0!==n||0!==t,i=0===n,s=t-12*n,o=0===s;c="".concat(r?"\uae30\uac04: (":""," \n            ").concat(i?"":"".concat(n,"\ub144"),"\n            ").concat(o?"":"".concat(s,"\uac1c\uc6d4")," \n            ").concat(r?")":"")}return{id:e.id,name:e.name.title[0].plain_text,startDate:null!==a&&void 0!==a&&a.start?(0,p.Z)(new Date(a.start),"yyyy/MM"):"",endDate:null!==a&&void 0!==a&&a.start?(0,p.Z)(new Date(a.end),"yyyy/MM"):"",department:e.department.rich_text[0].plain_text,role:e.role.select.name,period:c}}));return"O"===n?e.reverse():e}),[v.data,n,b]),H=(0,o.useMemo)((function(){return j?j.filter((function(e){var a=JSON.stringify(e.mainStack.multi_select),n=!1;return b.stack.forEach((function(e){var t=new RegExp(e);n||(n=t.test(a))})),n})).map((function(e){var a=e.period.date,n=e.result.rich_text[0];return{id:e.id,companyId:e.company.relation[0].id,name:e.name.title[0].plain_text,period:a.start?"".concat(a.start,"~").concat(null===a.end?"":a.end):"",stacks:[].concat((0,t.Z)(e.mainStack.multi_select),(0,t.Z)(e.stack.multi_select)),explain:e.explain.rich_text[0].plain_text,contents:n.text.content.split("\n"),numberOfParticipants:e.numberOfParticipants.number,url:e.url.url}})):ce.filter((function(e){var a=JSON.stringify(e.stacks),n=!1;return b.stack.forEach((function(e){var t=new RegExp(e);n||(n=t.test(a))})),n}))}),[j,b]);console.log("parseProjectQuery",H);var M=(0,o.useMemo)((function(){return v.data?v.data.map((function(e){return e.name.title[0].plain_text})):ne.map((function(e){return e.name}))}),[v.data,ne]),J=(0,o.useMemo)((function(){return A.data?A.data.map((function(e){return e.name})):te}),[A.data,te]),E=function(e,a){x((function(n){var c=JSON.parse(JSON.stringify(n));return n[a].includes(e)?c[a]=n[a].filter((function(a){return a!==e})):c[a]=[].concat((0,t.Z)(n[a]),[e]),c}))};return(0,o.useEffect)((function(){x((function(e){return(0,i.Z)((0,i.Z)({},e),{},{company:(0,t.Z)(M),stack:(0,t.Z)(J)})}))}),[M,J]),(0,D.jsxs)("div",{className:"section-right section-right--".concat(h.palette.mode),children:[P?(0,D.jsx)(I,{}):null,(0,D.jsxs)("section",{className:"action",children:[(0,D.jsxs)("ul",{className:"filter__container",children:[(0,D.jsx)(ae,{options:M,type:"company",selected:b,onChange:E}),(0,D.jsx)(ae,{options:J,colorOptions:A.data,type:"stack",selected:b,onChange:E})]}),(0,D.jsx)("div",{className:"sort__container",children:(0,D.jsxs)(S.Z,{sx:{m:1,minWidth:120},size:"small",children:[(0,D.jsx)(C.Z,{id:"demo-select-small-label",children:"\uc815\ub82c\ubc29\ubc95"}),(0,D.jsxs)(w.Z,{className:"sort__select-input",labelId:"demo-simple-select-label",id:"demo-select-small",value:n,label:"\uc815\ub82c\ubc29\ubc95",onChange:function(e){console.log("select change",e.target.value),u(e.target.value)},children:[(0,D.jsx)(O.Z,{sx:{color:"".concat("dark"===h.palette.mode?"white":"black")},value:"N",children:"\ucd5c\uc2e0\uc21c"}),(0,D.jsx)(O.Z,{sx:{color:"".concat("dark"===h.palette.mode?"white":"black")},value:"O",children:"\uc624\ub798\ub41c\uc21c"})]})]})})]}),(0,D.jsx)("section",{className:"career",children:R.map((function(e){return(0,D.jsx)(Y,{info:e,subInfo:H},e.id)}))})]})}}}]);
//# sourceMappingURL=473.cdc8871d.chunk.js.map