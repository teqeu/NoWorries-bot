export default {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Online as ${client.user.tag}`);

    client.user.setPresence({
      status: 'dnd', 
      activities: [
        {
          name: 'we love noworriesBot',
          type: 4 // customActivity = 4
        }
      ]
    });

    console.log('Presence attempted to set (DND may not show on all clients).');
  }
};
