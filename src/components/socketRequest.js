// Module imports
// These modules are used for creating and managing the state of the functional components
import React, { useState } from 'react';
// This is used for accessing Redux stores 'dispatch' function
import { useDispatch } from 'react-redux/';
// THis is a custom function imported from a file in the 'redux' directory
import { addMessage } from '../redux/socketApi';
// This module is used for establishing the socket connection with the server
import io from 'socket.io-client';
// These chakra UI components are used for styling and layout
import { Box, Button, Input, Grid, Avatar, GridItem } from '@chakra-ui/react';

// This is an object that contains the various styles for different elements in the components, such as 'formContainer', 'inputField', 'submitButton', 'avatarContainer', and 'avatar'
const customStyles = {
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '2rem',
  },
  inputField: {
    marginBottom: '1rem',
  },
  submitButton: {
    marginTop: '1rem',
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
  },
  avatar: {
    width: '6rem',
    height: '6rem',
    marginRight: '2rem',
  },
};

// Functional component defined by the arrow function syntax
const SocketConnection = () => {
  const dispatch = useDispatch();
  // declares a state variable with 'message' and a function 'setMessage' to update the value of message as an empty string
  const [message, setMessage] = useState('');

  // function is called when the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    // checks if the message is not empty (after trimming any leading/trailing whitespace).
    if (message.trim()) {
      // if the condition is met, it calls 'sendServerRequest'function and then clears the 'message' state/
      sendServerRequest(message);
      // clears the message state.
      setMessage('');
    }
  };
 //** HOW THE FRONT END FUNCTION INTERACTS WITH THE BACKEND */
/*The front-end client function is triggered when the user submits a message and socket connection with the server.

The front-end function emits a 'send_message' event to the server with the message as the payload using  socket.emit('send_message', message);. This event is received by the backend function socket.on('sendMessage', which listens for message events

After generating the response, the back-end function emits 'message', event with the response data using io.emit('message', response). This event is sent to all clients including the front end.

One the front end, the client function  sendServerRequest listens for message sente vent whcih receives the message and dispatches the addMessage action.

Finally, the socket disconencts
*/

  const sendServerRequest = (message) => {
    // establishes socket connection
    const socket = io('http://localhost:3001');
    // emits send a 'send_message' event to the server with 'messgage' event as the payload
    socket.emit('send_message', message);
    // listens for a 'message event' from the server and dispatches the 'addmessage' action with the response data
    socket.on('message_sent', (response) => {
      dispatch(addMessage(response.data));
      // disconnects the socket
      socket.disconnect();
    });

  };
  return (
    <Box sx={customStyles.formContainer}>
      <Box className={customStyles.avatarContainer}>
        <Grid container spacing={2} alignItems='center'>
          <Grid>
            <GridItem>
              <Avatar className={customStyles.avatar} alt='User Avatar' src='/assets/avatars/avatar.png' />
            </GridItem>
          </Grid>
          <Grid>
            <GridItem>
              <span>Malik Sadiki-Torres</span>
            </GridItem>
          </Grid>
        </Grid>
      </Box>
      <Box as='form' onSubmit={handleSubmit}>
        <Input
          sx={customStyles.inputField}
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Enter a message'
        />
        <Button
          sx={customStyles.submitButton}
          type='submit'
          colorScheme='blue'
        >
          Send
        </Button>
      </Box>
      <Box className={customStyles.avatarContainer}>
        <Grid container spacing={2} alignItems='center'>
          <GridItem>
            <Avatar className={customStyles.avatar} alt='User Avatar' src='/assets/avatars/avatar2.png' />
          </GridItem>
          <GridItem>
            <span>Heather Holocomb</span>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};


export default SocketConnection;
