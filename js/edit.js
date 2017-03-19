//编辑模块
define(["jquery","task"],function($,t){
     var Edit=function(){
      this.questionArr=[];
      this.storageArr=[];
      this.addQ();
      this.render();
      var self=this;  
      //生成单向选择
      $("#single").click(function(){
         new t.Task().confirm({
           content:"请输入问题及选项",
           handler:function(){
                  var q=$("#question").val(),
                      a1=$("#answer1").val(),
                      a2=$("#answer2").val(),
                      a3=$("#answer3").val();
                  self.produceRadio(q,a1,a2,a3);
                  $(this).parent().parent().remove();
           },
           width:366,
           height:220,
           title:"提示",
           hasCloseBtn:true,
           skinClassName:null,
           mask:true,
           textBtn:"确认",
           textCal:"取消",
           el:self,
           textTrue:true,
           newBtn:true
         });
      });
      //生成多项选择
      $("#mult").click(function(){
         new t.Task().confirm({
           content:"请输入问题及选项",
           handler:function(){
                  var q=$("#question").val(),
                     a1=$("#answer1").val(),
                     a2=$("#answer2").val(),
                     a3=$("#answer3").val();
                  self.produceMany(q,a1,a2,a3);
                  $(this).parent().parent().remove();
           },
           width:366,
           height:220,
           title:"提示",
           hasCloseBtn:true,
           skinClassName:null,
           mask:true,
           textBtn:"确认",
           textCal:"取消",
           el:self,
           textTrue:true,
           newBtn:true
         });
      });
      $("#text").click(function(){
         new t.Task().confirm({
           content:"请输入文本问题（只输入问题项）",
           handler:function(){
                 var q=$("#question").val();
                 self.produceText(q); 
                 $(this).parent().parent().remove();
           },
           width:366,
           height:220,
           title:"提示",
           hasCloseBtn:true,
           skinClassName:null,
           mask:true,
           textBtn:"确认",
           textCal:"取消",
           el:self,
           textTrue:true,
           newBtn:true
         });
      });
      $("#edit_body_list").click(function(e){
         e=e||event;
         var target=e.target||e.srcElement;
             switch(target.id){
              case "down":
                self.downFun(target);
                break;
              case "up":
                self.upFun(target);
                break;
              case "reuse":
                self.reuseFun(target);
                break;
              case "del":
                self.delFun(target);
                break;
             }         
      });
      $("button:contains('保存')").click(function(){
            self.save(0);
      }); 
      $("button:contains('发布')").click(function(){
            self.save(1);
      });
     }
     Edit.prototype={
      addQ:function(){
         $("#edit_add").click(function(){
           $(this).prev().slideDown(800);   	
         });
      },
       //问题数组操作按钮添加
      queFun:function(){
        var self=this;
         $.each(self.questionArr,function(key,val){
             val.find("i").text(key+1);
            if(key==0){
               val.find(".hand").html("<div id='down'>下移</div><div id='reuse'>复用</div><div id='del'>删除</div>");
               $("#edit_body_list").append(val);
            }else if(key==self.questionArr.length-1){
               val.find(".hand").html("<div id='up'>上移</div><div id='reuse'>复用</div><div id='del'>删除</div>");
               $("#edit_body_list").append(val);
            }else{
             val.find(".hand").html("<div id='up'>上移</div><div id='down'>下移</div><div id='reuse'>复用</div>"
              +"<div id='del'>删除</div>"); 
              $("#edit_body_list").append(val);           
           }       
         }); 
       },
       //下移函数
      downFun:function(el){
        var x=-20; 
           $node=$(el).parent().parent();
      	if($node.next(":first").length==0){
      		return;
      	}else{    
          for(var i=0;i<this.questionArr.length;i++){
              if(this.questionArr[i][0]==$node[0]){
                 x=i;
             }    
           }
           this.changeArr(this.questionArr,x,x+1);
           this.changeArr(this.storageArr,x,x+1);
           this.queFun();
         }
       },
       //上移函数
       upFun:function(el){
          var x=-20,
              $node=$(el).parent().parent();
          for(var i=0;i<this.questionArr.length;i++){
              if(this.questionArr[i][0]==$node[0]){
                 x=i;
             }    
           }
           this.changeArr(this.questionArr,x,x-1);
           this.changeArr(this.storageArr,x,x-1);
           this.queFun();      
       },
       //复用
       reuseFun:function(el){
        if(this.questionArr.length>=10){
            alert("已经超出10个问题啦！");
            return; 
         }
          var x=-20,
              $node=$(el).parent().parent(),
              nodeEl=$node.clone(true);
          for(var i=0;i<this.questionArr.length;i++){
              if(this.questionArr[i][0]==$node[0]){
                 x=i;
             }    
           }
          this.questionArr.splice(x+1,0,nodeEl); 
          this.storageArr.splice(x+1,0,nodeEl); 
          this.queFun();
       },
       //删除
       delFun:function(el){
         var x=-20,
             $node=$(el).parent().parent();
             $node.remove();
         for(var i=0;i<this.questionArr.length;i++){
             if(this.questionArr[i][0]==$node[0]){
                x=i;
            }    
          }
         this.questionArr.splice(x,1);
         this.storageArr.splice(x,1);
         this.queFun();
       },
       //数组顺序交换函数
      changeArr:function(arr,a,b){
        var el=arr[a];
        arr[a]=arr[b];
        arr[b]=el;
        return arr;
      },
      //生成单选
     produceRadio:function(q,a1,a2,a3){
      var cb={type:"r",quest:q,q1:a1,q2:a2,q3:a3};
      this.storageArr.push(cb);
     if(this.questionArr.length>=10){
            alert("已经超出10个问题啦！");
            return; 
         }
      var $que=$("<div class='que'>"
        +"<div class='queTitle'>Q"+"<i></i>"+"&nbsp&nbsp(单选题)&nbsp&nbsp"+q+"</i></div>"
        +"<div class='queOption'><div>"
            +"<input type='radio' name='one'>"+a1+"</div>"
            +"<div><input type='radio' name='one'>"+a2+"</div>"
            +"<div><input type='radio' name='one'>"+a3+"</div>"
        +"</div>"
        +"<div class='hand'></div>"
        +"</div>");                           
        this.questionArr.push($que);  
        this.queFun();       
       },
       //生产多选
      produceMany:function(q,a1,a2,a3){
        var cb={type:"c",quest:q,q1:a1,q2:a2,q3:a3};
        this.storageArr.push(cb);
        if(this.questionArr.length>=10){
            alert("已经超出10个问题啦！");
            return; 
         }
        var $que=$("<div class='que'>"
          +"<div class='queTitle'>Q"+"<i></i>"+"&nbsp&nbsp(多选题)&nbsp&nbsp"+q+"</i></div>"
          +"<div class='queOption'><div>"
              +"<input type='checkbox' name='one'>"+a1+"</div>"
              +"<div><input type='checkbox' name='one'>"+a2+"</div>"
              +"<div><input type='checkbox' name='one'>"+a3+"</div>"
          +"</div>"
          +"<div class='hand'>1</div>"
          +"</div>");   
         this.questionArr.push($que);
         this.queFun();   
       },
       //产生文本题
      produceText:function(q){
       var cb={type:"t",quest:q};
       this.storageArr.push(cb);
       if(this.questionArr.length>=10){
            alert("已经超出10个问题啦！");
            return; 
         }
        var $que=$("<div class='que'>"
          +"<div class='queTitle'>Q"+"<i></i>"+"&nbsp&nbsp(文本题)&nbsp&nbsp"+q+"</i></div>"
          +"<div class='must'><input type='checkbox'>此题是否必填</div>"
          +"<div class='queOption'><div>"
              +"<textarea rows='3' cols='20' id='textarea'></textarea></div>"
          +"</div>"
          +"<div class='hand'></div>"
          +"</div>");   
         this.questionArr.push($que);
         this.queFun();   
      },
      //存储函数
      save:function(sta){
           if(this.storageArr.length==0){
              alert("问卷无问题！");
              return;
           }
           if($("#edit_footer_left :input").val()!==""){
              var date=$("#edit_footer_left :input").val();
           }else{
              alert("时间未选择！");
              return;
           }
           var title=$("[value='这里是标题']").val(),
               date=$("#edit_footer_left :input").val(),         
               storage=window.localStorage;
               json={"tit":title,"day":date,"statue":sta,"arr":this.storageArr};
               json=JSON.stringify(json);
          var key=storage.length+1;
           if(storage){
               localStorage.setItem(key,json);
           }
        },
        render:function(){
          var storageS=window.sessionStorage,
              storage=window.localStorage;
              var i=parseInt(storageS.msg)+1;
          if(!storageS.msg){
            return false;
          }else{
            var getLocalData=JSON.parse(localStorage.getItem(i)); 
            $("#edit_title input").val(getLocalData.tit);
            for(var i=0;i<getLocalData.arr.length;i++){
              if(getLocalData.arr[i].type=="r"){
                this.produceRadio(getLocalData.arr[i].quest,getLocalData.arr[i].q1,getLocalData.arr[i].q2,getLocalData.arr[i].q3);
              }else if(getLocalData.arr[i].type=="c"){
                this.produceMany(getLocalData.arr[i].quest,getLocalData.arr[i].q1,getLocalData.arr[i].q2,getLocalData.arr[i].q3);
              }else{
                this.produceText(getLocalData.arr[i].quest);
              }
            };
            storageS.removeItem("msg");
          };
        }
     }
     return {
     	Edit:Edit
     }
})