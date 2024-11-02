// JSON-данные о задачах
const tasks = [
    { "id": 1, "title": "Завершить интерфейс дашборда", "status": "in progress", "priority": "high", "dueDate": "2024-11-10" },
    { "id": 2, "title": "Подготовить презентацию", "status": "completed", "priority": "medium", "dueDate": "2024-11-05" },
    { "id": 3, "title": "Тестирование системы", "status": "pending", "priority": "low", "dueDate": "2024-11-12" },
    { "id": 4, "title": "Обновить документацию", "status": "in progress", "priority": "medium", "dueDate": "2024-11-15" }
];

// Отображение данных в таблице с DataTables
$(document).ready(function() {
    $('#tasksTable').DataTable({
        data: tasks,
        columns: [
            { title: "Задача", data: "title" },
            { title: "Статус", data: "status" },
            { title: "Приоритет", data: "priority" },
            { 
                title: "Срок выполнения", 
                data: "dueDate", 
                render: function(data) {
                    return moment(data).format("DD.MM.YYYY"); 
                }
            }
        ]
    });
});

// Обработка данных для диаграммы статусов задач
const taskStatuses = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
}, {});

// Настройка диаграммы с Chart.js
const ctx = document.getElementById('taskStatusChart').getContext('2d');
const taskStatusChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: Object.keys(taskStatuses),
        datasets: [{
            data: Object.values(taskStatuses),
            backgroundColor: ['#4caf50', '#ffc107', '#f44336', '#2196f3']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' }
        }
    }
});
