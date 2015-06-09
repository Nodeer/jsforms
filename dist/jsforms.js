/*!
 * Clazz.js
 * http://ejohn.org/blog/simple-javascript-inheritance/
 */
(function(){
		this.Package = function(){};
    Package.Register = function(_Name)
    {
				if(this.Exists(_Name)) {
					return;
				}
        var chk = false;
        var cob = "";
        var spc = _Name.split(".");
        for(var i = 0; i<spc.length; i++)
        {
            if(cob!=""){cob+=".";}
            cob+=spc[i];
            chk = this.Exists(cob);
            if(!chk){this.Create(cob);}
        }
        if(chk){ throw "Package: " + _Name + " is already defined."; }
    }

    Package.Create = function(_Src)
    {
        eval("window." + _Src + " = new Object();");
    }

    Package.Exists = function(_Src)
    {
        eval("var NE = false; try{if(" + _Src + "){NE = true;}else{NE = false;}}catch(err){NE=false;}");
        return NE;
    }
})();
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class = function(){};
  
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && 
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
            
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
            
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
            
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
    
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
    
    // Populate our constructed prototype object
    Class.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
    
    return Class;
  };
})();
;
SpahQL_classRegister=function(a,b){for(var c=a.split("."),d="undefined"==typeof window?{}:window,e="undefined"==typeof exports?{}:exports,d="undefined"==typeof SpahQL?d:SpahQL,e="undefined"==typeof SpahQL?e:SpahQL,f=1;f<c.length;f++){var g=c[f],h=g.toLowerCase();f<c.length-1?(d[g]=d[g]||{},d=d[g],e[h]=e[h]||{},e=e[h]):(d[g]=b,e[h]=b)}};
SpahQL_classExtend=function(a,b,c,d,e){var f;"function"==typeof c?(f=d||{},d=e||{},e=c):(f=c||{},d=d||{},e=d.init);var g;c=Object.create(b.prototype);for(g in d)Object.defineProperty(c,g,{value:d[g],enumerable:!1});g=e?e:c.init?function(){this.init&&this.init.apply(this,arguments)}:function(){};g.prototype=c;for(var h in b)g[h]=b[h];for(var j in f)g[j]=f[j];SpahQL_classRegister(a,g);return g};SpahQL_classCreate=function(a,b,c,d){return SpahQL_classExtend(a,Object,b,c,d)};
SpahQL=SpahQL_classExtend("SpahQL",Array,{db:function(a){return this.item("/",a,a)},result:function(a,b,c){return{path:a,value:b,sourceData:a?c:c||b}},item:function(a,b,c){return new this(this.result(a,b,c))},select:function(a,b,c,d){a=this.QueryParser.parseQuery(a);if(a.assertion)throw new this.SpahQLRunTimeError("Cannot call SpahQL.select() with an assertion query.");return new this(this.QueryRunner.select(a,b,c,d))},assert:function(a,b,c,d){a=this.QueryParser.parseQuery(a);return this.QueryRunner.assert(a,
b,c,d)},verbose:!1,log:function(a){this.verbose&&"undefined"!=typeof console&&console.log.apply(console,arguments);return a},inBrowser:function(){return"undefined"!=typeof window&&"object"==typeof window.location},isHeadless:function(){return!this.inBrowser()},inCommonJS:function(){return"object"==typeof exports}},{init:function(a){Object.defineProperty(this,"dh",{value:SpahQL.DataHelper,enumerable:!1});if(a){a=1<arguments.length?Array.prototype.slice.call(arguments):a;a=a.value&&"function"!=typeof a.value?
[a]:a;for(var b in a)this.push(a[b])}},item:function(a){return new SpahQL(this[a])},first:function(){return this.item(0)},last:function(){return this.item(this.length-1)},path:function(){return this[0]?this[0].path:null},paths:function(){return this.map(function(){return this.path()})},value:function(){return this[0]?this[0].value:null},values:function(){return this.map(function(){return this.value()})},sourceData:function(){return this[0]?this[0].sourceData:null},each:function(a){for(var b=0;b<this.length&&
!1!=a.apply(this.item(b),[b,this.length]);b++);return this},map:function(a){for(var b=[],c=0;c<this.length;c++)b.push(a.apply(this.item(c),[c,this.length]));return b},select:function(a){var b=[];this.each(function(){SpahQL.select(a,this.sourceData(),this.value(),this.path()).each(function(){b.push(this[0])})});return new SpahQL(b)},assert:function(a){var b=!0;this.each(function(){if(!SpahQL.assert(a,this.sourceData(),this.value(),this.path()))return b=!1});return b},parentPath:function(a){a=a||this.path();
a=!a||"/"==a?null:a.substring(0,a.lastIndexOf("/"));return""==a?"/":a},parentPaths:function(){var a=this;return this.map(function(){return a.parentPath(this.path())})},parent:function(a){a=a||this[0];var b=this.parentPath(a.path);return b&&a?SpahQL.select(b,a.sourceData):null},parents:function(){var a=[],b=this;this.each(function(){var c=b.parent(this[0]);c&&c[0]&&a.push(c[0])});return new SpahQL(a)},keyName:function(a){a=a||this.path();return!a||"/"==a?null:a.substring(a.lastIndexOf("/")+1)},keyNames:function(){var a=
this;return this.map(function(){return a.keyName(this.path())})},type:function(a){a=a||this.value();return this.dh.objectType(a)},types:function(){var a=this;return this.map(function(){return a.type(this.value())})},containing:function(a,b){var c,d;c="string"==typeof a?[a]:"function"==typeof a.paths?a.paths():a;d=b?c.length:1;var e=[],f=0;a:for(;f<this.length;f++){var g=this[f];if(g.path){var h=0,j=0;for(;j<c.length;j++)if(0==c[j].indexOf(g.path)&&(""==c[j].charAt(g.path.length)||"/"==c[j].charAt(g.path.length)))if(h++,
h>=d){e.push(g);continue a}}}return new SpahQL(e)},containingAll:function(a){return this.containing(a,!0)},filter:function(a){var b=[];this.each(function(){this.assert(a)&&b.push(this[0])});return new SpahQL(b)},concat:function(a){for(var b=[],c=0;c<this.length;c++)b.push(this[c]);for(c=0;c<a.length;c++)b.push(a[c]);return new SpahQL(b)},detach:function(){var a=this.dh.deepClone(this[0]?this[0].value:null);return SpahQL.db(a)},clone:function(){for(var a=[],b=[],c=[],d=0;d<this.length;d++){var e=this[d].sourceData,
f=this[d].path;if(f){var g=b.indexOf(e);0>g?(g=SpahQL.db(this.dh.deepClone(e)),b.push(e),c.push(g)):g=c[g];e=g.select(f);e[0]&&a.push(e[0])}else a.push(this.dh.deepClone(this[d]))}return new SpahQL(a)},set:function(a,b,c){var d=c||this[0];if(!d)return this;"object"==this.dh.objectType(a)?c=a:(c={},c[a]=b);a=!1;b=this.dh.deepClone(d.value);for(var e in c){var f=c[e],g=this.dh.coerceKeyForObject(e,d.value);null!=g&&!this.dh.eq(f,d.value[g])&&(d.value[g]=f,a=!0)}a&&this.resultModified(d,b);return this},
setAll:function(a,b){for(var c=0;c<this.length;c++)this.set(a,b,this[c]);return this},replace:function(a,b){var c=b||this[0],d=this.keyName(c.path);if(d&&c){var e=c.value;c.value=a;var f=this.parent(c);f?f.set(d,a):this.resultModified(c,e)}return this},replaceAll:function(a){for(var b=0;b<this.length;b++)this.replace(a,this[b]);return this},rename:function(a,b){var c=b||this[0];if(c){var d=c.value,e=this.parent(c);e?(e.set(a,d),e.destroy(c)):this.resultModified(c,d)}return this},renameAll:function(a){for(var b=
0;b<this.length;b++)this.rename(a,this[b]);return this},destroy:function(a,b){if(!a||"object"!=typeof a)b=a,a=this[0];if(a&&b){var c,d=this.type(a.value),e=SpahQL.DataHelper.coerceKeyForObject(b,a.value);if("array"==d)c=a.value.slice(0),a.value.splice(e,1);else if("object"==d){c={};for(var f in a.value)c[f]=a.value[f];delete a.value[e]}this.resultModified(a,c)}else a&&(c=this.keyName(a.path),(d=this.parent(a))&&c&&d.destroy(c));return this},destroyAll:function(a){for(var b=this.length-1;-1<b;b--)this.destroy(this[b],
a);return this},listen:function(a,b,c){var d=b?b:a;a=b?a:null;for(b=0;b<this.length;b++){var e=this[b],f="/"==e.path?a||e.path:e.path+(a||"");c?SpahQL.Callbacks.removeCallbackForPathModifiedOnObject(f,e.sourceData,d):SpahQL.Callbacks.addCallbackForPathModifiedOnObject(f,e.sourceData,d)}return this},unlisten:function(a,b){this.listen(a,b,!0)},resultModified:function(a,b){SpahQL.Callbacks.pathModifiedOnObject(a.path,a.sourceData,b,a.value)},valueOf:function(){return JSON.parse(this.toString())},toString:function(){return JSON.stringify(1<
this.length?this.map(function(a){return a.value}):0<this.length?this[0].value:null)}});"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=SpahQL);"undefined"!=typeof window&&(window.SpahQL=SpahQL);
SpahQL_classCreate("SpahQL.Callbacks",{callbacks:{},reset:function(){this.callbacks={}},callbacksForPathInObject:function(a,b){var c=this.callbacks[a],d=[];if(c)for(var e in c)c[0]==b&&d.push(a);return d},pathModifiedOnObject:function(a,b,c,d){if(a){var e=[];a=SpahQL.DataHelper.compare(c,d,a);for(var f in a)for(a=f;0<=a.lastIndexOf("/");)0>e.indexOf(a)&&e.push(a),a=0==a.lastIndexOf("/")&&1<a.length?"/":a.substring(0,a.lastIndexOf("/"));e.sort(function(a,b){return"/"==a?1:"/"==b?-1:a.split("/").length>
b.split("/").length?-1:1});SpahQL.log("Path modified on data store, formulated the following dispatch strategy: ["+e.join(" -> ")+"]. Data store: ",b);for(f=0;f<e.length;f++)if(a=e[f],c=this.callbacks[a],SpahQL.log("Triggering registered path callbacks for "+a+": "+(!c?"No callbacks to trigger":c.length+" callbacks to trigger")),c)for(d=0;d<c.length;d++)if(c[d][0]==b){for(var g=[],h=0;h<e.length;h++)e[h]!=a&&0==e[h].indexOf(a)&&g.push(e[h].substring(a.length));c[d][1](SpahQL.select(a,b),a,g)}}},addCallbackForPathModifiedOnObject:function(a,
b,c){this.callbacks[a]=this.callbacks[a]||[];this.callbacks[a].push([b,c])},removeCallbackForPathModifiedOnObject:function(a,b,c){if(a=this.callbacks[a])for(var d=a.length-1;0<=d;d--)if(a[d][0]==b&&a[d][1]==c){a.splice(d,1);break}}});SpahQL.Errors={};SpahQL.Errors.SpahQLError=function(a){this.name="SpahQLError";this.message=a||""};SpahQL.Errors.SpahQLError.prototype=Error.prototype;SpahQL.Errors.SpahQLRunTimeError=function(a){this.name="SpahQLRunTimeError";this.message=a||""};
SpahQL.Errors.SpahQLRunTimeError.prototype=SpahQL.Errors.SpahQLError.prototype;SpahQL_classCreate("SpahQL.Query",{},{init:function(a,b,c,d,e){this.primaryToken=a||null;this.comparisonOperator=b||null;this.secondaryToken=c||null;this.assertion=d||!1;this.rawString=e||null}});
SpahQL_classCreate("SpahQL.QueryParser",{queryCache:{},parseQuery:function(a){var b=this.cleanQuery(a);if(this.queryCache[b])return this.queryCache[b];var c=new SpahQL.Query;c.rawString=a;for(var d,e=0;d=SpahQL.Token.parseAt(e,b);){var f=d[0];d=d[1];d instanceof SpahQL.Token.ComparisonOperator?c.comparisonOperator?this.throwParseAt(e,b,"Found unexpected TOKEN_COMPARISON_OPERATOR, expected EOL"):!c.primaryToken||c.primaryToken&&c.secondaryToken?this.throwParseAt(e,b,"Found unexpected TOKEN_COMPARISON_OPERATOR, expected evaluatable token type"):
(c.comparisonOperator=d,c.assertion=!0):("function"==typeof d.toSet&&(d=d.toSet()),c.primaryToken?c.comparisonOperator?c.secondaryToken?this.throwParseErrorAt(e,b,"Unexpected token, expected EOL"):c.secondaryToken=d:this.throwParseErrorAt(e,b,"Unexpected token, expected EOL or TOKEN_COMPARISON_OPERATOR"):c.primaryToken=d);e=f}if(c.primaryToken)if(c.comparisonOperator&&!c.secondaryToken)this.throwParseErrorAt(b.length-1,b,"Query contains comparison operator but has no secondary term - expected TOKEN_SET_LITERAL or TOKEN_SELECTION_QUERY");
else return this.queryCache[b]=c,SpahQL.log("Generated and cached query '"+a+"' ->",c),c;else this.throwParseErrorAt(0,b,"Failed to parse query, expected TOKEN_SET_LITERAL or TOKEN_SELECTION_QUERY")},cleanQuery:function(a){for(var b=[],c="",d=0;d<a.length;d++){var e=a.charAt(d);('"'==e||"'"==e)&&(0==d||"\\"!=a.charAt(d-1))?(b[b.length-1]==e?b.pop():b.push(e),c+=e):" "==e?0<b.length&&(c+=e):c+=e}return c},throwParseErrorAt:function(a,b,c){throw Error("Parse error: '"+(c||"failure")+"' at index "+a+
" in query '"+b+"'.");}});
SpahQL_classCreate("SpahQL.QueryRunner",{select:function(a,b,c,d){if(a.assertion)throw new SpahQL.Errors.SpahQLRunTimeError("Attempted to select from an assertion query.");return a.primaryToken.evaluate(b,c||b,d)},assert:function(a,b,c,d){return this.evalAssertion(a.primaryToken,a.secondaryToken,a.comparisonOperator,b,c||b,d)},evalAssertion:function(a,b,c,d,e,f){var g=a.evaluate(d,e,f);a=[];for(var h in g)a.push(g[h].value);if(b){b=b.evaluate(d,e,f);f=[];for(var j in b)f.push(b[j].value)}else return SpahQL.DataHelper.truthySet(a);switch(c.evaluate(d,
e)[0].value){case SpahQL.Token.ComparisonOperator.COMPARISON_STRICT_EQUALITY:return SpahQL.DataHelper.eqSetStrict(a,f);case SpahQL.Token.ComparisonOperator.COMPARISON_INEQUALITY:return!SpahQL.DataHelper.eqSetStrict(a,f);case SpahQL.Token.ComparisonOperator.COMPARISON_ROUGH_EQUALITY:return SpahQL.DataHelper.eqSetRough(a,f);case SpahQL.Token.ComparisonOperator.COMPARISON_LT:return SpahQL.DataHelper.ltSet(a,f);case SpahQL.Token.ComparisonOperator.COMPARISON_GT:return SpahQL.DataHelper.gtSet(a,f);case SpahQL.Token.ComparisonOperator.COMPARISON_LTE:return SpahQL.DataHelper.lteSet(a,
f);case SpahQL.Token.ComparisonOperator.COMPARISON_GTE:return SpahQL.DataHelper.gteSet(a,f);case SpahQL.Token.ComparisonOperator.COMPARISON_JOINT_SET:return SpahQL.DataHelper.jointSet(a,f);case SpahQL.Token.ComparisonOperator.COMPARISON_DISJOINT_SET:return!SpahQL.DataHelper.jointSet(a,f);case SpahQL.Token.ComparisonOperator.COMPARISON_SUPERSET:return SpahQL.DataHelper.superSet(a,f);case SpahQL.Token.ComparisonOperator.COMPARISON_SUBSET:return SpahQL.DataHelper.superSet(f,a)}}});
SpahQL_classCreate("SpahQL.DataHelper",{compare:function(a,b,c){var d="/"==c?"":c,e={},f=this.objectType(a),g=this.objectType(b),f="object"!=f&&"array"!=f,g="object"!=g&&"array"!=g;if(this.eq(a,b))return e;if(f&&g){var h=this.modificationSymbol(b,a);h&&(e[c]=[h,a,b])}if(!g)for(var j in b)for(l in h=this.compare(f?void 0:a[j],b[j],d+"/"+j),h)e[l]=h[l];if(!f)for(var k in a){j=this.compare(a[k],g?void 0:b[k],d+"/"+k);for(var l in j)e[l]=j[l]}e[c]||(d=this.modificationSymbol(b,a))&&(e[c]=[d,a,b]);return e},
modificationSymbol:function(a,b){if("null"==this.objectType(b))return"+";if("null"==this.objectType(a))return"-";if(a!=b)return"~"},objectType:function(a){return null==a||void 0==a?"null":"object"==typeof a?"[object Array]"==Object.prototype.toString.call(a)?"array":"object":typeof a},eq:function(){var a,b;a=arguments[0];for(b=1;b<arguments.length;b++){var c=arguments[b],d=this.objectType(a);if(d!=this.objectType(c))return!1;if("array"==d){if(c.length!=a.length)return!1;for(d=0;d<c.length;d++)if(!this.eq(c[d],
a[d]))return!1}else if("object"==d){if(Object.keys(c).length!=Object.keys(a).length)return!1;for(var e in c)if(!this.eq(c[e],a[e]))return!1}else if(c!=a)return!1;a=c}return!0},hashKeys:function(a){return Object.keys(a).sort()},hashValues:function(a){var b=[],c;for(c in a)b.push(a[c]);return b},mathGte:function(a,b){return this.mathCompare(a,b,function(a,b){return a>=b})},mathGt:function(a,b){return this.mathCompare(a,b,function(a,b){return a>b})},mathLte:function(a,b){return this.mathCompare(a,b,
function(a,b){return a<=b})},mathLt:function(a,b){return this.mathCompare(a,b,function(a,b){return a<b})},mathCompare:function(a,b,c){var d=this.objectType(a),e=this.objectType(b);return d==e&&("number"==d||"string"==d)?c.apply(this,[a,b]):!1},eqRough:function(a,b){var c=this.objectType(a),d=this.objectType(b);if(c!=d)return!1;switch(c){case "string":return this.eqStringRough(a,b);case "number":return this.eqNumberRough(a,b);case "array":return this.eqArrayRough(a,b);case "object":return this.eqHashRough(a,
b);case "boolean":return this.eqBooleanRough(a,b);default:return!1}},eqStringRough:function(a,b){return a.match(RegExp(b,"g"))},eqNumberRough:function(a,b){return Math.floor(a)==Math.floor(b)},eqArrayRough:function(a,b){return this.jointSet(a,b)},eqHashRough:function(a,b){for(var c in a)if(b[c]&&this.eq(a[c],b[c]))return!0;return!1},eqBooleanRough:function(a,b){return a&&b||!a&&!b},eqSetStrict:function(a,b){if(a.length!=b.length)return!1;for(var c=[],d=0;d<a.length;d++)for(var e=a[d],f=0;f<b.length;f++)this.eq(e,
b[f])&&0>c.indexOf(f)&&c.push(f);return c.length==a.length},eqSetRough:function(a,b){return this.jointSetWithCallback(a,b,function(a,b){return this.eqRough(a,b)})},jointSet:function(a,b){return this.jointSetWithCallback(a,b,function(a,b){return this.eq(a,b)})},gteSet:function(a,b){return this.jointSetWithCallback(a,b,function(a,b){return this.mathGte(a,b)})},lteSet:function(a,b){return this.jointSetWithCallback(a,b,function(a,b){return this.mathLte(a,b)})},gtSet:function(a,b){return this.jointSetWithCallback(a,
b,function(a,b){return this.mathGt(a,b)})},ltSet:function(a,b){return this.jointSetWithCallback(a,b,function(a,b){return this.mathLt(a,b)})},jointSetWithCallback:function(a,b,c){for(var d=0;d<b.length;d++)for(var e=0;e<a.length;e++)if(c.apply(this,[a[e],b[d]]))return!0;return!1},superSet:function(a,b){var c=[],d=0;for(;d<b.length;d++){var e=b[d],f=0;b:for(;f<a.length;f++){var g=a[f];if(-1==c.indexOf(f)&&this.eq(e,g)){c.push(f);break b}}}return b.length==c.length},truthySet:function(a){for(var b=0;b<
a.length;b++)if(a[b])return!0;return!1},coerceKeyForObject:function(a,b){var c=this.objectType(b);return"array"==c?(c=parseInt(a),isNaN(c)?null:c):"object"==c?(c=a.toString(),c.match(/^\s*$/)?null:c):null},deepClone:function(a){var b=this.objectType(a);if("array"==b||"object"==b){var b="array"==b?[]:{},c;for(c in a)b[c]=this.deepClone(a[c]);return b}return a}});
SpahQL_classCreate("SpahQL.Strategiser",{},{init:function(){this.strategies=[];this.categories={}},count:function(a){return this.getStrategies(a).length},addStrategy:function(a,b,c){a=this.commoniseStrategy(a,b,c);this.strategies.push(a);this.categories[a.category]=this.categories[a.category]||[];this.categories[a.category].push(a);return a},removeStrategy:function(a){var b=this.strategies.indexOf(a);if(0<=b){this.strategies.splice(b,1);if(b=this.categories[a.category])a=b.indexOf(a),0<=a&&b.splice(a,
1);return!0}return!1},commoniseStrategy:function(a,b,c){if(a._commonised)return a;"function"==typeof b&&(c=b,b=null);var d=a.paths||a.path;"string"==typeof d&&(d=[d]);var e=a["if"]?!0:!1,f=(e?a["if"]:a.unless)||null;c=a.action||c;b=b||a.category||"*";return{paths:d,expectation:e,condition:f,action:c,category:b,_commonised:!0}},getStrategies:function(a){if(!a)return this.strategies;a="string"==typeof a?[a]:a;var b=[],c;for(c in this.strategies){var d=this.strategies[c],e=d.category;("*"==e||0<=a.indexOf(e))&&
b.push(d)}return b},run:function(a,b,c,d){b=this.getStrategies(b);this.locked=!0;this.runStrategyLoop(0,b,a,c,d)},runStrategyLoop:function(a,b,c,d,e){function f(){return h.runStrategyLoop(a+1,b,c,d,e)}if(a>=b.length)return this.completed(c,d,e);var g=b[a],h=this;if(g.condition&&c.assert(g.condition)!=g.expectation)return f();this.runStrategyQueryLoop(0,g,c,d,f)},runStrategyQueryLoop:function(a,b,c,d,e){function f(){return g.runStrategyQueryLoop(a+1,b,c,d,e)}if(a>=b.paths.length)return e();var g=this,
h={done:f},j=c.select(b.paths[a]),k=b.action;return 0<j.length?k(j,c,d,h):f()},completed:function(a,b,c){c(a,b)}});
SpahQL_classCreate("SpahQL.Token",{parseAt:function(a,b){return SpahQL.Token.ComparisonOperator.parseAt(a,b)||SpahQL.Token.String.parseAt(a,b)||SpahQL.Token.Numeric.parseAt(a,b)||SpahQL.Token.Boolean.parseAt(a,b)||SpahQL.Token.Set.parseAt(a,b)||SpahQL.Token.SelectionQuery.parseAt(a,b)||null},throwParseErrorAt:function(a,b,c){throw Error("Parse error: '"+(c||"failure")+"' at index "+a+" in query '"+b+"'.");}});
SpahQL_classCreate("SpahQL.Token.Base",{parseAt:function(){throw"I should have been overridden. Something is disastrously wrong.";}},{init:function(){},throwRuntimeError:function(a,b){throw Error("Parse error: '"+(b||"failure to execute")+"' in token "+a+".");}});SpahQL_classExtend("SpahQL.Token.Simple",SpahQL.Token.Base,{},{init:function(a){this.value="undefined"!=typeof a?a:null},toSet:function(){return new SpahQL.Token.Set([this])},evaluate:function(){return[SpahQL.result(null,this.value)]}});
SpahQL_classExtend("SpahQL.Token.String",SpahQL.Token.Simple,{ATOM_QUOTE_SINGLE:"'",ATOM_QUOTE_DOUBLE:'"',ATOM_ESCAPE:"\\",parseAt:function(a,b){var c=b.charAt(a);if(c==this.ATOM_QUOTE_SINGLE||c==this.ATOM_QUOTE_DOUBLE){for(var d=0,e="";;)if(d++,b.length<a+d)this.throwParseErrorAt(a,b,"Encountered EOL when expecting "+(c==this.ATOM_QUOTE_SINGLE?"ATOM_QUOTE_SINGLE":"ATOM_QUOTE_DOUBLE"));else if(b.charAt(a+d)==c){d++;break}else b.charAt(a+d)==this.ATOM_ESCAPE?(e+=b.charAt(a+d+1),d++):e+=b.charAt(a+
d);return[a+d,new this(e)]}return null}},{});SpahQL_classExtend("SpahQL.Token.Numeric",SpahQL.Token.Simple,{ATOM_NUMERIC_POINT:".",ATOM_NUMERIC_NEGATIVE:"-",parseAt:function(a,b){var c=b.charAt(a),d=/\d/;if(c.match(d)||c==this.ATOM_NUMERIC_NEGATIVE&&b.charAt(a+1).match(d)){for(var e,f=0;!(f++,b.length<a+f);)if(b.charAt(a+f)==this.ATOM_NUMERIC_POINT)if(e){f--;break}else e=!0,c+=b.charAt(a+f);else if(b.charAt(a+f).match(d))c+=b.charAt(a+f);else break;return[a+f,new this(e?parseFloat(c):parseInt(c,10))]}return null}});
SpahQL_classExtend("SpahQL.Token.Boolean",SpahQL.Token.Simple,{ATOM_BOOLEAN_TRUE:"true",ATOM_BOOLEAN_FALSE:"false",parseAt:function(a,b){return b.substr(a,this.ATOM_BOOLEAN_TRUE.length)==this.ATOM_BOOLEAN_TRUE?[a+this.ATOM_BOOLEAN_TRUE.length,new this(!0)]:b.substr(a,this.ATOM_BOOLEAN_FALSE.length)==this.ATOM_BOOLEAN_FALSE?[a+this.ATOM_BOOLEAN_FALSE.length,new this(!1)]:null}});
SpahQL_classExtend("SpahQL.Token.Set",SpahQL.Token.Base,{ATOM_SET_START:"{",ATOM_SET_END:"}",ATOM_SET_ARRAY_DELIMITER:",",ATOM_SET_RANGE_DELIMITER:"..",parseAt:function(a,b){if(b.charAt(a)==this.ATOM_SET_START){var c=a+1,d=[],e=!1,f=!1,g;if(b.charAt(c)==this.ATOM_SET_END)return[c+1,new this];for(;g=SpahQL.Token.parseAt(c,b);){var h=g[1],j=[SpahQL.Token.Numeric,SpahQL.Token.String,SpahQL.Token.Boolean,SpahQL.Token.SelectionQuery],k=!1;for(a in j)if(h instanceof j[a]){k=!0;break}if(k)if(c=g[0],d.push(h),
b.charAt(c)==this.ATOM_SET_ARRAY_DELIMITER)f&&this.throwParseErrorAt(c,b,"Found unexpected ATOM_SET_ARRAY_DELIMITER in set literal that already used the range delimiter."),e=!0,c++;else if(b.substr(c,this.ATOM_SET_RANGE_DELIMITER.length)==this.ATOM_SET_RANGE_DELIMITER)e&&this.throwParseErrorAt(c,b,"Found unexpected ATOM_SET_RANGE_DELIMITER in set literal that already used the array delimiter."),f=!0,c+=this.ATOM_SET_RANGE_DELIMITER.length;else if(b.charAt(c)==this.ATOM_SET_END){c++;break}else this.throwParseErrorAt(c,
b,"Found unexpected character '"+b.charAt(c)+"' in set literal, expecting one of ATOM_SET_ARRAY_DELIMITER, ATOM_SET_RANGE_DELIMITER, ATOM_SET_END.");else this.throwParseErrorAt(c,b,"Found unexpected token in set literal. Set literals may only contain string, numeric, boolean and selection query values.")}return[c,new this(d,f)]}return null}},{init:function(a,b){this.tokens=a||[];this.isRange=b||!1},evaluate:function(a,b,c){var d=[];if(this.isRange){2!=this.tokens.length&&this.throwRuntimeError(this,
"Tried to evaluate range with "+this.tokens.length+" tokens, expected 2 tokens. Tokens: "+this.tokens.join(", "));var e=this.tokens[0].evaluate(a,b,c);b=this.tokens[1].evaluate(a,b,c);if(0==e.length||0==b.length)return d;a=e[0].value;b=b[0].value;c=SpahQL.DataHelper.objectType(a);e=SpahQL.DataHelper.objectType(b);if(c==e)"number"==c?d=d.concat(this.evalNumericRange(a,b)):"string"==c?d=d.concat(this.evalStringRange(a,b)):new SpahQL.Errors.SpahQLRunTimeError("Unsupported type used in range. Ranges support only strings and numbers.");
else throw new SpahQL.Errors.SpahQLRunTimeError("Illegal range with start type '"+c+"' and end type '"+e+"'. Ranges must use the same type at each end.");}else for(e in this.tokens)d=d.concat(this.tokens[e].evaluate(a,b,c));return d},evalNumericRange:function(a,b){var c=[];if(b<a)for(var d=a;d>=b;d--)c.push(SpahQL.result(null,d));else for(d=a;d<=b;d++)c.push(SpahQL.result(null,d));return c},evalStringRange:function(a,b){var c=[];if(a==b)return[SpahQL.result(null,a)];if(a>b||a.length!=b.length)return c;
for(var d=[],e=!0,f=0;f<a.length;f++){var g=a.charCodeAt(f);d[f]=48<=g&&57>=g||65<=g&&90>=g||97<=g&&122>=g?!1:!0;(e=!0==d[f]&&!0==e)&&f==a.length-1&&(d[f]=!1)}e=function(a){for(a-=1;-2<a;a--)if(!1==d[a])return a};f=a+"";a:for(;;){c.push(SpahQL.result(null,f));if(f==b)break a;var g=e(a.length),h="";b:for(;;){var h=!1,j=f.charAt(g).charCodeAt(0),k=void 0;57==j?(h=!0,k=48):90==j?(h=!0,k=65):122==j?(h=!0,k=97):127==j?(h=!0,k=j):k=j+1;h=[String.fromCharCode(k),h];f=f.split("");f.splice(g,1,h[0]);f=f.join("");
if(!0==h[1]){if(g=e(g),0>g)break a}else break b}}return c}});
SpahQL_classExtend("SpahQL.Token.ComparisonOperator",SpahQL.Token.Simple,{COMPARISON_OPERATORS:"== =~ > < >= <= != }~{ }>{ }<{ }!{".split(" "),COMPARISON_STRICT_EQUALITY:"==",COMPARISON_ROUGH_EQUALITY:"=~",COMPARISON_INEQUALITY:"!=",COMPARISON_LT:"<",COMPARISON_GT:">",COMPARISON_LTE:"<=",COMPARISON_GTE:">=",COMPARISON_JOINT_SET:"}~{",COMPARISON_SUPERSET:"}>{",COMPARISON_SUBSET:"}<{",COMPARISON_DISJOINT_SET:"}!{",parseAt:function(a,b){return 0<=this.COMPARISON_OPERATORS.indexOf(b.substr(a,3))?[a+3,
new this(b.substr(a,3))]:0<=this.COMPARISON_OPERATORS.indexOf(b.substr(a,2))?[a+2,new this(b.substr(a,2))]:0<=this.COMPARISON_OPERATORS.indexOf(b.substr(a,1))?[a+1,new this(b.substr(a,1))]:null}});
SpahQL_classExtend("SpahQL.Token.FilterQuery",SpahQL.Token.Simple,{ATOM_FILTER_QUERY_START:"[",ATOM_FILTER_QUERY_END:"]",parseAt:function(a,b){if(b.charAt(a)==this.ATOM_FILTER_QUERY_START){for(var c=a+1,d=1,e="",f;0<d;){var g=b.charAt(c);if(g==this.ATOM_FILTER_QUERY_START)d++,e+=g,c++;else if(g==this.ATOM_FILTER_QUERY_END){d--;c++;if(0==d)break;e+=g}else(f=SpahQL.Token.String.parseAt(c,b))?(e+=b.substring(c,f[0]),c=f[0]):(e+=g,c++)}if(0<e.length)return[c,new this(SpahQL.QueryParser.parseQuery(e))];
this.throwParseErrorAt(c,b,"Found unexpected ATOM_FILTER_QUERY_END, expected TOKEN_SELECTION_QUERY or TOKEN_ASSERTION_QUERY. Looked like those brackets were empty - make sure they have a query in them.")}return null}},{evaluate:function(a,b){return SpahQL.QueryRunner.assert(this.value,a,b)}});
SpahQL_classExtend("SpahQL.Token.PathComponent",SpahQL.Token.Base,{ATOM_PATH_DELIMITER:"/",ATOM_PROPERTY_IDENTIFIER:".",ATOM_PATH_WILDCARD:"*",parseAt:function(a,b){if(b.charAt(a)==this.ATOM_PATH_DELIMITER){var c=a+1,d=new this,e=!1;b.charAt(c)==this.ATOM_PATH_DELIMITER&&(d.recursive=!0,c++);if(b.charAt(c)==this.ATOM_PATH_WILDCARD)d.key=this.ATOM_PATH_WILDCARD,c++;else{b.charAt(c)==this.ATOM_PROPERTY_IDENTIFIER?(e=!0,c++):b.charAt(c)==this.ATOM_PATH_DELIMITER&&this.throwParseErrorAt(c,b,"3 path delimiters found in a row. Maximum legal count is 2.");
var f=SpahQL.Token.KeyName.parseAt(c,b);!f&&e?this.throwParseError(c,b,"Found unexpected character '"+b.charAt(c)+"' when expecting TOKEN_PROPERTY"):f&&(e?d.property=f[1]:d.key=f[1],c=f[0])}for(;e=SpahQL.Token.FilterQuery.parseAt(c,b);)d.filterQueries.push(e[1]),c=e[0];return[c,d]}return null}},{PROPERTY_TYPE:"type",PROPERTY_SIZE:"size",PROPERTY_EXPLODE:"explode",PROPERTY_KEY:"key",PROPERTY_PATH:"path",init:function(a,b,c,d){this.key=a||null;this.property=b||null;this.recursive=c||!1;this.filterQueries=
d||[]},evaluate:function(a,b,c){var d,e=!c||"/"==c?"":c;null==this.key&&null==this.property?d=[SpahQL.result(c,b,a)]:null!=this.key?d=this.fetchResultsFromObjectByKey(this.key.value,a,b,e,this.recursive):null!=this.property&&(d=this.fetchResultsFromObjectByProperty(this.property.value,a,b,e,this.recursive));if(0<d.length&&0<this.filterQueries.length)for(b=0;b<this.filterQueries.length;b++){var e=this.filterQueries[b],f=[];for(c=0;c<d.length;c++){var g=d[c];e.evaluate(a,g.value)&&0>f.indexOf(g)&&f.push(g)}d=
f}return d},fetchResultsFromObjectByKey:function(a,b,c,d,e){var f=SpahQL.DataHelper.objectType(c),g=[];if("array"==f||"object"==f)for(var h in c){var f=c[h],j=SpahQL.DataHelper.objectType(f),k=d+"/"+h;(a==SpahQL.QueryParser.ATOM_PATH_WILDCARD||a.toString()==h.toString())&&g.push(SpahQL.result(k,f,b));if(e&&("array"==j||"object"==j))g=g.concat(this.fetchResultsFromObjectByKey(a,b,f,k,e))}return g},fetchResultsFromObjectByProperty:function(a,b,c,d,e){var f=SpahQL.DataHelper.objectType(c),g=d+"/."+a,
h=[];switch(a){case this.PROPERTY_SIZE:switch(f){case "array":case "string":h.push(SpahQL.result(g,c.length,b));break;case "object":h.push(SpahQL.result(g,SpahQL.DataHelper.hashKeys(c).length,b))}break;case this.PROPERTY_TYPE:h.push(SpahQL.result(g,f,b));break;case this.PROPERTY_EXPLODE:if("string"==f)for(g=0;g<c.length;g++)h.push(SpahQL.result(d+"/"+g,c.charAt(g),b));break;case this.PROPERTY_PATH:h.push(SpahQL.result(g,d||"/",b));break;case this.PROPERTY_KEY:var j=!d||""==d||"/"==d?d:d.substring(d.lastIndexOf("/")+
1);h.push(SpahQL.result(g,j,b));break;default:throw new SpahQL.Errors.SpahQLRunTimeError("Unrecognised property token '"+a+"'.");}if(e&&("array"==f||"object"==f))for(var k in c)h=h.concat(this.fetchResultsFromObjectByProperty(a,b,c[k],d+"/"+k,e));return h}});
SpahQL_classExtend("SpahQL.Token.SelectionQuery",SpahQL.Token.Base,{ATOM_PATH_ROOT:"$",parseAt:function(a,b){var c=b.charAt(a),d=SpahQL.Token.PathComponent.parseAt(a,b);if(c==this.ATOM_PATH_ROOT||d){var e=new this,f=a;c==this.ATOM_PATH_ROOT&&((d=SpahQL.Token.PathComponent.parseAt(f+1,b))||this.throwParseErrorAt(f+1,b,"Found unexpected character '"+b.charAt(f+1)+"', expected TOKEN_PATH_COMPONENT"),e.useRoot=!0);f=d[0];for(e.pathComponents.push(d[1]);c=SpahQL.Token.PathComponent.parseAt(f,b);)e.pathComponents.push(c[1]),
f=c[0];return[f,e]}return null}},{init:function(a,b){this.pathComponents=a||[];this.useRoot=b||!1},evaluate:function(a,b,c){b=[SpahQL.result((this.useRoot?null:c)||"/",this.useRoot?a:b)];for(c=0;c<this.pathComponents.length;c++){for(var d=this.pathComponents[c],e=[],f=0;f<b.length;f++)e=e.concat(d.evaluate(a,b[f].value,b[f].path));b=e;if(0==b.length)break}return b}});
SpahQL_classExtend("SpahQL.Token.KeyName",SpahQL.Token.Simple,{parseAt:function(a,b){for(var c=/[\w\d_-]/,d=a,e="",f;f=b.charAt(d).match(c);)e+=f[0],d++;return 0<e.length?[d,new this(e)]:null}});
;Package.Register('forms');

