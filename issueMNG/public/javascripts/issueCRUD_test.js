window.onload = function(){
    document.getElementsByClassName('issue_create_btn')[0].addEventListener('click', IssueCreateTest)
    document.getElementsByClassName('issue_read_btn')[0].addEventListener('click', IssueReadTest)
}

let issueList // 현재 화면에 불러온 값

//lastUpdate(22-01-19)
//작업 : 이슈 CRUD 테스트에서 module 쪽으로 input값을 넘기는 함수
//return : None
function IssueCreateTest(){
    $.ajax({
        url: '/issue/insertMany',
        type: 'post',
        data: {
            issueProjectId: document.getElementsByClassName('issue_project_id_info')[0].value,
            issueText: document.getElementsByClassName('issue_explain_info')[0].value,
            issueProgress : document.getElementsByClassName('issue_progress_info')[0].value,
            issueDeadline : to_date(document.getElementsByClassName('issue_deadline_info')[0].value),
        },
        success: function (result){
            console.log(result)
        }
    })
}

//lastUpdate(22-01-19)
//작업 : 몽고DB에 저장된 데이터를 받아오는 함수
//return : None
function IssueReadTest(){

    $.ajax({
        url: '/issue/find',
        type: 'post',
        success: function (result){

            issueList = result

            htmlList = "<h1> 리스트 </h1>"

            for(let i = 0 ; i < result.length ; i++){
                htmlList += "<li class='issue_list'>"
                htmlList += result[i].Text
                htmlList += "<button class='issue_modify_btn'> 수정 </button>"
                htmlList += "<button class='issue_del_btn'> 삭제 </button>"
                htmlList += "</li>"
            }

            document.getElementsByClassName('issue_list_area')[0].innerHTML = htmlList

            for(let i = 0 ; i < result.length ; i++) {
                document.getElementsByClassName('issue_modify_btn')[i].addEventListener('click', IssueUpdateTest.bind(this, i))
                document.getElementsByClassName('issue_del_btn')[i].addEventListener('click', IssueDeleteTest.bind(this, i))
            }

        }
    })
}

//lastUpdate(22-01-19)
//작업 : 이슈 값을 삭제하는 함수
//return : None
function IssueDeleteTest(num){

    $.ajax({
        url: '/issue/deleteMany',
        type: 'delete',
        async: false,
        datatype: 'json',
        data: {
            ID: issueList[num]._id
        },
        success: function (result){
            if(result){
                alert("삭제 성공")
            }else{
                alert("삭제 실패")
            }
        }
    })
}

//lastUpdate(22-01-19)
//작업 : 이슈 값을 업데이트하는 함수
//return : None
function IssueUpdateTest(num){

    $.ajax({
        url: '/issue/updateMany',
        type: 'patch',
        async: false,
        datatype: 'json',
        data: {
            ID: issueList[num]._id,
            Text : "수정한 내용입니다~"
        },
        success: function (result){
            if(result){
                alert("수정 성공")
            }else{
                alert("수정 실패")
            }
        }
    })
}

// 이런식으로 넣으면 몽고 디비에 저장될 때 9시간 딜레이 발생 따로 개선 할 것
function to_date(date_str){
    var sYear = Number(date_str.substring(0,4));
    var sMonth = Number(date_str.substring(5,7));
    var sDate = Number(date_str.substring(8,10));

    return new Date(Number(sYear), Number(sMonth)-1, Number(sDate));
}
