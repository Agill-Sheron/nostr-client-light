import NDK from '@nostr-dev-kit/ndk';

const ndk = new NDK({
  explicitRelayUrls: ['wss://relay.geyser.fund']
});

export async function fetchProjectEvents() {
    try {
      await ndk.connect();
  
      const criteria = {
        kinds: [0], 
      };
  
      const events = await ndk.fetchEvents(criteria);
      
      //Using UNIX Timestamp
      const nowInSeconds = Math.floor(Date.now() / 1000);
      const thirtyDaysInSeconds = 60 * 60 * 24 * 30;
  
      // Filter events to only include those from the last 30 days
      const filteredEvents = Array.from(events).filter(event => {
        return event.created_at ? event.created_at > nowInSeconds - thirtyDaysInSeconds : false;
      });
    
      const parsedEvents = Array.from(filteredEvents).map((event) => {
        return JSON.parse(event.content);
      });
     
      return parsedEvents;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }
