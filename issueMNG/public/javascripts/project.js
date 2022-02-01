let projectExplain = ""
let projectEdit = true

window.onload = function(){
    document.getElementsByClassName('project_header_backbtn_area')[0].addEventListener('click', goPageMain)
    document.getElementsByClassName('project_issue_add_btn_area')[0].addEventListener('click', displayIssueWriteArea)
    document.getElementsByClassName('project_review_add_btn_area')[0].addEventListener('click', displayReviewWriteArea)
    document.getElementsByClassName('project_review_submit_area')[0].addEventListener('click',ReviewWrite)
    document.getElementsByClassName('project_option_edit_icon')[0].addEventListener('click', editProject)
    document.getElementsByClassName('project_explain_edit_cancel_area')[0].addEventListener('click', cancelProjectEdit)
    document.getElementsByClassName('project_explain_edit_submit_area')[0].addEventListener('click', modifyProjectEdit)

    loadPage(window.location.search.split('?')[1].split('=')[1])
}

function goPageMain(){
    location.href='/'
}

function editProject(){
    if(projectEdit) {
        projectExplain = document.getElementsByClassName('project_explain')[0].innerHTML
        document.getElementsByClassName('project_explain_area')[0].innerHTML =
            "<textarea class='project_explain_edit'>" + projectExplain + "</textarea>"

        document.getElementsByClassName('project_explain_edit_btn_area')[0].style.display = 'flex'
        projectEdit = false
    }
}

function modifyProjectEdit(){
    let newText = document.getElementsByClassName('project_explain_edit')[0].value

    $.ajax({
        url: '/project/updateMany',
        type: 'patch',
        async: false,
        datatype: 'json',
        data: {
            ID: window.location.search.split('?')[1].split('=')[1],
            Explain : newText
        },
        success: function (result){
            if(result){
                alert("수정 성공")
            }else{
                alert("수정 실패")
            }
        }
    })

    document.getElementsByClassName('project_explain_area')[0].innerHTML =
        "<div class='project_explain'>" + newText + "</div>"
    document.getElementsByClassName('project_explain_edit_btn_area')[0].style.display = 'none'
    projectEdit = true
}

function cancelProjectEdit(){
    document.getElementsByClassName('project_explain_area')[0].innerHTML =
        "<div class='project_explain'>" + projectExplain + "</div>"
    document.getElementsByClassName('project_explain_edit_btn_area')[0].style.display = 'none'
    projectEdit = true
}

function loadPage(pageID){
    $.ajax({
        url: '/project/findone',
        type: 'post',
        data: {
            projectID: pageID,
        },
        success: function (result){
            document.getElementsByClassName('project_header_title')[0].innerHTML = result[0].Title
            document.getElementsByClassName('project_explain')[0].innerHTML = result[0].Explain
        }
    })
}

function displayIssueWriteArea(){
    let issue = document.getElementsByClassName('project_issue_write_area')[0]
    let review = document.getElementsByClassName('project_review_write_area')[0]

    review.style.display = 'none'

    if (issue.style.display === 'block'){
        issue.style.display = 'none'
    }else{
        issue.style.display = 'block'
    }

}

function displayReviewWriteArea(){
    let issue = document.getElementsByClassName('project_issue_write_area')[0]
    let review = document.getElementsByClassName('project_review_write_area')[0]

    issue.style.display = 'none'

    if (review.style.display === 'block'){
        review.style.display = 'none'
    }else{
        review.style.display = 'block'
    }

}


function ReviewWrite(){

}
