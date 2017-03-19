//定义浮出层模块
define([ "jquery" ],function($){
   var Task=function(){
     this.cfg={
        width:500,
        height:300,
        content:"",
        handler:null,
        title:"标题",
        hasCloseBtn:false,
        mask:true,
        //设置皮肤
        skinClassName:null,
        mask:null,
        textBtn:"OK",
        textCal:"CAL",
        el:"",
        textTrue:false,
        newBtn:true
     }
   }
   Task.prototype={
     confirm:function(cfg){
         var CFG=$.extend(this.cfg,cfg);
         if(CFG.mask){
            var taskMask=$("<div class='task_mask'></div>)");
            taskMask.appendTo("body");
         }
         if(CFG.textTrue){
            var boundingBox=$("<div class='task_float'>"+
                   "<div class='task_header'>"+CFG.title+"</div>"
                   +"<div class='task_body'>"+CFG.content+"</div>"
                   +"<div id='qlist'>"
                   +"<span>问题<input type='text' id='question'/></span>"
                   +"<span>答案一<input type='text' id='answer1' /></span>"
                   +"<span>答案二<input type='text' id='answer2' /></span>"
                   +"<span>答案三<input type='text' id='answer3'/></span>"
                   +"</div>"
                   +"<div class='task_footer'>"
                   + "<input type='button' id='inp1' value='"+CFG.textBtn+"'/>"
                   +"<input type='button' id='inp2' value='"+CFG.textCal+"'/></div>"+
             "</div>");
         }else{
          var boundingBox=$("<div class='task_float'>"+
                 "<div class='task_header'>"+CFG.title+"</div>"
                 +"<div class='task_body'>"+CFG.content+"</div>"
                 +"<div class='task_footer'>"
                 + "<input type='button'  id='inp1' value='"+CFG.textBtn+"'/>"
                 +"<input type='button' id='inp2' value='"+CFG.textCal+"'/></div>"+
           "</div>");
         }
         boundingBox.appendTo("body");
         $("div[class='task_mask']").click(function(){
              boundingBox.remove();
              this.remove();
              $(CFG.el).css("backgroundColor"," #fff");
         })
         $("#inp2").click(function(){
               boundingBox.remove();
               taskMask.remove();
               $(CFG.el).css("backgroundColor"," #fff");
         });
         $("#inp1").click(function(){
              CFG.handler&&CFG.handler();
              boundingBox.remove();
              taskMask.remove();
         });
         if(CFG.newBtn){
           boundingBox.css({
             width:CFG.width+"px",
             height:CFG.height+"px",
             marginLeft:-(CFG.width)/2+"px",
             marginTop:-(CFG.height)/2+"px",
             position:"absolute",
             bottom:"210px",
             left:"50%",
             border:" 1px solid #eee",
             "box-shadow":"1px 1px 2px",
             "border-radius": "5px",
             background: "#fff"
           }).parent().css("position","relative");
         }else{
            boundingBox.css({
              width:CFG.width+"px",
              height:CFG.height+"px",
              marginLeft:-(CFG.width)/2+"px",
              marginTop:-(CFG.height)/2+"px",
              position:"absolute",
              bottom:"40%",
              left:"50%",
              border:" 1px solid #eee",
              "box-shadow":"1px 1px 2px",
              "border-radius": "5px",
              background: "#fff"
            });
           }
         if(CFG.hasCloseBtn){
            var clsoseBtn=$("<span class='task_closeBtn'>x</span>");
            boundingBox.append(clsoseBtn);
            clsoseBtn.click(function(){
            boundingBox.remove();
            taskMask.remove();
            $(CFG.el).css("backgroundColor"," #fff");
            })
         }
         if(CFG.skinClassName){
            boundingBox.addClass(CFG.skinClassName);
         }
     },

   }
   return{
          Task:Task
    };
});