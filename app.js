

//showing add user form
function AddUserSectionActive() {
    document.getElementById("AddFormId").style.display = "block";

    //diactive buttons
    document.getElementById("SearchFormId").style.display = "none";
    document.getElementById("EditFormId").style.display = "none";
    document.getElementById("DeleteFormId").style.display = "none";
    document.getElementById("ShowAllUsersId").style.display = "none";


}

//showing search user form
function SearchUserSectionActive() {
    document.getElementById("SearchFormId").style.display = "block";

    //diactive buttons
    document.getElementById("EditFormId").style.display = "none";
    document.getElementById("DeleteFormId").style.display = "none";
    document.getElementById("AddFormId").style.display = "none";
    document.getElementById("ShowAllUsersId").style.display = "none";


}

//showing edit user form
function EditUserSectionActive() {
    document.getElementById("EditFormId").style.display = "block";

    //diactive buttons
    document.getElementById("SearchFormId").style.display = "none";
    document.getElementById("DeleteFormId").style.display = "none";
    document.getElementById("AddFormId").style.display = "none";
    document.getElementById("ShowAllUsersId").style.display = "none";


}

//showing delete user form
function DeleteUserSectionActive() {
    document.getElementById("DeleteFormId").style.display = "block";

    document.getElementById("SearchFormId").style.display = "none";
    document.getElementById("EditFormId").style.display = "none";
    document.getElementById("AddFormId").style.display = "none";
    document.getElementById("ShowAllUsersId").style.display = "none";

}

// showing All users in table
function ShowAllUsersActive() {
    document.getElementById("DeleteFormId").style.display = "none";

    document.getElementById("SearchFormId").style.display = "none";
    document.getElementById("EditFormId").style.display = "none";
    document.getElementById("AddFormId").style.display = "none";
    document.getElementById("ShowAllUsersId").style.display = "block";
}
//add user
function AddUser(){
    let userName = document.getElementById("AddUserName");
    let userEmail = document.getElementById("AddUserEmail");
    let userNumber = document.getElementById("AddUserNumber");

    if(userName.value != "" && userEmail.value != "" && userNumber.value != ""){
        var myObject = {'name': userName.value, 'email': userEmail.value, 'number': userNumber.value};
        
        localStorage.setItem(userName.value, JSON.stringify(myObject));

        document.getElementById("AddUserStatue").innerHTML = userName.value + " added successful.";

        setTimeout(AddUserStatue, 8000);
        function AddUserStatue() {
            document.getElementById("AddUserStatue").innerHTML = ""
        }

        userName.value = "";
        userEmail.value = "";
        userNumber.value = "";
    }
    
     
}

//search user
function SearchUser() {
    let userName = document.getElementById("SearchUserName").value;
    let SearchUserInfoObj = JSON.parse(localStorage.getItem(userName));

    if(SearchUserInfoObj == null) {
            document.getElementById("SearchUserErrorInfo").style.display = "block";
            document.getElementById("SearchUserSuccessInfo").style.display = 'none';
            document.getElementById("SearchUserErrorInfoP").innerHTML = "Error, the user not exist!";
    }
    else {
        for(i=0;i<localStorage.length;i++) {
            document.getElementById("SearchUserErrorInfo").style.display = "none";
            document.getElementById("SearchUserSuccessInfo").style.display = "block";
            document.getElementById("SearchUserInfoName").innerHTML = "userName : " + SearchUserInfoObj.name;
            document.getElementById("SearchUserInfoEmail").innerHTML = "Email : " + SearchUserInfoObj.email;
            document.getElementById("SearchUserInfoNumber").innerHTML = "Phone Number : " + SearchUserInfoObj.number;
        }
    
    }
    
    //document.getElementById("SearchUserInfo").innerHTML = localStorage;

}

