let projectList
let nowProjectList

window.onload = function(){
    document.getElementsByClassName('main_create_project_area')[0].addEventListener('click', projectCreateModal)
    document.getElementsByClassName('main_modal_delete_area')[0].addEventListener('click', projectDeleteModal)
    document.getElementsByClassName('main_modal_project_master_area')[0].addEventListener('click', projectMasterModal)
    // document.getElementsByClassName('main_signIn_area')[0].addEventListener('click', signInProject)
    // document.getElementsByClassName('main_signUp_area')[0].addEventListener('click', signUpProject)
    document.getElementsByClassName('main_modal_master_modal_delete_area')[0].addEventListener('click', projectCloseMasterModal)
    document.getElementsByClassName('main_modal_project_member_area')[0].addEventListener('click', projectMemberModal)
    document.getElementsByClassName('main_modal_member_modal_delete_area')[0].addEventListener('click', projectCloseMemberModal)
    document.getElementsByClassName('main_modal_project_category_area')[0].addEventListener('click', categorySelectBarOpen)
    document.getElementsByClassName('main_modal_project_private_area')[0].addEventListener('click', lockSelectBarOpen)
    document.getElementsByClassName('main_modal_submit_btn')[0].addEventListener('click', createProject)
    document.getElementsByClassName('main_category_area')[0].addEventListener('click', createCategoryFilter)
    document.getElementsByClassName('main_header_search_icon_area')[0].addEventListener('click', searchProject)

    for(let x = 0; x < 2; x++){
        document.getElementsByClassName('main_modal_master_modal_user_info_detail_area')[x].addEventListener('click', setCheckMasterUser.bind(this,x))
    }

    for(let x = 0; x < 2; x++){
        document.getElementsByClassName('main_modal_member_modal_user_info_detail_area')[x].addEventListener('click', setCheckMemberUser.bind(this,x))
    }

    for(let x = 0; x < 2; x++){
        document.getElementsByClassName('main_modal_lock_select_bar_public_area')[x].addEventListener('click', lockSelectBar.bind(this,
            document.getElementsByClassName('main_modal_lock_select_bar_public_area')[x].getElementsByTagName('div')[0].innerText
        ))
    }

    for(let x = 0; x < 11; x++){
        document.getElementsByClassName('main_modal_category_select_bar_all_area')[x].addEventListener('click', categorySelectBar.bind(this,
            document.getElementsByClassName('main_modal_category_select_bar_all_area')[x].getElementsByTagName('div')[0].innerText
            ))
    }

    for(let x = 0; x < 11; x++){
        document.getElementsByClassName('main_modal_category_filter_all_area')[x].addEventListener('click', categoryFilter.bind(this,
            document.getElementsByClassName('main_modal_category_filter_all_area')[x].getElementsByTagName('div')[0].innerText
        ))
    }

    loadProject()
}

function projectCreateModal(){
    document.getElementsByClassName('main_modal')[0].style.display = 'block';
}

function projectDeleteModal(){
    document.getElementsByClassName('main_modal')[0].style.display = 'none';
}

function goPageProject(projectID){
    location.href='/project?id='+projectID
}

function signInProject(){
    location.href='/signin'
}

function signUpProject(){
    location.href='/signup'
}

function projectMasterModal(){
    document.getElementsByClassName('main_modal_master_modal')[0].style.display = 'block';
}

function projectCloseMasterModal(){
    document.getElementsByClassName('main_modal_master_modal')[0].style.display = 'none';
}

function projectMemberModal(){
    document.getElementsByClassName('main_modal_member_modal')[0].style.display = 'block';
}

function projectCloseMemberModal(){
    document.getElementsByClassName('main_modal_member_modal')[0].style.display = 'none';
}

function setCheckMasterUser(num){
    let check = document.getElementsByClassName('main_modal_master_modal_user_check')[num]

    if(check.style.display === 'block'){
        check.style.display = 'none'
    }else{
        check.style.display = 'block'
    }
}

function setCheckMemberUser(num){
    let check = document.getElementsByClassName('main_modal_member_modal_user_check')[num]

    if(check.style.display === 'block'){
        check.style.display = 'none'
    }else{
        check.style.display = 'block'
    }
}

function categorySelectBar(text){
    text = text .trim()

    document.getElementsByClassName('main_modal_project_option_title')[3].innerHTML = text
    document.getElementsByClassName('main_modal_category_select_bar')[0].style.display = 'none'
    document.getElementsByClassName('main_modal_project_category_area')[0]
        .getElementsByTagName('img')[1].src="/images/filter_icon.png"
}

function categorySelectBarOpen(){
    document.getElementsByClassName('main_modal_category_select_bar')[0].style.display = 'block'
    document.getElementsByClassName('main_modal_project_category_area')[0]
        .getElementsByTagName('img')[1].src="/images/filter_up_icon.png"
}

function lockSelectBar(text){
    text = text .trim()

    document.getElementsByClassName('main_modal_project_option_title')[2].innerHTML = text
    document.getElementsByClassName('main_modal_lock_select_bar')[0].style.display = 'none'
    document.getElementsByClassName('main_modal_project_private_area')[0]
        .getElementsByTagName('img')[1].src="/images/filter_icon.png"
}

function lockSelectBarOpen(){
    document.getElementsByClassName('main_modal_lock_select_bar')[0].style.display = 'block'
    document.getElementsByClassName('main_modal_project_private_area')[0]
        .getElementsByTagName('img')[1].src="/images/filter_up_icon.png"
}

