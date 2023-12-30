import { useQuery, useSubscription, useMutation } from '@apollo/client';
import {
  messagesQuery,
  messageAddedSubscription,
  addMessageMutation,
} from './queries';

export function useMessages() {
  const { data } = useQuery(messagesQuery);

  useSubscription(messageAddedSubscription, {
    onData: ({ client, data }) => {
      const newMessage = data.data.messageAdded;

      client.cache.updateQuery({ query: messagesQuery }, ({ messages }) => {
        return {
          messages: [...messages, newMessage],
        };
      });
    },
  });

  return {
    messages: data?.messages ?? [],
  };
}

export function useAddMessage() {
  const [mutate] = useMutation(addMessageMutation);

  const addMessage = async (text) => {
    const { data } = await mutate({
      variables: {
        text,
      },
    });

    return data.message;
  };

  return { addMessage };
}
