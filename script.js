document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".addBtn").addEventListener("click", newList);
    document.getElementById("listTitle").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            newList();
        }
    });

    var lists = document.querySelectorAll(".sortable");
    lists.forEach(function (list) {
        new Sortable(list, {
            group: 'shared',
            animation: 150
        });
    });
});

var listsCounter = 0;
var maxLists = 5;

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

    var newListUl = document.createElement("ul");
    newListUl.classList.add("sortable");
    newListUl.dataset.listType = listTitle.toLowerCase().replace(/\s/g, ''); // Унікальний ідентифікатор для кожного списку

    newListDiv.appendChild(newListTitle);
    newListDiv.appendChild(newListInput);
    newListDiv.appendChild(newListUl);

    var listsContainer = document.getElementById("listsContainer");

    // Перевіряємо, чи не перевищено допустиму кількість списків
    if (listsCounter >= maxLists) {
        alert("You cannot add more than " + maxLists + " lists.");
    } else {
        // Додаємо новий список як зазвичай
        listsContainer.appendChild(newListDiv);

        // Ініціалізуємо Sortable для новоствореного списку
        new Sortable(newListUl, {
            group: 'shared',
            animation: 150
        });

        listsCounter++;
    }

    // Очищаємо поле вводу після додавання списку
    document.getElementById("listTitle").value = "";
}

function newElement(listType, taskText) {
    var ul = document.querySelector(`ul[data-list-type="${listType.toLowerCase()}"]`);
    var li = document.createElement("li");
    li.textContent = taskText;

    ul.appendChild(li);
}
