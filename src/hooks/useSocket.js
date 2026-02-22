import { useState, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';
import { SERVER_URL } from '../Utils/Constants';

export const useSocket = () => {
  const { accessToken, user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const newSocket = io(SERVER_URL, {
      auth: { token: accessToken },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      setConnectionError(null);
      reconnectAttempts.current = 0;
      console.log('Socket connected');
    });

    newSocket.on('disconnect', (reason) => {
      setIsConnected(false);
      console.log('Socket disconnected:', reason);
    });

    newSocket.on('connect_error', (error) => {
      setConnectionError(error.message);
      reconnectAttempts.current += 1;
      console.error('Socket connection error:', error.message);
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [accessToken]);

  const emit = useCallback((event, data, callback) => {
    if (socket && isConnected) {
      socket.emit(event, data, callback);
    } else {
      console.warn('Socket not connected, cannot emit:', event);
    }
  }, [socket, isConnected]);

  const on = useCallback((event, callback) => {
    if (socket) {
      socket.on(event, callback);
      return () => socket.off(event, callback);
    }
  }, [socket]);

  const off = useCallback((event, callback) => {
    if (socket) {
      socket.off(event, callback);
    }
  }, [socket]);

  return {
    socket,
    isConnected,
    connectionError,
    emit,
    on,
    off
  };
};

export const useChatSocket = (roomId) => {
  const { socket, isConnected, emit, on, off } = useSocket();
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    if (!socket || !isConnected || !roomId) return;

    // Join room
    emit('joinRoom', { roomId });
    setIsJoined(true);

    // Listen for messages
    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleMessageEdited = (updatedMessage) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg
        )
      );
    };

    const handleMessageDeleted = (messageId) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    };

    const handleUserTyping = ({ userId, username }) => {
      setTypingUsers((prev) => {
        if (prev.find((u) => u.userId === userId)) return prev;
        return [...prev, { userId, username }];
      });
    };

    const handleUserStoppedTyping = ({ userId }) => {
      setTypingUsers((prev) => prev.filter((u) => u.userId !== userId));
    };

    on('newMessage', handleNewMessage);
    on('messageEdited', handleMessageEdited);
    on('messageDeleted', handleMessageDeleted);
    on('userTyping', handleUserTyping);
    on('userStoppedTyping', handleUserStoppedTyping);

    return () => {
      emit('leaveRoom', { roomId });
      off('newMessage', handleNewMessage);
      off('messageEdited', handleMessageEdited);
      off('messageDeleted', handleMessageDeleted);
      off('userTyping', handleUserTyping);
      off('userStoppedTyping', handleUserStoppedTyping);
      setIsJoined(false);
    };
  }, [socket, isConnected, roomId, emit, on, off]);

  const sendMessage = useCallback((content, replyTo = null) => {
    emit('sendMessage', { roomId, content, replyTo });
  }, [emit, roomId]);

  const editMessage = useCallback((messageId, content) => {
    emit('editMessage', { messageId, content });
  }, [emit]);

  const deleteMessage = useCallback((messageId) => {
    emit('deleteMessage', { messageId });
  }, [emit]);

  const startTyping = useCallback(() => {
    emit('typing', { roomId });
  }, [emit, roomId]);

  const stopTyping = useCallback(() => {
    emit('stopTyping', { roomId });
  }, [emit, roomId]);

  const addReaction = useCallback((messageId, emoji) => {
    emit('addReaction', { messageId, emoji });
  }, [emit]);

  return {
    messages,
    setMessages,
    typingUsers,
    isJoined,
    isConnected,
    sendMessage,
    editMessage,
    deleteMessage,
    startTyping,
    stopTyping,
    addReaction
  };
};

export default useSocket;
