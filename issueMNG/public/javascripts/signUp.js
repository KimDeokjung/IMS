window.onload = function(){
    signup(document.getElementById('signup_btn'));
    gosignin(document.getElementById('signin_btn'))
}

//회원가입 버튼 이벤트
const signup = (HtmlElement) => {
    HtmlElement.addEventListener('click',function(){
        $.ajax({
            url: "/auth/signup",
            type: "post",
            async: false,
            data: {
                "username":document.getElementById('signup_id').value,
                "password":document.getElementById('signup_pw').value,
                "email":document.getElementById('signup_email').value,
                "name":document.getElementById('signup_name').value
            },
            success: function (result) {
                alert('회원가입에 성공하셨습니다.')
                location.href = '/'
            },
            error: function (e){
                let { responseJSON : { message } } = e;
                alert(message)
                location.href='/signup'
            }
        })
    })
}

//회원가입 하러 가기
const gosignin = (HtmlElement)=> {
    HtmlElement.addEventListener('click',function (){
        location.href='/signin'
    })
}
