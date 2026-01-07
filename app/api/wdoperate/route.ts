// app/api/wdoperate/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { rawData } = await request.json();

    if (!rawData) {
      return NextResponse.json({ error: 'Data kosong' }, { status: 400 });
    }

    const lines = rawData.split('\n');
    let validTransactions: any[] = [];
    let grandTotal = 0;

    lines.forEach((line: string) => {
      const parts = line.split('\t').map(s => s.trim()).filter(s => s !== '');

      if (parts.length >= 6) {
        
        const username = parts[1];
        const realname = parts[2];
        const account = parts[3];
        const bank = parts[4];

        const amountStr = parts.find(p => /^[0-9,]+\.\d{2}$/.test(p));

        let amount = 0;
        if (amountStr) {
          amount = parseFloat(amountStr.replace(/,/g, ''));
        }

        if (username && account && amount > 0) {
          validTransactions.push({
            bank,
            account,
            username,
            realname,
            amount
          });
          grandTotal += amount;
        }
      }
    });

    return NextResponse.json({
      data: validTransactions,
      totalCount: validTransactions.length,
      totalAmount: grandTotal
    });

  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}