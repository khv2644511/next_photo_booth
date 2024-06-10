'use server';

export const handleForm = async (prevState: any, formData: FormData) => {
  console.log(prevState);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log('logged in!');

  return {
    error: ['wrong password', 'password too short'],
  };
};
