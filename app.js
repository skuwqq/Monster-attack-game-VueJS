new Vue({
    el : "#app",
    data : {
        player_heal : 100,
        monster_heal : 100,
        game_is_on : false,
        logs : []
    },
    methods : {
        start_game : function(){
            this.game_is_on = true;
        },
        attack : function(){
            var point = Math.ceil(Math.random() * 10);
            this.monster_heal -= point;
            this.add_to_log({ turn : "p", text : "PLAYER DAMAGE (" + point + ")"})
            this.monster_attack();
        },
        special_attack : function(){
            var point = Math.ceil(Math.random() * 25);
            this.monster_heal -= point;
            this.add_to_log({ turn : "p", text : "SPECİAL DAMAGE (" + point + ")"})
            this.monster_attack();
        },
        heal_up : function(){
            var point = Math.ceil(Math.random() * 20);
            this.player_heal+=point;
            this.add_to_log({ turn : "p", text : "MASSİVE HEALTH!! (" + point + ")"})
            this.monster_attack();
        },
        give_up : function(){
            this.player_heal = 0;
            this.add_to_log({ turn : "p", text : "OYUNCU PES ETTİ!!"})
        },
        monster_attack : function(){
            var point = Math.ceil(Math.random() * 15);
            this.player_heal-=point;
            this.add_to_log({ turn : "m", text : "MONSTER DAMAGE (" + point + ")"})
        },
        add_to_log : function(log){
            this.logs.push(log);
        }
    },
    watch : {
            player_heal : function(value){
                if(value <= 0){
                    this.player_heal = 0;
                    if(confirm("Oyunu KAYBETTİN. Tekrar Denemek İster misin?")){
                        this.player_heal = 100;
                        this.monster_heal = 100;
                        this.logs = [];
                    }
                } else if(value >= 100) {
                    this.player_heal = 100;
                }
            },
            monster_heal : function(value){
                if(value <= 0){
                    this.monster_heal = 0;
                    if(confirm("Oyunu KAZANDIN. Tekrar Denemek İster misin?")){
                        this.player_heal = 100;
                        this.monster_heal = 100;
                        this.logs = [];
                    }
                }
            }
        }
})