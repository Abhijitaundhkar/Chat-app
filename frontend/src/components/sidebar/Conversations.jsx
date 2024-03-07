import useGetConversation from "../../hooks/useGetConversation";
import { getRandomEmoji } from "../../utlis/emojis";
import Conversation from "./Conversation";

export default function Conversations() {
  const { loading, conversations } = useGetConversation();
  console.log("conv", conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}

      {loading ? (
        <span className="loading loading-spinner mx-auto"> </span>
      ) : null}
    </div>
  );
}