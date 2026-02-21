import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, token, active } = body;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid bot ID' }, { status: 400 });
    }
    
    const db = await getDatabase();
    const updateData: any = {
      updatedAt: new Date()
    };
    
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (token !== undefined) updateData.token = token;
    if (active !== undefined) updateData.active = active;
    
    const result = await db.collection('bots').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
    }
    
    const updatedBot = await db.collection('bots').findOne({ _id: new ObjectId(id) });
    
    if (!updatedBot) {
      return NextResponse.json({ error: 'Failed to retrieve updated bot' }, { status: 404 });
    }
    
    const serializedBot = {
      id: updatedBot._id.toString(),
      name: updatedBot.name,
      description: updatedBot.description,
      token: updatedBot.token,
      active: updatedBot.active,
      createdAt: updatedBot.createdAt,
      updatedAt: updatedBot.updatedAt
    };
    
    return NextResponse.json(serializedBot);
  } catch (error) {
    console.error('Error updating bot:', error);
    return NextResponse.json({ error: 'Failed to update bot' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid bot ID' }, { status: 400 });
    }
    
    const db = await getDatabase();
    const result = await db.collection('bots').deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Bot not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Bot deleted successfully' });
  } catch (error) {
    console.error('Error deleting bot:', error);
    return NextResponse.json({ error: 'Failed to delete bot' }, { status: 500 });
  }
}
