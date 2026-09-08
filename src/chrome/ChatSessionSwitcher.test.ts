import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { newChatSession, newSession } from "../lib/session";
import { ChatSessionSwitcher } from "./ChatSessionSwitcher";

describe("ChatSessionSwitcher", () => {
  it("shows chat controls and only the supplied chat histories", () => {
    const first = newChatSession("/tmp/vertex");
    first.id = "chat-1";
    first.title = "codex · First question";
    const second = newChatSession("/tmp/vertex");
    second.id = "chat-2";
    const workspace = newSession("codex", "/tmp/vertex");

    const markup = renderToStaticMarkup(
      createElement(ChatSessionSwitcher, {
        sessions: [first, second].filter((session) => session.chatOnly),
        activeSessionId: second.id,
        onSelect: () => undefined,
        onNew: () => undefined,
        onDelete: () => undefined,
      }),
    );

    expect(markup).toContain('aria-label="Open chat"');
    expect(markup).toContain('aria-label="New chat"');
    expect(markup).toContain('aria-label="Delete chat"');
    expect(markup).toContain("First question");
    expect(markup).toContain("New chat");
    expect(markup).not.toContain(workspace.id);
  });
});
