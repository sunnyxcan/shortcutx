// app/api/idn/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { rawData } = await request.json();

    if (!rawData) {
      return NextResponse.json({ error: 'Data kosong' }, { status: 400 });
    }

    const lines = rawData.split('\n').map((l: string) => l.trim()).filter((l: string) => l !== '');
    
    let validTransactions: any[] = [];
    let grandTotal = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      const userMatch = line.match(/^\d+\s+(.+)$/);
      
      if (userMatch) {
        if (i + 2 < lines.length) {
          const wdLine = lines[i+1];
          const bankLine = lines[i+2];

          const wdMatch = wdLine.match(/Withdraw\s+[\d-]+\s+[\d:]+\s+([0-9,]+)/);

          const bankStringMatch = bankLine.match(/^[A-Z0-9]+\s+(.+)$/);

          if (wdMatch && bankStringMatch) {
            const username = userMatch[1].trim();
            const amountStr = wdMatch[1].replace(/,/g, '');
            const amount = parseFloat(amountStr);
            
            const bankFullStr = bankStringMatch[1]; 
            
            const bankParts = bankFullStr.split(',').map((s: string) => s.trim());

            if (bankParts.length >= 3) {
              const bank = bankParts[0];
              const account = bankParts[1];
              const realname = bankParts.slice(2).join(', ');

              validTransactions.push({
                bank,
                account,
                username,
                realname,
                amount
              });

              grandTotal += amount;
              
              i += 2; 
            }
          }
        }
      }
    }

    return NextResponse.json({
      data: validTransactions,
      totalCount: validTransactions.length,
      totalAmount: grandTotal
    });

  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}