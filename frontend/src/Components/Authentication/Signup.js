import React from 'react'
import {useState} from "react"
import axios from "axios"
import {useHistory} from "react-router-dom"
import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  InputGroup,
  InputRightElement,
  Button,
  useToast
} from "@chakra-ui/react";
const Signup = () => {
    const[show,setShow] = useState(false);
    const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [PicLoading,setPicLoading] = useState(false);
  const history = useHistory();
const toast = useToast();
  const handleclick = () =>{
    setShow(!show);
  }
const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
     try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      history.push("/");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  
  }
  const postDetails = (pics) => {
  setPicLoading(true);
  
if(pics === undefined){
  toast({
    title: "Please select a image",
    status: "warning",
    duration: 5000,
    isClosable: true,
    position:"bottom"
  });
  return;
}

  

  if(pics.type==='image/jpeg' || pics.type === 'image/png'){
        const data = new FormData();
        data.append("file",pics)
        data.append("upload_preset","chat-app")
        data.append("cloud_name", "saran3112");
        fetch("https://api.cloudinary.com/v1_1/saran3112/image/upload",{
          method:"post",
          body:data,
        }).then((res) => res.json())
        .then((data)=>{
         setPic(data.url.toString());
         setPicLoading(false)
        })
        .catch((err)=>{
             console.log(err);
             setPicLoading(false)
        })
      }else {
         toast({
           title: "Please select a image",
           status: "warning",
           duration: 5000,
           isClosable: true,
           position: "bottom",
         });
      }
    }
 
  return (
    <VStack spacing="0.5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel> Name</FormLabel>
        <Input
          _placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="Email" isRequired>
        <FormLabel> Email</FormLabel>
        <Input
          _placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="Password" isRequired>
        <FormLabel> Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "Text" : "password"}
            _placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement w="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleclick}>
              {show ? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="ConfirmPassword" isRequired>
        <FormLabel> Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "Text" : "password"}
            _placeholder="Confirm Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement w="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleclick}>
              {show ? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="image" isRequired>
        <FormLabel> Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          _placeholder="Upload your Picture"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        w="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Signup
      </Button>
    </VStack>
  );
}

export default Signup