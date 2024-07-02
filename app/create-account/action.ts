'use server';
import { z } from 'zod';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '../lib/constants';
import db from '../lib/db';

const checkUsername = (username: string) => !username.includes('potato');

const checkUniqueUsername = async (username: string) => {
    // select를 안쓰면 모든 user 정보를 불러옴
    // select를 통해서 필요한 user의 키값만 받아오도록 설정할 수 있다.
  const user = await db.user.findUnique({
    where: {
      username : username
    },
    select: {
      id : true
    }
  })
  // if (user) {
    //   return false
    // } else {
      //   return true
      // }
      //  ==> 아래처럼 변경 가능
      return !Boolean(user) // 이미 사용되고 있는 username은 사용자에게 에러를 보냄
} 

const checkUniqueEmail = async (email: string) => {
  // select를 안쓰면 모든 user 정보를 불러옴
  // select를 통해서 필요한 user의 키값만 받아오도록 설정할 수 있다.
  const user = await db.user.findUnique({
    where: {
      email : email
    },
    select: {
      id : true
    }
  })
  // Boolean(user) === false
  return !Boolean(user) // 이미 사용되고 있는 username은 사용자에게 에러를 보냄
} 

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const fomrSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: 'Username must be a string!',
        required_error: 'Where is my username?',
      })
      .trim()
      .toLowerCase()
      // .transform((username) => '🧐')
      .refine(checkUsername, 'No potatos allowed!')
      .refine(checkUniqueUsername, "This username is already taken"),
    email: z.string().email().toLowerCase().refine(checkUniqueEmail, 'There is an account already registered with that email'),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH),
      // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine(checkPasswords, {
    message: 'Both password sould be same!',
    path: ['confirm_password'],
  });

// 마지막 refine 함수는 form 객체 전체에 대한 유효성을 검사해,
// 모든 데이터를 받을 수 있다(따라서 password, confirm_password 인자를 모두 받을 수 있다.)
// 이때, form에 대한 에러메세지는 fieldError가 아닌 formError에 들어가 화면에 보이지 않는다.
// 이를 해결하기 위해, path에 필드 이름을 작성해서 에러가 보여질 위치(필드)를 지정할 수 있다.

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
  // database 작업을 하고 있기 떄문에 함수들에 await를 넣어줘야한다.
  const result = await fomrSchema.safeParseAsync(data);
  //   console.log(result); // { success: false, error: [Getter] }
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    // const user = await db.user.findUnique({
    //   where: {
    //     username: result.data.username
    //   },

    //   select: {
    //     id: true
    //   }
    // })
    // if (user) {
    //   // show an error
    // }

    const userEmail = await db.user.findUnique({
      where: {
        email : result.data.email
      },
      select: {
        id: true
      }
    })
    if (userEmail) {
      // show an error th the user
    }
    console.log(user)
    // check if username is taken
    // checi if the email is already used
    // hash password
    // save the user to db
    // log the user in
    // redirect '/home'
    console.log(result.data);
  }
}
