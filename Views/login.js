$(document).ready(function(){

    $('#form-login').submit(e=>{
        let user = $('#user').val();
        let password = $('#pass').val();
        console.log(user);
        console.log(password);
        e.preventDefault();
    })
})