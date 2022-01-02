import { useState } from "react";
import "./Input.css";

interface InputProps {
  channel: string | null;
  setChannel: (channel: string | null) => unknown;
  clear: () => unknown;
}

export function Input(props: InputProps) {
  const [channelInput, setChannelInput] = useState<string>(props.channel ?? "");

  return (
    <form
      className="Input"
      onSubmit={(e) => {
        e.preventDefault();
        const input = channelInput.trim();
        props.setChannel(input.length ? input : null);
      }}
    >
      <input
        type="text"
        value={channelInput}
        onChange={(e) => setChannelInput(e.target.value)}
        placeholder="Channel name (eg. example for https://twitch.tv/example)"
      />

      <button type="submit" title="Change channel">
        Set
      </button>

      <button type="button" onClick={props.clear} title="Clear notifications">
        Clear
      </button>
    </form>
  );
}
