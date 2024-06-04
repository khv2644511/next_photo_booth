import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';

export default function Login() {
  const handleForm = async (formData: FormData) => {
    'use server';
    console.log(formData.get('email'), formData.get('password'));
    console.log('I run in the server');
  };
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
        <FormButton loading={false} text={'Log in'} />
        {/* <button className="primary-btn h-10">Create account</button> */}
      </form>
      <SocialLogin />
    </div>
  );
}
