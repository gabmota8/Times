document.addEventListener('DOMContentLoaded', function() {
    const teamForm = document.getElementById('teamForm'); // Formulário de adição de time
    const teamList = document.getElementById('teamList'); // Lista de times
    
    if (!teamForm || !teamList) {
        console.error('Elemento(s) não encontrado(s): Verifique se os elementos "teamForm" e "teamList" existem no DOM.');
        return;
    }

    const apiUrl = 'http://localhost:8080/Teams'; // URL da API
    
    // Função para buscar todos os times
    function fetchTeams() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                teamList.innerHTML = ''; // Limpa a lista de times
                data.forEach(team => {
                    const li = document.createElement('li'); // Cria um item de lista para cada time
                    li.innerHTML = `
                        <span>${team.name} (${team.color}) - ${team.country} - ${team.league} - ${team.titles}</span>
                        <button onclick="deleteTeam('${team.name}')">Delete</button> <!-- Botão para deletar o time -->
                    `;
                    teamList.appendChild(li); // Adiciona o item de lista à lista de times
                });
            })
            .catch(error => console.error('Erro ao buscar times:', error)); // Adiciona tratamento de erro
    }
    
    // Event listener para adicionar um novo time
    teamForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário
        
        const newTeam = {
            name: document.getElementById('name').value,
            color: document.getElementById('color').value,
            country: document.getElementById('country').value,
            league: document.getElementById('league').value,
            titles: document.getElementById('titles').value
        };
        
        fetch(apiUrl, {
            method: 'POST', // Método POST para adicionar um novo time
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTeam) // Converte o objeto JavaScript para JSON
        })
        .then(response => response.json())
        .then(() => {
            fetchTeams(); // Atualiza a lista de times
            teamForm.reset(); // Reseta o formulário
        })
        .catch(error => console.error('Erro ao adicionar time:', error)); // Adiciona tratamento de erro
    });
    
    // Função para deletar um time
    window.deleteTeam = function(name) {
        fetch(`${apiUrl}/${name}`, {
            method: 'DELETE' // Método DELETE para remover o time
        })
        .then(response => response.text())
        .then(() => {
            fetchTeams(); // Atualiza a lista de times
        })
        .catch(error => console.error('Erro ao deletar time:', error)); // Adiciona tratamento de erro
    };
    
    fetchTeams(); // Busca todos os times ao carregar a página
});
