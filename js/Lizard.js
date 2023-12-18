export const Lizard = {
    SCREEN: null,
    IMG: {
        lz_bt_fl: "../img/lizard_bottom_flat.png",
        lz_bt_st: "../img/lizard_bottom_stand.png",
        lz_tp_fl: "../img/lizard_top_flat.png",
        lz_tp_st: "../img/lizard_top_stand.png"
    },
    imgElem: null,
    W_H:1,
    x:0,
    y:0,
    w:0,
    h:0,
    currPos: "",
    set currImg(val){
        this.imgElem.src = val;
    },
    init: function(screen){
        this.SCREEN = screen;
        this.w = screen.width/6 + 10;
        this.h = screen.width/6 + 10;
        this.x = screen.width/3 - this.w/2;
        this.y = screen.height/3;

        this.imgElem = new Image();
        this.currImg = this.IMG.lz_tp_fl;
        this.currPos = "top";

        this.initEvents(screen);
    },
    initEvents: function(screen){
        let sy = 0;
        screen.onpointerover = (e) =>{
            sy = e.y;
        }

        screen.onpointermove = (e) =>{
            if (e.y > sy && this.currPos === "top")
            this.moveDown();
            else if(e.y < sy && this.currPos === "down")
            this.moveUp();

            sy = e.y;
        }
    },
    moveDown: function(){
        this.currImg = this.IMG.lz_tp_st;
        this.currPos = "down";

        setTimeout(() => {
            this.y = this.SCREEN.height - (this.h + this.SCREEN.height/3);
            this.currImg = this.IMG.lz_bt_st;
            setTimeout(()=>this.currImg = this.IMG.lz_bt_fl,100);
        }, 100);
    },
    moveUp: function(){
        this.currImg = this.IMG.lz_bt_st;
        this.currPos = "top";
        
        setTimeout(() => {
            this.y = this.SCREEN.height/3;
            this.currImg = this.IMG.lz_tp_st;
            setTimeout(()=>this.currImg = this.IMG.lz_tp_fl,100);
        }, 100);
    },
    getRect: function(){
        return {
            x:this.x,
            y:this.y,
            w:this.w,
            h:this.h
        };
    },
    render: function(ctx){
        ctx.drawImage(this.imgElem,this.x,this.y,this.w,this.h);
    }
};