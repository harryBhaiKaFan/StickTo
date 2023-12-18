import { Lizard } from "./Lizard.js";
import { Wall } from "./Wall.js";

const Game = {
    SCREEN:null,
    CTX: null,
    lstRenTm: null,
    renDly: 17, // ms
    END: false,
    init : function(screen){
        this.SCREEN = screen;
        this.CTX = screen.getContext("2d");
        
        Lizard.init(screen);
        Wall.init(screen);
        
        requestAnimationFrame(this.render.bind(this));
    },

    render: function(crTm){
        if (this.END) return;
        requestAnimationFrame(this.render.bind(this));
        if (this.lstRenTm === null) this.lstRenTm = crTm;
        if (crTm - this.lstRenTm <= this.renDly) return;

        this.CTX.clearRect(0,0,this.SCREEN.width,this.SCREEN.height);

        Wall.render(this.CTX,crTm - this.lstRenTm);
        Lizard.render(this.CTX,crTm - this.lstRenTm);
        if(Wall.isCrashedWithLizard()){
            this.END = true;
        }
        this.lstRenTm = crTm;
    }
}

export default Game;