namespace AdsApp.Models;

public class TimerSettings
{
    public int WorkDuration { get; set; } = 25;
    public int BreakDuration { get; set; } = 5;
    public bool SoundNotifications { get; set; } = true;
    public int CompletedSessions { get; set; }
    public int TotalFocusMinutes { get; set; }
}

public class TaskItem
{
    public string Text { get; set; } = string.Empty;
    public bool Completed { get; set; }
}
