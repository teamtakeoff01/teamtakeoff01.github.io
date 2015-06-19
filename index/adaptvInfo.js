(function(){window.adaptvInfo={POSITION:{ABOVE_VISIBLE_AREA:"aboveVisibleArea",BELOW_VISIBLE_AREA:"belowVisibleArea",LEFT_TO_VISIBLE_AREA:"leftToVisibleArea",RIGHT_TO_VISIBLE_AREA:"rightToVisibleArea",IN_VISIBLE_AREA:"inVisibleArea",HIDDEN:"hidden",UNKNOWN:"NA"},ADSAFE:{URL:"//pixel.adsafeprotected.com/bapi",AN_ID:6058},getElementXY:function(d){var b=d,a=0,f=0,e=0;while(b&&!isNaN(b.offsetLeft)&&!isNaN(b.offsetTop)){if(window.getComputedStyle){e=window.getComputedStyle(b,null)}a+=b.offsetLeft-b.scrollLeft+(e?parseInt(e.getPropertyValue("border-left-width"),10):0);f+=b.offsetTop-b.scrollTop+(e?parseInt(e.getPropertyValue("border-top-width"),10):0);b=b.offsetParent}return{x:d.X=a,y:d.Y=f}},getElementStyle:function(a,b){if(a.currentStyle){return a.currentStyle[b]}else{if(document.defaultView&&document.defaultView.getComputedStyle){return document.defaultView.getComputedStyle(a,"")[b]}else{return a.style[b]}}},getElementInfoForElement:function(c){var b={leftOffset:0,topOffset:0,width:0,height:0};if(c){b.width=c.offsetWidth;b.height=c.offsetHeight;if(c.getBoundingClientRect){var a=c.getBoundingClientRect();b.leftOffset=Math.round(a.left);b.topOffset=Math.round(a.top)}else{var d=this.getElementXY(c);b.leftOffset=d.x;b.topOffset=d.y}}return b},isElementHidden:function(c){var a=false;var b=c;while(b){a=this.getElementStyle(c,"visibility")=="hidden"||this.getElementStyle(c,"display")=="none";if(a){break}b=b.offsetParent}return a},getWindowInfo:function(c){var a={width:0,height:0,leftOffset:0,topOffset:0};if(typeof(c.innerWidth)!="undefined"){a.width=c.innerWidth;a.height=c.innerHeight}else{if(c.document.documentElement&&(c.document.documentElement.clientWidth||c.document.documentElement.clientHeight)){a.width=c.document.documentElement.clientWidth;a.height=c.document.documentElement.clientHeight}else{if(document.body.offsetWidth&&document.body.offsetHeight){a.width=c.document.body.offsetWidth;a.height=c.document.body.offsetHeight}}}var b=(document.compatMode&&document.compatMode!="BackCompat")?document.documentElement:document.body;a.leftOffset=document.all?b.scrollLeft:window.pageXOffset;a.topOffset=document.all?b.scrollTop:window.pageYOffset;return a},getElementPositionRelativeToVisiblearea:function(a,c){var b;if(c.width>0&&c.height>0&&a.width>0&&a.height>0){if(a.topOffset+a.height<=c.topOffset){b=this.POSITION.ABOVE_VISIBLE_AREA}else{if(a.topOffset>=c.height+c.topOffset){b=this.POSITION.BELOW_VISIBLE_AREA}else{if(a.leftOffset+a.width<=c.leftOffset){b=this.POSITION.LEFT_TO_VISIBLE_AREA}else{if(a.leftOffset>=c.width+c.leftOffset){b=this.POSITION.RIGHT_TO_VISIBLE_AREA}else{b=this.POSITION.IN_VISIBLE_AREA}}}}}else{b=this.POSITION.HIDDEN}return b},getVisibleFrameRect:function(b,a){var c={leftOffset:0,topOffset:0,width:0,height:0};c.leftOffset=Math.max(b.leftOffset,a.leftOffset);c.topOffset=Math.max(b.topOffset,a.topOffset);c.width=Math.min(b.leftOffset+b.width,a.leftOffset+a.width)-c.leftOffset;c.height=Math.min(b.topOffset+b.height,a.topOffset+a.height)-c.topOffset;return c},getHorizontalPercentageVisibility:function(b,c){var a=0;a=(Math.min((c.width-b.leftOffset),(b.width+b.leftOffset))/b.width)*100;a=Math.round(Math.min(Math.max(0,a),100)*100)/100;a=Math.round(a);return a},getVerticalPercentageVisibility:function(b,c){var a=0;a=(Math.min((c.height-b.topOffset),(b.height+b.topOffset))/b.height)*100;a=Math.round(Math.min(Math.max(0,a),100)*100)/100;a=Math.round(a);return a},getPlacementInfo:function(c,e,f){var b={position:this.POSITION.UNKNOWN,hVisibility:0,vVisibility:0};if(this.isElementHidden(c)){b.position=this.POSITION.HIDDEN}if(b.position!=this.POSITION.HIDDEN){var d={leftOffset:0,topOffset:0,width:f.width,height:f.height};var a=this.getElementPositionRelativeToVisiblearea(e,d);b.position=a;if(a==this.POSITION.IN_VISIBLE_AREA){b.hVisibility=this.getHorizontalPercentageVisibility(e,d);b.vVisibility=this.getVerticalPercentageVisibility(e,d)}if(b.hVisibility==0||b.vVisibility==0){b.hVisibility=0;b.vVisibility=0}}return b},getPlacementInfoWhenEmbeddedInIFrames:function(h,d,f,p){var c={position:this.POSITION.UNKNOWN,hVisibility:0,vVisibility:0};if(this.isElementHidden(h)){c.position=this.POSITION.HIDDEN}if(c.position!=this.POSITION.HIDDEN){var o=f[f.length-1];var l={leftOffset:0,topOffset:0,width:p.width,height:p.height};var k=this.getElementPositionRelativeToVisiblearea(o,l);c.position=k;if(k==this.POSITION.IN_VISIBLE_AREA){var b=this.getVisibleFrameRect(o,l);var e=f.length-1;var g=k;while(e>0){var n=f[e-1];var m=b;n.leftOffset+=m.leftOffset;n.topOffset+=m.topOffset;g=this.getElementPositionRelativeToVisiblearea(n,m);if(g==this.POSITION.IN_VISIBLE_AREA){b=this.getVisibleFrameRect(n,m)}else{break}e--}if(g==this.POSITION.IN_VISIBLE_AREA){d.leftOffset+=b.leftOffset;d.topOffset+=b.topOffset;var i=this.getElementPositionRelativeToVisiblearea(d,b);if(i==this.POSITION.IN_VISIBLE_AREA){b=this.getVisibleFrameRect(d,b);var a=(b.width/d.width)*100;a=Math.round(a*100)/100;a=Math.round(a);c.hVisibility=a;a=(b.height/d.height)*100;a=Math.round(a*100)/100;a=Math.round(a);c.vVisibility=a}else{c.position=this.POSITION.HIDDEN}}else{c.position=this.POSITION.HIDDEN}}}return c},getAdPlayerPositionInfo:function(f){var l={hostname:window.location.hostname,pageUrl:window.location.href,referrer:document.referrer,inIFrame:false,iframe:{parentUrl:"",topUrl:"",leftOffset:0,topOffset:0,width:0,height:0,crossDomain:false,levels:0},win:{width:0,height:0,leftOffset:0,topOffset:0},el:{leftOffset:0,topOffset:0,width:0,height:0,position:this.POSITION.UNKNOWN,hVisibility:0,vVisibility:0},browser:"NA"};l.browser=adaptvBrowserDetect.browser;var b=this.getElementInfoForElement(f);l.el.leftOffset=b.leftOffset;l.el.topOffset=b.topOffset;l.el.width=b.width;l.el.height=b.height;if(this.isElementHidden(f)){l.el.position=this.POSITION.HIDDEN}l.win=this.getWindowInfo(window);var a=this.getPlacementInfo(f,l.el,l.win);if(a.position!=this.POSITION.IN_VISIBLE_AREA){l.el.position=a.position;l.el.hVisibility=a.hVisibility;l.el.vVisibility=a.vVisibility;l.el.width=l.el.width<l.win.width?l.el.width:l.win.width;l.el.height=l.el.height<l.win.height?l.el.height:l.win.height;return l}try{var o=window;var c=window.location;var n;try{n=window.top.location.href;if(typeof n==="undefined"){throw new Error("WebKit browser based adplayer is in an IFrame!")}else{if(n!==l.pageUrl){l.inIFrame=true;l.iframe.topUrl=n}}}catch(m){l.inIFrame=true;l.iframe.crossDomain=true}if(l.inIFrame&&n){if(window.parent&&window.parent.location){l.iframe.parentUrl=window.parent.location.href}l.win=this.getWindowInfo(window.top);var g=new Array();while(o.parent&&o.parent.document&&o.frames&&o!=window.top){var j=o.parent.document.getElementsByTagName("iframe");for(var h=0;h<j.length;h++){if(j[h].src&&j[h].src==c.href){var d=this.getElementInfoForElement(j[h]);if(h==0){l.iframe.width=d.width;l.iframe.height=d.height}l.iframe.leftOffset=d.leftOffset;l.iframe.topOffset=d.topOffset;g[l.iframe.levels]=d;l.iframe.levels+=1;c=o.parent.location;break}}o=o.parent}var a=this.getPlacementInfoWhenEmbeddedInIFrames(f,l.el,g,l.win);l.el.position=a.position;l.el.hVisibility=a.hVisibility;l.el.vVisibility=a.vVisibility}}catch(k){l.iframe.levels=-1}if(!l.inIFrame){var a=this.getPlacementInfo(f,l.el,l.win);l.el.position=a.position;l.el.hVisibility=a.hVisibility;l.el.vVisibility=a.vVisibility}return l},videoPlayerNodes:{},getPlayerElement:function(d,h){if(this.videoPlayerNodes[d]&&this.videoPlayerNodes[d][d]&&this.videoPlayerNodes[d].parentNode){return this.videoPlayerNodes[d]}var b=null;if(h&&document[h]&&document[h][d]){b=document[h]}else{if(h&&window[h]&&window[h][d]){b=window[h]}else{var k=document.getElementsByTagName("object");var a=document.getElementsByTagName("embed");var n=[];for(var g=0,c=k.length;g<c;n.push(k[g++])){}var f=[];for(var g=0,c=a.length;g<c;f.push(a[g++])){}var j=n.concat(f);for(var g=0;g<j.length;g++){try{if(j[g][d]()){b=j[g];break}}catch(m){}}}}if(b){this.videoPlayerNodes[d]=b}return b},injectJavascript:function(b){var a=document.createElement("script");var c=document.head||document.getElementsByTagName("head")[0]||document.documentElement;a.type="text/javascript";a.src=b;if(c!==null){c.appendChild(a)}},fraudScoreCallback:function(d,b,a){var c=this.getPlayerElement(d,b);c.__adaptv__fraudscore(a)},loadAdsafeJS:function(a,c,d){var e="adaptv"+new Date().getTime();window[e]=function(){adaptvInfo.fraudScoreCallback.apply(adaptvInfo,[c,a,arguments[0]]);window[e]=undefined};var b=this.ADSAFE.URL+"?anid="+this.ADSAFE.AN_ID+"&ias_callback="+e+"&pubid="+window.location.hostname+"&placementId="+d;this.injectJavascript(b)},AdPlayerNode:function(a){this.htmlNode=adaptvInfo.getPlayerElement(a,null);this.pointsPerEdge=1;this.minPtsViewable=3;var f=adaptvInfo.getElementInfoForElement(this.htmlNode);var h=(window.pageXOffset!==undefined)?window.pageXOffset:(document.documentElement||document.body.parentNode||document.body).scrollLeft;var e=(window.pageYOffset!==undefined)?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop;var i=f.topOffset+e;var d=f.leftOffset+h;var b=f.width;var j=f.height;var g=b/(this.pointsPerEdge+1);var c=j/(this.pointsPerEdge+1);this.useControlSpot=function(){var k=window.adaptvBrowserDetect;if(k&&((k.OS==="Mac"&&k.browser==="Safari")||(k.OS==="Windows"&&k.browser==="Opera"))){return true}if(k&&(k.OS==="Windows"&&k.browser==="Chrome")){var n=true,m="application/x-shockwave-flash",l=navigator.mimeTypes;if(l&&l[m]&&l[m].enabledPlugin&&(l[m].enabledPlugin.filename.match(/pepflashplayer|Pepper/gi))){n=false}return n}return false}();this.getControlPoints=function(){return this.useControlSpot?[{x:-10000,y:-10000}]:[]};this.getTopPoints=function(){var m=[];var k=d;for(var l=0;l<this.pointsPerEdge;l++){k+=g;m.push({x:k,y:i})}return m};this.getRightPoints=function(){var l=[];var m=i;for(var k=0;k<this.pointsPerEdge;k++){m+=c;l.push({x:(d+b)-1,y:m})}return l};this.getBottomPoints=function(){var m=[];var k=d;for(var l=0;l<this.pointsPerEdge;l++){k+=g;m.push({x:k,y:(i+j)-1})}return m};this.getLeftPoints=function(){var l=[];var m=i;for(var k=0;k<this.pointsPerEdge;k++){m+=c;l.push({x:d,y:m})}return l};this.getAllPoints=function(){return[this.getControlPoints(),this.getTopPoints(),this.getRightPoints(),this.getBottomPoints(),this.getLeftPoints()]};this.getAllPointsFlattened=function(){var o=[];var m=this.getAllPoints();for(var n=0;n<m.length;n++){var k=m[n];for(var l=0;l<k.length;l++){o.push(k[l])}}return o}},SPOT:{ID:1,GET_NEXT_ID:function(){return this.ID++}},Spot:function(){var a="//redir.adap.tv/redir/client/VPixel.swf";this.viewable=-1;this.id=adaptvInfo.SPOT.GET_NEXT_ID();this.jsCallback="__adaptv__spotnotify__"+this.id.toString();this.interval=0;this.spotDiv;this.callbackFn;this.placementContext;this.inject=function(f,i){var e="adaptvSpotDiv_"+this.id;var g="adaptvVWSpot_"+this.id;if(document.getElementById(e)){return}this.placementContext=f;this.callbackFn=i;var c='<object width="1px" height="1px" id="{spotId}" name="{spotId}" align="center" style="height: 1px; width: 1px;">';c+='<param name="movie" value="{url}" />';c+='<param name="bgcolor" value="#000000"/>';c+='<param name="allowScriptAccess" value="always" />';c+='<param name="FlashVars" value="autoStart=true&callback={callback}"/>';c+='<embed src="{url}" width="1px" height="1px" id="{spotId}" name="{spotId}" align="center" bgcolor="#000000" allowScriptAccess="always" FlashVars="autoStart=true&callback={callback}" type="application/x-shockwave-flash"/>';c+="</object>";c=c.split("{url}").join(a);c=c.split("{spotId}").join(g);c=c.split("{callback}").join(this.jsCallback);var h=document.body||document.getElementsByTagName("body")[0]||document.documentElement;var d=document.createElement("div");d.id=e;d.style.height="1px";d.style.width="1px";d.style.position="absolute";d.innerHTML=c;h.appendChild(d);this.spotDiv=d};var b=this;window[this.jsCallback]=function(e,d,c){b.viewable=c;if(b.callbackFn){b.callbackFn.apply(b.placementContext);b.callbackFn=null}};this.reposition=function(c,d){this.spotDiv.style.left=c+"px";this.spotDiv.style.top=d+"px"};this.destroy=function(){var e=document.body||document.getElementsByTagName("body")[0]||document.documentElement;var d="adaptvSpotDiv_"+this.id;var c=document.getElementById(d);e.removeChild(c);this.spotDiv=null;this.callbackFn=null;this.placementContext=null;window[this.jsCallback]=null;delete window[this.jsCallback]}},Placement:function(a){this.id=a;this.playerNode=new adaptvInfo.AdPlayerNode(a);this.spotsInjected=false;this.viewable=-1;this.spots=[];this.timeout;this.timeout_ms=1800;this.callbackFnName="";this.getInfo=function(e){if(!this.spotsInjected){this.callbackFnName=e;for(var b=0;b<this.playerNode.getAllPointsFlattened().length;b++){var c=new adaptvInfo.Spot();c.inject(this,this.spotCallback);this.spots.push(c)}var d=this;setTimeout(function(){d.repositionSpots()},1);this.timeout=setTimeout(function(){clearTimeout(d.timeout);if(!d.allSpotsReady()&&d.callbackFnName!=""){d.playerNode.htmlNode[d.callbackFnName](d.getMergedInfo())}},this.timeout_ms);this.spotsInjected=true;return null}return this.getMergedInfo()};this.repositionSpots=function(){if(!this.playerNode){return}var e=this.playerNode.getAllPointsFlattened();for(var c=0;c<e.length;c++){var b=e[c];var d=this.spots[c];d.reposition(b.x,b.y)}};this.spotCallback=function(){if(this.allSpotsReady()){clearTimeout(this.timeout);if(this.callbackFnName!=""){var b=this.getMergedInfo();this.playerNode.htmlNode[this.callbackFnName](b)}}};this.getMergedInfo=function(){var e=adaptvInfo.getVWInfo(this.playerNode.htmlNode);if(this.allSpotsReady()){var b=0;for(var c=0;c<this.spots.length;c++){var d=this.spots[c];b+=d.viewable}this.viewable=(b>=this.playerNode.minPtsViewable)?1:0}else{this.viewable=-1}e.viewable=this.viewable;if(e.active===0&&e.viewable===1){e.viewable=0}e.viewableOpportunity=e.viewable;return e};this.allSpotsReady=function(){if(this.playerNode&&this.playerNode.useControlSpot&&this.spots[0].viewable!==0){return false}var c=0;for(var b=0;b<this.spots.length;b++){if(this.spots[b].viewable>-1){c++}}return(c==this.spots.length)};this.dispose=function(){var c=this.spots.length;for(var b=0;b<c;b++){this.spots[b].destroy()}this.playerNode=null;this.spotsInjected=false;this.viewable=-1;this.spots=[];this.timeout=0;this.timeout_ms=1800;this.callbackFnName="";this.id=""}},placements:[],getInfo:function(h,a,m,l){var b={viewable:-1,viewableOld:-1,domId:"",active:0};var o=this.getPlayerElement(a,h);var f=["7221","7658","7257","7386","7480","7716","7597","7865"];var k=["mindjoltinc","cinesport"];var c=false;for(var g=0;g<f.length;g++){if(f[g]===l){c=true}}for(var e=0;e<k.length;e++){if(k[e]===l){c=true}}if(c===true||!window.__adaptv__.utils.flashEnabled()){b=adaptvInfo.getVWInfo(o);b.viewable=b.viewableOld;b.viewableOpportunity=b.viewableOld;return b}var n=window.adaptvInfo.placements;var d;for(var g=0;g<n.length;++g){if(n[g].id===a){d=n[g];break}}if(d==undefined){d=new window.adaptvInfo.Placement(a);n.push(d)}return d.getInfo(m)},removePlacement:function(c){var a=window.adaptvInfo.placements;for(var b=0;b<a.length;b++){if(a[b].id===c){a[b].dispose();a.splice(b,1);break}}},getVWInfo:function(k){var b={viewableOld:-1,domId:"",active:0};var j={ACTIVE:1,INACTIVE:0};if(k){var d=window.adaptvInfo.getAdPlayerPositionInfo(k);b.pWidth=d.el.width;b.pHeight=d.el.height;b.domId=k.id;if(d.el.position!=window.adaptvInfo.POSITION.UNKNOWN){var g=(d.el.width*d.el.hVisibility)/100;var a=(d.el.height*d.el.vVisibility)/100;if(g==0||a==0){b.viewableOld=0}else{var c=(g*a)/(d.el.width*d.el.height);b.viewableOld=(c>=0.5)?1:0}}else{if(d.inIFrame){b.errinfo="inIframe"}if(d.iframe.crossDomain){b.errinfo="iframeCrossDomain"}}var h=false;if(!(document.hasFocus&&document.hasFocus())){var f=["webkit","moz","ms","o"];if(document.visibilityState){h=document.visibilityState!="visible"}else{for(var e=0;e<f.length;e++){if(document[f[e]+"VisibilityState"]){h=document[f[e]+"VisibilityState"]!="visible";break}}}}b.active=(!h)?j.ACTIVE:j.INACTIVE}return b}};window.adaptvBrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"An unknown version";this.OS=this.searchString(this.dataOS)||"An unknown OS"},searchString:function(d){for(var a=0;a<d.length;a++){var b=d[a].string;var c=d[a].prop;this.versionSearchString=d[a].versionSearch||d[a].identity;if(b){if(b.indexOf(d[a].subString)!=-1){return d[a].identity}}else{if(c){return d[a].identity}}}},searchVersion:function(b){var a=b.indexOf(this.versionSearchString);if(a==-1){return}return parseFloat(b.substring(a+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{prop:window.opr,identity:"Opera",versionSearch:"OPR"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Trident",identity:"IE11"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};window.adaptvBrowserDetect.init();window.delegate=function(b,a){if(arguments.length>2){var c=[];for(var d=2;d<arguments.length;d++){c.push(arguments[d])}return function(){return a.apply(b,c)}}else{return function(){return a.call(b)}}};window.adaptvUtils={locateObjectNode:function(h,m){var b=document.getElementById(m);var d,c;if(b!==null){for(d=0;d<b.childNodes.length;d++){var l=b.childNodes[d];if(l.nodeName.toLowerCase()=="span"){for(c=0;c<l.childNodes.length;c++){var n=l.childNodes[c];if(n.nodeName.toLowerCase()=="object"||n.nodeName.toLowerCase()=="embed"){l=n;break}}}if(l.nodeName.toLowerCase()=="object"&&(adaptvBrowserDetect.browser=="Firefox"||adaptvBrowserDetect.browser=="Chrome"||adaptvBrowserDetect.browser=="Safari"||adaptvBrowserDetect.browser=="IE11")){return l}else{if((l.nodeName.toLowerCase()=="embed"&&(adaptvBrowserDetect.browser=="Firefox"||adaptvBrowserDetect.browser=="Chrome"||adaptvBrowserDetect.browser=="Safari"||adaptvBrowserDetect.browser=="IE11"))||(l.nodeName.toLowerCase()=="object"&&(adaptvBrowserDetect.browser=="Explorer"||adaptvBrowserDetect.browser=="IE11"))){return l}}}}var a=document.getElementsByTagName("embed");var g=document.getElementsByTagName("object");var f=[];var k;if(a.length>0){for(d=0;d<a.length;d++){k=a[d].src;if(k===undefined||k===null){continue}if(this.getEndFileName(k.toString().toLowerCase())==this.getEndFileName(h.toLowerCase())){f.push(a[d])}}}else{if(g.length>0){for(d=0;d<g.length;d++){k=g[d].Movie;if(k===undefined||k===null){k=g[d].data}if(k===undefined||k===null){continue}if(this.getEndFileName(k.toLowerCase())==this.getEndFileName(h.toLowerCase())){f.push(g[d])}}}}if(f.length==1){return f[0]}return null},locateObjectContainer:function(c,a){var b=document.getElementById(a);if(c){return c.parentNode}else{return b}},getCompanionDivById:function(b,a,h){a=a||document;h=h||0;var g=a.getElementById(b);if(g){return g}var f=a.getElementsByTagName("iframe");if(f&&h<3){for(var c=0;c<f.length;c++){try{g=adaptvUtils.getCompanionDivById(b,f[c].contentDocument,h+1);if(g){return g}}catch(d){}}}return null},getEndFileName:function(a){if(a.indexOf("/")>-1){var b=a.split("/");if(b.length>0){return b[b.length-1]}return null}else{return a}},playerDivs:{},getPlayerDiv:function(a){if(this.playerDivs.adaptv_ad_player_div){return this.playerDivs.adaptv_ad_player_div}a=a||"";var b="adaptv_ad_player_div"+a;if(this.playerDivs[b]==null){this.playerDivs[b]=document.getElementById(b)}return this.playerDivs[b]},getPlayerDivs:function(){return this.playerDivs},isObjectAttribute:function(c,b,a){if(String(c.getAttribute(b)).toLowerCase()==String(a).toLowerCase()||(c.nodeName.toLowerCase()=="object"&&adaptvUtils.objectTagContainsParamValue(c,b,a))){return true}else{return false}},objectTagContainsParamValue:function(e,d,c){for(var b=0;b<e.childNodes.length;b++){if(e.childNodes[b].nodeName.toLowerCase()=="param"){var a=e.childNodes[b];if(a.getAttribute("name").toLowerCase()==d.toLowerCase()){return a.getAttribute("value").toLowerCase()==c.toLowerCase()}}}},parsePixelValue:function(b){if(!b){return NaN}var a=b.split("px");return Number(a[0])}};window.__adaptv__=window.__adaptv__||{};window.__adaptv__.utils={FADE_DURATION_MS:300,isURL:function(a){return a.indexOf("http")===0},$animate:function(a){this.element=a},$object:function(a){this.object=a},$dom:function(a){this.element=a;if(!this.element.addEventListener&&this.element.attachEvent){var b=this;this.element.addEventListener=function(d,c){b.element.attachEvent("on"+d,c)}}},flashBridge:{newPlacement:function(c,a){var b=new __adaptv__.adPlayer.AdPlacement(c,a);b.init();return b.methods},injectCompanion:function(a,d,b){var c=new __adaptv__.adPlayer.AdCompanionDiv(a,b);c.insertCompanion(d)}},flashEnabled:function(){var a="application/x-shockwave-flash";if(typeof navigator.plugins!=="undefined"&&typeof navigator.plugins["Shockwave Flash"]==="object"&&typeof navigator.mimeTypes!=="undefined"&&navigator.mimeTypes[a]&&navigator.mimeTypes[a].enabledPlugin){return true}else{if(typeof window.ActiveXObject!=="undefined"){try{if(new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")){return true}}catch(b){}}}return false}};window.__adaptv__.utils.$animate.prototype.animate=function(a){var c=new Date;var b=setInterval(function(){var d=new Date-c;var e=(d/a.duration);if(e>1){e=1}a.progress=e;var f=Math.pow(e,2);a.step(f);if(e==1){clearInterval(b);a.complete()}},a.delay||10)};window.__adaptv__.utils.$animate.prototype.fadeIn=function(b){var c=0;var a=this;this.animate({duration:b.duration||__adaptv__.utils.FADE_DURATION_MS,complete:b.complete||function(){},step:function(d){a.changeOpacity(c+d)}});return this};window.__adaptv__.utils.$animate.prototype.fadeOut=function(b){var c=1;var a=this;this.animate({duration:b.duration||__adaptv__.utils.FADE_DURATION_MS,complete:b.complete||function(){},step:function(d){a.changeOpacity(c-d)}});return this};window.__adaptv__.utils.$animate.prototype.changeOpacity=function(a){if(this.element){this.element.style.opacity=(a);this.element.style.MozOpacity=(a);this.element.style.KhtmlOpacity=(a);this.element.style.filter="alpha(opacity="+(a*100)+")"}};window.__adaptv__.utils.$object.prototype.extend=function(c,a){this.object=this.object||{};c=c||{};a=a||{};if(a.override!==false){a.override=true}for(var b in c){if(c.hasOwnProperty(b)){if(typeof c[b]==="object"){this.object[b]=this.deepExtend(this.object[b],c[b],a)}else{this.object[b]=(a.override||typeof this.object[b]==="undefined")?c[b]:this.object[b]}}}return this.object};window.__adaptv__.utils.$object.prototype.deepExtend=function(c,d,a){c=c||{};for(var b in d){if(d.hasOwnProperty(b)){if(typeof d[b]==="object"){c[b]=this.deepExtend(c[b],d[b],a)}else{c[b]=(a.override||typeof c[b]==="undefined")?d[b]:c[b]}}}return c};window.__adaptv__.utils.$dom.prototype.setNestedProperty=function(a,f){a=a.split(".");var e=this.element,c=a.pop();for(var b=0;b<a.length;b++){var d=a[b];e[d]=(typeof e[d]==="object")?e[d]:{};e=e[d]}e[c]=f};window.__adaptv__.utils.$dom.prototype.setProperties=function(b){b=b||{};for(var a in b){if(b.hasOwnProperty(a)){if(a=="style"){this.setStyles(b[a])}else{this.setNestedProperty(a,b[a])}}}return this};window.__adaptv__.utils.$dom.prototype.setStyles=function(b){for(var a in b){if(b.hasOwnProperty(a)){this.element.style[a]=b[a]}}return this};window.__adaptv__.utils.$dom.prototype.addListeners=function(b,c){if(typeof c!=="function"){return}b=b||[];for(var a=0;a<b.length;a++){this.element.addEventListener(b[a],c)}};window.__adaptv__.utils.$dom.prototype.resize=function(b,a){if(!this.element){return}if(b||b===0){this.element.style.width=b+"px"}if(a||a===0){this.element.style.height=a+"px"}return this};window.__adaptv__.utils.$dom.prototype.reposition=function(b,a){if(!this.element){return}if(b||b===0){this.element.style.top=b+"px"}if(a||a===0){this.element.style.left=a+"px"}return this};window.__adaptv__.$animate=function(a){return new __adaptv__.utils.$animate(a)};window.__adaptv__.$object=function(a){return new __adaptv__.utils.$object(a)};window.__adaptv__.$dom=function(a){return new __adaptv__.utils.$dom(a)};window.__adaptv__.$dom.createElement=function(b,d,c){var a=document.createElement(b);c=__adaptv__.$object({id:d,style:{position:"absolute",overflow:"hidden",border:"0px",backgroundColor:"transparent"}}).extend(c);return __adaptv__.$dom(a).setProperties(c).element};window.__adaptv__.adPlayer={DEFAULT_COMP_WIDTH:300,DEFAULT_COMP_HEIGHT:250,DEFAULT_FRAME_NAME:"adaptvAdFrame",AdCompanionDiv:function(a,b){b=b||{};this.parentDiv=window.adaptvUtils.getCompanionDivById(a);this.adFrame=null;this.frameId=b.frameId||__adaptv__.adPlayer.DEFAULT_FRAME_NAME+"_"+a;this.replaceChildren=b.replaceChildren},AdIFrame:function(b,a){a=__adaptv__.$object({name:b,frameBorder:"0",marginWidth:"0px",marginHeight:"0px",hspace:"0",vspace:"0",allowtransparency:"true",scrolling:"no",style:{background:"white",border:"0px",width:"100%",height:"100%"}}).extend(a);this.frame=__adaptv__.$dom.createElement("iframe",b,a);this.frameDoc=null}};window.__adaptv__.adPlayer.AdCompanionDiv.prototype.insertCompanion=function(e){e=e||{};if(!this.parentDiv||(!e.creativeUrl&&!e.htmlTag)){return}var d=e.width||this.parentDiv.clientWidth||__adaptv__.adPlayer.DEFAULT_COMP_WIDTH,a=e.height||this.parentDiv.clientHeight||__adaptv__.adPlayer.DEFAULT_COMP_HEIGHT;this.removeCompanion();while(this.replaceChildren&&this.parentDiv.hasChildNodes()){this.parentDiv.removeChild(this.parentDiv.firstChild)}this.adFrame=new __adaptv__.adPlayer.AdIFrame(this.frameId,{style:{width:d+"px",height:a+"px",position:"relative"}});this.parentDiv.appendChild(this.adFrame.frame);if(e.resourceType==="iframe"){this.adFrame.injectSrc(e.creativeUrl);e.beacons=e.beacons||[];for(var c=0;c<e.beacons.length;c++){var b=__adaptv__.$dom.createElement("img","adaptvCompBeacon"+c,{src:e.beacons[c],height:0,width:0});this.parentDiv.appendChild(b)}}else{if(!this.adFrame.injectHtml(e.htmlTag)){}}};window.__adaptv__.adPlayer.AdCompanionDiv.prototype.removeCompanion=function(){this.adFrame&&this.adFrame.frame.parentNode.removeChild(this.adFrame.frame)};window.__adaptv__.adPlayer.AdCompanionDiv.prototype.destroy=function(){this.removeCompanion();this.frameId="";this.adFrame=null;this.replaceChildren=false};window.__adaptv__.adPlayer.AdIFrame.prototype.injectSrc=function(a){this.frame.src=a};window.__adaptv__.adPlayer.AdIFrame.prototype.injectHtml=function(b){if(!this.frame.contentWindow){return false}this.frameDoc=this.frame.contentDocument||this.frame.contentWindow.document;var g="<script type='text/javascript'>";var a="<\/script>";var d=g+"document.adaptvContainer = {};document.adaptvContainer.loaded = false;"+a;var f=g+"document.adaptvContainer.loaded = true;"+a;try{this.frameDoc.open();this.frameDoc.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html><body>'+d+b+f+"</body></html>");if(!(adaptvBrowserDetect.browser==="Explorer"&&adaptvBrowserDetect.version===8)&&!(adaptvBrowserDetect.browser==="Explorer"&&adaptvBrowserDetect.version===9)){this.frameDoc.close()}}catch(c){return false}return true}})();(function(){window.__adaptv__=window.__adaptv__||{};window.__adaptv__.adPlayer=window.__adaptv__.adPlayer||{};window.__adaptv__.adPlayer.adPlacements={};window.__adaptv__.adPlayer.AdPlacement=function(b,a){this.id=b;this.playerNode=adaptvInfo.getPlayerElement(b);this.playerInfo=adaptvInfo.getElementInfoForElement(this.playerNode);this.debug=a;this.wrapperDiv=null;this.viewport=null;this.adFrame=null;this.adOpening=false;this.adClosing=false;this.isHovered=false;this.isFocused=false;this.fnName=null;this.methods={}};window.__adaptv__.adPlayer.AdPlacement.prototype.init=function(){if(__adaptv__.adPlayer.adPlacements[this.id]&&this.wrapperDiv){return true}this.fnName='__adaptv__.adPlayer.adPlacements["'+this.id+'"].';__adaptv__.adPlayer.adPlacements[this.id]=this;var a=__adaptv__.adPlayer.AdPlacement.prototype;for(var b in a){if(a.hasOwnProperty(b)&&typeof a[b]==="function"){this.methods[b]=this.fnName+b}}if(!this.playerNode){this.errMessage="could not locate video player node";return false}var d=this.playerNode.parentNode;if(d){this.wrapperDiv=__adaptv__.$dom.createElement("div","adaptvPlacement"+this.id,{style:{position:"relative",zIndex:9999,overflow:"visible"}});d.insertBefore(this.wrapperDiv,this.playerNode);if(adaptvBrowserDetect.OS=="Windows"&&adaptvBrowserDetect.browser=="Explorer"&&adaptvBrowserDetect.version==6){d.style.backgroundColor="transparent"}if(this.debug){this.debugBox=__adaptv__.$dom.createElement("div","debugBox"+this.id,{style:{width:this.playerInfo.width+"px",height:this.playerInfo.height+"px",backgroundColor:"red",opacity:0.4,zIndex:10000}});d.insertBefore(this.debugBox,this.playerNode)}var c=this;__adaptv__.$dom(window).addListeners(["blur"],function(){c.checkClick()});return true}else{this.errMessage="video player container not found";return false}};window.__adaptv__.adPlayer.AdPlacement.prototype.insertAd=function(d,c,b){d=unescape(d);if(!this.init()){return false}if(!this.playerInfo.width||!this.playerInfo.height||this.playerInfo.width<c||this.playerInfo.height<b){this.errMessage="player element too small for this creative";return false}if(this.adClosing){setTimeout(delegate(this,this.insertAd,d,c,b),50)}else{this.removeAd();var a=(this.playerInfo.width-c)/2,f=(this.playerInfo.height-b)/2;this.viewport=__adaptv__.$dom.createElement("div","adaptvViewport"+this.id,{style:{top:f+"px",left:a+"px",width:c+"px",height:b+"px"}});__adaptv__.$animate(this.viewport).changeOpacity(0);this.wrapperDiv.appendChild(this.viewport);this.adFrame=new __adaptv__.adPlayer.AdIFrame("adaptvAdFrame"+this.id);this.viewport.appendChild(this.adFrame.frame);if(__adaptv__.utils.isURL(d)){this.adFrame.injectSrc(d)}else{if(!this.adFrame.injectHtml(d)){return false}}var e=this;__adaptv__.$dom(this.adFrame.frame).addListeners(["mouseover","mouseout"],function(g){e.onFrameEvent(g)});__adaptv__.$dom(this.adFrame.frame.contentWindow).addListeners(["focus"],function(){e.onFocus()});return true}};window.__adaptv__.adPlayer.AdPlacement.prototype.removeAd=function(){this.adClosing=false;if(this.wrapperDiv){this.wrapperDiv.style.display="none"}this.viewport&&this.viewport.parentNode.removeChild(this.viewport);this.viewport=null};window.__adaptv__.adPlayer.AdPlacement.prototype.showAd=function(a){if(!this.adOpening&&this.viewport){this.adOpening=true;this.wrapperDiv.style.display="block";__adaptv__.$animate(this.viewport).fadeIn({duration:a,complete:delegate(this,function(){this.adOpening=false})})}};window.__adaptv__.adPlayer.AdPlacement.prototype.hideAd=function(a){if(!this.adClosing&&this.viewport){this.adClosing=true;__adaptv__.$animate(this.viewport).fadeOut({duration:a,complete:delegate(this,this.removeAd)})}};window.__adaptv__.adPlayer.AdPlacement.prototype.adEvent=function(a){this.playerNode["adEvent"+this.id]({type:a,bubbles:"false"})};window.__adaptv__.adPlayer.AdPlacement.prototype.resize=function(d,b){if(this.viewport){var c=adaptvInfo.getElementInfoForElement(this.viewport);if(!d||!b||d<c.width||b<c.height){this.errMessage="cannot resize; player element will be too small for this creative";return false}var a=(d-c.width)/2,e=(b-c.height)/2;__adaptv__.$dom(this.viewport).reposition(e,a)}this.debugBox&&__adaptv__.$dom(this.debugBox).resize(d,b);return true};window.__adaptv__.adPlayer.AdPlacement.prototype.checkClick=function(){this.isHovered&&this.adEvent("adClick")};window.__adaptv__.adPlayer.AdPlacement.prototype.onFocus=function(){if(this.isFocused){this.adEvent("adResume")}this.isFocused=true};window.__adaptv__.adPlayer.AdPlacement.prototype.onFrameEvent=function(a){switch(a.type){case"mouseover":this.isHovered=true;break;case"mouseout":this.isHovered=false;break}};window.__adaptv__.adPlayer.AdPlacement.prototype.destroy=function(){this.removeAd();this.wrapperDiv&&this.wrapperDiv.parentNode.removeChild(this.wrapperDiv);this.debug=null;this.wrapperDiv=null;this.adFrame=null;this.adOpening=false;this.isHovered=false;this.isFocused=false;this.fnName=null;this.methods={}}})();(function(){window.adaptvAdPlayer={videoPlayerNode:null,videoPlayerContainer:null,errMessage:"",swfName:null,videoPlayerId:"adaptvDiv",DEFAULT_COMP_WIDTH:300,DEFAULT_COMP_HEIGHT:250,iframeLoads:{},iframeTimeouts:{},DIV_SEARCH_PERIOD:100,curAdFormat:null,titlecardAdUnitHeight:null,counterHeight:null,defaultAdServerUrl:"http://qa1",adServerUrl:this.defaultAdServerUrl,onCloseBeaconTemplate:null,onCloseBeacon:null,onCloseFired:false,loadDate:new Date(),initialize:function(e,i,g,j,d,c,a,f,b){this.adServerUrl=(b==undefined)?adaptvAdPlayer.defaultAdServerUrl:b;this.swfName=e;if(typeof(f)!="undefined"&&typeof(f)!="null"){this.videoPlayerId=f}this.videoPlayerNode=adaptvUtils.locateObjectNode(this.swfName,this.videoPlayerId);this.videoPlayerContainer=adaptvUtils.locateObjectContainer(this.videoPlayerNode,this.videoPlayerId);if(this.videoPlayerNode===null||this.videoPlayerNode===undefined){this.errMessage="video player not found in DOM";return false}if(!this.isBrowserOK(this.videoPlayerNode)){return false}return true},setPlayheadTime:function(a){if(adaptvAdPlayer.onCloseBeaconTemplate!=undefined&&adaptvAdPlayer.onCloseBeaconTemplate!=null){adaptvAdPlayer.onCloseBeacon=adaptvAdPlayer.onCloseBeaconTemplate.replace("{playHeadTime}",a)}},resize:function(c,k,i,d){var g=adaptvUtils.getPlayerDiv();if(c===null){c=g.style.left}if(k===null){k=g.style.top}if(i===null){i=g.adaptvWidth}if(d===null){d=g.adaptvHeight}__adaptv__.$dom(g).reposition(k,c).resize(i,d);g.adaptvWidth=Number(i);g.adaptvHeight=Number(d);var h=document.getElementById("debugBox");h&&__adaptv__.$dom(h).resize(i,d);var j=document.getElementById("adaptvViewport")||this.viewport;if(!j){return}var e=adaptvUtils.parsePixelValue(j.style.width);var b=adaptvUtils.parsePixelValue(j.style.height);if(this.curAdFormat=="banner"){__adaptv__.$dom(j).reposition(d-b,(i-e)/2).resize(e,b)}else{if(this.curAdFormat=="titlecard"){var f=Math.max(d-this.titlecardAdUnitHeight,0)/2+this.counterHeight;var a=(i-e)/2;__adaptv__.$dom(j).reposition(f,a).resize(e,b)}}},isBrowserOK:function(a){var b=true;if(!((adaptvBrowserDetect.OS=="Windows"&&(adaptvBrowserDetect.browser=="Explorer"||adaptvBrowserDetect.browser=="IE11"))||(adaptvBrowserDetect.browser=="Firefox"&&adaptvBrowserDetect.version>=3)||(adaptvBrowserDetect.browser=="Chrome")||(adaptvBrowserDetect.browser=="Safari"))){this.errMessage+=" Unsupported OS-Browser combination.";b=false}if(a.parentNode.tagName.toLowerCase()=="span"&&adaptvBrowserDetect.browser=="Firefox"){this.errMessage+=" Container cannot be SPAN tag on Firefox.";b=false}if(!(adaptvUtils.isObjectAttribute(a,"wmode","transparent")||adaptvUtils.isObjectAttribute(a,"wmode","opaque"))){this.errMessage+=" video object is not set to wmode=transparent or wmode=opaque.";b=false}return b},toString:function(){return"AdapTV HTML Ad Player"}}})();