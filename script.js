// Simulación de una base de datos de usuarios
const users = [
    { id: 1, username: "admin", password: "admin123" },
    { id: 2, username: "user", password: "user123" }
];

// Simulación de una base de datos SQL
const sqlDatabase = [
    { id: 1, name: "users", columns: ["id", "username", "password"] },
    { id: 2, name: "products", columns: ["id", "name", "price"] }
];

// Mostrar la pestaña seleccionada
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
    document.getElementById('welcome-image').style.display = 'none'; // Oculta la imagen de bienvenida
}

// Login Vulnerable (simula SQL Injection)
function loginVulnerable() {
    const username = document.getElementById('username-vuln').value;
    const password = document.getElementById('password-vuln').value;
    const resultDiv = document.getElementById('result-vuln');

    // Simulación de una consulta SQL vulnerable
    const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
    const user = users.find(u => u.username === username && u.password === password);

    // Simulación de acceso a SQL Server
    if (user || query.includes("' OR '1'='1") || query.includes("--") || query.includes("UNION") || query.includes("DROP")) {
        showProtectedArea(username);
        resultDiv.textContent = "Inicio de sesión exitoso (Vulnerable).";
        resultDiv.className = "result success";

        // Mostrar modal con datos simulados de la base de datos
        showModal(sqlDatabase);
    } else {
        resultDiv.textContent = "Credenciales incorrectas (Vulnerable).";
        resultDiv.className = "result error";
    }
    resultDiv.style.display = 'block';
}

// Login Seguro (protegido contra SQL Injection)
function loginSeguro() {
    const username = document.getElementById('username-secure').value;
    const password = document.getElementById('password-secure').value;
    const resultDiv = document.getElementById('result-secure');

    // Simulación de una consulta SQL segura (prepared statements)
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        showProtectedArea(username);
        resultDiv.textContent = "Inicio de sesión exitoso (Seguro).";
        resultDiv.className = "result success";

        // Mostrar modal de bienvenida
        showWelcomeModal();
    } else {
        resultDiv.textContent = "Credenciales incorrectas (Seguro).";
        resultDiv.className = "result error";
    }
    resultDiv.style.display = 'block';
}

// Mostrar el área protegida
function showProtectedArea(username) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    document.getElementById('protected-area').style.display = 'block';
    document.getElementById('logged-user').textContent = username;
}

// Cerrar sesión
function logout() {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    document.getElementById('login-vulnerable').style.display = 'block';
}

// Mostrar modal con datos de la base de datos
function showModal(database) {
    const modal = document.getElementById('database-modal');
    const modalSqlData = document.getElementById('modal-sql-data');
    modalSqlData.textContent = JSON.stringify(database, null, 2);
    modal.style.display = 'block';
}

// Mostrar modal de bienvenida
function showWelcomeModal() {
    const modal = document.getElementById('welcome-modal');
    modal.style.display = 'block';
}

// Cerrar modal
function closeModal() {
    const databaseModal = document.getElementById('database-modal');
    databaseModal.style.display = 'none';
    const welcomeModal = document.getElementById('welcome-modal');
    welcomeModal.style.display = 'none';
}