/*
FlareLED for Tessel
Created by Wesley Long on 9/30/2014.
*/
var tessel      = require('tessel');
var pattern     = [] ;
var current     = 0 ;
var previous    = 0 ;
var state       = 0 ;
var pause       = false ;
var patterns    = ['busy','violation','warning','error','receive','send'];
var selected    = 0 ;
var rt;

var led={
    red:tessel.led[2].output(0),
    green:tessel.led[0].output(0),
    blue:tessel.led[1].output(0),
    amber:tessel.led[3].output(0)
}

var status={
    busy:function(){
        if(pattern.length == 0){
            pattern = ['red', 'amber', 'green', 'blue'];
        }
        if(current != previous){
            led[pattern[previous]].toggle();
        }

        if(state==0) {
            current+=1;
            if(current>(pattern.length-1)){
                current=(pattern.length-1);
                state=1;
            }
        }else{
            current-=1;
            if(current<=0){
                current=0;
                state=0;
            }
        }
        led[pattern[current]].toggle();
        previous=current;
    },
    error:function(){
        led.red.toggle();
    },
    warning:function(){
        led.amber.toggle();
    },
    violation:function(){
        if(pattern.length==0){
            pattern=['red','blue'];
        }
        if(current!=previous){
            led[pattern[previous]].toggle();
        }
        current=current>=(pattern.length-1)?0:current+1;
        led[pattern[current]].toggle();
        previous=current;
    },
    receive:function(){
        led.green.toggle();
    },
    send:function(){
        led.blue.toggle();
    },
    clear:function(){
        clearInterval(rt);
        pattern=[];
        led={
            red:tessel.led[2].output(0),
            green:tessel.led[0].output(0),
            blue:tessel.led[1].output(0),
            amber:tessel.led[3].output(0)
        }
        current=0;
        previous=0;
    },
    select:function(){
        selected=selected>=(patterns.length-1)?0:selected+1;
        console.log('LED Status: ', selected);
        rt=setInterval(status.led,110);
        status.led();
    },
    led:function(){status[patterns[selected]]();}
};

tessel.button.on('press',function(time){
    status.clear();
    status.select();
});

rt=setInterval(status.led,110);
status.led();