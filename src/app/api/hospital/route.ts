import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const hospitals = await prisma.hospital.findMany();
    return NextResponse.json(hospitals);
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    return NextResponse.json({ error: 'Error fetching hospitals' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      name,
      image,
      latitude,
      longitude,
      streatadd,
      city,
      district,
      state,
      ownermail
    } = data;

    const newHospital = await prisma.hospital.create({
      data: {
        name,
        image,
        latitude:parseFloat(latitude),
        longitude:parseFloat(longitude),
        streatadd,
        city,
        district,
        state,
        ownermail,
        verified: false
      },
    });

    return NextResponse.json(newHospital, { status: 201 });
  } catch (error) {
    console.error('Error creating hospital:', error);
    return NextResponse.json({ error: 'Error creating hospital' }, { status: 500 });
  }
}
