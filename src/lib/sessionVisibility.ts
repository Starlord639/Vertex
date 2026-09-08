import { leafIds, type WorkspaceTab } from "./layout";
import type { Session } from "./session";

/** Sessions mounted outside workspace panes must survive detached-session cleanup. */
export function mountedSessionIds(
  tabs: readonly WorkspaceTab[],
  sessions: readonly Session[],
): Set<string> {
  const ids = new Set<string>();
  for (const tab of tabs) {
    for (const id of leafIds(tab.layout)) ids.add(id);
  }
  for (const session of sessions) {
    if (session.inboxAsk || session.chatOnly) ids.add(session.id);
  }
  return ids;
}
