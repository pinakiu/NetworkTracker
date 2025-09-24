import React, { useState } from 'react';
import { EventsScreen } from './components/EventsScreen';
import { ContactsScreen } from './components/ContactsScreen';
import { ContactDetailScreen } from './components/ContactDetailScreen';
import { ContactCaptureScreen } from './components/ContactCaptureScreen';
import { FollowupDashboard } from './components/FollowupDashboard';
import { BottomNavigation } from './components/BottomNavigation';

// Types
export interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  tags: string[];
  photoUrl?: string;
  audioUrl?: string;
  needsFollowup: boolean;
  followupDone: boolean;
  eventId: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  contactCount: number;
}

// Sample data
const sampleEvents: Event[] = [
  {
    id: '1',
    name: 'Tech Conference 2024',
    date: '2024-03-15',
    contactCount: 8
  },
  {
    id: '2',
    name: 'Startup Networking Mixer',
    date: '2024-03-20',
    contactCount: 5
  }
];

const sampleContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Engineer',
    company: 'TechCorp',
    tags: ['Mentor', 'Job Lead'],
    needsFollowup: true,
    followupDone: false,
    eventId: '1'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Product Manager',
    company: 'StartupXYZ',
    tags: ['Interesting', 'Follow-up'],
    needsFollowup: true,
    followupDone: true,
    eventId: '1'
  },
  {
    id: '3',
    name: 'Emily Johnson',
    role: 'VP Engineering',
    company: 'InnovateLabs',
    tags: ['Job Lead'],
    needsFollowup: true,
    followupDone: false,
    eventId: '2'
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'events' | 'contacts' | 'contact-detail' | 'capture' | 'followup'>('events');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [contacts, setContacts] = useState<Contact[]>(sampleContacts);

  const selectedEvent = selectedEventId ? events.find(e => e.id === selectedEventId) : null;
  const selectedContact = selectedContactId ? contacts.find(c => c.id === selectedContactId) : null;
  const eventContacts = selectedEventId ? contacts.filter(c => c.eventId === selectedEventId) : [];

  const handleSelectEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentScreen('contacts');
  };

  const handleSelectContact = (contactId: string) => {
    setSelectedContactId(contactId);
    setCurrentScreen('contact-detail');
  };

  const handleAddContact = (contact: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString()
    };
    setContacts(prev => [...prev, newContact]);
    
    // Update event contact count
    if (contact.eventId) {
      setEvents(prev => prev.map(event => 
        event.id === contact.eventId 
          ? { ...event, contactCount: event.contactCount + 1 }
          : event
      ));
    }
    
    setCurrentScreen('events');
  };

  const handleUpdateContact = (updatedContact: Contact) => {
    setContacts(prev => prev.map(c => c.id === updatedContact.id ? updatedContact : c));
  };

  const handleNavigate = (screen: 'events' | 'capture' | 'followup' | 'profile') => {
    if (screen === 'profile') return; // Placeholder
    setCurrentScreen(screen);
  };

  const handleBackToEvents = () => {
    setCurrentScreen('events');
    setSelectedEventId(null);
    setSelectedContactId(null);
  };

  const handleBackToContacts = () => {
    setCurrentScreen('contacts');
    setSelectedContactId(null);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'events':
        return (
          <EventsScreen 
            events={events}
            onSelectEvent={handleSelectEvent}
          />
        );
      case 'contacts':
        return (
          <ContactsScreen
            event={selectedEvent}
            contacts={eventContacts}
            onSelectContact={handleSelectContact}
            onBack={handleBackToEvents}
          />
        );
      case 'contact-detail':
        return (
          <ContactDetailScreen
            contact={selectedContact}
            onBack={handleBackToContacts}
            onUpdateContact={handleUpdateContact}
          />
        );
      case 'capture':
        return (
          <ContactCaptureScreen
            events={events}
            onAddContact={handleAddContact}
            onBack={() => setCurrentScreen('events')}
          />
        );
      case 'followup':
        return (
          <FollowupDashboard
            contacts={contacts}
            events={events}
            onUpdateContact={handleUpdateContact}
            onSelectContact={handleSelectContact}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground flex flex-col max-w-md mx-auto relative">
      {/* Mobile app container */}
      <div className="flex-1 overflow-hidden">
        {renderCurrentScreen()}
      </div>
      <BottomNavigation 
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
      />
    </div>
  );
}