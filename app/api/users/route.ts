import { NextRequest } from 'next/server';

// 함수명은 모두 대문자여야 한다.
export async function GET(request: NextRequest) {
  console.log(request);
  return Response.json({
    ok: true,
  });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log('log the user in!!!');
  return Response.json(data);
}
