import { AdviceToSave } from '@/app/advice/search/page';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma';

export async function PUT(request: NextRequest) {
  const body: AdviceToSave = await request.json();
  console.log('body update: ', body);

  // todo: check types
  const advice = await prisma.advice.delete({
    where: {
      id: body.id,
      user: body.user,
    },
  });

  console.log('saved Advice: ', advice);
  if (advice) {
    return NextResponse.json({ status: 200, message: 'okay' });
  }
}
