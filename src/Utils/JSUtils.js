/**************************
 *JS 常用工具类Chenhy
 **************************/
/**
 *公共工具类  
 */
var PublicUtil ={
    /**
     *判断变量是否为非空 
     */
    isNotEmpty:  function(val){
        return !this.isEmpty(val);
    },
    /**
     *判断变量是否为空 
     */
    isEmpty: function(val){
        if ((val==null || typeof(val)=="undefined")|| (typeof(val)=="string"&&val==""&&val!="undefined")){
           return true;
        }else{
            return false;
        }
    },
    isDebug: function(){
        if(this.isNotEmpty(configDebug)&&configDebug=="true"){
            return true;
        }else{
            return false;
        }
    },
    /**
     * 去除元素内所有内容 strIds："#id1,#id2,#id3"
     */
    emptyHtml: function(strIds){
        try{
            var ids = strIds.trim(",").split(",");
            $(ids).each(function(){
                var obj = $(this.toString());
                if(obj.length>0){
                    $(obj).each(function(){
                        $(this).html("");
                    });
                }else{
                    obj.html("");
                }
            });
        }catch(ex){
            if(PublicUtil.isDebug()){
                throw new Error("js方法：【PublicUtil.emptyHtml(strIds)】，error！");
            }
        }
    },
    /**
     *去除元素的值 strIds："#id1,#id2,#id3" 
     */
    emptyValue: function(strIds){
        try{
            var ids = strIds.trim(",").split(",");
            $(ids).each(function(){
                var obj = $(this.toString());
                if(obj.length>0){
                    $(obj).each(function(){
                        $(this).val("");
                    });
                }else{
                    obj.val("");
                }
            });
        }catch(ex){
            if(PublicUtil.isDebug()){
                throw new Error("js方法：【PublicUtil.emptyValue(strIds)】，error！");
            }
        }
    },
    /**
     *去除Textarea内所有内容 strIds："#id1,#id2,#id3" 
     * 对输入框里内容清空，对textarea，可以直接$("textarea").empty();
     * 如果使用$("textarea").html("");也可能会造成浏览器内存溢出
     */
    emptyTextarea: function(strIds){
        try{
            var ids = strIds.trim(",").split(",");
            $(ids).each(function(){
                var obj = $(this.toString());
                if(obj.length>0){
                    $(obj).each(function(){
                        $(this).empty();
                        $(this).val("");
                    });
                }else{
                    obj.empty();
                    obj.val("");
                }
            });
        }catch(ex){
            if(PublicUtil.isDebug()){
                throw new Error("js方法：【PublicUtil.emptyTextarea(strIds)】，error！");
            }
        }
    }
};        

/**
 * 日期  - 格式化时间
 * @param {Object} format 传入要格式化的日期类型
 */
Date.prototype.dateFormat = function (format){
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    };
    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
};
/**
 *日期工具类 
 *注：调用方式，deteUtil.方法名    
 */
var dateUtil = {
    /*
     * 方法作用：【取传入日期是星期几】
     * 使用方法：dateUtil.nowFewWeeks(new Date());
     * @param date{date} 传入日期类型
     * @returns {星期四，...}
     */
    nowFewWeeks:function(date){
        if(date instanceof Date){
            var dayNames = new Array("星期天","星期一","星期二","星期三","星期四","星期五","星期六");
            return dayNames[date.getDay()];
        } else{
            return "Param error,date type!";
        }
    },
    /*
     * 方法作用：【字符串转换成日期】
     * 使用方法：dateUtil.strTurnDate("2010-01-01");
     * @param str {String}字符串格式的日期，传入格式：yyyy-mm-dd(2015-01-31)
     * @return {Date}由字符串转换成的日期
     */
    strTurnDate:function(str){
        var   re   =   /^(\d{4})\S(\d{1,2})\S(\d{1,2})$/;
        var   dt;
        if   (re.test(str)){
            dt   =   new   Date(RegExp.$1,RegExp.$2   -   1,RegExp.$3);
        }
        return dt;
    },
    /*
     * 方法作用：【计算2个日期之间的天数】
     * 传入格式：yyyy-mm-dd(2015-01-31)
     * 使用方法：dateUtil.dayMinus(startDate,endDate);
     * @startDate {Date}起始日期
     * @endDate {Date}结束日期
     * @return endDate - startDate的天数差
     */
    dayMinus:function(startDate, endDate){
        if(startDate instanceof Date && endDate instanceof Date){
            var days = Math.floor((endDate-startDate)/(1000 * 60 * 60 * 24));
            return days;
        }else{
            return "Param error,date type!";
        }
    }
};

