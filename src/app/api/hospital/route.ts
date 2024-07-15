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
      ownermail,
      avgprice,
      totalbeds,
      avaiblebeds,
      doc,
    } = data;

    const newHospital = await prisma.hospital.create({
      data: {
        name,
        image,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        streatadd,
        city,
        district,
        state,
        ownermail,
        avaiblebeds: parseFloat(avaiblebeds),
        avgprice: parseFloat(avgprice),
        totalbeds: parseFloat(totalbeds),
        doc,
        verified: false
      },
    });

    return NextResponse.json(newHospital, { status: 201 });
  } catch (error) {
    console.error('Error creating hospital:', error);
    return NextResponse.json({ error: 'Error creating hospital' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, avaiblebeds, totalbeds, avgprice } = data;

    const updatedHospital = await prisma.hospital.update({
      where: { id: id },
      data: {
        avaiblebeds: parseFloat(avaiblebeds),
        totalbeds: parseFloat(totalbeds),
        avgprice: parseFloat(avgprice),
      },
    });

    return NextResponse.json(updatedHospital, { status: 200 });
  } catch (error) {
    console.error('Error updating hospital:', error);
    return NextResponse.json({ error: 'Error updating hospital' }, { status: 500 });
  }
}
