import NDK from '@nostr-dev-kit/ndk';
import { LinkCategories } from '../types/LinkCategories';

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

      console.log(filteredEvents);
    
      const parsedEvents = Array.from(filteredEvents).map((event) => {
        return {...JSON.parse(event.content), pubkey: event.pubkey};
      });

      console.log(parsedEvents);
     
      return parsedEvents;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
}

export async function fetchProjectLinks(pubkey: string) {
  try {
    
    await ndk.connect();

    const criteria = {
      kinds: [30001],
      authors: [pubkey]
    };

    const event = await ndk.fetchEvent(criteria);

    if (!event) {
      return [];
    }

    const links = event.tags.reduce((acc, tag) => {
      if (tag[0] === 'r') {
        acc.push(tag[1]);
      }

      return acc;
    }, []);

    if (links.length === 0) {
      return null;
    }

    return categorizeLinks(links);
  } catch (error) {
    console.error('Error fetching creator:', error);
    throw error;
  }
}

function categorizeLinks(links: string[]): LinkCategories {
  const categorizedLinks: LinkCategories = {
    github: '',
    twitter: '',
    instagram: '',
    nostr: '',
    other: []
  };

  links.forEach(link => {
    if (link.includes('github')) {
      categorizedLinks.github = link;
    } else if (link.includes('twitter')) {
      categorizedLinks.twitter = link;
    } else if (link.includes('instagram')) {
      categorizedLinks.instagram = link;
    } else if (link.includes('npub')) {
      categorizedLinks.nostr = link;
    } else {
      categorizedLinks.other.push(link);
    }
  });

  return categorizedLinks;
}