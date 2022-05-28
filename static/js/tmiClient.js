function setupTmiClient(oauth) {
    const prefix = '!';
    const channel = 'torkel_bot';
    const client = new tmi.Client({
        options: { debug: true },
        identity: {
            username: "torkel_bot",
            password: oauth,
        },
        channels: [channel],
    });

    client.connect();

    client.on('connected', async (addr, port) => {
        console.log(`Connected to ${addr}:${port}`);
    });

    client.on("message", async (channel, tags, message, self) => {
     
        if (self || channel !== channel)
            return;
        if (!message.startsWith(prefix))
            return;
           
        const args = message.slice(prefix.length).split(' ');
        const botCommands = ['balloon', 'drop'];
        const command = args.shift().toLowerCase();

        if (botCommands.includes(command)) {

            if (tags.emotes) {

                const emotes = Object.keys(tags.emotes);

                doDrop(`https://static-cdn.jtvnw.net/emoticons/v2/${emotes[Math.floor(Math.random() * emotes.length)]}/default/dark/2.0`, tags['display-name'] || tags.username);

            } else {

                // Här tänkte jag köra profilbilden istället. Placeholder så länge
                doDrop(`https://static-cdn.jtvnw.net/emoticons/v2/7/default/dark/2.0`, tags['display-name'] || tags.username);

            }


        }
    });
}
