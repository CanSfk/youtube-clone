import React, { FormEvent, useEffect, useState } from 'react';
import { MyButton } from '../../../components';

interface VideLikeProps {
  accountId: number;
}

export const Subscribers: React.FC<VideLikeProps> = ({ accountId }) => {
  const [buttonState, setButtonState] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    formData.append('user_subscriber_id', accountId.toString());

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/subscriber`, {
      credentials: 'include',
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const resultRes = await response.json();
      setButtonState(resultRes.result);
    } else console.log('error');
  };

  useEffect(() => {
    (async () => {
      const formData = new FormData();
      formData.append('user_subscriber_id', accountId.toString());

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/getsubscriber`, {
        credentials: 'include',
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const resultRes = await response.json();
        setButtonState(resultRes.result);
      } else console.log('error');
    })();
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <MyButton text={buttonState ? 'Abonelikten çık' : 'Abone ol'} color='yellow' styleType='outline' />
    </form>
  );
};

export default Subscribers;