forms.BaseForm=Class.extend({
	items : null
	,db : null
	,rendererImpl : null
	,$jq : null
	,idx : {
		byid : {}
	}
	,init : function(){
		this.rendererImpl=eval('new forms.renderer.'+this.renderer+'Renderer()');
		this.itemsdb=SpahQL.db(this.items);
	}
	,render : function(sel){
		this.$jq=this.rendererImpl.renderitems(this);
		$(sel).append(this.$jq);
		this.onafterrender(this);
	}
	,onafterrender : function(it){
		for(var i=0;i<this.items.length;i++) {
			this.onafterrenderfield(this.items[i]);
		}
	}
	,onafterrenderfield : function(fld){
		var ci=forms.controls.ControlManagerInstance.idx[fld.type];
		if(!ci)return ;
		ci.onafterrenderfield(fld);
		if(!fld.items)return ;
		for(var i=0;i<fld.items.length;i++) {
			this.onafterrenderfield(fld.items[i]);
		}
	}
	,initDb : function(json){
		if(!this.db) {
			if(!json) json={};
			this.db=SpahQL.db(json);
		}
	}
	,scatter : function(json){
		this.initDb(json);
		for(var i=0;i<this.items.length;i++) {
			this.scatterField(this.items[i]);
		}
	}
	,gather : function(){
		this.initDb();
		for(var i=0;i<this.items.length;i++) {
			this.gatherField(this.items[i]);
		}
	}
	,gatherField : function(fld){
		var ci=forms.controls.ControlManagerInstance.idx[fld.type];
		if(!ci)return ;
		ci.gather(fld);
		if(!fld.items) {
			return ;
		}
		for(var i=0;i<fld.items.length;i++) {
			this.gatherField(fld.items[i]);
		}
	}
	,scatterField : function(fld){
		var ci=forms.controls.ControlManagerInstance.idx[fld.type];
		if(!ci)return ;
		ci.scatter(fld);
		if(!fld.items) {
			return ;
		}
		for(var i=0;i<fld.items.length;i++) {
			this.scatterField(fld.items[i]);
		}
	}
});