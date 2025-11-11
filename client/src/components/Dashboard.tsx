import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Bell, Calendar, Clock } from "lucide-react";

export function Dashboard() {
  const recentNotes = [
    { id: 1, title: "Biology Chapter 5 - Cell Division", category: "Biology", updatedAt: "2 hours ago" },
    { id: 2, title: "Math Problem Set 12", category: "Mathematics", updatedAt: "5 hours ago" },
    { id: 3, title: "History Essay Draft", category: "History", updatedAt: "1 day ago" },
  ];

  const upcomingReminders = [
    { id: 1, title: "Submit Biology Lab Report", time: "Today, 5:00 PM", urgent: true },
    { id: 2, title: "Math Quiz Preparation", time: "Tomorrow, 10:00 AM", urgent: false },
    { id: 3, title: "Group Project Meeting", time: "Tomorrow, 3:00 PM", urgent: false },
  ];

  const todaySchedule = [
    { id: 1, title: "Chemistry Lecture", time: "9:00 AM - 10:30 AM", location: "Room 301" },
    { id: 2, title: "English Literature", time: "11:00 AM - 12:30 PM", location: "Room 205" },
    { id: 3, title: "Study Group", time: "2:00 PM - 4:00 PM", location: "Library" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-dashboard-title">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your overview for today.
          </p>
        </div>
        <Button data-testid="button-new-note">
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold" data-testid="text-total-notes">24</div>
            <p className="text-xs text-muted-foreground">3 added this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Reminders</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold" data-testid="text-active-reminders">7</div>
            <p className="text-xs text-muted-foreground">2 due today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold" data-testid="text-classes-week">18</div>
            <p className="text-xs text-muted-foreground">3 remaining today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Notes</CardTitle>
            <CardDescription>Your most recently updated notes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentNotes.map((note) => (
                <div
                  key={note.id}
                  className="flex items-start justify-between p-4 rounded-md hover-elevate border cursor-pointer"
                  data-testid={`card-note-${note.id}`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{note.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {note.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {note.updatedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Reminders</CardTitle>
              <CardDescription>Tasks that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-start gap-3"
                    data-testid={`reminder-${reminder.id}`}
                  >
                    <div className="flex items-center h-5 mt-0.5">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-input"
                        data-testid={`checkbox-reminder-${reminder.id}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{reminder.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {reminder.time}
                      </p>
                    </div>
                    {reminder.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgent
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your classes and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todaySchedule.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 rounded-md bg-accent/50"
                    data-testid={`schedule-${event.id}`}
                  >
                    <h3 className="text-sm font-medium">{event.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.time}
                    </p>
                    <p className="text-xs text-muted-foreground">{event.location}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
