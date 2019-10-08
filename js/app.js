const buttonHandler = function () {
    $('#start-btn').on('click', () => {
        $('#start-btn').remove();
        $('#gun').append('<img id="ak" class="selectDisable" src="images/ak.png"/>'); //show ak 
        init();
    });
}

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
    updateUI() {
        $('.player-info').text(`Health: ${game.hp} Ammo: ${game.ammo}`);
    },
    shooting() {
        $('#screen').on('click', function (){
            game.ammo--;
            game.updateUI();
            if (game.ammo === 0) {
                $('#screen').prepend('<div id="reload-text"/>');
                $('#reload-text').text("Press 'R' to Reload");
               
                $('body').css('pointer-events', 'none');
               
                $('body').on('keypress', function(e) {
                    if (e.which == 114) {
                        event.preventDefault();
                        game.ammo = 8;
                        game.updateUI();
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
                game.score += 100; 
                $('.score').text(`Score: ${game.score}`);
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

        if ($('#spawn-' + rand).children().length === 0) { 
            if (rand === 3 || rand === 4) {
                $('#spawn-' + rand).prepend('<img class="enemy-w" selectDisable" src="images/enemylvl1-w.png">');
            } else {
                $('#spawn-' + rand).prepend('<img class="enemy" selectDisable" src="images/enemylvl1.png">'); 
            };
            
            $('img').each(function(){

                $('img').on('click', function() {
                    clearTimeout(t);
                })
                
                if (t !== null) {clearTimeout(t)};
                    
                t = setTimeout(function() {
                    if (rand == 3 || rand == 4) {
                        $('#spawn-' + rand).children().attr('src', 'images/enemylvl1-shoot-w.png');
                    } else {
                        $('#spawn-' + rand).children().attr('src', 'images/enemylvl1-shoot.png');
                    }
                    game.hit();
                    $('.score').text(`Score: ${game.score}`);
                    console.log(game.hp + '<--- hp');
                }, 2400);
            });
        } else {
            return null;
        }
    },
    hit(){
        $('#overlay').css('display', 'block');
        game.hp--; 
        game.score -= 50;
        game.updateUI();
        setTimeout(function() {
            $('#overlay').fadeOut();
        }, 150)
    },
    winLose(){
        //
    }
}

 
buttonHandler();
