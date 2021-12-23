import dotenv from 'dotenv';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { getBaseURL } from '../Helpers';

dotenv.config();

const URL = getBaseURL();

const logger = console;

function SocketIODocs() {
  useEffect(() => {
    logger.log('CONNECTING SOCKET IO');
    if (!URL) return;
    const socket = io(URL, {
      withCredentials: true,
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      logger.log('Socket IO Connected!');
    });
  }, []);

  return <div style={{textAlign:'center'}}>Development in Progress, Coming Soon</div>;
}

export default SocketIODocs;
