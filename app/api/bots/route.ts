import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const db = await getDatabase();
    const bots = await db.collection('bots')
      .find({})
      .sort({ name: 1 })
      .toArray();
    
    const serializedBots = bots.map((bot: any) => ({
      id: bot._id.toString(),
      name: bot.name,
      description: bot.description,
      token: bot.token,
      active: bot.active,
      createdAt: bot.createdAt,
      updatedAt: bot.updatedAt
    }));
    
    return NextResponse.json(serializedBots);
  } catch (error) {
    console.error('Error fetching bots:', error);
    return NextResponse.json({ error: 'Failed to fetch bots' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, token, active } = body;
    
    if (!name || !token) {
      return NextResponse.json({ error: 'Name and token are required' }, { status: 400 });
    }
    
    const db = await getDatabase();
    const newBot = {
      name,
      description: description || '',
      token,
      active: active !== undefined ? active : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('bots').insertOne(newBot);
    
    const createdBot = {
      id: result.insertedId.toString(),
      ...newBot
    };
    
    return NextResponse.json(createdBot, { status: 201 });
  } catch (error: any) {
    console.error('Error creating bot:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Bot with this name already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create bot' }, { status: 500 });
  }
}
