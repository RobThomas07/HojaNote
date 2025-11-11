import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Bell, Calendar, ArrowRight } from "lucide-react";

export function Dashboard() {
  const recentNotes = [
    { id: 1, title: "Biology Chapter 5 - Cell Division", category: "Biology", updatedAt: "2 hours ago" },
    { id: 2, title: "Math Problem Set 12", category: "Mathematics", updatedAt: "5 hours ago" },
    { id: 3, title: "History Essay Draft", category: "History", updatedAt: "1 day ago" },
  ];

  const upcomingReminders = [
    { id: 1, title: "Submit Biology Lab Report", time: "Today, 5:00 PM" },
    { id: 2, title: "Math Quiz Preparation", time: "Tomorrow, 10:00 AM" },
  ];

  const todaySchedule = [
    { id: 1, title: "Chemistry Lecture", time: "9:00 AM - 10:30 AM" },
    { id: 2, title: "English Literature", time: "11:00 AM - 12:30 PM" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-foreground" data-testid="text-dashboard-title">
          Welcome to HojaNote
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Your productivity hub for notes, reminders, and schedules
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="border-2 hover-elevate active-elevate-2 transition-all cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Total Notes</CardTitle>
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary" data-testid="text-total-notes">24</div>
            <p className="text-xs text-muted-foreground mt-1">3 added this week</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover-elevate active-elevate-2 transition-all cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Active Reminders</CardTitle>
            <div className="h-10 w-10 rounded-full bg-secondary/30 flex items-center justify-center">
              <Bell className="h-5 w-5 text-secondary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary-foreground" data-testid="text-active-reminders">7</div>
            <p className="text-xs text-muted-foreground mt-1">2 due today</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover-elevate active-elevate-2 transition-all cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Classes This Week</CardTitle>
            <div className="h-10 w-10 rounded-full bg-accent/30 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-accent-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent-foreground" data-testid="text-classes-week">18</div>
            <p className="text-xs text-muted-foreground mt-1">3 remaining today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-2">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <div>
              <CardTitle>Recent Notes</CardTitle>
              <CardDescription>Your latest work</CardDescription>
            </div>
            <Button size="sm" data-testid="button-new-note" className="active-elevate-2">
              <Plus className="h-4 w-4 mr-2" />
              New
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentNotes.map((note) => (
                <div
                  key={note.id}
                  className="flex items-center justify-between p-4 rounded-lg border-2 hover-elevate active-elevate-2 cursor-pointer transition-all"
                  data-testid={`card-note-${note.id}`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{note.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {note.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {note.updatedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Upcoming Reminders</CardTitle>
              <CardDescription>Tasks that need attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-start gap-3 p-4 rounded-lg border-2 hover-elevate active-elevate-2 transition-all"
                    data-testid={`reminder-${reminder.id}`}
                  >
                    <div className="flex items-center h-5 mt-0.5">
                      <input
                        type="checkbox"
                        className="h-5 w-5 rounded border-2 border-primary cursor-pointer"
                        data-testid={`checkbox-reminder-${reminder.id}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{reminder.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {reminder.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your upcoming classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todaySchedule.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20"
                    data-testid={`schedule-${event.id}`}
                  >
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {event.time}
                    </p>
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
