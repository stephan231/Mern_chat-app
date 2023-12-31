import { Box } from "@chakra-ui/layout";

import Chatbox from "../Components/ChatBox";
import MyChats from "../Components/MyChats"
import SideDrawer from "../miscellaneous/sideDrawer"
import { ChatState } from "../context/Chatprovider";
import { useState } from "react";



const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}

      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
       
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && 
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}  />}
      
      </Box>
    </div>
  );
};

export default Chatpage;
