import { describe, expect, it } from "vitest";
import { newTab } from "./layout";
import { newChatSession, newSession } from "./session";
import { mountedSessionIds } from "./sessionVisibility";

describe("mountedSessionIds", () => {
  it("keeps the detached sidebar chat mounted", () => {
    const workspace = newSession("codex", "/tmp/vertex");
    const sidebarChat = newChatSession("/tmp/vertex");
    const detached = newSession("codex", "/tmp/vertex");

    const ids = mountedSessionIds(
      [newTab(workspace.id)],
      [workspace, sidebarChat, detached],
    );

    expect(ids.has(workspace.id)).toBe(true);
    expect(ids.has(sidebarChat.id)).toBe(true);
    expect(ids.has(detached.id)).toBe(false);
  });
});
