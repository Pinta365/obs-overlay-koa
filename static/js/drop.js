let drops = [];

function createDrop(url, username, isAvatar) {
    const div = document.createElement('div');
    div.className = 'drop';
    div.innerHTML = `  
        <h1 class="username">${username}</h1>
        <img class="balloon" src="/images/balloon.png" />
        <div class="user-image">
            <img class="${isAvatar ? 'avatar' : 'emote'}"
            src="${url}" /> 
        </div>
    `;
     
    return div;
}

function doDrop(url, username = 'none', isAvatar = false) {
    const element = createDrop(url, username, isAvatar);

    drop = {
        element: element,
        location: {
            x: window.innerWidth * Math.random(),
            y: window.innerHeight

        },
        velocity: {
            x: Math.random() * (Math.random() > 0.5 ? -1 : 1) * 8,
            y: 2 + Math.random() * 1
        },
        goingUp: true
    }
    drops.push(drop);
    document.body.appendChild(element);
    updateDropPosition(drop);

}

function updateDropPosition(drop) {
    if (drop.done) return;
    drop.element.style.top = drop.location.y + 'px';
    drop.element.style.left = (drop.location.x - (drop.element.clientWidth / 2)) + 'px';
}

function updateDrops() {
    drops.forEach(drop => {

        if (drop.done) /* This drop is done */
            return; 

        /* Calculate drop location and direction */        
        const elementBoundX = drop.element.clientWidth / 2;
        const elementBoundY = drop.element.clientHeight;

        if (drop.goingUp) { /* Going up */
            drop.location.x += drop.velocity.x;
            drop.location.y -= drop.velocity.y;            

            if (drop.location.x + elementBoundX >= window.innerWidth) {
                drop.velocity.x = -Math.abs(drop.velocity.x);
            } else if (drop.location.x - elementBoundX < 0) {
                drop.velocity.x = Math.abs(drop.velocity.x);
            }

            if (drop.location.y <= 0) {
                drop.velocity.y = 3;
                drop.velocity.x = 0;                
                drop.goingUp = false;
                drop.element.classList.add('goingDown');
                
            }
        } else { /* Going down */
            
            drop.location.y += drop.velocity.y;

            if (drop.location.y >= window.innerHeight-elementBoundY) {
                drop.location.y = window.innerHeight-elementBoundY;
                drop.element.classList.add('done');
                drop.done = true;                
                drops = drops.filter(d => d != drop);
                setTimeout(() => {
                    document.body.removeChild(drop.element);
                }, 4000);
                
            }
            
        }

        /* Update drop */
        updateDropPosition(drop);
    });
}

function runLoop() {
    updateDrops();
    requestAnimationFrame(runLoop);
}

runLoop();






function testing() {
    const emotes = [
        'https://static-cdn.jtvnw.net/emoticons/v2/354/default/dark/2.0',
        'https://static-cdn.jtvnw.net/emoticons/v2/86/default/dark/2.0'
    
    ].forEach(url => {
        doDrop(url, 'Test');
    });
    doDrop('https://static-cdn.jtvnw.net/user-default-pictures-uv/ebe4cd89-b4f4-4cd9-adac-2f30151b4209-profile_image-70x70.png', 'Pintaland', true);
}

testing();