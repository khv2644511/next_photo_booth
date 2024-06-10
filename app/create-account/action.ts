'use server';
import { z } from 'zod';

const fomrSchema = z.object({
  username: z.string().min(3).max(10),
  email: z.string().email(),
  password: z.string().min(10),
  confirm_password: z.string().min(10),
});

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  //   console.log(data);

  // parse는 에러를 throw하기 때문에 try,catch를 사용하지 않으면 에러화면이 뜨게됨
  //   try {
  //     fomrSchema.parse(data);
  //   } catch (e) {
  //     console.log(e);
  //   }

  // safeParse는 parse와 달리 에러를 던지지 않음
  const result = fomrSchema.safeParse(data);
  console.log(result); // { success: false, error: [Getter] }
  if (!result.success) {
    // console.log(result.error.flatten());
    return result.error.flatten();
  }
}
