document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".addBtn").addEventListener("click", newList);
    document.getElementById("listTitle").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            newList();
        }
    });

    var listsContainer = document.getElementById("listsContainer");

    updateAddListButton();
});

var listsCounter = 0;
var maxLists = 5;

function updateAddListButton() {
    var addListButton = document.querySelector(".addBtn");
    addListButton.style.display = listsCounter >= maxLists ? "none" : "block";
}
function createSortableList(ul) {
    new Sortable(ul, {
        group: {
            name: 'list-group', // Унікальна група для кожного списку
            pull: true,
            put: true
        },
        animation: 150
    });
}

// Створіть Sortable для всіх існуючих списків
var existingLists = document.querySelectorAll('.sortable');
existingLists.forEach(createSortableList);


function newList() {
    if (listsCounter >= maxLists) {
        alert("You cannot add more than " + maxLists + " lists.");
        return;
    }

    var listTitle = document.getElementById("listTitle").value;

    if (listTitle.trim() === "") {
        alert("Please enter a valid list title.");
        return;
    }

    var newListDiv = document.createElement("div");
    newListDiv.classList.add("list");

    var newListTitle = document.createElement("h3");
    newListTitle.textContent = listTitle;
    newListDiv.classList.add("auto-added");
    var newListInput = document.createElement("input");
    newListInput.type = "text";
    newListInput.placeholder = "Add new task...";
    newListInput.onkeypress = function (event) {
        if (event.key === "Enter") {
            newElement(listTitle.toLowerCase().replace(/\s/g, ''), this.value);
            this.value = "";
        }
    };

    document.getElementById("listTitle").value = "";
    updateAddListButton();

    var newListUl = document.createElement("ul");
    newListUl.classList.add("sortable");
    newListUl.dataset.listType = listTitle.toLowerCase().replace(/\s/g, '');

    newListDiv.appendChild(newListTitle);
    newListDiv.appendChild(newListInput);
    newListDiv.appendChild(newListUl);

    if (listsCounter >= maxLists) {
        alert("You cannot add more than " + maxLists + " lists.");
    } else {
        listsContainer.appendChild(newListDiv);

        // Створіть Sortable для нового списку
        createSortableList(newListUl);

        listsCounter++;
    }

    document.getElementById("listTitle").value = "";
    updateAddListButton();

}

function newElement(listType, taskText) {
    if (taskText.trim() === "") {
        alert("Please enter a valid task.");
        return;
    }

    var ul = document.querySelector(`ul[data-list-type="${listType.toLowerCase()}"]`);
    var li = document.createElement("li");
    li.textContent = taskText;

    var deleteBtn = document.createElement("span");
    deleteBtn.textContent = "\u00D7";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.onclick = function () {
        ul.removeChild(li);
    };

    li.appendChild(deleteBtn);
    li.appendChild(document.createTextNode(" "));

    ul.appendChild(li);
}
