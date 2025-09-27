import React from 'react';
import { User, Settings, Bell, HelpCircle, LogOut, ChevronRight, Download } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ProfileScreenProps {
  onBack: () => void;
}

export function ProfileScreen({ onBack }: ProfileScreenProps) {
  const profileItems = [
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings',
      description: 'App preferences and configuration',
      badge: null
    },
    {
      id: 'notifications',
      icon: Bell,
      label: 'Notifications',
      description: 'Manage your notification preferences',
      badge: '3'
    },
    {
      id: 'help',
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'Get help and contact support',
      badge: null
    }
  ];

  const statsItems = [
    { label: 'Total Contacts', value: '12', color: 'text-cta' },
    { label: 'Events Attended', value: '3', color: 'text-info' },
    { label: 'Follow-ups Pending', value: '5', color: 'text-warning' },
    { label: 'Completed Follow-ups', value: '7', color: 'text-success' }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 pb-3 safe-area-top">
        <h1 className="mb-2">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Info */}
      <div className="px-4 mb-6">
        <Card className="p-4 border-border bg-card">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-16 h-16 bg-cta rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-cta-foreground" />
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h2 className="mb-1">John Doe</h2>
              <p className="text-muted-foreground text-sm mb-2">
                john.doe@example.com
              </p>
              <Badge variant="outline" className="text-xs">
                Premium Member
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats */}
      <div className="px-4 mb-6">
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">Your Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          {statsItems.map((item, index) => (
            <Card key={index} className="p-3 border-border bg-card">
              <div className="text-center">
                <div className={`text-2xl font-bold ${item.color} mb-1`}>
                  {item.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.label}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 px-4 overflow-y-auto">
        <div className="space-y-2">
          {profileItems.map((item) => (
            <Card 
              key={item.id}
              className="p-4 border-border bg-card cursor-pointer active:bg-accent/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{item.label}</h3>
                    {item.badge && (
                      <Badge variant="destructive" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Export and Logout Buttons */}
      <div className="p-4 pt-4 space-y-3 safe-area-bottom">
        <Button
          variant="outline"
          className="w-full h-12 border-cta/30 text-cta hover:bg-cta/10 active:bg-cta/20"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Contacts
        </Button>
        
        <Button
          variant="outline"
          className="w-full h-12 border-destructive/30 text-destructive hover:bg-destructive/10 active:bg-destructive/20"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
