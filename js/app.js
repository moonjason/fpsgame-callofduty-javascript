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
    hp: 10,
    ammo: 8,
    score: 0,
    enemies: 0, 
    shooting() {
        $('#screen').on('click', function (){
            game.ammo--;
            if (game.ammo === 0) {
                $('#screen').prepend('<div id="reload-text"/>');
                $('#reload-text').text("Press 'R' to Reload");
               
                $('body').css('pointer-events', 'none');
               
                $('body').on('keypress', function(e) {
                    if (e.which == 114) {
                        event.preventDefault();
                        game.ammo = 8;
                        $('body').css('pointer-events', '');
                        $('#reload-text').remove();
                    }
                });
            };
        });
        $('.spawn').on('click', function(e) { //shooting
            if ($(e.target).is('img')) {
                $(e.target).remove(); 
                game.enemies--;
            }
        });
    },
    lvl1() {
        $('#screen').attr('class', 'screen--start');
        this.shooting();
        this.setTime();
        // this.scoring();
    },
    setTime() {
        const timer = setInterval(function() {
            console.log(game.time);
            game.time--;
            
            if (game.enemies < 5) { 
                game.spawnBaddies(); 
            }

            if (game.time === 0) {
                clearInterval(timer);
                // call winLose();
            }
        }, 1000);
    },
    spawnBaddies() {
        let rand = Math.floor(Math.random() * 5); //0 -1 
        let t = null; 

        if ($('#spawn-' + rand).is(':empty')) {
                $('#spawn-' + rand).prepend('<img class="enemylvl1 selectDisable" src="images/enemylvl1.png">'); 
                game.enemies++; 
                $('img').each(function(){
                    $('img').on('click', function() {
                        game.score += 100; 
                        clearTimeout(t);
                    })
                    
                    if (t !== null) {clearTimeout(t)};
                        
                    t = setTimeout(function() {
                            // villian shooting
                            game.hp--; 
                            game.score -= 50;
                            console.log(game.hp + '<--- hp');
                    }, 3700);
                })
        }
    },
    winLose(){

    }
}

 
buttonHandler();
