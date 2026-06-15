let jokeCount = 0;
let currentJoke = '';

// Hämta ett skämt från API
async function getJoke() {
    const jokeText = document.getElementById('jokeText');
    const getJokeBtn = document.getElementById('getJokeBtn');
    
    // Sätt loading-tillstånd
    jokeText.textContent = 'Hämtar ett skämt...';
    jokeText.classList.add('loading');
    getJokeBtn.disabled = true;
    
    try {
        // Använd JokeAPI
        const response = await fetch('https://v2.jokeapi.dev/joke/Any?lang=sv');
        const data = await response.json();
        
        // Formatera skämet beroende på typ
        if (data.type === 'single') {
            currentJoke = data.joke;
        } else {
            currentJoke = `${data.setup}\n\n${data.delivery}`;
        }
        
        // Visa skämet
        jokeText.textContent = currentJoke;
        jokeText.classList.remove('loading');
        getJokeBtn.disabled = false;
        
        // Öka räknaren
        jokeCount++;
        document.getElementById('counter').textContent = jokeCount;
        
    } catch (error) {
        console.error('Fel vid hämtning av skämt:', error);
        jokeText.textContent = 'Oops! Det gick något fel. Försök igen!';
        jokeText.classList.remove('loading');
        getJokeBtn.disabled = false;
    }
}

// Dela skämet
function shareJoke() {
    if (!currentJoke) {
        alert('Hämta ett skämt först!');
        return;
    }
    
    const text = `Här är ett skämt jag hittat: "${currentJoke}"`;
    
    // Om Web Share API finns
    if (navigator.share) {
        navigator.share({
            title: 'Skrattkväll',
            text: text
        });
    } else {
        // Fallback: kopiera till urklipp
        navigator.clipboard.writeText(text);
        alert('Skämt kopierat till urklipp! 📋');
    }
}

// Event listeners
document.getElementById('getJokeBtn').addEventListener('click', getJoke);
document.getElementById('shareBtn').addEventListener('click', shareJoke);

// Få ett skämt när sidan laddar
window.addEventListener('load', () => {
    getJoke();
});
