prediction_1="";
prediction_2="";

Webcam.set({
width: 350,
height: 300,
image_format:'png',
png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach(camera);


function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src="+data_uri+">";
    });
}

console.log("ml5 version:",ml5.version);

var classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/vTsyMN8qt/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!!!");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is "+prediction_1;
    speak_data_2="And the other prediction is "+prediction_2;
    var utter_this=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utter_this);
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name_1").innerHTML=result[0].label;
        document.getElementById("result_emotion_name_2").innerHTML=result[1].label;
        prediction_1=result[0].label;
        prediction_2=result[1].label;
        speak();
        if(result[0].label=="Happy"){
           document.getElementById("update_emoji_1").innerHTML="&#128512;";
        }
        if(result[0].label=="Confused"){
            document.getElementById("update_emoji_1").innerHTML="&#128533;";
        }
        if(result[0].label=="Angry"){
            document.getElementById("update_emoji_1").innerHTML="&#128544;";
        }
        if(result[0].label=="Sad"){
            document.getElementById("update_emoji_1").innerHTML="&#128577;";
        }
        if(result[0].label=="Shocked"){
            document.getElementById("update_emoji_1").innerHTML="&#128561;";
        }
        if(result[1].label=="Happy"){
        document.getElementById("update_emoji_2").innerHTML="&#128512;";
        }
        if(result[1].label=="Confused"){
         document.getElementById("update_emoji_2").innerHTML="&#128533;";
        }
        if(result[1].label=="Angry"){
         document.getElementById("update_emoji_2").innerHTML="&#128544;";
        }
        if(result[1].label=="Sad"){
         document.getElementById("update_emoji_2").innerHTML="&#128577;";
        }
        if(result[1].label=="Shocked"){
         document.getElementById("update_emoji_2").innerHTML="&#128561;";
        }
    }
}