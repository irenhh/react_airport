(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,a){e.exports=a(18)},16:function(e,t,a){},17:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(9),o=a.n(i),c=(a(16),a(17),a(7)),l=a(1),u=a(2),s=a(4),m=a(3),h=a(5),d=(new Date).toLocaleDateString("ru-RU").replace(/\./g,"-"),p=function(){return fetch("https://api.iev.aero/api/flights/".concat(d)).then(function(e){return e.json()})},f=a(6);var y=function(e){var t=e.departure,a=t.term,n=t.timeDepShedule,i=t["airportToID.city_en"],o=t.status,c=t.codeShareData,l=e.getTime,u=c.map(function(e){return e.codeShare}),s=c.map(function(e){return e.airline.en.name}),m=l(n),h="0"===m[0]?m.slice(1):m;return r.a.createElement("tr",null,r.a.createElement("td",null,a),r.a.createElement("td",null,h),r.a.createElement("td",null,i),r.a.createElement("td",null,o),r.a.createElement("td",null,s.map(function(e,t){return r.a.createElement("p",{key:t},e)})),r.a.createElement("td",null,u.map(function(e,t){return r.a.createElement("p",{key:t},e)})))};var g=function(e){var t=e.arrival,a=t.term,n=t.timeToStand,i=t["airportFromID.city_en"],o=t.status,c=t.codeShareData,l=e.getTime,u=c.map(function(e){return e.codeShare}),s=c.map(function(e){return e.airline.en.name}),m=l(n),h="0"===m[0]?m.slice(1):m;return r.a.createElement("tr",null,r.a.createElement("td",null,a),r.a.createElement("td",null,h),r.a.createElement("td",null,i),r.a.createElement("td",null,o),r.a.createElement("td",null,s.map(function(e,t){return r.a.createElement("p",{key:t},e)})),r.a.createElement("td",null,u.map(function(e,t){return r.a.createElement("p",{key:t},e)})))},v=["Terminal","Local time","Destination","Status","Airline","Flight"],S=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={tabShown:"departures",dayOfFlight:"today"},a.getTime=function(e){var t=String(new Date(e).getHours()).padStart(2,"0"),a=e.match(/(?<=:)\d\d(?!Z)/);return"".concat(t,":").concat(a)},a.changeTab=function(e){return a.setState({tabShown:e})},a.changeDay=function(e){return a.setState({dayOfFlight:e})},a.modifyFlightsByDate=function(e,t){var a=function(e,t){return new Date(e.timeDepShedule||e.timeToStand).getDate()===function(e,t){var a=e;return a.setDate(a.getDate()+t),a.getDate()}(new Date,t)};switch(e){case"yesterday":return t.filter(function(e){return a(e,-1)});default:case"today":return t.filter(function(e){return a(e,0)});case"tomorrow":return t.filter(function(e){return a(e,1)})}},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.departuresToShow,n=t.arrivalsToShow,i=Object(f.a)(a).sort(function(t,a){return e.getTime(t.timeDepShedule).localeCompare(e.getTime(a.timeDepShedule))}),o=Object(f.a)(n).sort(function(t,a){return e.getTime(t.timeToStand).localeCompare(e.getTime(a.timeToStand))}),c=this.modifyFlightsByDate(this.state.dayOfFlight,i),l=this.modifyFlightsByDate(this.state.dayOfFlight,o);return r.a.createElement("div",{className:"tabs"},r.a.createElement("ul",{className:"tabs__list"},r.a.createElement("li",{className:"\n            tabs__list-item\n            ".concat("departures"===this.state.tabShown?"tabs__list-item--active":"","\n          "),onClick:function(){return e.changeTab("departures")}},"Departures"),r.a.createElement("li",{className:"\n              tabs__list-item\n              ".concat("arrivals"===this.state.tabShown?"tabs__list-item--active":"","\n            "),onClick:function(){return e.changeTab("arrivals")}},"Arrivals")),r.a.createElement("div",{className:"tabs__content"},r.a.createElement("div",{className:"tabs__content-day"},r.a.createElement("button",{className:"yesterday"===this.state.dayOfFlight?"day-active":"",onClick:function(){return e.changeDay("yesterday")}},"Yesterday"),r.a.createElement("button",{className:"today"===this.state.dayOfFlight?"day-active":"",onClick:function(){return e.changeDay("today")}},"Today"),r.a.createElement("button",{className:"tomorrow"===this.state.dayOfFlight?"day-active":"",onClick:function(){return e.changeDay("tomorrow")}},"Tomorrow")),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,v.map(function(e){return r.a.createElement("th",{key:e},e)}))),r.a.createElement("tbody",null,"departures"===this.state.tabShown&&c.map(function(t){return r.a.createElement(y,{key:t.ID,departure:t,getTime:e.getTime})}),"arrivals"===this.state.tabShown&&l.map(function(t){return r.a.createElement(g,{key:t.ID,arrival:t,getTime:e.getTime})})))))}}]),t}(r.a.Component),b=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={departures:[],departuresToShow:[],arrivals:[],arrivalsToShow:[],filterInput:""},a.componentDidMount=function(){p().then(function(e){var t=e.body.departure.map(function(e){return Object(c.a)({},e)}),n=e.body.arrival.map(function(e){return Object(c.a)({},e)});a.setState({departures:t,departuresToShow:t,arrivals:n,arrivalsToShow:n})})},a.getInputData=function(e){a.setState({filterInput:e.target.value})},a.filter=function(e){e.preventDefault(),a.setState(function(e){var t=e.departures,a=e.arrivals;function n(t){return-1!==((t["airportToID.city_en"]||t["airportFromID.city_en"])+t.codeShareData.map(function(e){return e.airline.en.name})+t.codeShareData.map(function(e){return e.codeShare})).toLowerCase().search(e.filterInput.toLowerCase())}return{departuresToShow:t=t.filter(function(e){return n(e)}),arrivalsToShow:a=a.filter(function(e){return n(e)})}})},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.state,t=e.departuresToShow,a=e.arrivalsToShow;return r.a.createElement("div",{className:"App"},r.a.createElement("h1",{className:"App__title"},"Search flight"),r.a.createElement("form",{className:"App__search",onSubmit:this.filter},r.a.createElement("input",{type:"text",placeholder:"Airline, destination or flight #",className:"App__search-input",onChange:this.getInputData}),r.a.createElement("button",{type:"submit",className:"App__search-button"},"Search")),(t.length>0||a.length>0)&&r.a.createElement(S,{departuresToShow:t,arrivalsToShow:a}))}}]),t}(r.a.Component);var w=function(){return r.a.createElement(b,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[10,1,2]]]);
//# sourceMappingURL=main.74d0f4ca.chunk.js.map