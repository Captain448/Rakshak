from app.agents.threat_agent import run_threat_agent
from app.agents.risk_agent import run_risk_agent

def orchestrate_threat_analysis(text: str) -> dict:
    """
    Coordinates the multi-agent analysis by running ThreatAgent and RiskAgent,
    aggregating output payloads, and applying a lightweight score heuristic.
    """
    # 1. Run Threat Agent (extract indicators)
    threat_data = run_threat_agent(text)
    
    # 2. Run Risk Agent (classify risk severity & category)
    risk_data = run_risk_agent(text)
    
    # 3. Run heuristic: Elevate score slightly if explicit threat nodes exist
    score = risk_data.get("score", 10)
    has_indicators = (
        len(threat_data.get("extracted_phones", [])) > 0 or 
        len(threat_data.get("extracted_upis", [])) > 0 or
        len(threat_data.get("extracted_domains", [])) > 0
    )
    
    if has_indicators and score < 85:
        score += 8  # Add 8% penalty for presence of suspicious addresses/contacts
        risk_data["score"] = min(score, 100)
        
        # Add indicator warning reason if not already present
        reasons = risk_data.get("reasons", [])
        reasons.append("Contains explicit contact or transfer coordinates matching suspect footprints")
        risk_data["reasons"] = reasons
        
    return {
        "risk_level": risk_data.get("risk_level", "LOW"),
        "score": risk_data.get("score", 10),
        "category": risk_data.get("category", "General Inquiry"),
        "reasons": risk_data.get("reasons", []),
        "recommendations": risk_data.get("recommendations", [])
    }