/**
 * 加载工具类
 * 注：调用方式，loadUtil.方法名
 */
var loadUtil = {
    /*
     * 方法说明：【动态加载js文件css文件】
     * 使用方法：loadUtil.loadjscssfile("http://libs.baidu.com/jquery/1.9.1/jquery.js","js")
     * @param fileurl 文件路径，
     * @param filetype 文件类型，支持传入类型，js、css
     */
    loadjscssfile:function(fileurl,filetype){
        if(filetype == "js"){
            var fileref = document.createElement('script');
            fileref.setAttribute("type","text/javascript");
            fileref.setAttribute("src",fileurl);
        }else if(filetype == "css"){

            var fileref = document.createElement('link');
            fileref.setAttribute("rel","stylesheet");
            fileref.setAttribute("type","text/css");
            fileref.setAttribute("href",fileurl);
        }
        if(typeof fileref != "undefined"){
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }else{
            alert("loadjscssfile method error!");
        }
    }
};

/**
 * 字符串操作工具类 
 * 注：调用方式，strUtil.方法名
 */
var strUtil = {
    /*
     * 判断字符串是否为空
     * @param str 传入的字符串
     * @returns {}
     */
    isEmpty:function(str){
        if(str != null && str.length > 0){
            return true;
        }else{
            return false;
        }
    },
    /*
     * 判断两个字符串子否相同
     * @param str1
     * @param str2
     * @returns {Boolean}
     */
    isEquals:function(str1,str2){
        if(str1==str2){
            return true;
        }else{
            return false;
        }
    },
    /*
     * 忽略大小写判断字符串是否相同
     * @param str1
     * @param str2
     * @returns {Boolean}
     */
    isEqualsIgnorecase:function(str1,str2){
        if(str1.toUpperCase() == str2.toUpperCase()){
            return true;
        }else{
            return false;
        }
    },
    /**
     * 判断是否是数字
     * @param value
     * @returns {Boolean}
     */
    isNum:function (value){
        if( value != null && value.length>0 && isNaN(value) == false){
            return true;
        }else{
            return false;
        }
    },
    /**
     * 判断是否是中文
     * @param str
     * @returns {Boolean}
     */
    isChine:function(str){
        var reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
        if(reg.test(str)){
            return false;
        }
        return true;
    },
    /**
     * trim去掉字符串两边的指定字符,默去空格
     * @param {Object} tag
     */
    trim:function(tag) {
        if (!tag) { 
            tag = '\\s';
        }else { 
            if (tag == '\\') { 
            tag = '\\\\'; 
        } else if (tag == ',' || tag == '|' || tag == ';') { 
                tag = '\\' + tag; 
            }else { 
                tag = '\\s'; 
            } 
        }
        eval('var reg=/(^' + tag + '+)|(' + tag + '+$)/g;'); 
        return this.replace(reg, '');
    },
    /**
     *将一个字符串用给定的字符变成数组 
     * @param {Object} tag
     */
    toArray:function(tag) {
        if (this.indexOf(tag) != -1) {
            return this.split(tag);
        }else {
            if (this != '') {
                return [this.toString()];
            }else {
                return [];
            }
        }
    }
};








