/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($) {
    $(document).on('ready', function(){

        // Handle our signup forms being submitted
        $('.hero .js-form-signup').on('submit', signUpFromHero);
        $('footer .js-form-signup').on('submit', signUpFromFooter);

        $('.js-show-signup').click(showSignUp);
    });

    function showSignUp(e) {
        var $form = $(this).parent().find('form');
        var $this = $(this);
        e.preventDefault();

        $this.fadeOut(function(){
            $form.fadeIn(function(){
                $form.find('input').first().focus();
            });
        });

        return false;
    }

    /**
     * Submit the signup form to the server
     *
     * @author Tim Golen <tim@golen.net>
     *
     * @date 2015-06-10
     *
     * @param {object} e jQuery submit form event
     * @param {function} cb called only on success
     *
     * @return {boolean}
     */
    function signUp(e, cb) {
        var $form = $(e.target);
        var $name = $form.find('[name="FULLNAME"]');
        var $email = $form.find('[name="EMAIL"]');

        $.post('/ghost/api/v0.1/signup', {
                name: $name.val(),
                email: $email.val()
            })
            .done(cb)
            .fail(function(xhr, msg, data){
                alert('Server Error: ' + data);
            });
    }

    function signUpFromHero(e) {
        var $form = $(this);
        var $signupButton = $('.js-show-signup');
        var $alert = $form.parent().find('.alert');
        var $name = $form.find('[name="FULLNAME"]');
        var $email = $form.find('[name="EMAIL"]');

        e.preventDefault();
        
        signUp(e, function(){
            // Show our thank you message, then fade the form back in
            // and clear it out
            $form.fadeOut(function(){
                $alert.fadeIn(function(){
                    setTimeout(function(){
                        $alert.fadeOut(function(){
                            $name.val('');
                            $email.val('');
                            $signupButton.fadeIn();
                        });
                    }, 5000);
                });
            });
        });

        return false;
    }

    function signUpFromFooter(e) {
        var $form = $(this);
        var $alert = $form.parent().find('.alert');
        var $name = $form.find('[name="FULLNAME"]');
        var $email = $form.find('[name="EMAIL"]');

        e.preventDefault();

        signUp(e, function(){
            // Show our thank you message, then fade the form back in
            // and clear it out
            $form.fadeOut(function(){
                $alert.fadeIn(function(){
                    setTimeout(function(){
                        $alert.fadeOut(function(){
                            $name.val('');
                            $email.val('');
                            $form.fadeIn();
                        });
                    }, 5000);
                });
            });
        });

        return false;
    }
})(jQuery);
