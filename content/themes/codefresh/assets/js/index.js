/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($) {
    $(document).on('ready', function(){
        $('footer .js-form-signup').on('submit', signUp);
    });

    function signUp(e) {
        var $name = $('footer .js-form-signup [name="FULLNAME"]');
        var $email = $('footer .js-form-signup [name="EMAIL"]');

        e.preventDefault();

        $.post('/ghost/api/v0.1/signup', {
                name: $name.val(),
                email: $email.val()
            })
            .done(function(){
                $('footer .js-form-signup').fadeOut(function(){
                    $('footer .alert').fadeIn(function(){
                        setTimeout(function(){
                            $('footer .alert').fadeOut(function(){
                                $name.val('');
                                $email.val('');
                                $('footer .js-form-signup').fadeIn();
                            });
                        }, 5000);
                    });
                });
            })
            .fail(function(xhr, msg, data){
                alert('Server Error: ' + data);
            });
        return false;
    }
})(jQuery);
