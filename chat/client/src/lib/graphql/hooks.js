import { useMutation, useQuery } from "@apollo/client";
import { addMessageMutation, messagesQuery } from "./queries";

export function useMessages() {
  const { data } = useQuery(messagesQuery);
  return {
    messages: data?.messages ?? [],
  };
}

export function useAddMessage() {
  const [mutate] = useMutation(addMessageMutation);

  const addMessage = async (text) => {
    const {
      data: { message },
    } = await mutate({
      variables: { text },
      update: (cache, result) => {
        cache.updateQuery({ query: messagesQuery }, (oldData) => {
          return {
            messages: [...oldData.messages, result.data.message],
          };
        });
      },
    });

    return message;
  };

  return { addMessage };
}
