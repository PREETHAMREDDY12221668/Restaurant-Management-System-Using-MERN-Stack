import React,{useEffect} from "react";

const Trail = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      {/* Dialogflow Messenger Component */}
      <df-messenger
        intent="WELCOME"
        chat-title="RestaurantAssistant"
        agent-id="cb40194e-0b60-4bb0-94a2-0f712463e2f7"
        language-code="en"
      ></df-messenger>
    </div>
  );
};

export default Trail;
