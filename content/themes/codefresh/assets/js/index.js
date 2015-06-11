/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($) {
    $(document).on('ready', function(){

        // Handle our signup forms being submitted
        $('.js-form-signup').on('submit', signUp);
    });

    /**
     * Submit the signup form to the server
     *
     * @author Tim Golen <tim@golen.net>
     *
     * @date 2015-06-10
     *
     * @param {object} e jQuery submit form event
     *
     * @return {boolean}
     */
    function signUp(e) {
        var $form = $(this);
        var $alert = $form.parent().find('.alert');
        var $name = $form.find('[name="FULLNAME"]');
        var $email = $form.find('[name="EMAIL"]');

        e.preventDefault();

        $.post('/ghost/api/v0.1/signup', {
                name: $name.val(),
                email: $email.val()
            })
            .done(function(){

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
            })
            .fail(function(xhr, msg, data){
                alert('Server Error: ' + data);
            });
        return false;
    }
})(jQuery);
