const resultsContainer = document.getElementById('results');
const allResultBtn = document.getElementById('AllResult');
const oneResultBtn = document.getElementById('OneResult');

function displayResults(data) {
    resultsContainer.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h4 class="card-id mb-1 text-muted"> ${item.id}</h4>
                    <h5 class="card-title mb-2 fs-6">${item.title}</h5>
                    <p class="card-text small mb-0">${item.body}</p>
                </div>
            </div>
        `;
        resultsContainer.appendChild(card);
    });
}


function fetchAllResults() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
            displayResults(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function fetchOneResult() {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            displayResults([response.data]);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

allResultBtn.addEventListener('click', fetchAllResults);
oneResultBtn.addEventListener('click', fetchOneResult);