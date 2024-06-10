'use client';

import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';
import { useFormState, useFormStatus } from 'react-dom';
import { handleForm } from './action';

export default function Login() {
  // ** 'use server'는 cleint 컴포넌트 내에서 인라인으로 작성할 수 없다.
  // 따라서 action.ts 파일로 분리시킨다.
  // const handleForm = async (formData: FormData) => {
  //   'use server';
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  //   console.log('logged in!');

  //   return {
  //     error: 'wrong password',
  //   };
  // };

  // ** useFormState
  //  결과를 알고 싶은 action을 인자로 넘겨줘야 한다.
  // state, action 받는데,
  // state는 action(handleForm)의 return 값이 된다.
  // action은 handleForm을 실행시킨다.

  const [state, action] = useFormState(handleForm, {
    potato: 1,
  } as any);

  // ** useFormStatus() => pending 상태에 따라 버튼 컨트롤하기
  // pending, data, action, method 객체를 가지며,
  // 이 hook은 form의 자식 요소에서만 사용되어야 한다,
  // form 의 상태에 따라 변경하고자 하는 component 내부에서 사용해야 함
  // const { pending } = useFormStatus(); 동일한 컴포넌트 내에서 사용할 수 없음
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Login in with email and password.</h2>
      </div>

      <form action={action} className="flex flex-col gap-3">
        <FormInput name="email" type="email" placeholder="Email" required />
        <FormInput
          name="password"
          type="password"
          placeholder="password"
          required
        />
        <FormButton text={'Log in'} />
        {/* <button className="primary-btn h-10">Create account</button> */}
      </form>
      <SocialLogin />
    </div>
  );
}
