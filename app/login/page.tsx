import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';
import { useFormState, useFormStatus } from 'react-dom';

export default function Login() {
  const handleForm = async (formData: FormData) => {
    'use server';
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log('logged in!');
    // console.log(formData.get('email'), formData.get('password'));
    // console.log('I run in the server');
  };

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

      <form action={handleForm} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={[]}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="password"
          required
          errors={[]}
        />
        <FormButton text={'Log in'} />
        {/* <button className="primary-btn h-10">Create account</button> */}
      </form>
      <SocialLogin />
    </div>
  );
}
