let currentEditRow = null;

function addEntry() {
    var length = localStorage.length;
    const hobbies = [];
    if (document.getElementById("hobby1").checked) hobbies.push("Cricket");
    if (document.getElementById("hobby2").checked) hobbies.push("Chess");
    if (document.getElementById("hobby3").checked) hobbies.push("Music");

    const Employee =
    {
        id: '',
        name: document.getElementById("name").value,
        gender: document.querySelector('input[name="txtgender"]:checked').value,
        dob: document.getElementById("txtdob").value,
        contactNumber: document.getElementById("contactNumber").value,
        email: document.getElementById("txtemail").value,
        hobby: hobbies
    }

    if (currentEditRow == null) {
        Employee.id = length++;
        console.log("length is " + length);
    }
    else 
    {
        Employee.id = document.getElementById('employeeId').value;
        document.getElementById("storeUpdateId").value=Employee.id;
    }
    localStorage.setItem('emp' + Employee.id, JSON.stringify(Employee))
    updateBasicData(Employee);
    updateAdvancedTable(Employee);
    document.getElementById("dataForm").reset();
}

function updateBasicData(Employee) {
    const dataTable = document.getElementById("dataTable");
    let newRow;

    if (currentEditRow) 
    {
        newRow = currentEditRow;
        currentEditRow = null;
    }
    else 
    {
        newRow = dataTable.insertRow(dataTable.rows.length);
    }

    newRow.innerHTML = "";

    const nameCell = newRow.insertCell(0);
    nameCell.textContent = Employee.name;

    const genderCell = newRow.insertCell(1);
    genderCell.textContent = Employee.gender;

    const dobCell = newRow.insertCell(2);
    const formatedob = formateDate(Employee.dob)
    dobCell.textContent = formatedob;

    const emailCell = newRow.insertCell(3);
    emailCell.textContent = Employee.email;

    const contactCell = newRow.insertCell(4);
    contactCell.textContent = Employee.contactNumber;

    const hobbiesCell = newRow.insertCell(5);
    hobbiesCell.textContent = Employee.hobby;

    const actionsCell = newRow.insertCell(6);
    actionsCell.innerHTML =
        `<button  class="editBtn" onclick="editEntry('${Employee.id}',this)">Edit</button> <button class="deleteBtn" onclick="deleteEntry(this)">Delete</button>`;

    console.log("display all ");
    for (let i = 0; i <= localStorage.length; i++) {
        console.log(localStorage.getItem(localStorage.key(i)));
    }
}

function editEntry(id, button) {
    const editEmployee = JSON.parse(localStorage.getItem("emp" + id));
    const row = button.parentNode.parentNode;
    document.getElementById("name").value = editEmployee.name;
    document.getElementById("contactNumber").value = editEmployee.contactNumber;
    document.getElementById("txtdob").value = editEmployee.dob;
    document.getElementById("txtemail").value = editEmployee.email;
    document.getElementById("txtid").value = id;
    if (editEmployee.gender == 'Male') {
        document.getElementById('txtgender1').checked = true;
    }
    else {
        document.getElementById('txtgender2').checked = true;
    }
    const hobbies = editEmployee.hobby;
    document.getElementById("hobby1").checked = hobbies.includes("Cricket");
    document.getElementById("hobby2").checked = hobbies.includes("Chess");
    document.getElementById("hobby3").checked = hobbies.includes("Music");

    currentEditRow = row;

}

function deleteEntry(button) {
    const row = button.parentNode.parentNode;
    row.remove();
    var email = localStorage.key("email");
    console.log(localStorage.removeItem(email));
    for (let i = 0; i < localStorage.length; i++) {
        console.log(localStorage.getItem(localStorage.key(i)));
    }
}
var column=0;
function updateAdvancedTable(Employee) 
{
    var nameRow = document.getElementById("nameField")
    var genderRow = document.getElementById("genderField")
    var DOBRow = document.getElementById("DOBfield")
    var EmailRow = document.getElementById("EmailField")
    var PhoneRow = document.getElementById("Phonefield")
    var HobbyRow = document.getElementById("Hobbyfield")
    var ActionRow = document.getElementById("Actionfield")

    if(document.getElementById("storeUpdateId").value == '')
    {
        j++;
        cell1 = nameRow.insertCell(column);
        cell1.innerHTML = Employee.name;
        
        cell2 = genderRow.insertCell(column);
        cell2.innerHTML = Employee.gender;
        
        cell3 = DOBRow.insertCell(column);
        cell3.innerHTML = Employee.dob;
        
        cell4 = PhoneRow.insertCell(column);
        cell4.innerHTML = Employee.contactNumber;
        
        cell5 = EmailRow.insertCell(column);
        cell5.innerHTML = Employee.email;
        
        cell6 = HobbyRow.insertCell(column);
        cell6.innerHTML = Employee.hobby;
        
        cell7 = ActionRow.insertCell(column);
        cell7.innerHTML =  `<button onclick="editFromAdvance(${column})">Edit</button> <button onclick="deleteFromAdvance(${column})">Delete</button>`;
    }
    else
    {
        j;
        cell1.innerHTML = Employee.name;
        cell2.innerHTML = Employee.gender;
        cell3.innerHTML = Employee.dob;
        cell4.innerHTML = Employee.contactNumber;
        cell5.innerHTML = Employee.email;
        cell6.innerHTML = Employee.hobby;
        cell7.innerHTML =  `<button onclick="editFromAdvance(${j})">Edit</button> <button onclick="deleteFromAdvance(${column})">Delete</button>`;
    }
}

function editFromAdvance(rowNum) 
{
    const dataTable = document.getElementById("dataTable");
    var row = dataTable.rows[rowNum];
    var btn = row.querySelector(".editBtn");
    btn.click();
}

function deleteFromAdvance(index) 
{
    const advancedTable = document.getElementById("advancedTable");
    var rowCount = advancedTable.rows.length;
    for (var i = 0; i < rowCount; i++) 
    {
        advancedTable.rows[i].deleteCell(index);
    }
    document.getElementById("dataTable").deleteRow(index);
}

function formateDate(input) {
    var datePart = input.match(/\d+/g),
        year = datePart[2],
        month = datePart[0], day = datePart[1];
    return day + '/' + month + '/' + year;
}

window.onload = NoData();

function NoData() 
{
    j=0;
    localStorage.clear()
}
