const startingMinutes = 2 ;
let time = startingMinutes * 60 ;
const ParentEl = document.querySelector('.count-box');
const countDownEl = document.getElementById('countDown');

function UpdateTimeDown(startingMinutes) {
    interval = setInterval(function() {
        var minutes = Math.floor(time / 60);
        var second = time % 60;

        countDownEl.innerHTML = minutes + ":" + second; 

        if(second >=0 ){
            ParentEl.classList.add('sucess');
            time-- ; 
        }else{
            clearInterval(interval);
            countDownEl.innerHTML = `00 : 0`;
            ParentEl.classList.remove('sucess').add('blue');
        }
    } , 1000)
}

UpdateTimeDown(startingMinutes)



