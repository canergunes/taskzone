// Kullanıcı kontrolü
const user = localStorage.getItem("taskzone_user");
if (!user) {
  window.location.href = "index.html";
}

// Tema kontrolü
window.onload = () => {
  const theme = localStorage.getItem("taskzone_theme");
  if (theme === "dark") document.body.classList.add("dark");
  document.getElementById("greeting").textContent = `Merhaba, ${user}!`;
  loadTasks();
};

// Tema değiştir
function toggleTheme() {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("taskzone_theme", theme);
}

// Çıkış yap
function logout() {
  localStorage.removeItem("taskzone_user");
  window.location.href = "index.html";
}

// Görevleri yükle
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem(`${user}_tasks`)) || [];
  const list = document.getElementById("taskList");
  const filter = document.getElementById("filter")?.value || "all";
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      (filter === "done" && !task.done) ||
      (filter === "undone" && task.done)
    ) return;

    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");

    li.onclick = () => toggleTask(index);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Sil";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

// Görev ekle
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (!text) return;

  const tasks = JSON.parse(localStorage.getItem(`${user}_tasks`)) || [];
  tasks.push({ text, done: false });
  localStorage.setItem(`${user}_tasks`, JSON.stringify(tasks));
  input.value = "";
  loadTasks();
}

// Tamamlandı işaretle
function toggleTask(index) {
  const tasks = JSON.parse(localStorage.getItem(`${user}_tasks`));
  tasks[index].done = !tasks[index].done;
  localStorage.setItem(`${user}_tasks`, JSON.stringify(tasks));
  loadTasks();
}

// Görev sil
function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem(`${user}_tasks`));
  tasks.splice(index, 1);
  localStorage.setItem(`${user}_tasks`, JSON.stringify(tasks));
  loadTasks();
}
