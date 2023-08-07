
let currentEditRow = null;


function addEntry() 
{
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="txtgender"]:checked').value;
    var dob = document.getElementById("txtdob").value;
    const contactNumber = document.getElementById("contactNumber").value;
    var email = document.getElementById("txtemail").value;
    const hobbies = [];
    if (document.getElementById("hobby1").checked) hobbies.push("Cricket");
    if (document.getElementById("hobby2").checked) hobbies.push("Chess");
    if (document.getElementById("hobby3").checked) hobbies.push("Music");
    var resultName = validateField();
    var resultDob = dateNotAllowed();
    if (resultName && resultDob) {
        const dataTable = document.getElementById("dataTable");
        let newRow;

        if (currentEditRow) {
            newRow = currentEditRow;
            currentEditRow = null;
        }
        else {
            //insert
            newRow = dataTable.insertRow(dataTable.rows.length);
        }

        newRow.innerHTML = "";

        const nameCell = newRow.insertCell(0);
        nameCell.textContent = name;

        const genderCell = newRow.insertCell(1);
        genderCell.textContent = gender;

        const dobCell = newRow.insertCell(2);
        const formatedob = formateDate(dob)
        dobCell.textContent = formatedob;

        const emailCell = newRow.insertCell(3);
        emailCell.textContent = email;

        const contactCell = newRow.insertCell(4);
        contactCell.textContent = contactNumber;

        const hobbiesCell = newRow.insertCell(5);
        hobbiesCell.textContent = hobbies.join(", ");

        const actionsCell = newRow.insertCell(6);
        actionsCell.innerHTML =
            '<button class="editBtn" onclick="editEntry(this)">Edit</button> <button class="deleteBtn" onclick="deleteEntry(this)">Delete</button>';

        document.getElementById("name").value = "";
        document.getElementById("contactNumber").value = "";
        document.getElementById("txtdob").value = "";
        document.getElementById("txtemail").value = "";
        document.getElementById("hobby1").checked = false;
        document.getElementById("hobby2").checked = false;
        document.getElementById("hobby3").checked = false;

        updateTable();
        updateAdvancedTable();
    }
}

/*insert data for advanced table*/
function updateAdvancedTable() {
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
        for (let i = 1; i < dataTable.rows.length; i++) {
            headerRow.insertCell(i).textContent = `Data${i}`;
        }
        
        const attributes = ["Name", "Gender", "DOB", "Email", "Contact Number", "Hobbies", "Actions"];
        for (let i = 0; i < attributes.length; i++) 
        {
            
            console.log(attributes[i])
            const newRow = advancedTable.insertRow(advancedTable.rows.length);
            newRow.insertCell(0).textContent = attributes[i];
            
            for (let j = 1; j < dataTable.rows.length; j++) 
            {
                if (i != 6) 
                {
                    newRow.insertCell(j).textContent = dataTable.rows[j].cells[i].textContent;
                } 
                else 
                {
                    newRow.insertCell(j).innerHTML = `<button onclick="editFromAdvance(${j})">Edit</button> <button onclick="deleteFromAdvance(${j})">Delete</button>`;
                }
            }
        }
    }
}

function editFromAdvance(rowNum) {
    const dataTable = document.getElementById("dataTable");
    var row = dataTable.rows[rowNum];
    var btn = row.querySelector(".editBtn");
    btn.click();
}

function deleteFromAdvance(rowNum) {
    const dataTable = document.getElementById("dataTable");
    var row = dataTable.rows[rowNum];
    var btn = row.querySelector(".deleteBtn");
    btn.click();
}

function editEntry(button) {
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

    if (gender == 'Male') {
        document.getElementById('txtgender1').checked = true;
    }
    else {
        document.getElementById('txtgender2').checked = true;
    }

    document.getElementById("hobby1").checked = hobbies.includes("Cricket");
    document.getElementById("hobby2").checked = hobbies.includes("Chess");
    document.getElementById("hobby3").checked = hobbies.includes("Music");

    currentEditRow = row;
}

function deleteEntry(button) {
    const row = button.parentNode.parentNode;
    row.remove();

    updateTable();
    updateAdvancedTable();
}

function updateTable() {
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

function NoData() {
    updateTable();
}

function dateNotAllowed() {
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

