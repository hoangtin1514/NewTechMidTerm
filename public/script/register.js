$(function() {
    $("form").submit(function(e) {
        e.preventDefault();
        var values = $("form").serializeArray();
        var password = values[2].value;
        var password_confirmation = values[3].value;
        if (password !== password_confirmation) {
            $("#error").text("Confirm password is incorrect");
        } else {
            /* get the action attribute from the <form action=""> element */
            var $form = $(this),
                url = $form.attr('action');

            /* Send the data using post with element id name and name2*/
            var posting = $.post(url, {
                name: $('#name').val(),
                email: $('#email').val(),
                password: password_confirmation
            });

            //Result
            posting.done(function(data) {
                if (data === false) {
                    $("#error").text("User exists");
                } else {
                    window.location.href = data;
                }
            });
        }
    });
});

function register() {

}
