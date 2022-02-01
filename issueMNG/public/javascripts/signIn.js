window.onload = function(){
    signin(document.getElementById('signin_btn'));
    gosignup(document.getElementById('signup_btn'));
}

//로그 버튼 이벤트
const signin = (HtmlElement) => {
    HtmlElement.addEventListener('click',function(){
        $.ajax({
            url: "/auth/login",
            type: "post",
            async: false,
            data: {
                "username":document.getElementById('signin_id').value,
                "password":document.getElementById('signin_pw').value,
            },
            success: function (result) {
                console.log(result)
                alert('로그인에 성공하셨습니다.')
                location.href = '/'
            },
            error: function (e){
                let { responseJSON : { message } } = e;
                alert(message)
                location.href='/signin'
            }
        })
    })
}

//회원가입 하러 가기
const gosignup = (HtmlElement)=> {
    HtmlElement.addEventListener('click',function (){
        location.href='/signup'
    })
}
