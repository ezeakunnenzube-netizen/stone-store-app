import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, Droplets, LayoutGrid, Ruler, Square } from "lucide-react";
import "./TileCalculator.css";

export default function TileCalculator() {
  const [lengthM, setLengthM] = useState("");
  const [widthM, setWidthM] = useState("");

  // per-tile size
  const [tileLengthCm, setTileLengthCm] = useState("");
  const [tileWidthCm, setTileWidthCm] = useState("");

  // wastage / spacing
  const [wastagePct, setWastagePct] = useState("10");

  const length = parseFloat(lengthM) || 0;
  const width = parseFloat(widthM) || 0;

  const roomArea = length * width; // m²

  const tileL = parseFloat(tileLengthCm) || 0; // cm
  const tileW = parseFloat(tileWidthCm) || 0; // cm

  const tileArea = useMemo(() => {
    if (!tileL || !tileW) return 0;
    // tile area in m²: (cm/100)^2
    return (tileL / 100) * (tileW / 100);
  }, [tileL, tileW]);

  const wastage = (parseFloat(wastagePct) || 0) / 100;

  const effectiveArea = roomArea * (1 + wastage);

  const tilesNeeded = useMemo(() => {
    if (!tileArea) return 0;
    return effectiveArea / tileArea;
  }, [effectiveArea, tileArea]);

  const tilesRoundedUp = Math.ceil(tilesNeeded || 0);

  return (
    <div className="tilecalc-page">
      <div className="tilecalc-hero">
        <div className="tilecalc-hero-inner">
          <div className="tilecalc-badge">
            <Calculator size={14} />
            <span>Tile Calculator</span>
          </div>
          <h1 className="tilecalc-title">Premium Tile Coverage Estimator</h1>
          <p className="tilecalc-subtitle">
            Enter your room dimensions and tile size to estimate the number of
            tiles required—includes your chosen wastage.
          </p>
          <Link to="/products" className="tilecalc-ghost-cta">
            Browse Tiles
          </Link>
        </div>
      </div>

      <div className="tilecalc-content">
        <div className="tilecalc-grid">
          <div className="tilecalc-card">
            <div className="tilecalc-card-title">Project Inputs</div>

            <div className="tilecalc-form">
              <div className="tilecalc-row">
                <label className="tilecalc-label">
                  <Ruler size={14} /> Length (m)
                </label>
                <input
                  className="tilecalc-input"
                  type="number"
                  min="0"
                  step="0.01"
                  value={lengthM}
                  onChange={(e) => setLengthM(e.target.value)}
                  placeholder="e.g. 8"
                />
              </div>

              <div className="tilecalc-row">
                <label className="tilecalc-label">
                  <Ruler size={14} /> Width (m)
                </label>
                <input
                  className="tilecalc-input"
                  type="number"
                  min="0"
                  step="0.01"
                  value={widthM}
                  onChange={(e) => setWidthM(e.target.value)}
                  placeholder="e.g. 5"
                />
              </div>

              <div className="tilecalc-divider" />

              <div className="tilecalc-row">
                <label className="tilecalc-label">
                  <LayoutGrid size={14} /> Tile Length (cm)
                </label>
                <input
                  className="tilecalc-input"
                  type="number"
                  min="0"
                  step="0.1"
                  value={tileLengthCm}
                  onChange={(e) => setTileLengthCm(e.target.value)}
                  placeholder="e.g. 60"
                />
              </div>

              <div className="tilecalc-row">
                <label className="tilecalc-label">
                  <LayoutGrid size={14} /> Tile Width (cm)
                </label>
                <input
                  className="tilecalc-input"
                  type="number"
                  min="0"
                  step="0.1"
                  value={tileWidthCm}
                  onChange={(e) => setTileWidthCm(e.target.value)}
                  placeholder="e.g. 60"
                />
              </div>

              <div className="tilecalc-divider" />

              <div className="tilecalc-row">
                <label className="tilecalc-label">
                  <Droplets size={14} /> Wastage / buffer (%){" "}
                  <span className="tilecalc-hint">(cuts, fitting, pattern)</span>
                </label>
                <input
                  className="tilecalc-input"
                  type="number"
                  min="0"
                  step="1"
                  value={wastagePct}
                  onChange={(e) => setWastagePct(e.target.value)}
                  placeholder="e.g. 10"
                />
              </div>
            </div>
          </div>

          <div className="tilecalc-card tilecalc-results">
            <div className="tilecalc-card-title">Estimated Results</div>

            <div className="tilecalc-metric">
              <div className="tilecalc-metric-top">
                <Square size={16} />
                <div className="tilecalc-metric-label">Room Area</div>
              </div>
              <div className="tilecalc-metric-value">
                {roomArea ? roomArea.toFixed(2) : "0.00"} <span>m²</span>
              </div>
            </div>

            <div className="tilecalc-metric">
              <div className="tilecalc-metric-top">
                <LayoutGrid size={16} />
                <div className="tilecalc-metric-label">Tile Area</div>
              </div>
              <div className="tilecalc-metric-value">
                {tileArea ? tileArea.toFixed(4) : "0.0000"} <span>m²</span>
              </div>
            </div>

            <div className="tilecalc-metric">
              <div className="tilecalc-metric-top">
                <Droplets size={16} />
                <div className="tilecalc-metric-label">Effective Area (with wastage)</div>
              </div>
              <div className="tilecalc-metric-value">
                {effectiveArea ? effectiveArea.toFixed(2) : "0.00"} <span>m²</span>
              </div>
            </div>

            <div className="tilecalc-big">
              <div className="tilecalc-big-top">
                <span className="tilecalc-big-icon">
                  <LayoutGrid size={18} />
                </span>
                <div className="tilecalc-big-label">Tiles Needed</div>
              </div>
              <div className="tilecalc-big-value">
                {tilesRoundedUp.toLocaleString()} <span className="tilecalc-big-unit">tiles</span>
              </div>
              <div className="tilecalc-big-sub">
                Based on your inputs and {wastagePct || "0"}% buffer.
              </div>
            </div>

            <div className="tilecalc-cta-row">
              <button
                className="tilecalc-copy-btn"
                onClick={() => {
                  const text = `Tiles needed: ${tilesRoundedUp} (room ${roomArea.toFixed(
                    2
                  )}m², tile ${tileL}x${tileW}cm, wastage ${wastagePct}%)`;
                  navigator.clipboard?.writeText(text);
                }}
                type="button"
              >
                Copy Estimate
              </button>
            </div>
          </div>
        </div>

        <div className="tilecalc-footnote">
          <p>
            Tip: if your project includes openings (niche, window, hearth), reduce
            the room area accordingly for higher accuracy.
          </p>
          <div className="tilecalc-powered">
            <span>Need a quote? Contact us for a detailed estimate.</span>
            <Link to="/contact" className="tilecalc-powered-link">
              Request a Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

