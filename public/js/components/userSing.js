function login() {

    var uName = document.getElementById('uuname').value;
    var uEmail = document.getElementById('uemail').value;
    var password = document.getElementById('upsw').value;
    var passwordrepeat = document.getElementById('upsw-repeat').value;

    var data = {};
    data.username = uName;
    data.email = uEmail;
    data.password = password;
    data.passwordrepeat = passwordrepeat;
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/user/register',
        success: function (data) {
            console.log('success');
            if (data.state) {
                window.location.href = '/locations.html';
            } else {
                alert(data.msg);
            }
            console.log(JSON.stringify(data));
        },
        error: function (err) {
            alert(err);
        }
    });

}