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
      address,
      city,
      district,
      state,
      ownerMail,
      avgBedPrice,
      totalBeds,
      bedsAvailable,
      doc,
    } = data;

    const newHospital = await prisma.hospital.create({
      data: {
        name,
        image,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        address,
        city,
        district,
        state,
        ownerMail,
        bedsAvailable: parseFloat(bedsAvailable),
        avgBedPrice: parseFloat(avgBedPrice),
        totalBeds: parseFloat(totalBeds),
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
    const { id, bedsAvailable, totalBeds, avgBedPrice } = data;

    const updatedHospital = await prisma.hospital.update({
      where: { id: id },
      data: {
        bedsAvailable: parseFloat(bedsAvailable),
        totalBeds: parseFloat(totalBeds),
        avgBedPrice: parseFloat(avgBedPrice),
      },
    });

    return NextResponse.json(updatedHospital, { status: 200 });
  } catch (error) {
    console.error('Error updating hospital:', error);
    return NextResponse.json({ error: 'Error updating hospital' }, { status: 500 });
  }
}
