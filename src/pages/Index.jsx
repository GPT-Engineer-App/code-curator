import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Heading, Text, useToast } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const toast = useToast();

  const apiUrl = "https://backengine-2by1.fly.dev";

  const handleAuth = async (e) => {
    e.preventDefault();
    const url = `${apiUrl}/${isLogin ? "login" : "signup"}`;
    const method = isLogin ? "POST" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (isLogin) {
          toast({
            title: "Login Successful",
            description: `Access Token: ${data.accessToken}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Signup Successful",
            description: "You can now log in.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      } else {
        const errorData = await response.json();
        console.error(`Login failed with status: ${response.status}`, errorData);
        throw new Error(errorData.error || "Something went wrong");
      }
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent>
      <Box w="100%" p={4}>
        <VStack spacing={8}>
          <Heading>{isLogin ? "Login" : "Signup"}</Heading>
          <form onSubmit={handleAuth}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
              <Button leftIcon={isLogin ? <FaSignInAlt /> : <FaUserPlus />} colorScheme="blue" type="submit" w="full">
                {isLogin ? "Login" : "Signup"}
              </Button>
            </VStack>
          </form>
          <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Need an account? Signup" : "Already have an account? Login"}
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;
