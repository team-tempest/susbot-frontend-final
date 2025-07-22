"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ClipboardIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { susBot, type ScanResult } from "@/lib/ic-service";

export const SecurityDashboardSection = () => {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!address.trim()) return;
    
    setIsScanning(true);
    setResult(null);
    setError(null);
    
    try {
      console.log('Starting scan for address:', address);
      const scanResult = await susBot.analyzeAddress(address.trim());
      console.log('Scan completed:', scanResult);
      setResult(scanResult);
    } catch (err) {
      console.error('Scan failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to scan address');
    } finally {
      setIsScanning(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const parseAIAnalysis = (summary: string) => {
    try {
      // Try to parse JSON if the summary contains structured data
      if (summary.includes('"verdict"') || summary.includes('"summary"') || summary.includes('"recommendations"')) {
        const jsonMatch = summary.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return parsed;
        }
      }
      
      // If it's already an object, return it
      if (typeof summary === 'object') {
        return summary;
      }
    } catch (e) {
      console.warn('Failed to parse AI analysis as JSON:', e);
    }
    
    // Fallback: return structured format with the raw summary
    return { 
      verdict: "Analysis Complete",
      summary: summary,
      recommendations: "Review the summary above for detailed analysis."
    };
  };

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: "Low Risk", color: "green", icon: ShieldCheckIcon };
    if (score >= 60) return { level: "Moderate Risk", color: "yellow", icon: ExclamationTriangleIcon };
    if (score >= 30) return { level: "High Risk", color: "orange", icon: ExclamationTriangleIcon };
    return { level: "Critical Risk", color: "red", icon: ExclamationTriangleIcon };
  };

  const parseDetectedRisks = (risks: string[]) => {
    return risks.map(risk => {
      // Try to extract severity level from risk string (various formats)
      const severityMatch = risk.match(/\[(Low|Medium|High|Critical)\]|^(Low|Medium|High|Critical)[:|\s]|(Low|Medium|High|Critical)\s*Risk/i);
      let severity = 'Medium';
      let description = risk;
      
      if (severityMatch) {
        severity = (severityMatch[1] || severityMatch[2] || severityMatch[3]).toLowerCase();
        // Capitalize first letter
        severity = severity.charAt(0).toUpperCase() + severity.slice(1);
        // Remove the severity part from description
        description = risk.replace(/\[(Low|Medium|High|Critical)\]\s*|^(Low|Medium|High|Critical)[:|\s]*|(Low|Medium|High|Critical)\s*Risk\s*/i, '').trim();
      }
      
      // If description is empty, use original text
      if (!description) {
        description = risk;
      }
      
      return {
        severity: severity as 'Low' | 'Medium' | 'High' | 'Critical',
        description,
        originalText: risk
      };
    });
  };

  const formatScanResult = () => {
    if (!result) return null;

    const riskInfo = getRiskLevel(result.score);
    const aiAnalysis = parseAIAnalysis(result.summary);
    const parsedRisks = parseDetectedRisks(result.risks || []);
    
    return {
      score: result.score,
      riskLevel: riskInfo.level,
      riskColor: riskInfo.color,
      riskIcon: riskInfo.icon,
      totalRisks: parsedRisks.length,
      aiAnalysis,
      detectedRisks: parsedRisks,
      rawSummary: result.summary
    };
  };

  const threats = [
    { address: "0x4f3...a8cD", risk: "High", detected: "1 min ago" },
    { address: "0x9be...99F1", risk: "Medium", detected: "5 mins ago" },
    { address: "0x2b7...E71B", risk: "Critical", detected: "8 mins ago" },
    { address: "0x7dA...Fc80", risk: "High", detected: "12 mins ago" },
    { address: "0xC12...04AD", risk: "Medium", detected: "17 mins ago" },
  ];

  const formattedResult = formatScanResult();

  return (
    <div className="relative flex flex-col w-full">
      {/* Background */}
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute left-0 w-full h-full object-cover -z-20 scale-60"
      >
        <source src="/videos/encryption-bg.webm" type="video/webm" />
      </video>

      {/* Scanner */}
      <section className="w-full flex justify-center items-center py-32 px-6 bg-transparent min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl flex flex-col gap-10 items-center text-center"
        >
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            SusBot Security Scanner
          </h2>

          <p className="text-white text-lg max-w-2xl">
            Enter any Web3 wallet, contract, or token address. Let SusBot&apos;s AI engine run a security scan, generate a risk score, and flag any suspicious history.
          </p>

          {/* Scan Box */}
          <div className="w-full backdrop-blur-xl bg-[#03001466] border border-white/10 shadow-xl rounded-3xl p-8 flex flex-col gap-6 items-center">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Paste Web3 address (0x... or contract address)..."
              className="w-full px-5 py-3 bg-[#0F0A20] text-gray-300 border border-purple-500/30 rounded-full focus:ring-2 focus:ring-purple-500/50 outline-none transition"
              onKeyPress={(e) => e.key === 'Enter' && handleScan()}
            />

            {/* Scan Button */}
            <button
              onClick={handleScan}
              disabled={isScanning || !address.trim()}
              className={`w-full px-5 py-3 text-white font-medium rounded-full shadow-[0_0_10px_#a855f7] transition backdrop-blur-md border border-purple-500/30 ${
                isScanning || !address.trim()
                  ? "bg-[#1F0A30]/50 cursor-not-allowed"
                  : "bg-[#1F0A30]/30 hover:bg-[#3D1A60]/40"
              }`}
            >
              {isScanning ? "Scanning..." : "Scan Address"}
            </button>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full p-4 bg-red-500/10 border border-red-400 rounded-2xl"
              >
                <p className="text-red-400 text-center">{error}</p>
              </motion.div>
            )}

            {/* Scan Progress */}
            {isScanning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 justify-center text-white py-4"
              >
                <ArrowPathIcon className="h-6 w-6 animate-spin text-cyan-400" />
                <p className="text-lg">Running SusBot AI analysis...</p>
              </motion.div>
            )}

            {/* Scan Result */}
            {formattedResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-6"
              >
                {/* Risk Status Header */}
                <div className={`w-full p-6 rounded-2xl border ${
                  formattedResult.riskColor === "green" 
                    ? "border-green-400/50 bg-green-500/10" 
                    : formattedResult.riskColor === "yellow"
                    ? "border-yellow-400/50 bg-yellow-500/10"
                    : formattedResult.riskColor === "orange"
                    ? "border-orange-400/50 bg-orange-500/10"
                    : "border-red-400/50 bg-red-500/10"
                }`}>
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <ExclamationTriangleIcon className={`h-8 w-8 ${
                      formattedResult.riskColor === "green" ? "text-green-400" :
                      formattedResult.riskColor === "yellow" ? "text-yellow-400" :
                      formattedResult.riskColor === "orange" ? "text-orange-400" :
                      "text-red-400"
                    }`} />
                    <p className="text-2xl font-bold text-gray-200">
                      ⚠️ {formattedResult.riskLevel} Detected ⚠️
                    </p>
                  </div>

                  {/* Risk Score and Total Risks Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-400 mb-2">Risk Score</p>
                      <p className="text-4xl font-bold text-white">{formattedResult.score} / 100</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400 mb-2">Total Risks Found</p>
                      <p className="text-4xl font-bold text-white">{formattedResult.totalRisks} issues detected</p>
                    </div>
                  </div>

                  {/* AI Analysis Summary */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-200 mb-3">AI Analysis Summary</h3>
                    <div className="space-y-4">
                      {/* Verdict */}
                      {formattedResult.aiAnalysis.verdict && (
                        <div className="bg-black/30 rounded-xl p-4 border border-gray-600/30">
                          <h4 className="text-md font-semibold text-yellow-400 mb-2">🔍 Verdict</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {formattedResult.aiAnalysis.verdict}
                          </p>
                        </div>
                      )}
                      
                      {/* Summary */}
                      {formattedResult.aiAnalysis.summary && (
                        <div className="bg-black/30 rounded-xl p-4 border border-gray-600/30">
                          <h4 className="text-md font-semibold text-blue-400 mb-2">📋 Summary</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {formattedResult.aiAnalysis.summary}
                          </p>
                        </div>
                      )}
                      
                      {/* Recommendations */}
                      {formattedResult.aiAnalysis.recommendations && (
                        <div className="bg-black/30 rounded-xl p-4 border border-gray-600/30">
                          <h4 className="text-md font-semibold text-green-400 mb-2">💡 Recommendations</h4>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {formattedResult.aiAnalysis.recommendations}
                          </p>
                        </div>
                      )}
                      
                      {/* Fallback: if no structured fields found, show the raw content */}
                      {!formattedResult.aiAnalysis.verdict && !formattedResult.aiAnalysis.summary && !formattedResult.aiAnalysis.recommendations && (
                        <div className="bg-black/30 rounded-xl p-4 border border-gray-600/30">
                          <h4 className="text-md font-semibold text-gray-400 mb-2">📄 Analysis</h4>
                          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                            {typeof formattedResult.aiAnalysis === 'string' 
                              ? formattedResult.aiAnalysis 
                              : JSON.stringify(formattedResult.aiAnalysis, null, 2)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Detected Risks */}
                  {formattedResult.detectedRisks.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-200 mb-3">Detected Risks</h3>
                      <div className="space-y-3">
                        {formattedResult.detectedRisks.map((risk, index) => (
                          <div key={index} className="bg-black/20 rounded-lg p-4 border border-gray-600/20">
                            <div className="flex items-start gap-3">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                risk.severity === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/50' :
                                risk.severity === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' :
                                risk.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50' :
                                'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                              }`}>
                                [{risk.severity}]
                              </span>
                              <p className="text-gray-300 text-sm flex-1">{risk.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 justify-center">
                    <button 
                      onClick={() => {
                        const analysis = formattedResult.aiAnalysis;
                        const reportText = `
🔍 ADDRESS SECURITY REPORT 🔍

Address: ${address}
Risk Score: ${formattedResult.score}/100
Risk Level: ${formattedResult.riskLevel}
Total Risks Found: ${formattedResult.totalRisks} issues detected

${analysis.verdict ? `🔍 VERDICT:\n${analysis.verdict}\n\n` : ''}
${analysis.summary ? `📋 SUMMARY:\n${analysis.summary}\n\n` : ''}
${analysis.recommendations ? `💡 RECOMMENDATIONS:\n${analysis.recommendations}\n\n` : ''}

DETECTED RISKS:
${formattedResult.detectedRisks.map((risk, i) => `${i+1}. [${risk.severity}] ${risk.description}`).join('\n')}

Generated by SusBot AI Security Scanner
                        `.trim();
                        copyToClipboard(reportText);
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                    >
                      <ClipboardIcon className="h-5 w-5" /> Copy Report
                    </button>
                    <button 
                      className="flex items-center gap-2 px-6 py-3 bg-transparent border border-white/30 text-gray-300 rounded-full hover:bg-white/10 transition"
                    >
                      View Full Report
                    </button>
                    <button 
                      onClick={() => {
                        const analysis = formattedResult.aiAnalysis;
                        const summaryText = `
🤖 AI ANALYSIS SUMMARY

${analysis.verdict ? `🔍 VERDICT:\n${analysis.verdict}\n\n` : ''}
${analysis.summary ? `📋 SUMMARY:\n${analysis.summary}\n\n` : ''}
${analysis.recommendations ? `💡 RECOMMENDATIONS:\n${analysis.recommendations}` : ''}
                        `.trim();
                        copyToClipboard(summaryText);
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full hover:opacity-90 transition"
                    >
                      <SparklesIcon className="h-5 w-5" /> Copy AI Summary
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Live Threat Feed */}
          <div className="w-full flex flex-col gap-8">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-500">
              Live Threat Feed
            </h3>

            <div className="backdrop-blur-lg bg-[#0F0A20]/50 border border-white/10 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-3 text-gray-400 text-sm uppercase border-b border-white/10 px-6 py-3">
                <p>Address</p>
                <p>Risk</p>
                <p>Detected</p>
              </div>

              {threats.map((threat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="grid grid-cols-3 px-6 py-4 border-b border-white/5 text-white items-center"
                >
                  <div className="flex items-center gap-2">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                    <span className="font-mono">{threat.address}</span>
                  </div>
                  <p
                    className={`font-semibold ${
                      threat.risk === "Critical"
                        ? "text-red-500"
                        : threat.risk === "High"
                        ? "text-orange-400"
                        : "text-yellow-300"
                    }`}
                  >
                    {threat.risk}
                  </p>
                  <p className="text-sm text-gray-400">{threat.detected}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};