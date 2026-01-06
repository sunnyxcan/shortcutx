// app/api/power/route.ts

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
      if(!line.trim()) return;
      
      const parts = line.split('\t').map(s => s.trim());
      const nonEmptyParts = parts.filter(p => p !== '');

      if (nonEmptyParts.length >= 5 && nonEmptyParts[0] === 'PROCESS') {
        let username = nonEmptyParts[1];
        let account = nonEmptyParts[2];
        let realname = nonEmptyParts[3];
        let amountStr = nonEmptyParts[4];
        let bank = nonEmptyParts.length >= 7 ? nonEmptyParts[6] : "UNKNOWN";

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