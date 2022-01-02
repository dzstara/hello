import { useState } from "react";
import { ConnectionState } from "../types";
import { useSeen } from "../hooks/seen";
import { Input } from "./Input";
import { List } from "./List";
import "./App.css";

export function App() {
  const defaultChannel = window.location.hash.slice(1) ?? null;
  const [channel, setChannel] = useState<string | null>(defaultChannel);

  const { connection, seen, newPeople, oldNotifications, clear } =
    useSeen(channel);

  return (
    <>
      <main className="App--main">
        <Input channel={channel} setChannel={setChannel} clear={clear} />

        {connection === ConnectionState.CONNECTING ? (
          <h2 className="App--message">Connecting...</h2>
        ) : connection === ConnectionState.ERROR ? (
          <>
            <h2 className="App--message error">Could not connect</h2>
            <p className="error">Have you entered the correct name?</p>
          </>
        ) : connection === ConnectionState.DISCONNECTED ? (
          <h2 className="App--message">Enter a channel above to start</h2>
        ) : (
          connection === ConnectionState.CONNECTED &&
          seen.size === 0 && (
            <h2 className="App--message">Connected, nothing yet</h2>
          )
        )}

        {seen.size > 0 &&
          (newPeople.length ? (
            <List items={newPeople} />
          ) : (
            <h2 className="App--message">Nothing yet</h2>
          ))}

        {oldNotifications.length > 0 && (
          <>
            <hr />

            <h2 className="App--message">Old notifications</h2>

            <List items={oldNotifications} old />
          </>
        )}
      </main>

      <footer className="App--footer">
        a tool by{" "}
        <a target="_blank" rel="noopener noreferrer" href="https://dzstara.xyz">
          dzstara
        </a>
        , repo on{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/dzstara/hello"
        >
          github
        </a>
      </footer>
    </>
  );
}
