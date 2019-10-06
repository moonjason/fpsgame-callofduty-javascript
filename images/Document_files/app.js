const buttonHandler = function () {
    $('#start-btn').on('click', () => {
        $('#start-btn').remove();
        $('#gun').append('<img id="ak" class="selectDisable" src="images/ak.png"/>'); //show ak 
        init();
    });
}

// Function for shooting game logic 

const init = function () { // Run game screen 
    game.lvl1(); 

}

const game = { 
    time: 20,
    level: 1, 
    hp: 5, 
    ammo: 8,
    enemies: [], 
    shooting() {
        $('#screen').on('click', function (){
            game.ammo--;
            if (game.ammo === 0) {
                $('body').css('pointer-events', 'none');
            }
        });
        $('.spawn').on('click', function(e) { //shooting
            if ($(e.target).is('img')) {
                $(e.target).remove(); 
            }
        });
    },
    lvl1() {
        $('#screen').attr('class', 'screen--start');
        this.shooting();
        this.spawnBaddies();
     },
    setTime() {
        const timer = setInterval(function() {
            console.log(game.time);
            game.time--;
            if (game.time === 0) {
                clearInterval(timer);
                // call winLose();
            }
        }, 1000);
    },
    spawnBaddies(){
        const rand = Math.floor(Math.random() * 2); //0 -1 
       
        
    },
    winLose(){

    }
};

 
buttonHandler();
