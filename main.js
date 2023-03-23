leftwristx = 0;
rightwristx = 0;
leftwristy = 0;
rightwristy = 0;

scoreleftwrist = 0;
scorerightwrist = 0;

song1_status = "";
song2_status = "";

function preload()
{
    song1 = loadSound("harrypotter.mp3");
    song2 = loadSound("peterpan.mp3");
}

function setup()
{
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video,modelloaded);
    posenet.on("pose",gotposes);
}

function modelloaded()
{
    console.log("Model is loaded");
}

function gotposes(results)
{
    if(results.length>0)
    {
        rightwristx = results[0].pose.rightWrist.x;
        leftwristx = results[0].pose.leftWrist.x;
        rightwristy = results[0].pose.rightWrist.y
        leftwristy = results[0].pose.leftWrist.y;
        scorerightwrist = results[0].pose.keypoints[10].score;
        scoreleftwrist = results[0].pose.keypoints[9].score;

    }
}

function draw()
{
    image (video,0,0,400,400);
    fill("#ff0000");
    stroke("#ff0000");
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if(scorerightwrist > 0.2)
    {
        circle(rightwristx,rightwristy,20);
        song2.stop();

        if(song1_status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Playing: HARRY POTTER SONG"
        }
    }

    if(scoreleftwrist > 0.2)
    {
        circle(leftwristy,leftwristy,20);
        song1.stop();

        if(song2_status  == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Playing: PETER PAN SONG";
        }
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

