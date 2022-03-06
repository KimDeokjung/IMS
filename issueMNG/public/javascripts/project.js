let projectExplain = ""
let projectEdit = true
let IsLike = false
let issueFilter = true
let reviewFilter = true

window.onload = function(){
    document.getElementsByClassName('project_header_backbtn_area')[0].addEventListener('click', goPageMain)
    document.getElementsByClassName('project_issue_add_btn_area')[0].addEventListener('click', displayIssueWriteArea)
    document.getElementsByClassName('project_review_add_btn_area')[0].addEventListener('click', displayReviewWriteArea)
    document.getElementsByClassName('project_review_submit_area')[0].addEventListener('click',ReviewWrite)
    document.getElementsByClassName('project_option_edit_icon')[0].addEventListener('click', editProject)
    document.getElementsByClassName('project_explain_edit_cancel_area')[0].addEventListener('click', cancelProjectEdit)
    document.getElementsByClassName('project_explain_edit_submit_area')[0].addEventListener('click', modifyProjectEdit)
    document.getElementsByClassName('project_option_heart_icon')[0].addEventListener('click', clickLikeBtn)
    document.getElementsByClassName('project_review_filter_area')[0].addEventListener('click', ReviewFilter)
    document.getElementsByClassName('project_issue_filter_area')[0].addEventListener('click', IssueFilter)

    loadPage(window.location.search.split('?')[1].split('=')[1])
    loadLike()
}

function goPageMain(){
    location.href='/'
}

function loadLike(){
    $.ajax({
        url: '/project/checkLike',
        type: 'post',
        async: false,
        datatype: 'json',
        data: {
            ID: window.location.search.split('?')[1].split('=')[1],
        },
        success: function (result){
            if(result){
                document.getElementsByClassName('project_option_heart_icon')[0].src = '/images/heart_icon_on.png'
                IsLike = true
            }else{
                document.getElementsByClassName('project_option_heart_icon')[0].src = '/images/heart_icon_off.png'
            }
        }
    })

    $.ajax({
        url: '/project/likeNum',
        type: 'post',
        async: false,
        datatype: 'json',
        data: {
            ID: window.location.search.split('?')[1].split('=')[1],
        },
        success: function (result){
            if(result){
                document.getElementsByClassName('project_option_heart_num')[0].innerHTML = result
            }else{
            }
        }
    })
}

function clickLikeBtn() {
    let imgDoc = document.getElementsByClassName('project_option_heart_icon')[0]
    let likenum = document.getElementsByClassName('project_option_heart_num')[0].innerHTML

    likenum = parseInt(likenum)

    if(IsLike){
        imgDoc.src = '/images/heart_icon_off.png'
        document.getElementsByClassName('project_option_heart_num')[0].innerHTML = likenum - 1
        IsLike = false
        $.ajax({
            url: '/project/deleteLike',
            type: 'post',
            data: {
                ID: window.location.search.split('?')[1].split('=')[1],
            },
            success: function (result){
            }
        })
    }else{
        imgDoc.src = '/images/heart_icon_on.png'
        document.getElementsByClassName('project_option_heart_num')[0].innerHTML = likenum + 1
        IsLike = true
        $.ajax({
            url: '/project/updateLike',
            type: 'post',
            data: {
                ID: window.location.search.split('?')[1].split('=')[1],
            },
            success: function (result){
            }
        })
    }

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

    if(review.classList.length === 2){
        review.classList.toggle('project_review_write_area_act');
    }

    issue.classList.toggle('project_issue_write_area_act');

}

function displayReviewWriteArea(){
    let issue = document.getElementsByClassName('project_issue_write_area')[0]
    let review = document.getElementsByClassName('project_review_write_area')[0]

    if(issue.classList.length === 2){
        issue.classList.toggle('project_issue_write_area_act');
    }

    review.classList.toggle('project_review_write_area_act');

}


function ReviewWrite(){

}

function ReviewFilter(){
    if(reviewFilter){
        document.getElementsByClassName('project_review_user_full_area')[0].style.display = 'none'
        reviewFilter = false
    }else{
        document.getElementsByClassName('project_review_user_full_area')[0].style.display = 'block'
        reviewFilter = true
    }
}

function IssueFilter(){
    if(issueFilter){
        document.getElementsByClassName('project_issue_user_full_area')[0].style.display = 'none'
        issueFilter = false
    }else{
        document.getElementsByClassName('project_issue_user_full_area')[0].style.display = 'block'
        issueFilter = true
    }
}
