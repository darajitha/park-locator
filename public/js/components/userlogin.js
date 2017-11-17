function signIn() {

    var uName = document.getElementById('uname').value;
    var password = document.getElementById('password').value;

    var data = {};
    data.email = document.getElementById('uname').value;
    data.password = document.getElementById('password').value;
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/user/login',
        success: function (data) {
            if (data.state) {
                console.log('success');
                //console.log(window.open('/final/public/maplocation/HTML/location.html'));
                window.location.href = '/locations.html';
            } else {
                alert(data.msg);
            }
            console.log(JSON.stringify(data));
        },
        error: function (err) {
            alert('login error ' + err);
        }
    });

}