//search and select the user foe edit
var EditUserName = undefined;
var SearchEditUserInfoObj = undefined;
function SearchEditUser() {

    EditUserName = document.getElementById("SearchForEditUserName").value;
    SearchEditUserInfoObj = JSON.parse(localStorage.getItem(EditUserName));

    if(SearchEditUserInfoObj == null) {
        document.getElementById("SearchEditUserErrorInfo").style.display = "block";
        document.getElementById("SearchUserSuccessInfo").style.display = "none";
        document.getElementById("SearchEditUserErrorInfoP").style.color = "red";
        document.getElementById("SearchEditUserErrorInfoP").innerHTML = "Error, The user not exist! ";

        document.getElementById("EditUserName").value = "";
        document.getElementById("EditUserEmail").value = "";
        document.getElementById("EditUserNumber").value = "";
    }
    else {
        document.getElementById("SearchEditUserErrorInfo").style.display = "none";
        document.getElementById("SearchEditUserSuccessInfo").style.display = "block";
        document.getElementById("SearchEditUserInfo").innerHTML = "One user found.";
        
        //fill the input with the user info that was found.
        document.getElementById("EditUserName").value = SearchEditUserInfoObj.name;
        document.getElementById("EditUserEmail").value = SearchEditUserInfoObj.email;
        document.getElementById("EditUserNumber").value = SearchEditUserInfoObj.number;
    }
}

//Update localstorage item
function EditUser() {

    let EditName = document.getElementById("EditUserName").value;
    let EditEmail = document.getElementById("EditUserEmail").value;
    let EditNumber = document.getElementById("EditUserNumber").value;

    if(EditName.value != "" && EditEmail.value != "" && EditNumber.value != "") {
        let MyEditObject = {'name': EditName, 'email': EditEmail, 'number': EditNumber};
        localStorage.setItem(SearchEditUserInfoObj.name, JSON.stringify(MyEditObject));
    
        document.getElementById("SearchEditUserInfo").innerHTML = "The selected user updated!";
    }

}

//delete selected user
function DeleteUser() {
    
    let DeleteUserName = document.getElementById("DeleteUserName").value;
    let DeleteUserInfoObj = JSON.parse(localStorage.getItem(DeleteUserName));

    if(DeleteUserInfoObj == null) {
        document.getElementById("DeleteUserErrorInfo").style.display = "block";
        document.getElementById("DeleteUserSuccessInfo").style.display = "none";
        document.getElementById("DeleteUserErrorInfoP").style.color = "red";
        document.getElementById("DeleteUserErrorInfoP").innerHTML = "Error, not found!";
    }
    else {
        localStorage.removeItem(DeleteUserName);

        document.getElementById("DeleteUserSuccessInfo").style.display = "block";
        document.getElementById("DeleteUserErrorInfo").style.display = "none";
        document.getElementById("DeleteUSerSuccessInfoP").innerHTML = "Success! one item deleted.";
    }
    

}


// show all users
function ShowAllUsers() {

    myLook = document.querySelector('table')
    
    if(myLook != null) {
        myLook.remove()
    }
   
   
        const items = {}
    for(i=0;i<localStorage.length;i++) {
        const key = localStorage.key(i)
        const values = localStorage.getItem(key)
        items[key] = values
      
    }
    
    // headlines
    mytable = document.createElement("table")

    let mytr = document.createElement("tr")
    let thName = document.createElement("th")
    thName.innerText = "name"
    let thEmail = document.createElement("th")
    thEmail.innerText = "email"
    let thPhone = document.createElement("th")
    thPhone.innerText = "phone"
    mytr.appendChild(thName)
    mytr.appendChild(thEmail)
    mytr.appendChild(thPhone)
    mytable.appendChild(mytr)

    // collect the data from localstorage
    for(const key in items){
        

        let parsedData = JSON.parse(items[key])

        let mytrData = document.createElement("tr")
        let thNameData = document.createElement("td")
        thNameData.innerText = parsedData.name
        let theEmailData = document.createElement("td")
        theEmailData.innerText = parsedData.email
        let thePhoneData = document.createElement("td")
        thePhoneData.innerText = parsedData.number
        mytrData.appendChild(thNameData)
        mytrData.appendChild(theEmailData)
        mytrData.appendChild(thePhoneData)
        mytable.appendChild(mytrData)
    }
    

    document.getElementById("ShowAllUsersTableId").appendChild(mytable)

   
}