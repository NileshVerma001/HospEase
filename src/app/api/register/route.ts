import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

export async function POST(req: any) {
  try {
    const body = await req.json();
    console.log(body);

    // Check if the email or password is missing
    if (!body.email || !body.password) {
      console.log('Email and password are required');
      return new Response(JSON.stringify({ error: 'Email and password are required' }), { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    console.log(`Hashed Password: ${hashedPassword}`);

    // Create the user in the database
    const res = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    console.log('User created successfully:', res);

    // Return the created user
    return new Response(JSON.stringify(res), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(JSON.stringify({ error: 'Error creating user' }), { status: 500 });
  }
}
