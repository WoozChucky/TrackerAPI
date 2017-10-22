function insertValue() {
    var keyInput = document.getElementById('key');
    var valueInput = document.getElementById('value');

    var request = {
        key : keyInput.value,
        value : valueInput.value
    };

    $.ajax(
        {
            type: 'POST',
            data: request,
            url: '../api/admin/config/add',
            dataType : 'json',
            success: (response) => {
                console.log(response);
                if(elementExists(keyInput.value)) {
                    console.log(true);
                    updateRow(keyInput.value, valueInput.value);
                } else {
                    console.log(false);
                    insertRow(keyInput.value, valueInput.value);
                } 
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(textStatus, errorThrown);
            }
        }
    );

}

function loadValues() {
    showLoading('loading', 'config_table');
    $.ajax(
        {
            type: 'GET',
            url: '../api/admin/config',
            dataType : 'json',
            success: (response) => {
                Object.keys(response).map(e => {
                    //console.log(`key=${e}  value=${response[e].value}`);
                    insertRow(e, response[e].value);
                });
                hideLoading('loading', 'config_table');
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(textStatus, errorThrown);
            }
        }
    );
}

function onRemove(key) {
    $.ajax(
        {
            type: 'DELETE',
            url: '../api/admin/config/' + key.textContent,
            dataType : 'json',
            success: (response) => {
                console.log(response);
                deleteRow(key);
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(textStatus, errorThrown);
            }
        }
    );
}

/* Table Helper Functions below */

function insertRow(key, value) {
    // Get the table body reference
    var tbody = document.getElementById('config_table').getElementsByTagName('tbody')[0];

    // Insert a row in the table at the last row
    var newRow   = tbody.insertRow(tbody.rows.length);

    // Create the table divisions
    var keyTD = document.createElement('td');
    var valueTD = document.createElement('td');
    var optionsTD = document.createElement('td');

    // Assign the text elements
    var keyText  = document.createTextNode(key);
    var valueText = document.createTextNode(value);

    // Create the remove button
    var removeButton = document.createElement("button");
    removeButton.setAttribute('class', 'btn btn-default btn-xs');
    removeButton.setAttribute('type', 'button');
    removeButton.setAttribute('onclick', 'onRemove(' + key + ')');

    // Create the remove span
    var removeSpan = document.createElement('span');
    removeSpan.setAttribute('class', 'glyphicon glyphicon-remove');
    removeSpan.setAttribute('aria-hidden', 'true');
    removeSpan.textContent = ' Remove';

    //Append the span to the button
    removeButton.appendChild(removeSpan);

    // Append the texts/buttons to table divisions and set ids
    keyTD.appendChild(keyText);
    keyTD.setAttribute("id", key);
    valueTD.appendChild(valueText);
    valueTD.setAttribute("id", key + '' + value);
    optionsTD.appendChild(removeButton);
    
    // Append the table divisions to the row
    newRow.appendChild(keyTD);
    newRow.appendChild(valueTD);
    newRow.appendChild(optionsTD);
}

function elementExists(key) {
    var tbody = document.getElementById('config_table').getElementsByTagName('tbody')[0];
    var numRows = tbody.childNodes.length;
    var contains = false;

    for(var i = 0; i < numRows; i++) {
        if(i == 0) continue;
        var content = tbody.childNodes[i].childNodes[0].textContent;
        contains = content.indexOf(key) !== -1;
        if(contains) return true;
    }
    return false;
}

function updateRow(key, value) {
    var tbody = document.getElementById('config_table').getElementsByTagName('tbody')[0];
    var numRows = tbody.childNodes.length;
    var contains = false;

    for(var i = 0; i < numRows; i++) {
        if(i == 0) continue;
        var content = tbody.childNodes[i].childNodes[0].textContent;
        var previousValue = tbody.childNodes[i].childNodes[1].textContent;
        contains = content.indexOf(key) !== -1;
        if(contains) {
            var element = document.getElementById(key + '' + previousValue);
            element.textContent = value;
            element.id = key + '' + value;
            contains = false;
        }
    }
}

function deleteRow(key) {
    var childElement = document.getElementById(key.textContent);
    var tableRow = childElement.parentElement;
    var tableBody = tableRow.parentElement;
    tableBody.removeChild(tableRow);
}