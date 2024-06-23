const teamList = document.getElementById('team-list');
const addTeamForm = document.getElementById('add-team-form');
const addTeamBtn = document.getElementById('add-team-btn');

// Fetch team list from API
fetch('http://localhost:8080/Teams')
    .then(response => response.json())
    .then(teams => {
        teams.forEach(team => {
            const teamListItem = document.createElement('li');
            teamListItem.textContent = team.name;
            teamList.appendChild(teamListItem);
        });
    })
    .catch(error => console.error(error));

// Add team form submission handler
addTeamForm.addEventListener('submit', event => {
    event.preventDefault();
    const teamData = {
        name: document.getElementById('name').value,
        color: document.getElementById('color').value,
        country: document.getElementById('country').value,
        league: document.getElementById('league').value,
        titles: parseInt(document.getElementById('titles').value)
    };

    fetch('http://localhost:8080/Teams', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teamData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Add new team to the list
        const newTeamListItem = document.createElement('li');
        newTeamListItem.textContent = teamData.name;
        teamList.appendChild(newTeamListItem);
    })
    .catch(error => console.error(error));
});