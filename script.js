
let currentEditRow = null;

var counter=0;
function addEntry() 
{
    const hobbies = [];
    if (document.getElementById("hobby1").checked) hobbies.push("Cricket");
    if (document.getElementById("hobby2").checked) hobbies.push("Chess");
    if (document.getElementById("hobby3").checked) hobbies.push("Music");
    
    const Employee =
    {
        id:counter++,
        name: document.getElementById("name").value,
        gender: document.querySelector('input[name="txtgender"]:checked').value,
        dob: document.getElementById("txtdob").value,
        contactNumber: document.getElementById("contactNumber").value,
        email: document.getElementById("txtemail").value,
        hobby: hobbies
    }
   
    if(currentEditRow == null)
    {
        
        var x = localStorage.length;
        localStorage.setItem("emp"+ (x+1),JSON.stringify(Employee));
        console.log("x is " + x);
    }
    else
    {
        localStorage.setItem('emp'+ Employee.id, Employee);
    }
    
    displayBasicData(Employee);

    // updateAdvancedTable(Employee);
    document.getElementById("dataForm").reset();

    updateTable();
}

function displayBasicData(Employee) 
{
    const dataTable = document.getElementById("dataTable");
    let newRow;

    if (currentEditRow) 
    {
        newRow = currentEditRow;
        currentEditRow = null;
    }
    else 
    {
        //insert
        newRow = dataTable.insertRow(dataTable.rows.length);
    }

    newRow.innerHTML = "";
    counter++;
    alert(counter)
    document.getElementById("txtid").value = counter+1;

    

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
        '<button class="editBtn" onclick="editEntry(this)">Edit</button> <button class="deleteBtn" onclick="deleteEntry(this)">Delete</button>';

    
    console.log("display all ");   
    for (let i = 0; i < localStorage.length; i++) 
    {
        console.log(localStorage.getItem(localStorage.key(i)));
    }
}

/*insert data for advanced table*/
let k = 1;
function updateAdvancedTable(Employee) 
{
    // document.getElementById("noDataAvailable").style.display = 'none';
    const noDataAdvanced = document.getElementById("noDataAdvanced");
    const advancedTable = document.getElementById("advancedTable");
    const dataTable = document.getElementById("dataTable");
    // dataTable.deleteRow(1)
    if (dataTable.rows.length <= 1) 
    {
        noDataAdvanced.style.display = "block";
        advancedTable.style.display = "none";
    }
    else 
    {
        noDataAdvanced.style.display = "none";
        advancedTable.style.display = "table";

        advancedTable.innerHTML = "";
        const headerRow = advancedTable.insertRow(0);
        headerRow.insertCell(0).textContent = "Attribute";
        for (let i = 1; i < dataTable.rows.length; i++) 
        {
            headerRow.insertCell(i).textContent = `Data${i}`;
        }

        const attributes = ["Name", "Gender", "DOB", "Email", "Contact Number", "Hobbies", "Actions"];

        const newRow = document.createElement('tr')
        const namecell = document.createElement('td')
        const gendercell = document.createElement('td')
        
        namecell.textContent = Employee.name
        gendercell.textContent = Employee.gender

        newRow.appendChild(namecell)
        newRow.appendChild(gendercell)
        advancedTable.appendChild(newRow)
        // const value = [
        //     Employee.name, Employee.gender, Employee.dob, Employee.contactNumber, Employee.email, Employee.hobbies
        // ]

        // const newRow = advancedTable.insertRow(i);
        // i = 0;
        // newRow.insertCell(i).textContent = attributes[i];
        // k = 1;
        // newRow.insertCell(k).textContent = Employee.name;

        // i = 1;
        // newRow.insertCell(i).textContent = attributes[i];
        // newRow.insertCell(k).textContent = Employee.gender;
        // for (let i = 0; i < value.length; i++)
        // {
        //     const newRow = advancedTable.insertRow(advancedTable.rows.length);
        //     // newRow.insertCell(0).textContent = attributes[i];
        //     k = 1;
        //     newRow.insertCell(k).textContent = value[i];
        // }



        // for (let i = 0; i < attributes.length; i++) 
        // {

        //     console.log(attributes[i])
        //     const newRow = advancedTable.insertRow(advancedTable.rows.length);
        //     newRow.insertCell(0).textContent = attributes[i];

        //     for (let j = 1; j < dataTable.rows.length; j++) 
        //     {
        //         if (i != 6) 
        //         {
        //             newRow.insertCell(j).textContent = dataTable.rows[j].cells[i].textContent;
        //         } 
        //         else 
        //         {
        //             newRow.insertCell(j).innerHTML = `<button onclick="editFromAdvance(${j})">Edit</button> <button onclick="deleteFromAdvance(${j})">Delete</button>`;
        //         }
        //     }
        // }
    }
}

