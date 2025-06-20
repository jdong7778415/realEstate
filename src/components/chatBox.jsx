import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Window,
  LoadingIndicator,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export default function ChatBox({ userId, userName, property, onBack }) {
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    if (!userId || !property?.id) return;
    let client;
    async function initChat() {
      const resp = await fetch(`/api/stream-token?uid=${userId}&propertyId=${property.id}`);
      const { token } = await resp.json();
      client = StreamChat.getInstance(apiKey);
      await client.connectUser({ id: userId, name: userName }, token);

      const channel = client.channel("messaging", `property-${property.id}`, {
        name: property.title,
        members: [userId],
      });
      await channel.watch();

      setChatClient(client);
      setChannel(channel);
    }
    initChat();
    return () => {
      if (client) client.disconnectUser();
    };
  }, [userId, userName, property]);

  if (!chatClient || !channel) return <LoadingIndicator />;

  return (
    <div>
      <button onClick={onBack} style={{ marginBottom: 16, color: "#2563eb" }}>← Back to property list</button>
      <Chat client={chatClient} theme="messaging light">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
        </Channel>
      </Chat>
    </div>
  );
}