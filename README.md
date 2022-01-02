# hello

A simple tool for Twitch streamers or moderators to remember to greet people, every new person on the chat gets their little notification.

## How to use

Create a dock in OBS and use the following URL, replacing `MyChannelName` by the channel of your choice

```
https://dzstara.github.io/hello/#MyChannelName
```

From then on, if the channel name is correct, you should see the newcomers' names appear as they arrive in your chat. Use the `Clear` button in the top-right hand corner to mark the current notifications as read.

## Limitations

- We don't look through the chat history so we only list people joining from the moment the tool has first connected.

## Development

Requirements:

- Node.js 14+
- npm

1. Install dependencies with `npm install`
2. Start with `npm start`
