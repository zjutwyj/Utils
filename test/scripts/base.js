var one = '<div id="<%=id%>" class="<%=(i % 2 == 1 ? " even" : "")%>"> <div class="grid_1 alpha right"><img class="righted" src="<%=profile_image_url%>"/></div><div class="grid_6 omega contents"><p><b><a href="/<%=from_user%>"><%=from_user%></a>:</b><%=text%></p></div></div>';
var two = '<div id="	=id%>" class="	=(i % 2 == 1 ? " even" : "")%>"> <div class="grid_1 alpha right"><img class="righted" src="	=profile_image_url%>"/></div><div class="grid_6 omega contents"><p><b><a href="/	=from_user%>">	=from_user%></a>:</b>	=text%></p></div></div>';
var three = '<div id="	=id%>" class="	=(i % 2 == 1 ? " even" : "")%>"> <div class="grid_1 alpha right"><img class="righted" src="	=profile_image_url%>"/></div><div class="grid_6 omega contents"><p><b><a href="/	=from_user%>">	=from_user%></a>:</b>	=text%></p></div></div>';
var four = '<div id="	=id%>" class="	=(i % 2 == 1 ? " even" : "")%>"> <div class="grid_1 alpha right"><img class="righted" src="	=profile_image_url%>"/></div><div class="grid_6 omega contents"><p><b><a href="/	=from_user%>">	=from_user%></a>:</b>	=text%></p></div></div>';
/*
 var five = '<div id="',id,'" class="',(i % 2 == 1 ? " even" : ""),'"> <div class="grid_1 alpha right"><img class="righted" src="',profile_image_url,'"/></div><div class="grid_6 omega contents"><p><b><a href="/',from_user,'">',from_user,'</a>:</b>',text,'</p></div></div>';
 var six = '<div id="',id,'" class="',(i % 2 == 1 ? " even" : ""),'"> <div class="grid_1 alpha right"><img class="righted" src="',profile_image_url,'"/></div><div class="grid_6 omega contents"><p><b><a href="/',from_user,'">',from_user,'</a>:</b>',text,'</p></div></div>';
 var seven = <div id="',id,'" class="',(i % 2 == 1 ? " even" : ""),'"> <div class="grid_1 alpha right"><img class="righted" src="',profile_image_url,'"/></div><div class="grid_6 omega contents"><p><b><a href="/',from_user,'">',from_user,'</a>:</b>',text,'</p></div></div>'';
 var eight = '<div id="',id,'" class="',(i % 2 == 1 ? " even" : ""),'"> <div class="grid_1 alpha right"><img class="righted" src="',profile_image_url,'"/></div><div class="grid_6 omega contents"><p><b><a href="/',from_user,'">',from_user,'</a>:</b>',text,'</p></div></div>';
 */

function anonymous(obj) {
    var p = [], print = function () {
        p.push.apply(p, arguments);
    };
    with (obj) {
        p.push('<div id="', id, '" class="', (i % 2 == 1 ? " even" : ""), '"> <div class="grid_1 alpha right"><img class="righted" src="', profile_image_url, '"/></div><div class="grid_6 omega contents"><p><b><a href="/', from_user, '">', from_user, '</a>:</b>', text, '</p></div></div>');
    }
    return p.join('');
}
/*


var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push(''); for ( var i = 0; i < users.length; i++ ) { p.push('<li><a href="',users[i].url,'">',users[i].name,'</a></li>');}p.push('');}return p.join('');}



var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('', for ( var i = 0; i < users.length; i++ ) { ,'<li><a href="',users[i].url,'">',users[i].name,'</a></li>', } ,'');}return p.join('');*/
