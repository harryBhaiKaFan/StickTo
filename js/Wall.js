import { Lizard } from "./Lizard.js";

let SCREEN;

function randInt(min,max)
{
    return(Math.floor(Math.random()*(max-min)) + min);
}

function isInRect(lzr,or)
{
    if ((lzr.x >= or.x && lzr.x <= or.x+or.w) || (lzr.x+lzr.w >= or.x && lzr.x+lzr.w <= or.x+or.w))
    return true;

    return false;
}

function Obstacle(img,WH,pos,x)
{
    let imgElem = new Image();
    imgElem.src = img;
    let y = 0;

    if (pos === 0) // top
    {
        y = SCREEN.height/3;
    }else if (pos === 1) // down
    {
        y = SCREEN.height - (WH + SCREEN.height/3);
    }
    
    return {
        imgElem,
        WH,
        pos,
        y,
        x,
        getRect:function(){return {x:this.x,y:this.y,w:this.WH,h:this.WH}}
    };
}

const ObsMng = {
    obs_img: "../img/bg.png",
    obsWH:0,
    obsCnt:5,
    obs:[],
    bcObs: 4,
    init: function(screen){
        SCREEN = screen;
        this.obsWH = screen.width/30;

        for(let i=0; i<this.obsCnt; i++)
        {
            this.obs.push(new Obstacle(this.obs_img,this.obsWH,randInt(0,2),screen.width+randInt(100*(i+1),200*(i+1))+Lizard.w*(2*i)));
        }
    },
    render: function(ctx,mv){
        this.obs.forEach((val,i) => {
            ctx.drawImage(val.imgElem,val.x,val.y,val.WH,val.WH);
            val.x -= mv;
            if(val.x+val.WH < 0){
                this.obs[i] = new Obstacle(this.obs_img,this.obsWH,randInt(0,2),this.obs[this.bcObs].x+randInt(100*(this.bcObs+1),200*(this.bcObs+1))+Lizard.w*(i));
                this.bcObs = i;
            }
        });
    }
};

export const Wall = {
    SCREEN: null,
    IMG_SRC: "../img/wall.png",
    imgElem: null,
    count: 0,
    width: 0,
    height: 0,
    loaded: false,
    W_H: 512,
    mv: 0,
    speed: 5,
    init: function(screen){
        ObsMng.init(screen);
        this.SCREEN = screen;
        this.width = this.W_H;
        this.height = screen.height/3;
        this.count = Math.ceil(screen.width/this.width) + 1;


        this.imgElem = new Image();
        this.imgElem.src = this.IMG_SRC;

    },
    isCrashedWithLizard: function(){
        let lzr = Lizard.getRect();
        let is = false;
         
        ObsMng.obs.forEach(val =>{
            let or = val.getRect();
            if ((val.pos === 0 && Lizard.currPos === "top") || (val.pos === 1 && Lizard.currPos === "down")){
                if (isInRect(lzr,or)){
                    is = true;
                }
            }
        });

        return is;
    },
    render: function(ctx,delta){
        for (let i = 0; i<this.count; i++){
            ctx.drawImage(this.imgElem,this.width*i - this.mv,0,this.width,this.height);
            ctx.drawImage(this.imgElem,this.width*i - this.mv,this.SCREEN.height-this.height,this.width,this.height);
        }
        ObsMng.render(ctx,this.speed * delta/100);
        this.mv += this.speed * delta/100;
        this.speed += delta/300;
        if (this.mv >= this.width) this.mv = 0;
        
    }
};