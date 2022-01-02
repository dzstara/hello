import { useState, useEffect } from "react";
import { Client } from "tmi.js";
import { UserData, ConnectionState } from "../types";

export function useSeen(channel: string | null) {
  const [seen, setSeen] = useState<Map<string, UserData>>(new Map());
  const [connection, setConnection] = useState<ConnectionState>(
    channel?.length ? ConnectionState.CONNECTING : ConnectionState.DISCONNECTED
  );

  useEffect(() => {
    setSeen(new Map());
  }, [channel]);

  useEffect(() => {
    if (!channel) return;

    setConnection(ConnectionState.CONNECTING);

    const client = new Client({
      channels: [channel],
    });

    let canceled = false;

    const onError = () => {
      if (!canceled) setConnection(ConnectionState.ERROR);
    };

    client.on("message", (_1, tags, _2, _3) => {
      const user = tags["display-name"]!;
      setSeen((seen) => {
        if (!seen.has(user)) {
          seen.set(user, {
            time: new Date(),
            done: false,
          });
        }

        return new Map(seen);
      });
    });

    client.on("disconnected", onError);
    client.on("timeout", onError);
    client.on("join", () => {
      if (!canceled) setConnection(ConnectionState.CONNECTED);
    });

    client.connect();

    setTimeout(() => {
      if (canceled) return;

      setConnection((connection) =>
        connection === ConnectionState.CONNECTED
          ? connection
          : ConnectionState.ERROR
      );
    }, 2000);

    return () => {
      canceled = true;
      client.disconnect();
    };
  }, [channel]);

  const newPeople = Array.from(seen).filter((data) => !data[1].done);
  const oldNotifications = Array.from(seen).filter((data) => data[1].done);

  const clear = () => {
    setSeen(
      (seen) =>
        new Map(
          Array.from(seen).map((s) => {
            s[1].done = true;
            return s;
          })
        )
    );
  };

  return { connection, seen, newPeople, oldNotifications, clear };
}
