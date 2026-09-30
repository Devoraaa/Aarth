import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SizeChartProps {
  rawTsvData: string; // The raw multi-line string from Shopify
}

export function SizeChart({ rawTsvData }: SizeChartProps) {
  const [unit, setUnit] = useState<"IN" | "CM">("IN");

  // Parse TSV (Tab Separated Values) or CSV (Comma Separated)
  const { headers, rows } = useMemo(() => {
    if (!rawTsvData) return { headers: [], rows: [] };
    
    const lines = rawTsvData.split(/\r?\n/).filter(line => line.trim() !== "");
    if (lines.length < 2) return { headers: [], rows: [] };

    const separator = lines[0].includes("\t") ? "\t" : ",";
    const parsedHeaders = lines[0].split(separator).map(h => h.trim());
    
    const parsedRows = lines.slice(1).map(line => {
      const values = line.split(separator).map(v => v.trim());
      const rowData: Record<string, string> = {};
      parsedHeaders.forEach((header, i) => {
        rowData[header] = values[i] || "";
      });
      return rowData;
    });

    return { headers: parsedHeaders, rows: parsedRows };
  }, [rawTsvData]);

  // Convert values if CM is selected
  const displayRows = useMemo(() => {
    if (unit === "IN") return rows;

    return rows.map(row => {
      const newRow = { ...row };
      headers.forEach((header, index) => {
        if (index === 0) return; // Skip first column (Size labels)
        
        const val = parseFloat(row[header]);
        if (!isNaN(val)) {
          const cmVal = val * 2.54;
          newRow[header] = Number.isInteger(cmVal) ? cmVal.toString() : cmVal.toFixed(1);
        }
      });
      return newRow;
    });
  }, [rows, headers, unit]);

  if (!rawTsvData) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0, marginTop: 0 }}
      animate={{ height: "auto", opacity: 1, marginTop: 16 }}
      exit={{ height: 0, opacity: 0, marginTop: 0 }}
      style={{ overflow: "hidden" }}
    >
      <div style={{ backgroundColor: "#F7F2E9", padding: "20px", border: "1px solid var(--border-antique)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: "16px", fontWeight: 600, color: "var(--color-cacao)" }}>
            MEASUREMENTS
          </span>
          
          {/* IN / CM Toggle */}
          <div style={{ display: "flex", backgroundColor: "#fff", padding: "2px", border: "1px solid var(--border-antique)", borderRadius: "20px" }}>
            <button
              onClick={() => setUnit("IN")}
              style={{
                padding: "4px 12px",
                fontSize: "11px",
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                borderRadius: "20px",
                cursor: "pointer",
                transition: "all 0.2s",
                backgroundColor: unit === "IN" ? "var(--color-cacao)" : "transparent",
                color: unit === "IN" ? "#fff" : "var(--color-cacao)",
                border: "none"
              }}
            >
              IN
            </button>
            <button
              onClick={() => setUnit("CM")}
              style={{
                padding: "4px 12px",
                fontSize: "11px",
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                borderRadius: "20px",
                cursor: "pointer",
                transition: "all 0.2s",
                backgroundColor: unit === "CM" ? "var(--color-cacao)" : "transparent",
                color: unit === "CM" ? "#fff" : "var(--color-cacao)",
                border: "none"
              }}
            >
              CM
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ backgroundColor: "#fff", border: "1px solid var(--border-antique)", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center", fontSize: "13px" }}>
            <thead>
              <tr style={{ backgroundColor: "rgba(74, 59, 50, 0.05)", borderBottom: "1px solid var(--border-antique)" }}>
                {headers.map((header, i) => (
                  <th key={i} style={{ padding: "10px", fontWeight: 600, color: "var(--color-cacao)", fontFamily: "var(--font-mono)", letterSpacing: "0.05em", fontSize: "11px" }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayRows.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  style={{ 
                    borderBottom: rowIndex !== displayRows.length - 1 ? "1px solid var(--border-antique)" : "none",
                    backgroundColor: "transparent"
                  }}
                >
                  {headers.map((header, colIndex) => (
                    <td 
                      key={colIndex} 
                      style={{ 
                        padding: "12px 10px", 
                        color: "var(--color-leather)", 
                        fontFamily: colIndex === 0 ? "var(--font-serif)" : "var(--font-sans)",
                        fontWeight: colIndex === 0 ? 600 : 400
                      }}
                    >
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
