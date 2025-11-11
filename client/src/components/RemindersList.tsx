import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Clock, Calendar } from "lucide-react";

type Reminder = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  completed: boolean;
  urgent: boolean;
};

export function RemindersList() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 1,
      title: "Submit Biology Lab Report",
      description: "Complete and submit the lab report on cell division",
      date: "2025-11-11",
      time: "17:00",
      completed: false,
      urgent: true,
    },
    {
      id: 2,
      title: "Math Quiz Preparation",
      description: "Review chapters 10-12 for the upcoming quiz",
      date: "2025-11-12",
      time: "10:00",
      completed: false,
      urgent: false,
    },
    {
      id: 3,
      title: "Group Project Meeting",
      description: "Discuss presentation slides with team members",
      date: "2025-11-12",
      time: "15:00",
      completed: false,
      urgent: false,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const toggleComplete = (id: number) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const deleteReminder = (id: number) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const addReminder = () => {
    const reminder: Reminder = {
      id: Date.now(),
      ...newReminder,
      completed: false,
      urgent: false,
    };
    setReminders((prev) => [...prev, reminder]);
    setNewReminder({ title: "", description: "", date: "", time: "" });
    setIsDialogOpen(false);
    console.log("Reminder added:", reminder);
  };

  const activeReminders = reminders.filter((r) => !r.completed);
  const completedReminders = reminders.filter((r) => r.completed);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold" data-testid="text-reminders-title">
            Reminders
          </h1>
          <p className="text-muted-foreground mt-1">
            Keep track of your tasks and deadlines
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-reminder">
              <Plus className="h-4 w-4 mr-2" />
              Add Reminder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Reminder</DialogTitle>
              <DialogDescription>
                Set a reminder for an upcoming task or deadline
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newReminder.title}
                  onChange={(e) =>
                    setNewReminder({ ...newReminder, title: e.target.value })
                  }
                  placeholder="Enter reminder title..."
                  data-testid="input-reminder-title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={newReminder.description}
                  onChange={(e) =>
                    setNewReminder({ ...newReminder, description: e.target.value })
                  }
                  placeholder="Add details..."
                  data-testid="textarea-reminder-description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newReminder.date}
                    onChange={(e) =>
                      setNewReminder({ ...newReminder, date: e.target.value })
                    }
                    data-testid="input-reminder-date"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newReminder.time}
                    onChange={(e) =>
                      setNewReminder({ ...newReminder, time: e.target.value })
                    }
                    data-testid="input-reminder-time"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                data-testid="button-cancel-reminder"
              >
                Cancel
              </Button>
              <Button
                onClick={addReminder}
                disabled={!newReminder.title || !newReminder.date || !newReminder.time}
                data-testid="button-save-reminder"
              >
                Save Reminder
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Active Reminders
              <Badge variant="secondary">{activeReminders.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeReminders.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No active reminders. Create one to get started!
              </p>
            ) : (
              <div className="space-y-3">
                {activeReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-start gap-3 p-4 rounded-md border hover-elevate"
                    data-testid={`reminder-${reminder.id}`}
                  >
                    <div className="flex items-center h-5 mt-0.5">
                      <input
                        type="checkbox"
                        checked={reminder.completed}
                        onChange={() => toggleComplete(reminder.id)}
                        className="h-4 w-4 rounded border-input cursor-pointer"
                        data-testid={`checkbox-reminder-${reminder.id}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium">{reminder.title}</h3>
                      {reminder.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {reminder.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(reminder.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {reminder.time}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {reminder.urgent && (
                        <Badge variant="destructive">Urgent</Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteReminder(reminder.id)}
                        data-testid={`button-delete-reminder-${reminder.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {completedReminders.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Completed
                <Badge variant="secondary">{completedReminders.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-start gap-3 p-4 rounded-md border opacity-60"
                    data-testid={`reminder-completed-${reminder.id}`}
                  >
                    <div className="flex items-center h-5 mt-0.5">
                      <input
                        type="checkbox"
                        checked={reminder.completed}
                        onChange={() => toggleComplete(reminder.id)}
                        className="h-4 w-4 rounded border-input cursor-pointer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium line-through">
                        {reminder.title}
                      </h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteReminder(reminder.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
