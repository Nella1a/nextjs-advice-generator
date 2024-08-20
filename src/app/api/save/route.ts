import { AdviceToSave } from '@/app/advice/search/page';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma';

export async function POST(request: NextRequest) {
  const body: AdviceToSave = await request.json();
  console.log('body: ', body);

  // todo: check types
  const foundAdvice = await prisma.advice.findUnique({
    where: {
      externalId: body.id,
    },
  });

  if (!foundAdvice) {
    const savedAdvice = await prisma.advice.create({
      data: {
        externalId: body.id,
        advice: body.advice,
        user: 1,
      },
    });
    console.log('saved Advice: ', savedAdvice);
  }

  console.log('found Advice: ', foundAdvice);
  return NextResponse.json(body);
}
