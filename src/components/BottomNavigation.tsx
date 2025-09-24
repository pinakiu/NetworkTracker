import React from 'react';
import { Calendar, Plus, CheckSquare, User } from 'lucide-react';

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: 'events' | 'capture' | 'followup' | 'profile') => void;
}

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'capture', icon: Plus, label: 'Capture' },
    { id: 'followup', icon: CheckSquare, label: 'Follow-ups' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="bg-card border-t border-border px-2 py-1 safe-area-bottom">
      <div className="flex justify-around">
        {navItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onNavigate(id as any)}
            className={`flex flex-col items-center p-3 rounded-lg min-h-[60px] min-w-[60px] transition-colors active:scale-95 ${
              currentScreen === id
                ? 'text-cta bg-cta/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent active:bg-accent/70'
            }`}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}