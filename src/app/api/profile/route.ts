// src/app/api/profile/route.ts
import { prisma } from '@/lib/prisma'; // Adjust the import path accordingly
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function PUT(req: any) {
  try {
    const data = await req.json();
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
      return new Response('Unauthorized', { status: 401 });
    }

    const update: { name?: string; image?: string } = {};
    if (data.name) {
      update.name = data.name;
    }
    if (data.image) {
      update.image = data.image;
    }
    if (Object.keys(update).length > 0) {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: update,
      });
      return new Response(JSON.stringify(updatedUser), { status: 200 });
    } else {
      return new Response('No valid fields provided for update', { status: 400 });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

export async function GET(req: any) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    if (!email) {
      return new Response('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
