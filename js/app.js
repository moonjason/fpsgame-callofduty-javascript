const buttonHandler = function () {
    $('#start-btn').on('click', () => {
        $('#start-btn').remove();
        init();
    });
}

const init = function () {
    $('#gun').append('<img id="ak" class="selectDisable" src="images/ak.png"/>');
    $('#screen').attr('class', 'screen--start');
    // Run game screen
}
 

buttonHandler();    