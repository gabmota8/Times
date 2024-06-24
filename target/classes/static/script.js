const teamList = document.getElementById('team-list');
const addTeamForm = document.getElementById('add-team-form');
const notification = document.getElementById('notification');

// Função para mostrar notificações
function showNotification(message, type) {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Carregar times do Local Storage
function loadTeams() {
    const teams = JSON.parse(localStorage.getItem('teams')) || [];
    teams.forEach(team => {
        addTeamToDOM(team);
    });
}

// Salvar times no Local Storage
function saveTeams(teams) {
    localStorage.setItem('teams', JSON.stringify(teams));
}

// Adicionar time ao DOM
function addTeamToDOM(team) {
    const teamListItem = document.createElement('li');
    teamListItem.textContent = `${team.name} (${team.color}, ${team.country}, ${team.league}, Titles: ${team.titles})`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        let teams = JSON.parse(localStorage.getItem('teams')) || [];
        teams = teams.filter(t => t.name !== team.name);
        saveTeams(teams);
        updateTeamList();
        showNotification('Team deleted successfully', 'success');
    });

    teamListItem.appendChild(deleteButton);
    teamList.appendChild(teamListItem);
}

// Validar entrada do formulário
function validateForm(teamData) {
    return teamData.name && teamData.color && teamData.country && teamData.league && !isNaN(teamData.titles);
}

// Manipulador de submissão do formulário
addTeamForm.addEventListener('submit', event => {
    event.preventDefault();
    const teamData = {
        name: document.getElementById('name').value,
        color: document.getElementById('color').value,
        country: document.getElementById('country').value,
        league: document.getElementById('league').value,
        titles: parseInt(document.getElementById('titles').value)
    };

    if (!validateForm(teamData)) {
        showNotification('Please fill out all fields correctly', 'error');
        return;
    }

    let teams = JSON.parse(localStorage.getItem('teams')) || [];
    teams.push(teamData);
    saveTeams(teams);
    updateTeamList();
    showNotification('Team added successfully', 'success');
    addTeamForm.reset();
});

// Atualizar lista de times no DOM
function updateTeamList() {
    teamList.innerHTML = '';
    loadTeams();
}

// Carregar times do Local Storage quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    updateTeamList();
});

// Fetch team list from API (this part will be updated if necessary)
fetch('http://localhost:8080/Teams')
    .then(response => response.json())
    .then(teams => {
        teams.forEach(team => {
            addTeamToDOM(team);
        });
    })
    .catch(error => console.error(error));
