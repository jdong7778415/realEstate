import { StreamChat } from "stream-chat";

const serverClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

export default async function handler(req, res) {
  try {
    const { uid, propertyId } = req.query;
    if (!uid || !propertyId) return res.status(400).json({ error: "Missing uid or propertyId" });

    const channelId = `property-${propertyId}`;
    const channel = serverClient.channel("messaging", channelId);

    await channel.create().catch(() => {});
    await channel.addMembers([uid]).catch(() => {});

    const token = serverClient.createToken(uid);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}