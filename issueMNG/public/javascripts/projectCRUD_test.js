window.onload = function(){
    document.getElementsByClassName('project_create_btn')[0].addEventListener('click', ProjectCreateTest)
    document.getElementsByClassName('project_read_btn')[0].addEventListener('click', ProjectReadTest)
}

let projectList // 현재 화면에 불러온 값

//lastUpdate(22-01-13)
//작업 : 프로젝트 CRUD 테스트에서 module 쪽으로 input값을 넘기는 함수
//return : None
function ProjectCreateTest(){

    $.ajax({
        url: '/project/insertMany',
        type: 'post',
        data: {
            projectTitle: document.getElementsByClassName('project_title_info')[0].value,
            projectExplain : document.getElementsByClassName('project_explain_info')[0].value,
            projectUser : document.getElementsByClassName('project_user_info')[0].value
        },
        success: function (result){
            console.log(result)
        }
    })
}

//lastUpdate(22-01-13)
//작업 : 몽고DB에 저장된 데이터를 받아오는 함수
//return : None
function ProjectReadTest(){

    $.ajax({
        url: '/project/find',
        type: 'post',
        success: function (result){

            projectList = result

            htmlList = "<h1> 리스트 </h1>"

            for(let i = 0 ; i < result.length ; i++){
                htmlList += "<li class='project_list'>"
                htmlList += result[i].Explain
                htmlList += "<button class='project_modify_btn'> 수정 </button>"
                htmlList += "<button class='project_del_btn'> 삭제 </button>"
                htmlList += "</li>"
            }

            document.getElementsByClassName('project_list_area')[0].innerHTML = htmlList

            for(let i = 0 ; i < result.length ; i++) {
                document.getElementsByClassName('project_modify_btn')[i].addEventListener('click', ProjectUpdateTest.bind(this, i))
                document.getElementsByClassName('project_del_btn')[i].addEventListener('click', ProjectDeleteTest.bind(this, i))
            }

        }
    })
}

//lastUpdate(22-01-13)
//작업 : 프로젝트 값을 삭제하는 함수
//return : None
function ProjectDeleteTest(num){

    console.log(projectList[num]._id)

    $.ajax({
        url: '/project/deleteMany',
        type: 'delete',
        async: false,
        datatype: 'json',
        data: {
            ID: projectList[num]._id
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

//lastUpdate(22-01-13)
//작업 : 프로젝트 값을 업데이트하는 함수
//return : None
function ProjectUpdateTest(num){

    $.ajax({
        url: '/project/updateMany',
        type: 'patch',
        async: false,
        datatype: 'json',
        data: {
            ID: projectList[num]._id,
            Explain : "수정한 내용입니다~"
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
