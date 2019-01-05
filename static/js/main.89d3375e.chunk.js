(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{261:function(e,t,a){e.exports=a(443)},274:function(e,t,a){},443:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=a(13),o=a(18),l=a(42),c=a(19),u=a(16),s=a(26),m=function(e){return Math.sqrt(e)},p=function(e,t){return e/t},d=function(e,t){return e*t},f=function(e,t){return t*t*e},b={name:"heston",label:"Heston",parameters:[{defVal:8,key:"numU",label:"Discrete Steps",toolTip:"This is the log2 number of discrete steps in the complex domain.  The higher the number, the more accurate the result; but the longer it will take.",feature:"static"},{defVal:.03,key:"r",label:"Rate",toolTip:"Risk free interest rate",feature:"static"},{defVal:50,key:"S0",label:"S or K",toolTip:"For Carr-Madan and Fang-Oosterlee, which price over several strikes and single asset price, this is the asset price.  For FSTS, which prices over several asset prices and single strike, this is the strike",feature:"static"},{defVal:1,key:"T",label:"T",toolTip:"Time till maturity",feature:"static"},{defVal:.2,key:"sigma",label:"Volatility",toolTip:"This is the volatility of the diffusion component of the (extended) Jump Diffusion process",feature:"constant"},{defVal:.2,key:"muJ",label:"Mean Jump Size",toolTip:"This is the mean value of the jump component",feature:"constant"},{defVal:.3,key:"sigJ",label:"Volatility of Jump",toolTip:"This is the volatility of the jump component",feature:"constant"},{defVal:1,key:"lambda",label:"Lambda",toolTip:"This is the frequency of jumps",feature:"constant"},{defVal:.4,key:"speed",label:"Speed",toolTip:"Speed of mean reversion of time change",feature:"variable"},{defVal:.04,key:"v0",label:"V0",toolTip:"This is the current value of the variance process",feature:"variable"},{defVal:.04,key:"meanVol",label:"Average Vol",toolTip:"This is the average value of the variance process",feature:"variable"},{defVal:.2,key:"adaV",label:"Vol of Vol",toolTip:"This is the volatility of the variance process",feature:"variable"},{defVal:-.5,key:"rho",label:"Rho",toolTip:"Correlation between asset and variance",feature:"variable"}],hestonToAdvanced:function(e){var t,a,n=e.adaV,r=e.meanVol,i=e.v0,o=Object(s.a)(e,["adaV","meanVol","v0"]);return Object(u.a)({},o,{adaV:(t=n,a=r,t/Math.sqrt(a)),sigma:m(r),v0:p(i,r)})},advancedToheston:function(e){var t,a=e.sigma,n=e.v0,r=e.adaV,i=Object(s.a)(e,["sigma","v0","adaV"]);return Object(u.a)({},i,{meanVol:(t=a,t*t),adaV:d(r,a),v0:f(n,a)})}},h=[{name:"advanced",label:"Advanced",parameters:[{defVal:8,key:"numU",label:"Discrete Steps",toolTip:"This is the log2 number of discrete steps in the complex domain.  The higher the number, the more accurate the result; but the longer it will take.",feature:"static"},{defVal:.03,key:"r",label:"Rate",toolTip:"Risk free interest rate",feature:"static"},{defVal:50,key:"S0",label:"S or K",toolTip:"For Carr-Madan and Fang-Oosterlee, which price over several strikes and single asset price, this is the asset price.  For FSTS, which prices over several asset prices and single strike, this is the strike",feature:"static"},{defVal:1,key:"T",label:"T",toolTip:"Time till maturity",feature:"static"},{defVal:.2,key:"sigma",label:"Volatility",toolTip:"This is the volatility of the diffusion component of the (extended) CGMY process",feature:"variable"},{defVal:-.05,key:"muJ",label:"Mean Jump Size",toolTip:"This is the mean value of the jump component",feature:"variable"},{defVal:.3,key:"sigJ",label:"Volatility of Jump",toolTip:"This is the volatility of the jump component",feature:"variable"},{defVal:.2,key:"lambda",label:"Lambda",toolTip:"This is the frequency of jumps",feature:"variable"},{defVal:.4,key:"speed",label:"Speed",toolTip:"Speed of mean reversion of time change",feature:"variable"},{defVal:.95,key:"v0",label:"V0",toolTip:"This is the current value of the variance process",feature:"variable"},{defVal:.2,key:"adaV",label:"Vol of Vol",toolTip:"This is the volatility of the variance process",feature:"variable"},{defVal:-.5,key:"rho",label:"Rho",toolTip:"Correlation between asset and variance",feature:"variable"}],advancedToAdvanced:function(e){return e},advancedToadvanced:function(e){return e}},{name:"bs",label:"Black Scholes",parameters:[{defVal:8,key:"numU",label:"Discrete Steps",toolTip:"This is the log2 number of discrete steps in the complex domain.  The higher the number, the more accurate the result; but the longer it will take.",feature:"static"},{defVal:.03,key:"r",label:"Rate",toolTip:"Risk free interest rate",feature:"static"},{defVal:50,key:"S0",label:"S or K",toolTip:"For Carr-Madan and Fang-Oosterlee, which price over several strikes and single asset price, this is the asset price.  For FSTS, which prices over several asset prices and single strike, this is the strike",feature:"static"},{defVal:1,key:"T",label:"T",toolTip:"Time till maturity",feature:"static"},{defVal:.2,key:"sigma",label:"Volatility",toolTip:"This is the volatility of the diffusion component of the (extended) Jump Diffusion process",feature:"variable"},{defVal:.2,key:"muJ",label:"Mean Jump Size",toolTip:"This is the mean value of the jump component",feature:"constant"},{defVal:1.4,key:"sigJ",label:"Volatility of Jump",toolTip:"This is the volatility of the jump component",feature:"constant"},{defVal:0,key:"lambda",label:"Lambda",toolTip:"This is the frequency of jumps",feature:"constant"},{defVal:.4,key:"speed",label:"Speed",toolTip:"Speed of mean reversion of time change",feature:"constant"},{defVal:1,key:"v0",label:"V0",toolTip:"This is the current value of the variance process",feature:"constant"},{defVal:0,key:"adaV",label:"Vol of Vol",toolTip:"This is the volatility of the variance process",feature:"constant"},{defVal:0,key:"rho",label:"Rho",toolTip:"Correlation between asset and variance",feature:"constant"}],bsToAdvanced:function(e){return e},advancedTobs:function(e){return e}},b],v=function(e,t,a){return"UPDATE_".concat(e.toUpperCase(),"_").concat(t.toUpperCase(),"_").concat(a.toUpperCase())},y=function(e){return"UPDATE_".concat(e.toUpperCase(),"_PARAMETER_ALL")},g=function(e){return"UPDATE_".concat(e.toUpperCase(),"_PARAMETER_SOME")},E=function(e){return"UPDATE_".concat(e.toUpperCase(),"_PARAMETER")},O=function(e){return"UPDATE_".concat(e.toUpperCase(),"_VALIDATION")},T=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],a=arguments.length>1?arguments[1]:void 0;switch(a.type){case e:return a.value;default:return t}}},k=Object(l.b)({isMaturityInProgress:T("NOTIFY_MATURITIES"),isCalibationInProgress:T("NOTIFY_CALIBRATION"),isGetOptionsInProgress:T("NOTIFY_GET_OPTIONS"),isCalculationInProgress:T("NOTIFY_CALCULATION")}),j=a(31),A=Object(l.b)({currentRange:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_SLIDER_RANGE":var a=Object(j.a)(t.value,2),n=a[0],r=a[1];return Object(u.a)({},e,Object(c.a)({},t.key,{lower:n,upper:r}));case"UPDATE_RANGE_DATA":return t.data;default:return e}},defaultRange:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_RANGE_DATA":return t.data;default:return e}}}),V=a(88),I=function(e,t){var a;return(a=[]).concat.apply(a,Object(V.a)(e.map(function(e){return t.map(function(t){return[].concat(e,t)})})))},C=function(e){return e[0].toUpperCase()+e.substring(1)},P={prices:[],k:[],ticker:"",maturity:null,minRelativeBidAskSpread:.1,minOpenInterest:25,maturityOptions:[]},S={minOpenInterest:"",minRelativeBidAskSpread:""},x={numU:"",r:"",T:"",S0:"",sigma:"",muJ:"",sigJ:"",lambda:"",speed:"",meanVol:"",v0:"",adaV:"",rho:""},_=Object(l.b)(h.reduce(function(e,t){var a,n,r,i,o;return Object(u.a)({},e,(a={},Object(c.a)(a,t.name+"Parameters",(n=t.name,i=t.parameters,o="defVal",r=i.reduce(function(e,t){return Object(u.a)({},e,Object(c.a)({},t.key,t[o]))},{}),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case E(n):return Object(u.a)({},e,Object(c.a)({},t.key,t.value));case y(n):case g(n):return Object(u.a)({},e,t.data);default:return e}})),Object(c.a)(a,t.name+"Validation",function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case O(e):return Object(u.a)({},t,Object(c.a)({},a.key,a.value));default:return t}}}(t.name)),a))},{quantile:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.01,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_QUANTILE":return t.value;default:return e}},range:A,progress:k,optionValues:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_OPTION_MATURITIES":return Object(u.a)({},e,{maturityOptions:t.data});case"UPDATE_OPTION_FORM":return Object(u.a)({},e,Object(c.a)({},t.key,t.value));case"UPDATE_STRIKES_PRICE":return Object(u.a)({},e,t.data);default:return e}},invalidTicker:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"NO_TICKER":return t.value;default:return e}},optionValuesValidation:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_OPTION_VALIDATION":return Object(u.a)({},e,Object(c.a)({},t.key,t.value));default:return e}}})),R=["price","delta","theta","gamma"],w=["call","put"],D=["fangoost","carrmadan","fsts"],U={carrmadan:["delta","theta","gamma"]},N=function e(t,a){for(var n=arguments.length,r=new Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];return a?e.apply(void 0,[I(t,a)].concat(r)):t}(w,R,D).filter(function(e){var t,a,n=Object(j.a)(e,3),r=(n[0],n[1]),i=n[2];return a=r,!(t=U[i])||-1===t.indexOf(a)}),F=N.reduce(function(e,t){var a,n,r=Object(j.a)(t,3),i=r[0],o=r[1],l=r[2];return Object(u.a)({},e,Object(c.a)({},l,(a=e[l],n=[o,i],a?[].concat(Object(V.a)(a),[n]):[n])))},{}),L=N,M=function(e){var t=e.T,a=e.sigma,n=e.lambda,r=e.muJ,i=e.sigJ,o=e.S0,l=e.r,c=function(e,t,a,n,r){return Math.sqrt(e*(t*t+a*(n*n+r*r)))}(t,a,n,r,i),u=l*t;return{upper:o*Math.exp(u+1.2*c),lower:o*Math.exp(u-2*c)}},K=Object(j.a)(D,3),J=K[0],q=K[1],B=K[2],Y=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],a=arguments.length>1?arguments[1]:void 0;switch(a.type){case e:var n=M(a.parameters),r=n.upper,i=n.lower;return function(e,t,a,n){return e.filter(function(e){return e[n]>t&&e[n]<a})}(a.data,i,r,"atPoint");default:return t}}},G=function(e,t,a){return e[t].reduce(function(e,n){var r=Object(j.a)(n,2),i=r[0],o=r[1];return Object(u.a)({},e,Object(c.a)({},t+o+i,a(v(o,i,t))))},{})},H=G(F,J,function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],a=arguments.length>1?arguments[1]:void 0;switch(a.type){case e:return a.data.slice(1,-1);default:return t}}}),Q=G(F,q,Y),z=G(F,B,Y),W=function(e,t){return function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case e:return n.data;default:return a}}},X=W("UPDATE_DENSITY_VAR",{VaR:0,ES:0}),Z=W("UPDATE_DENSITY_RAW",[]),$=Object(l.b)(Object(u.a)({},H,Q,z,{riskMetrics:X,density:Z,spline:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{curve:[],points:[]},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_SPLINE_DATA":return t.data;default:return e}}})),ee=Object(l.b)({form:_,graph:$}),te=(a(274),a(461)),ae=a(456),ne=a(467),re=a(230),ie=a(469),oe=a(453),le=a(446),ce={data:{stroke:"blue"}},ue={data:{stroke:"red"}},se=[{name:"Call",symbol:{fill:"blue",type:"circle"}},{name:"Put",symbol:{fill:"red",type:"circle"}}],me={axisLabel:{padding:30}},pe={axisLabel:{padding:40}},de=function(e){var t,a=e.call,n=e.put,i=e.title,o=e.xLabel,l=e.yLabel,c=e.marketData;return r.a.createElement(te.a,{domainPadding:25,containerComponent:r.a.createElement(ae.a,{labels:(t=o,function(e){return"Price ".concat(e.y," at ").concat(t," ").concat(e.x)})})},r.a.createElement(ne.a,{x:50,y:50,orientation:"vertical",gutter:20,data:se}),r.a.createElement(re.a,{x:120,y:50,text:i}),c?r.a.createElement(ie.a,{data:c,x:"strike",y:"price"}):null,r.a.createElement(oe.a,{style:ce,interpolation:"natural",data:a,x:"atPoint",y:"value"}),r.a.createElement(oe.a,{style:ue,interpolation:"natural",data:n,x:"atPoint",y:"value"}),r.a.createElement(le.a,{dependentAxis:!0,style:me,label:l}),r.a.createElement(le.a,{label:o}))},fe=function(e){var t,a=e.put,n=e.xLabel,i=e.title;return r.a.createElement(te.a,{domainPadding:25,containerComponent:r.a.createElement(ae.a,{labels:(t=n,function(e){return"Volatility ".concat(e.y," at ").concat(t," ").concat(e.x)})})},r.a.createElement(re.a,{x:120,y:50,text:i}),r.a.createElement(oe.a,{interpolation:"natural",data:a,x:"atPoint",y:"iv"}),r.a.createElement(le.a,{dependentAxis:!0,style:pe,label:"Implied Volatility"}),r.a.createElement(le.a,{label:n}))},be=function(e,t){return e.reduce(function(e,a){return a[t]>e?a[t]:e},0)},he=function(e,t){return[{x:-e,y:0},{x:-e,y:be(t,"value")}]},ve=function(e){var t,a=e.spline,n=e.title,i=e.xLabel,o=e.yLabel;return r.a.createElement(te.a,{domainPadding:25,containerComponent:r.a.createElement(ae.a,{labels:(t=i,function(e){return"Transformed Option Price ".concat(e.y," at ").concat(t," ").concat(e.x)})})},r.a.createElement(ne.a,{x:50,y:50,orientation:"vertical",gutter:20,data:se}),r.a.createElement(re.a,{x:120,y:50,text:n}),r.a.createElement(ie.a,{data:a.points,x:"logStrike",y:"transformedOption"}),r.a.createElement(oe.a,{style:ce,interpolation:"natural",data:a.curve,x:"logStrike",y:"transformedOption"}),r.a.createElement(le.a,{dependentAxis:!0,style:me,label:o}),r.a.createElement(le.a,{label:i}))},ye=a(457),ge=a(242),Ee=Object(j.a)(D,3),Oe=Ee[0],Te=Ee[1],ke=Ee[2],je=Object(j.a)(w,2)[1],Ae=Object(j.a)(R,1)[0],Ve=function(e,t){return t.length>e?t[e]:null},Ie=function(e,t){var a=t.k,n=t.prices;return Ae===e?function(e,t){return e.length>0?e.map(function(e,a){return{strike:e,price:Ve(a,t)}}):null}(a,n):null},Ce=function(e,t){return function(a,n,r){return Object(ge.getUniqueArray)(e[t],0).reduce(function(e,i,o){var l=Object(j.a)(i,1)[0];return Object(u.a)({},e,Object(c.a)({},l,a(function(e){var a=e.form,n=e.graph;return Object(u.a)({},w.reduce(function(e,a){var r;return Object(u.a)({},e,(r={},Object(c.a)(r,a,n[t+a+l]),Object(c.a)(r,"yLabel",C(l)),r))},r),{marketData:t===ke?null:Ie(l,a.optionValues)})})(n)))},{})}},Pe=function(e,t,a,n){return e(function(e){var a=e.graph;return Object(u.a)({put:a[t+je+Ae]},n)})(a)},Se={xLabel:"Strikes",title:"Fang-Oosterlee"},xe={xLabel:"Strikes",title:"Carr-Madan"},_e={xLabel:"Asset Prices",title:"Fourier Space Time Step"},Re=Object(u.a)({},Ce(F,Oe)(o.b,de,Se),{IV:Pe(o.b,Oe,fe,Se)}),we=Object(u.a)({},Ce(F,Te)(o.b,de,xe),{IV:Pe(o.b,Te,fe,xe)}),De=Object(u.a)({},Ce(F,ke)(o.b,de,_e),{IV:Pe(o.b,ke,fe,_e)}),Ue=function(e){return function(t){var a=t.history;return r.a.createElement(ye.a,{title:"Help",visible:!0,onOk:a.goBack,onCancel:a.goBack},e)}},Ne=r.a.createElement("p",null,"Fang and Oosterlee developed an algorithm to price options in their 2007 ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"http://ta.twi.tudelft.nl/mf/users/oosterle/oosterlee/COS.pdf"},"paper"),".  It prices in discrete strikes for a given underlying price.  It has great accuracy and splits the complex and real domain so that only a set number of strikes may be chosen."),Fe=r.a.createElement("p",null,"Carr Madan is the standard for FFT based option pricing and is based off the seminal 1999 ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.348.4044&rep=rep1&type=pdf"},"paper")," by Carr and Madan.  It prices in the strike for a given underlying price.  It does not have great accuracy and requires a fine mesh in the complex domain (and a corresponding large mesh in the real domain) to achieve required accuracy."),Le=r.a.createElement("p",null,"The Fourier Space Time Stepping algorithm was introduced by  ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://tspace.library.utoronto.ca/bitstream/1807/19300/1/Surkov_Vladimir_200911_PhD_Thesis.pdf"},"Surkov"),".  It prices in the asset for a given strike price.  It is far more general than either Fang-Oosterlee or Carr-Madan as it is agnostic to the payoff structure.  Since it prices in the stock price, it can also price American options.  However, this also makes it less valuable for calibrating portfolios of options on a single asset."),Me=Ue(Ne),Ke=Ue(Fe),Je=Ue(Le),qe=Object(o.b)(function(e){var t=e.graph;return Object(u.a)({},t.riskMetrics,{density:t.density})})(function(e){var t=e.density,a=e.VaR,n=e.ES;return r.a.createElement(te.a,{domainPadding:25},r.a.createElement(re.a,{x:25,y:24,text:"Value at Risk: ".concat(a)}),r.a.createElement(re.a,{x:25,y:48,text:"Expected Shortfall: ".concat(n)}),r.a.createElement(oe.a,{interpolation:"natural",data:t,x:"atPoint",y:"value"}),r.a.createElement(oe.a,{data:he(a,t)}),r.a.createElement(le.a,{label:"Log Asset Price"}))}),Be=a(245),Ye=a(246),Ge=a(258),He=a(247),Qe=a(259),ze=a(248),We=a.n(ze),Xe=function(e){return"".concat("https://74ekexhct2.execute-api.us-east-1.amazonaws.com/dev/v2/").concat(e.join("/"))},Ze=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return function(e){return fetch(Xe(t),function(e){return{method:"post",body:JSON.stringify(e)}}(e)).then(function(e){return e.json()})}},$e=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return fetch(Xe(t)).then(function(e){return e.json()})},et=function(e,t){return function(a,n){Ze("density",e)(a).then(function(e){return n({type:t,data:e})})}},tt=et("var","UPDATE_DENSITY_VAR"),at=et("raw","UPDATE_DENSITY_RAW"),nt=function(e,t){L.forEach(function(a){return Ze.apply(void 0,["calculator"].concat(Object(V.a)(a)))(e).then(function(n){return t({type:v.apply(void 0,Object(V.a)(a)),data:n,parameters:e})})}),tt(e,t),at(e,t)},rt=function(e){return e[e.name+"ToAdvanced"]},it=function(e){return e["advancedTo"+e.name]},ot=function(e,t){return e.filter(function(e){return e.feature===t})},lt=function(e,t){return Object(u.a)({},e[t.name+"Parameters"],{quantile:e.quantile})},ct=function(e){function t(){return Object(Be.a)(this,t),Object(Ge.a)(this,Object(He.a)(t).apply(this,arguments))}return Object(Qe.a)(t,e),Object(Ye.a)(t,[{key:"componentDidMount",value:function(){this.props.onLoad(this.props.model,this.props.parameters)}},{key:"render",value:function(){return null}}]),t}(n.Component),ut=Object(o.b)(function(e){return{parameters:e.form}},function(e){return{onLoad:function(t,a){nt(rt(t)(lt(a,t)),e),function(e){$e("parameters","parameter_ranges").then(function(t){return e({type:"UPDATE_RANGE_DATA",data:t})})}(e)}}})(ct),st=a(29),mt=a(442),pt=a(452),dt={xs:24,md:12},ft={labelCol:{span:8},wrapperCol:{span:12}},bt={width:"100%"},ht=a(439),vt=a(454),yt=a(458),gt=a(229),Et=a(464),Ot=a(462),Tt=a(79),kt=a(459),jt=function(e){return function(t,a,n){return function(r){var i=a?a.fn(e(r)):"truthy";t(n,e(r),"boolean"===typeof i?"error":"")}}},At=vt.a.Item,Vt=yt.a.Option,It=function(e,t){return Array.isArray(e)?e.map(function(e){return t(e)}):t(e)},Ct=function(e){return function(t){return t.toFixed(e)}},Pt=function(e,t,a){return function(n){return e(t,It(n,parseFloat),a)}},St=function(e){var t=e.objKey,a=e.parms,n=e.options,i=e.onChange,o=e.round,l=e.toolTip,c=e.multiSelect;return r.a.createElement(gt.a,{placement:"top",title:l},r.a.createElement(yt.a,{value:It(a[t],Ct(o)),onChange:Pt(i,t,a),mode:c?"multiple":null,style:bt},n.map(function(e){var t=e.toFixed(o);return r.a.createElement(Vt,{key:t,value:t},t)})))},xt=function(e){return function(t){var a=t.objKey,n=t.parms,i=t.onChange,o=t.toolTip,l=t.label,c=t.validator,u=t.validationResults,m=Object(s.a)(t,["objKey","parms","onChange","toolTip","label","validator","validationResults"]);return r.a.createElement(At,Object.assign({},ft,{label:l,validateStatus:u,help:u&&c.help}),r.a.createElement(e,Object.assign({objKey:a,parms:n,onChange:i,toolTip:o,validator:c},m)))}},_t=xt(function(e){var t=e.objKey,a=e.parms,n=e.onChange,i=e.toolTip,o=e.validator;return r.a.createElement(gt.a,{placement:"top",title:i},r.a.createElement(Et.a,{value:a[t],onChange:jt(function(e){return e})(n,o,t),style:bt}))}),Rt=xt(function(e){var t=e.objKey,a=e.parms,n=e.onChange,i=e.toolTip,o=e.validator;return r.a.createElement(gt.a,{placement:"top",title:i},r.a.createElement(Ot.a,{value:a[t],onChange:jt(function(e){return e.target.value})(n,o,t),style:bt}))}),wt=xt(function(e){var t=e.objKey,a=e.parms,n=e.options,i=e.onChange,o=e.toolTip;return r.a.createElement(gt.a,{placement:"top",title:o},r.a.createElement(yt.a,{value:a[t],onChange:function(e){return i(t,e)},style:bt},n.map(function(e){var t=new Date(e);return r.a.createElement(Vt,{key:e,value:e},t.toLocaleDateString())})))}),Dt=function(e){var t=e.disabled,a=e.onClick,n=e.text,i=Object(s.a)(e,["disabled","onClick","text"]);return r.a.createElement(At,Object.assign({},ft,{colon:!1,label:" "}),r.a.createElement(Tt.a,Object.assign({style:bt,type:"primary",disabled:t,onClick:a},i),n||"Update"))},Ut=function(e){var t=e.range,a=e.onChange,n=e.label,i=e.objKey,o=e.min,l=e.max;return r.a.createElement(At,Object.assign({},ft,{colon:!1,label:n}),r.a.createElement(kt.a,{style:bt,range:!0,value:[t.lower,t.upper],min:o,max:l,onChange:function(e){return a(i,e)},step:(l-o)/100}))},Nt=function(e){return function(t,a,n,r){r({type:E(e),key:t,value:a}),function(e){return function(t,a,n){n({type:O(e),key:t,value:a})}}(e)(t,n,r)}},Ft=h.reduce(function(e,t){return Object(u.a)({},e,Object(c.a)({},"update"+t.name,Nt(t.name)))},{updateSlider:function(e,t,a){a({type:"UPDATE_SLIDER_RANGE",key:e,value:t})},updateQuantile:function(e,t){t({type:"UPDATE_QUANTILE",value:e})},updateOptionForm:function(e,t,a,n){n({type:"UPDATE_OPTION_FORM",key:e,value:t}),n({type:"UPDATE_OPTION_VALIDATION",key:e,value:a})}}),Lt=Ft.updateOptionForm,Mt=Ft.updateSlider,Kt=Ft.updateQuantile,Jt=function(e){return e.form},qt=function(e){return{submitCalculator:function(t,a){return function(){nt(rt(a)(t),e)}},submitCalibrator:function(t,a,n,r){return function(){var i,o,l=a.k,s=a.prices,m=rt(n)(t),p=n.parameters.reduce(function(e,t){return"variable"===t.feature?Object(u.a)({},e,{variable:Object(u.a)({},e.variable,Object(c.a)({},t.key,m[t.key]))}):Object(u.a)({},e,Object(c.a)({},t.key,m[t.key]))},{constraints:r,k:l,prices:s});(i=n.name,o=it(n),function(e,t){var a={type:"NOTIFY_CALIBRATION",value:!1};t({type:"NOTIFY_CALIBRATION",value:!0}),Ze("calibrator","calibrate")(e).then(function(e){t({type:y(i),data:o?o(e):e}),t(a)}).catch(function(e){console.log(e),t(a)})})(p,e)}},submitDensity:function(t,a){return function(){tt(rt(a)(t),e)}},submitMaturities:function(t,a){var n=t.ticker;return function(){return(t=a.name,function(e,a){var n=e.ticker,r={type:"NOTIFY_MATURITIES",value:!1};a({type:"NOTIFY_MATURITIES",value:!0}),$e("options",n,"maturities").then(function(e){var n=e.expirationDates,i=Object(s.a)(e,["expirationDates"]);a({type:g(t),data:i}),a({type:"UPDATE_OPTION_MATURITIES",data:n}),a(r)}).catch(function(e){console.log(e),a({type:"NO_TICKER",value:!0}),setTimeout(function(){a({type:"NO_TICKER",value:!1})},3e3),a(r)})})({ticker:n},e);var t}},getOptions:function(t,a){var n=t.ticker,r=t.maturity,i=t.minOpenInterest,o=t.minRelativeBidAskSpread;return function(){return(t=a.name,function(e,a){var n=e.ticker,r=e.maturity,i=e.minOpenInterest,o=e.minRelativeBidAskSpread,l={type:"NOTIFY_GET_OPTIONS",value:!1};a({type:"NOTIFY_GET_OPTIONS",value:!0});var c=Xe(["options",n,"prices",r])+"?"+We.a.stringify({minOpenInterest:i,minRelativeBidAskSpread:o});fetch(c).then(function(e){return e.json()}).then(function(e){var n=e.curve,r=e.points,i=Object(s.a)(e,["curve","points"]);a({type:g(t),data:i}),a({type:"UPDATE_STRIKES_PRICE",data:i}),a({type:"UPDATE_SPLINE_DATA",data:{curve:n,points:r}}),a(l)}).catch(function(e){console.log(e),a(l)})})({ticker:n,maturity:r,minOpenInterest:i,minRelativeBidAskSpread:o},e);var t}},generateUpdateParameters:function(t){return function(a,n,r){Ft["update"+t.name](a,n,r,e)}},updateOptionForm:function(t,a,n){return Lt(t,a,n,e)},updateSlider:function(t,a){Mt(t,a,e)},updateQuantile:function(t,a){return Kt(a,e)}}},Bt=function(e,t){return function(a){var n=parseFloat(a);return!!(function(e){return!isNaN(e)&&isFinite(e)}(n)&&n>=e&&n<=t)&&n}},Yt=function(e,t){return{fn:Bt(e,t),help:"Must be a number between ".concat(e," and ").concat(t)}},Gt=(Bt(0,1e6),function(e){return function(t,a){return t.reduce(function(t,n){return Object(u.a)({},t,Object(c.a)({},n,a[n][e]))},{})}}),Ht=function(e,t){return void 0===e?t:e},Qt=function(e,t,a){return(n=t,r=it(e),function(e){var t=Object.keys(e),a=Gt("upper")(t,e),i=Gt("lower")(t,e),o=r(a),l=r(i);return n.map(function(e){return Object(u.a)({},e,{validator:Yt(l[e.key],o[e.key]),bounds:{lower:Ht(l[e.key],0),upper:Ht(o[e.key],100)}})})})(a);var n,r},zt=Object(o.b)(Jt,qt)(function(e){var t=e.model,a=e.updateSlider,n=e.range;return Qt(t,ot(t.parameters,"variable"),n.defaultRange).map(function(e){var t=e.bounds,i=e.key,o=e.label;return r.a.createElement(ht.a,{xs:24,key:i},r.a.createElement(Ut,{objKey:i,range:n.currentRange[i]||t,min:t.lower,max:t.upper,label:o,onChange:a}))})}),Wt=Object(o.b)(Jt,qt)(function(e){var t=e.model,a=e.modelParameters,n=e.generateUpdateParameters,i=e.range,o=Object(s.a)(e,["model","modelParameters","generateUpdateParameters","range"]);return Qt(t,a,i.defaultRange).map(function(e,a){var i=e.key,l=e.validator,c=e.label,u=e.toolTip;return r.a.createElement(ht.a,Object.assign({},dt,{key:a}),r.a.createElement(_t,{label:c,objKey:i,parms:o[t.name+"Parameters"],validationResults:o[t.name+"Validation"][i],validator:l,toolTip:u,onChange:n(t)}))})}),Xt=Object(o.b)(Jt,qt)(function(e){var t,a=e.submitCalculator,n=e.model,i=Object(s.a)(e,["submitCalculator","model"]);return r.a.createElement(ht.a,dt,r.a.createElement(Dt,{disabled:(t=i[n.name+"Validation"],Object.keys(t).some(function(e){return t[e]})),onClick:a(lt(i,n),n),text:"Calculate",loading:i.progress.isCalculationInProgress}))}),Zt=Object(o.b)(Jt,qt)(function(e){var t=e.submitCalibrator,a=e.model,n=e.progress,i=e.optionValues,o=e.range,l=Object(s.a)(e,["submitCalibrator","model","progress","optionValues","range"]);return r.a.createElement(ht.a,dt,r.a.createElement(Dt,{disabled:0===i.prices.length,onClick:t(l[a.name+"Parameters"],i,a,o.currentRange),text:"Calibrate",loading:n.isCalibationInProgress}))}),$t=function(e){var t=e.model;return[r.a.createElement(Wt,{key:"variableparameters",model:t,modelParameters:ot(t.parameters,"variable")}),r.a.createElement(Xt,{key:"updatebutton",model:t})]},ea={fn:function(){return!0},help:"Nothing returned.  Perhaps you chose an invalid ticker?"},ta=Object(o.b)(Jt,qt)(function(e){var t=e.updateOptionForm,a=e.submitMaturities,n=e.optionValues,i=e.invalidTicker,o=e.model,l=e.progress;return[r.a.createElement(ht.a,Object.assign({},dt,{key:"ticker"}),r.a.createElement(Rt,{objKey:"ticker",parms:n,toolTip:"This is the ticker of the underlying. For example, AAPL",label:"Ticker",validator:ea,validationResults:!!i&&"error",onChange:t})),r.a.createElement(ht.a,Object.assign({},dt,{key:"submitTicker"}),r.a.createElement(Dt,{disabled:0===n.ticker.length,onClick:a({ticker:n.ticker},o),text:"Get Maturities",loading:l.isMaturityInProgress}))]}),aa=Yt(0,1),na=Yt(0,1e6),ra="minRelativeBidAskSpread",ia=Object(o.b)(function(e){var t=e.graph,a=e.form;return Object(u.a)({},t,a)},qt)(function(e){var t,a=e.updateOptionForm,n=e.getOptions,i=e.model,o=e.spline,l=e.optionValues,u=e.optionValuesValidation,s=e.progress;return[r.a.createElement(ht.a,Object.assign({},dt,{key:"selectMaturity"}),r.a.createElement(wt,{objKey:"maturity",parms:l,options:l.maturityOptions,toolTip:"Select the option maturity",label:"Maturity",onChange:a})),r.a.createElement(ht.a,Object.assign({},dt,{key:"openInterest"}),r.a.createElement(_t,{objKey:"minOpenInterest",parms:l,validationResults:u.minOpenInterest,validator:na,toolTip:"Select the minimum open interest",label:"Open Interest",onChange:a})),r.a.createElement(ht.a,Object.assign({},dt,{key:"bidAsk"}),r.a.createElement(_t,{objKey:ra,validator:aa,parms:l,validationResults:u[ra],options:l.maturityOptions,toolTip:"Select the minimum relative bid-ask spread",label:"Bid-Ask Spread",onChange:a})),r.a.createElement(ht.a,Object.assign({},dt,{key:"getPrices"}),r.a.createElement(Dt,{disabled:!l.maturity,onClick:n((t={ticker:l.ticker,maturity:l.maturity},Object(c.a)(t,"minOpenInterest",l.minOpenInterest),Object(c.a)(t,ra,l[ra]),t),i),text:"Get Option Prices",loading:s.isGetOptionsInProgress})),r.a.createElement(ht.a,{offset:4,xs:16,key:"spline"},r.a.createElement(ve,{spline:o,title:"Fit",xLabel:"Log Strikes",yLabel:"Transformed Option Prices"}))]}),oa=a(451),la=Object(o.b)(Jt)(function(e){var t=e.model,a=Object(s.a)(e,["model"]);return r.a.createElement(ht.a,Object.assign({},dt,{key:4}),a[t.name+"Parameters"].mse?r.a.createElement(oa.a,{message:"Mean Squared Error: ".concat(a[t.name+"Parameters"].mse),type:"success"}):null)}),ca=function(e){var t=e.model;return[r.a.createElement(ta,{key:"maturities",model:t}),r.a.createElement(pt.a,{key:"div1"}),r.a.createElement(ia,{key:"optionprices",model:t}),r.a.createElement(pt.a,{key:"div2"}),r.a.createElement(Zt,{key:"calibrate",model:t}),r.a.createElement(la,{key:"displayconvergence",model:t})]},ua=a(460),sa=ua.a.Panel,ma={border:0},pa=Object(o.b)(Jt)(function(e){var t=e.model,a=Object(s.a)(e,["model"]);return r.a.createElement(ua.a,{bordered:!1},r.a.createElement(sa,{header:"Show Raw Json",key:"1",style:ma},r.a.createElement("pre",null,r.a.createElement("code",null,JSON.stringify(rt(t)(a[t.name+"Parameters"]),null,2)))))}),da=function(e){var t=e.model,a=e.basePath;return[r.a.createElement(mt.a,{gutter:16,key:"inputrow"},r.a.createElement(Wt,{model:t,modelParameters:ot(t.parameters,"static")}),r.a.createElement(pt.a,null),r.a.createElement(st.d,{path:"".concat(a,"/manual"),exact:!0,render:function(){return r.a.createElement($t,{model:t})}}),r.a.createElement(st.d,{path:"".concat(a,"/calibration"),exact:!0,render:function(){return r.a.createElement(ca,{model:t})}}),r.a.createElement(st.d,{path:"".concat(a,"/settings"),exact:!0,render:function(){return r.a.createElement(zt,{model:t})}})),r.a.createElement(mt.a,{key:"jsonrow"},r.a.createElement(pa,{model:t}))]},fa=a(465),ba=function(e){var t=e.match,a=e.basePath;return r.a.createElement(fa.a,{theme:"light",mode:"horizontal",selectedKeys:[t.params.inputIndex]},r.a.createElement(fa.a.Item,{key:"manual"},r.a.createElement(st.b,{to:"".concat(a,"/manual")},"Manual")),r.a.createElement(fa.a.Item,{key:"calibration"},r.a.createElement(st.b,{to:"".concat(a,"/calibration")},"Calibration")),r.a.createElement(fa.a.Item,{key:"settings"},r.a.createElement(st.b,{to:"".concat(a,"/settings")},"Settings")))},ha=function(e){var t=e.history,a=e.match,n=e.model,i=e.baseUrl,o=function(){return t.push(i)},l=a.path.split("/:")[0];return r.a.createElement(ye.a,{title:"Attributes",visible:!0,onOk:o,onCancel:o,width:900,footer:null},r.a.createElement(ba,{match:a,basePath:l}),r.a.createElement(da,{basePath:l,model:n}))},va=function(e,t){for(var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,n=[],r=Math.floor(1e-8+(t-e)/a),i=0;i<r+1;++i){var o=e+a*i;n.push(o)}return n}(.001,.05,.001),ya=Object(o.b)(Jt,qt)(function(e){var t=e.model,a=e.updateQuantile,n=e.submitDensity,i=Object(s.a)(e,["model","updateQuantile","submitDensity"]);return r.a.createElement(mt.a,{gutter:16},r.a.createElement(ht.a,{xs:24,md:16},r.a.createElement(St,{objKey:"quantile",parms:i,options:va,round:3,toolTip:"This is the quantile of the asset return distribution.  A .01 quantile translates to a 99% VaR",label:"Quantile",onChange:a})),r.a.createElement(ht.a,{xs:24,md:8},r.a.createElement(Tt.a,{className:"side-button submit-button",type:"primary",onClick:n(lt(i,t),t)},"Update")))}),ga=a(455),Ea=Object(j.a)(R,3)[2],Oa=function(e){var t=e.adaV,a=e.v0;return r.a.createElement(oa.a,{message:"Warning",description:"Theta is inaccurate when Vol of Vol>0 (currently ".concat(t,") or V0!=1 (currently ").concat(a,")"),type:"warning",showIcon:!0})},Ta=function(e){var t=e.sensitivity,a=e.title;return r.a.createElement("p",null,"Attribute ",t," is not available for ",a,"!")},ka=Object(o.b)(function(e){return e.form})(function(e){var t=e.Algorithm,a=e.HelpComponent,n=e.url,i=e.match,o=e.title,l=e.model,c=Object(s.a)(e,["Algorithm","HelpComponent","url","match","title","model"]),u=i.params.model,m=i.params.sensitivity,p=rt(l)(c[l.name+"Parameters"]),d=p.adaV,f=p.v0,b="/".concat(u,"/").concat(m).concat(n),h=t[m],v=t.IV;return r.a.createElement(ga.a,{title:o,bordered:!1,extra:r.a.createElement(st.b,{to:b},"?")},function(e,t,a,n){return a===Ea&&(e>0||1!==t)&&n}(d,f,m,h)?r.a.createElement(Oa,{adaV:d,v0:f}):null,h?r.a.createElement(h,null):r.a.createElement(Ta,{sensitivity:m,title:o}),r.a.createElement(v,null),r.a.createElement(st.d,{path:b,exact:!0,component:a}))}),ja=a(466),Aa=a(463),Va={background:"whitesmoke",margin:0,minHeight:280},Ia=Object(j.a)(R,1)[0],Ca=Object(j.a)(h,1)[0],Pa=ja.a.Content,Sa="/:".concat("model","/:").concat("sensitivity"),xa="".concat(Ca.name,"/").concat(Ia),_a={float:"right"},Ra={sm:24,md:12,xl:6},wa={backgroundColor:"whitesmoke"},Da=function(e){var t,a=e.history,n=e.sensitivity,i=e.modelLink,o=e.label,l=function(e){a.push("/".concat(e,"/").concat(n,"/").concat("inputs","/manual"))};return r.a.createElement(fa.a,{theme:"light",mode:"horizontal",selectedKeys:[n],style:wa},R.map(function(e){return r.a.createElement(fa.a.Item,{key:e},r.a.createElement(st.b,{to:"/".concat(i,"/").concat(e)}," ",C(e)," "))}),r.a.createElement("div",null,r.a.createElement(Aa.a.Button,{key:1,style:_a,onClick:function(){return l(i)},overlay:(t=l,r.a.createElement(fa.a,{onClick:function(e){return t(e.key)}},h.map(function(e){var t=e.name,a=e.label;return r.a.createElement(fa.a.Item,{key:t},a)})))},o,": Inputs")))},Ua=function(e){var t=e.model,a=e.modelLink,n=e.sensitivity,i="/".concat(a,"/").concat(n);return r.a.createElement(st.d,{path:"".concat(i,"/").concat("inputs","/:").concat("inputIndex"),render:function(e){var a=e.match,n=e.history;return r.a.createElement(ha,{model:t,baseUrl:i,match:a,history:n})}})},Na=function(e){var t=e.match,a=Object(s.a)(e,["match"]),n=t.params.model,i=t.params.sensitivity,o=h.find(function(e){var t=e.name;return n===t});return[r.a.createElement(ut,{key:-1,model:o}),r.a.createElement(Ua,{sensitivity:i,modelLink:n,model:o,key:0}),r.a.createElement(Da,Object.assign({sensitivity:i,modelLink:n,model:o,label:o.label},a,{key:1})),r.a.createElement(mt.a,{gutter:16,type:"flex",justify:"space-between",key:2},r.a.createElement(ht.a,Ra,r.a.createElement(ka,Object.assign({Algorithm:we,title:"Carr-Madan",HelpComponent:Ke,url:"/carrmadan/help",match:t,model:o},a))),r.a.createElement(ht.a,Ra,r.a.createElement(ka,Object.assign({Algorithm:De,title:"Fourier Space Time Step",HelpComponent:Je,url:"/fsts/help",match:t},a,{model:o}))),r.a.createElement(ht.a,Ra,r.a.createElement(ka,Object.assign({Algorithm:Re,title:"Fang-Oosterlee",HelpComponent:Me,url:"/fangoost/help",match:t,model:o},a))),r.a.createElement(ht.a,Ra,r.a.createElement(ga.a,{title:"Density",bordered:!1},r.a.createElement(qe,null),r.a.createElement(ya,{model:o}))))]},Fa=Object(l.c)(ee);Object(i.render)(r.a.createElement(o.a,{store:Fa},r.a.createElement(st.a,{basename:"/"},r.a.createElement(function(){return r.a.createElement(ja.a,null,r.a.createElement(Pa,{style:Va},r.a.createElement("div",{className:"container"},r.a.createElement(st.e,null,r.a.createElement(st.d,{path:Sa,component:Na}),r.a.createElement(st.c,{from:"/",exact:!0,to:xa})))))},null))),document.getElementById("root"))}},[[261,2,1]]]);
//# sourceMappingURL=main.89d3375e.chunk.js.map