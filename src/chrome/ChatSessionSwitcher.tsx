import { MessageSquarePlus, Trash2 } from "./icons";
import { sessionDisplayTitle, type Session } from "../lib/session";

type Props = {
  sessions: readonly Session[];
  activeSessionId: string;
  onSelect: (sessionId: string) => void;
  onNew: () => void;
  onDelete: (sessionId: string) => void;
};

function chatLabel(session: Session): string {
  const title = sessionDisplayTitle(session.title, session.harness);
  return title === "New session" ? "New chat" : title;
}

export function ChatSessionSwitcher({
  sessions,
  activeSessionId,
  onSelect,
  onNew,
  onDelete,
}: Props) {
  return (
    <div className="flex h-10 shrink-0 items-center gap-1 border-b border-border/60 px-2">
      <select
        aria-label="Open chat"
        title="Open an earlier chat"
        value={activeSessionId}
        onChange={(event) => onSelect(event.target.value)}
        className="h-7 min-w-0 flex-1 rounded-md border border-border/70 bg-background px-2 text-xs text-content outline-none focus:border-content/30"
      >
        {[...sessions].reverse().map((session) => (
          <option key={session.id} value={session.id}>
            {chatLabel(session)}
          </option>
        ))}
      </select>
      <button
        type="button"
        aria-label="New chat"
        title="New chat"
        onClick={onNew}
        className="flex size-7 shrink-0 items-center justify-center rounded-md text-content/60 hover:bg-content/10 hover:text-content"
      >
        <MessageSquarePlus className="size-4" />
      </button>
      <button
        type="button"
        aria-label="Delete chat"
        title="Delete current chat"
        onClick={() => onDelete(activeSessionId)}
        className="flex size-7 shrink-0 items-center justify-center rounded-md text-content/60 hover:bg-danger/15 hover:text-danger"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}