function editFromAdvance(rowNum) 
{
    const dataTable = document.getElementById("dataTable");
    var row = dataTable.rows[rowNum];
    var btn = row.querySelector(".editBtn");
    btn.click();
}

function deleteFromAdvance(rowNum) 
{
    const dataTable = document.getElementById("dataTable");
    var row = dataTable.rows[rowNum];
    var btn = row.querySelector(".deleteBtn");
    btn.click();
}

function editEntry(button) 
{
    const row = button.parentNode.parentNode;
    const name = row.cells[0].textContent;
    const gender = row.cells[1].textContent;
    const dob = row.cells[2].textContent;
    const email = row.cells[3].textContent;
    const contactNumber = row.cells[4].textContent;
    const hobbies = row.cells[5].textContent.split(", ");

    document.getElementById("name").value = name;
    document.getElementById("contactNumber").value = contactNumber;
    document.getElementById("txtdob").value = dob;
    document.getElementById("txtemail").value = email;

    if (gender == 'Male') 
    {
        document.getElementById('txtgender1').checked = true;
    }
    else
    {
        document.getElementById('txtgender2').checked = true;
    }

    document.getElementById("hobby1").checked = hobbies.includes("Cricket");
    document.getElementById("hobby2").checked = hobbies.includes("Chess");
    document.getElementById("hobby3").checked = hobbies.includes("Music");

    currentEditRow = row;
}

function deleteEntry(button) 
{
   
    const row = button.parentNode.parentNode;
    row.remove();
    var email = localStorage.key("email");
    console.log(localStorage.removeItem(email));
    for (let i = 0; i < localStorage.length; i++) 
    {
        console.log(localStorage.getItem(localStorage.key(i)));
    }
    updateTable();
    updateAdvancedTable();
}

function updateTable() 
{
    const noData = document.getElementById("noData");
    const dataTable = document.getElementById("dataTable");

    if (dataTable.rows.length <= 1) 
    {
        noData.style.display = "block";
    }
    else 
    {
        noData.style.display = "none";
    }
}

window.onload = NoData();

function NoData() 
{
    updateTable();
}

function dateNotAllowed() 
{
    const dob = document.getElementById("txtdob").value;
    const dateRegex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;
    if (!dateRegex.test(dob)) {
        document.getElementById("validatedate").textContent = "Invalid date format (MM/DD/YYYY)";
        return 0;
    }
    else {
        document.getElementById("validatedate").textContent = "";
    }


    const [month, day, year] = dob.split('/');
    const enteredDate = new Date(`${year}-${month}-${day}`);
    const currentDate = new Date();


    if (enteredDate > currentDate) {
        document.getElementById("validatedate").textContent = "Future dates are not allowed";
        return 0;
    }
    else {
        document.getElementById("validatedate").textContent = "";
        return 1;
    }
}


function validateField() {
    var regexName = /^[a-z0-9]+$/;
    var name = document.getElementById('name').value;
    var validateName = document.getElementById('validateName')
    if (!name.match(regexName)) {
        validateName.innerHTML = 'Name should contain only alphanumeric value';
        return 0;
    }
    if (name.length < 4) {
        validateName.innerHTML = 'Name should be 4 or more character';
        return 0;
    }
    if (name.length >= 20) {
        validateName.innerHTML = 'Name should not be 20 or more character';
        return 0;
    } else {
        validateName.innerHTML = '';
        return 1;
    }
}

function formateDate(input) {
    var datePart = input.match(/\d+/g),
        year = datePart[2],
        month = datePart[0], day = datePart[1];
    return day + '/' + month + '/' + year;
}

