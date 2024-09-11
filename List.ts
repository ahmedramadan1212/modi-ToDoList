document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput') as HTMLInputElement;
    const addTaskButton = document.getElementById('addTaskButton') as HTMLButtonElement;
    const viewTasksButton = document.getElementById('viewTasksButton') as HTMLButtonElement;
    const clearTasksButton = document.getElementById('clearTasksButton') as HTMLButtonElement;
    const taskList = document.getElementById('taskList') as HTMLUListElement;
  
    const tasks: string[] = [];
    let isTasksVisible = false; // لتتبع حالة العرض
  
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;
            li.dataset.index = index.toString();
            taskList.appendChild(li);
  
            // عند الضغط مرتين على المهمة
            li.addEventListener('dblclick', () => {
                if (li.style.backgroundColor === 'red') {
                    li.style.backgroundColor = ''; // إعادة اللون الأصلي
                } else {
                    li.style.backgroundColor = 'red'; // تحويل اللون إلى الأحمر
                }
            });
        });
    }
  
    function toggleTasksVisibility() {
        if (isTasksVisible) {
            hideTasks();
            viewTasksButton.textContent = 'Show';
        } else {
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
  
    addTaskButton.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            tasks.push(task);
            taskInput.value = '';
            hideTasks(); 
        }
    });
  
    viewTasksButton.addEventListener('click', () => {
        toggleTasksVisibility();
    });
  
    clearTasksButton.addEventListener('click', () => {
        tasks.length = 0;
        renderTasks();
        hideTasks(); 
        viewTasksButton.textContent = 'Show'; // إعادة النص إلى Show بعد مسح المهام
        isTasksVisible = false;
    });
  
    taskList.addEventListener('mouseover', (event) => {
        const target = event.target as HTMLElement;
        if (target.tagName === 'LI' && target.style.backgroundColor !== 'red') {
            target.style.backgroundColor = '#e9ecef'; // التغيير فقط إن لم يكن أحمر
        }
    });
  
    taskList.addEventListener('mouseout', (event) => {
        const target = event.target as HTMLElement;
        if (target.tagName === 'LI' && target.style.backgroundColor !== 'red') {
            target.style.backgroundColor = ''; // إزالة التأثير فقط إن لم يكن أحمر
        }
    });
});
  