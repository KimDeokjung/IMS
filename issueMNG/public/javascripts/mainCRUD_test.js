window.onload = function(){
    document.getElementsByClassName('main_issue_btn')[0].addEventListener('click', goIssuePage)
    document.getElementsByClassName('main_project_btn')[0].addEventListener('click', goProjectPage)
    document.getElementsByClassName('main_review_btn')[0].addEventListener('click', goReviewPage)
}

//lastUpdate(22-01-12)
//작업 : router 에게 Issue 페이지를 요청해주는 함수
//return : None
function goIssuePage(){
    location.href='/issueTest'
}

//lastUpdate(22-01-12)
//작업 : router 에게 Project 페이지를 요청해주는 함수
//return : None
function goProjectPage(){
    location.href='/projectTest'
}

//lastUpdate(22-01-12)
//작업 : router 에게 Review 페이지를 요청해주는 함수
//return : None
function goReviewPage(){
    location.href='/reviewTest'
}
