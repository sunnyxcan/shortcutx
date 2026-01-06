// app/api/parse/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { rawData } = await request.json();

    if (!rawData) {
      return NextResponse.json({ error: 'Data kosong' }, { status: 400 });
    }

    const rawLines = rawData.split('\n');
    let blocks: string[][] = [];
    let currentBlockLines: string[] = [];
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    rawLines.forEach((lineRaw: string) => {
      let line = lineRaw.trim();
      if (!line) return;

      const isHeader = (line === 'PEND') || dateRegex.test(line);

      if (isHeader) {
        if (currentBlockLines.length > 0) blocks.push(currentBlockLines);
        currentBlockLines = [line];
      } else {
        currentBlockLines.push(line);
      }
    });
    if (currentBlockLines.length > 0) blocks.push(currentBlockLines);

    let validTransactions: any[] = [];
    let grandTotal = 0;

    blocks.forEach(lines => {
      if (lines.length < 3) return;

      let isIncoming = false;
      let typeLine = "";
      
      for (let l of lines) {
        if (l.includes('TRSF E-BANKING') || l.includes('BI-FAST') || l.includes('SWITCHING') || l.includes('SETORAN VIA CDM')) {
          typeLine = l;
          break;
        }
      }
      
      if (lines.some(l => l === 'CR' || l.endsWith(' CR'))) isIncoming = true; 
      if (typeLine.includes('DB')) isIncoming = false;

      if (isIncoming) {
        let amount = 0;
        let name = "Unknown";
        
        let rawAmountIndex = lines.findIndex(l => /^\d+\.00$/.test(l));
        
        if (rawAmountIndex !== -1) {
          amount = parseFloat(lines[rawAmountIndex]);
        } else {
          let index0000 = lines.findIndex(l => l === '0000');
          if (index0000 !== -1 && lines[index0000 + 1]) {
            let potentialAmt = lines[index0000 + 1].replace(/,/g,'');
            if (!isNaN(parseFloat(potentialAmt))) amount = parseFloat(potentialAmt);
          }
        }

        if (typeLine.includes('SWITCHING')) {
          let trfLine = lines.find(l => l.startsWith('TRF '));
          if (trfLine) {
            let match = trfLine.match(/TRF\s+(?:\d+\s+)?(.*?)(?=\s+\d{3,}|\s*$)/);
            name = (match && match[1]) ? match[1] : trfLine;
          }
        }
        else if (typeLine.includes('BI-FAST')) {
          let trsfLine = lines.find(l => l.includes('TRANSFER DR'));
          if (trsfLine) {
            let match = trsfLine.match(/TRANSFER DR\s+(?:\d+\s+)?(.*)/);
            name = (match && match[1]) ? match[1] : trsfLine;
          }
        }
        else if (typeLine.includes('SETORAN VIA CDM')) {
          let cdmLine = lines.find(l => l.includes('WSID:'));
          if (cdmLine) {
            let parts = cdmLine.split(/WSID:[A-Z0-9]+\s+/);
            name = parts.length > 1 ? parts[1] : cdmLine;
          }
        }
        else {
          let index0000 = lines.findIndex(l => l === '0000');
          if (index0000 !== -1) {
            let lineBefore = lines[index0000 - 1];
            let lineTwoBefore = lines[index0000 - 2];
            
            if (lineBefore === 'DOMPET ANAK BANGSA' || lineBefore.includes('ESPAY') || lineBefore.includes('DANA') || lineBefore.includes('OVO') || lineBefore.includes('ALTO NETWORK')) {
              name = lineTwoBefore;
              if (name && name.startsWith('TRFDN-')) {
                name = name.replace('TRFDN-', '');
              } else if (name && (name.startsWith('ID') || !isNaN(Number(name.charAt(0))))) {
                name = name + " (" + lineBefore + ")";
              }
            } else {
              name = lineBefore;
            }
          } else {
            if (rawAmountIndex !== -1 && lines[rawAmountIndex + 1]) {
              name = lines[rawAmountIndex + 1];
            }
          }
        }

        if(name) name = name.trim();

        if (amount > 0) {
          validTransactions.push({ name, amount });
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