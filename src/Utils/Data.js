function formSubmit(){
    var obj = $("#item");
    validateForm(obj);
}

function validateForm(obj){
    //1、是否通过
    var flag = false;
    var levelType = obj.attr("level_type");
    //2、表单项验证
    var otherType = obj.attr("other_type");
    flag = validateItem(otherType,obj);
    //3、返回值
    if(!flag){
        return flag;
    }
    //4、下一层循环
    var nextItems = $("[level_type^="+levelType+"_"+"]");
    if(nextItems!=undefined && nextItems.length>0){
        nextItems.each(function(i,o){
            // 直属下一层
            if($(o).attr("level_type").length - obj.attr("level_type").length == 3){
                flag = validateForm($(o));
            }
            if(!flag){
                return flag;
            }
        });
    }
}

function validateItem(itemType,obj){
     switch (parseInt(itemType)){
        case 1:
            return dealTextValidate(obj);
            break;
        case 2:
            return dealSelectValidate(obj);
            break;
    } 
}

function dealTextValidate(n){
     if(n.attr("value")==null||n.attr("value").trim()==""){
           console.log("1--");
           alert(n.attr("tag_name")+" 不能为空");
           return false;
     }
     return true;
}

function dealSelectValidate(n){
    console.log(n.attr("value"));
     if(n.attr("value")==null||n.attr("value").trim()==""){
           console.log("2--");
           alert(n.attr("tag_name")+" 不能为空");
           return false;
     }
     return true;
}