function createProject(){
    let title = document.getElementsByClassName('main_modal_project_title_input')[0].value
    let lock = document.getElementsByClassName('main_modal_project_option_title')[2].innerHTML.trim()
    let category = document.getElementsByClassName('main_modal_project_option_title')[3].innerHTML.trim()
    let explain = document.getElementsByClassName('main_modal_text_area')[0].value
    let projectMembersList = [{name: "김동욱", id: "4567"}, {name: "박기찬", id: "1234"}]

    if(title.length === 0){
        alert("프로젝트 이름이 비어있습니다.")
        return
    }if(lock === "공개 범위"){
        alert("공개 범위를 설정해 주세요.")
        return
    }if(category === "분류"){
        alert("카테고리를 설정해 주세요.")
        return
    }if(explain.length === 0){
        alert("내용을 입력해 주세요.")
        return
    }

    $.ajax({
        url: '/project/insertMany',
        type: 'post',
        data: {
            projectTitle: title,
            projectExplain : explain,
            projectHost : lock,
            projectCategory : category,
            projectMembers : JSON.stringify(projectMembersList)
        },
        traditional: true,
        success: function (result){
            console.log(result)
        }
    })

    projectDeleteModal()

    loadProject()
}

function loadProject(){
    let htmlList = ""

    $.ajax({
        url: '/project/find',
        type: 'post',
        success: function (result){

            projectList = result
            nowProjectList = result

            htmlList += "<div>"

            for(let i = 0 ; i < result.length ; i++){
                htmlList += "            <div class=\"main_project_area\">\n" +
                    "                <div class=\"main_project_top_area\">\n" +
                    "                    <img\n" +
                    "                            class='main_project_defalt_icon'\n" +
                    "                            src=\"/images/defalt_image_icon.png\"\n" +
                    "                            alt='project' />\n" +
                    "                </div>\n" +
                    "                <div class=\"main_project_bottom_area\">\n" +
                    "                    <div class=\"main_project_title\">"
                htmlList += result[i].Title
                htmlList += "                    </div>\n" +
                    "                    <div class=\"main_project_link_area\">\n" +
                    "                        <img\n" +
                    "                                src=\"/images/link_icon.png\"\n" +
                    "                                alt='link' />\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "            </div>"
            }

            htmlList += "</div>"

            document.getElementsByClassName('main_content')[0].innerHTML = htmlList

            for(let i = 0; i< result.length ; i++){
                document.getElementsByClassName('main_project_area')[i].addEventListener('click', goPageProject.bind(this,result[i]._id))
            }
        }
    })
}

function createCategoryFilter() {
    categoryFilter = document.getElementsByClassName('main_modal_category_filter')[0]
    if(categoryFilter.style.display === 'block'){
        categoryFilter.style.display = 'none'
    }else{
        categoryFilter.style.display = 'block'
    }
}

function categoryFilter(text){
    let htmlList = ""
    nowProjectList = []
    text = text .trim()

    if(text === "전체"){
        loadProject()
        document.getElementsByClassName('main_modal_category_filter')[0].style.display = 'none'
        return
    }

    htmlList += "<div>"

    for(let i = 0 ; i < projectList.length ; i++){
        if(projectList[i].Category === text){
            nowProjectList.push(projectList[i])
            htmlList += "            <div class=\"main_project_area\">\n" +
                "                <div class=\"main_project_top_area\">\n" +
                "                    <img\n" +
                "                            class='main_project_defalt_icon'\n" +
                "                            src=\"/images/defalt_image_icon.png\"\n" +
                "                            alt='project' />\n" +
                "                </div>\n" +
                "                <div class=\"main_project_bottom_area\">\n" +
                "                    <div class=\"main_project_title\">"
            htmlList += projectList[i].Title
            htmlList += "                    </div>\n" +
                "                    <div class=\"main_project_link_area\">\n" +
                "                        <img\n" +
                "                                src=\"/images/link_icon.png\"\n" +
                "                                alt='link' />\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>"
        }
    }

    htmlList += "</div>"

    document.getElementsByClassName('main_content')[0].innerHTML = htmlList

    for(let i = 0; i<nowProjectList.length; i++){
        document.getElementsByClassName('main_project_area')[i].addEventListener('click', goPageProject.bind(this,nowProjectList[i]._id))
    }

    document.getElementsByClassName('main_modal_category_filter')[0].style.display = 'none'
}

function searchProject() {
    let text = document.getElementsByClassName('main_search_text')[0].value

    if(text.length ===0){
        alert("검색어를 입력해 주세요.")
    }else{

        let htmlList = ""
        nowProjectList = []

        htmlList += "<div>"

        for(let i = 0 ; i < projectList.length ; i++){
            if(projectList[i].Title.includes(text)){
                nowProjectList.push(projectList[i])
                htmlList += "            <div class=\"main_project_area\">\n" +
                    "                <div class=\"main_project_top_area\">\n" +
                    "                    <img\n" +
                    "                            class='main_project_defalt_icon'\n" +
                    "                            src=\"/images/defalt_image_icon.png\"\n" +
                    "                            alt='project' />\n" +
                    "                </div>\n" +
                    "                <div class=\"main_project_bottom_area\">\n" +
                    "                    <div class=\"main_project_title\">"
                htmlList += projectList[i].Title
                htmlList += "                    </div>\n" +
                    "                    <div class=\"main_project_link_area\">\n" +
                    "                        <img\n" +
                    "                                src=\"/images/link_icon.png\"\n" +
                    "                                alt='link' />\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "            </div>"
            }
        }

        htmlList += "</div>"

        document.getElementsByClassName('main_content')[0].innerHTML = htmlList

        for(let i = 0; i<nowProjectList.length; i++){
            document.getElementsByClassName('main_project_area')[i].addEventListener('click', goPageProject.bind(this,nowProjectList[i]._id))
        }

    }
}
