function updateClocks() {
    const timezones = document.querySelectorAll('.timezone');
    
    timezones.forEach(tz => {
        const timezone = tz.getAttribute('data-timezone');
        const now = new Date();
        
        // Skapa en formatter för den specifika tidszonen
        const formatter = new Intl.DateTimeFormat('sv-SE', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        
        const parts = formatter.formatToParts(now);
        
        // Extrahera tid
        let time = '';
        let date = '';
        
        parts.forEach(part => {
            if (part.type === 'hour') time += part.value;
            if (part.type === 'literal' && part.value === ':') time += ':';
            if (part.type === 'minute') time += part.value;
            if (part.type === 'second') time += ':' + part.value;
        });
        
        // Extrahera datum
        parts.forEach(part => {
            if (part.type === 'year') date += part.value;
            if (part.type === 'month') date += '/' + part.value;
            if (part.type === 'day') date += '/' + part.value;
        });
        
        tz.querySelector('.time').textContent = time;
        tz.querySelector('.date').textContent = date;
    });
}

// Uppdatera klockan varje sekund
updateClocks();
setInterval(updateClocks, 1000);
