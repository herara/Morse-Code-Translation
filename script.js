//定義需要用到的資料
var morseCode = "A;.-|B;-...|C;-.-.|D;-..|E;.|F;..-.|G;--.|H;....|I;..|J;.---|K;-.-|L;.-..|M;--|N;-.|O;---|P;.--.|Q;--.-|R;.-.|S;...|T;-|U;..-|V;...-|W;.--|X;-..-|Y;-.--|Z;--..|/;-..-.|1;.----|2;..---|3;...--|4;....-|5;.....|6;-....|7;--...|8;---..|9;----.|0;-----"

//後處理資料變成陣列應用
var morseList= morseCode.split("|")
for (var i=0;i<morseList.length;i++){
  morseList[i]=morseList[i].split(";")
  
  //附加到右邊清單上面
  $("ul.translist").append("<li>"+morseList[i][0]+""+morseList[i][1]+"</li>")
}



// 文章翻譯----找到文字對應到的密碼
function findcode(letter){
   //全部找過一輪傳回對應密碼
  for (var i=0;i<morseList.length;i++){
    if (morseList[i][0]==letter){
      return morseList[i][1]
    }
  }
  //如果沒找到就回傳原始的字
  return letter
}


// 密碼翻譯----找到密碼對應到的文字
function findLetter(code){
   //全部找過一輪傳回對應密碼
  for (var i=0;i<morseList.length;i++){
    if (morseList[i][1]==code){
      return morseList[i][0]
    }
  }
  //如果沒找到就回傳原始的密碼
  return code
}



//翻譯整篇文字變成code
function translateToMorse(text){
  //轉大寫
  text=text.toUpperCase();
  var result = ""
  //找到對應密碼
  for(var i=0;i<text.length;i++){
   result+=findcode(text[i])+" "
  }
  return result;
}

//翻譯整篇code變成文字
function translateToEng(text){
  //轉大寫
  text=text.split(" ");
  var result = ""
  //找到文字
  for(var i=0;i<text.length;i++){
    console.log(text[i])
    result+=findLetter(text[i])
    console.log(findLetter(text[i]))
  }
  return result;
}


// var originalText = "hello/world"
// var translateResult = translateToMorse(originalText)
// var translateBack = translateToEng(translateResult)

// console.log("原文:"+originalText)
// console.log("翻譯密碼:"+translateResult)
// console.log("翻譯回來:"+translateBack)


//轉換成密碼
$("#btnMorse").click(function(){ 
  var input = $("#input").val() 
  // val()負責取得使用者輸入的參數
  var result = translateToMorse(input)
  $("#output").val(result)
  $("#output").css({backgroundColor: "#292B73"}).animate({backgroundColor: "transparent" },500)
  // 箭頭會旋轉
  $(".symbol").velocity({
    rotateZ: ["0deg","360deg"]
  })
  
})

//轉換成文字
$("#btnEng").click(function(){
  var output = $("#output").val()
  var result = translateToEng(output)
  $("#input").val(result)
  $("#input").css({backgroundColor: "#292B73"}).animate({backgroundColor: "transparent" },500)
})



//如果鍵盤輸入按下去 隨時轉大寫跟去除空白
$("#input").keyup(function(){
 var original = $("#input").val()
 var newtext =  original.toUpperCase().split(" ").join("")
 $("#input").val(newtext)
})


// 播放長短音

function play(texts,nowindex){
  var word = texts[nowindex]
  var lasttime = 300
  //抓到字母播放聲音
  if (word == "."){
    $("audio.short")[0].play()
    lasttime = 300
  }else if (word == "-"){
    $("audio.long")[0].play()
    lasttime = 500
  }else{
    lasttime = 1000
  }
 console.log(word,lasttime)
  
    //顯示當下播放的字母
  $(".playlist span").removeClass("playing")
  $(".playlist span")
    .eq(nowindex).addClass("playing")
  
  
  if (texts.length>nowindex){
    setTimeout(function(){
      play(texts,nowindex+1)
    },lasttime)
  }else{
    $(".playlist").html("")
  }
}
// play("..-.",0)



//設定音量
$("audio.short")[0].volume=0.3
$("audio.long")[0].volume=0.3


$("#btnPlay").click(function(){
  
  //處理輸出
  var texts =$("#output").val()
  $("#playlist").html("")
  
   //把文字變成span放進去（單獨上色）
  for(var i=0;i<texts.length;i++){
     $(".playlist").append("<span>"+texts[i]+"</span>")
  }
 
  
    
  
  play(texts,0)
})