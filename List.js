document.addEventListener('DOMContentLoaded', function () {
    var taskInput = document.getElementById('taskInput');
    var addTaskButton = document.getElementById('addTaskButton');
    var viewTasksButton = document.getElementById('viewTasksButton');
    var clearTasksButton = document.getElementById('clearTasksButton');
    var taskList = document.getElementById('taskList');
    var tasks = [];
    var isTasksVisible = false; // لتتبع حالة العرض
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function (task, index) {
            var li = document.createElement('li');
            li.textContent = task;
            li.dataset.index = index.toString();
            taskList.appendChild(li);
            // عند الضغط مرتين على المهمة
            li.addEventListener('dblclick', function () {
                if (li.style.backgroundColor === 'red') {
                    li.style.backgroundColor = ''; // إعادة اللون الأصلي
                }
                else {
                    li.style.backgroundColor = 'red'; // تحويل اللون إلى الأحمر
                }
            });
        });
    }
    function toggleTasksVisibility() {
        if (isTasksVisible) {
            hideTasks();
            viewTasksButton.textContent = 'Show';
        }
        else {
            renderTasks();
            showTasks();
            viewTasksButton.textContent = 'Hide';
        }
        isTasksVisible = !isTasksVisible;
    }
    function showTasks() {
        taskList.classList.remove('hidden');
    }
    function hideTasks() {
        taskList.classList.add('hidden');
    }
    addTaskButton.addEventListener('click', function () {
        var task = taskInput.value.trim();
        if (task) {
            tasks.push(task);
            taskInput.value = '';
            hideTasks();
        }
    });
    viewTasksButton.addEventListener('click', function () {
        toggleTasksVisibility();
    });
    clearTasksButton.addEventListener('click', function () {
        tasks.length = 0;
        renderTasks();
        hideTasks();
        viewTasksButton.textContent = 'Show'; // إعادة النص إلى Show بعد مسح المهام
        isTasksVisible = false;
    });
    taskList.addEventListener('mouseover', function (event) {
        var target = event.target;
        if (target.tagName === 'LI' && target.style.backgroundColor !== 'red') {
            target.style.backgroundColor = '#e9ecef'; // التغيير فقط إن لم يكن أحمر
        }
    });
    taskList.addEventListener('mouseout', function (event) {
        var target = event.target;
        if (target.tagName === 'LI' && target.style.backgroundColor !== 'red') {
            target.style.backgroundColor = ''; // إزالة التأثير فقط إن لم يكن أحمر
        }
    });
});
