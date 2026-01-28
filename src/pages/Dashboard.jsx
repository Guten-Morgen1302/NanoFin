import { useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/layout/Footer";

export const Dashboard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [viewMode, setViewMode] = useState('form'); // 'form', 'analytics', 'arcade'
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser();

  // Mock PS3 Dashboard Data
  const ps3Data = {
    creditScore: 658,
    maxScore: 1000,
    trend: [550, 580, 600, 625, 640, 658],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    riskBand: 'Watch', // Safe, Watch, Critical
    keySignals: {
      incomeStability: 72,
      emiRatio: 35,
      missedPayments: 1,
      cashBuffer: 1.2, // months
    },
    monthlyData: [
      { month: 'Jan', income: 45000, fixed: 12000, discretionary: 8000, emi: 5000 },
      { month: 'Feb', income: 48000, fixed: 12000, discretionary: 7500, emi: 5000 },
      { month: 'Mar', income: 50000, fixed: 12000, discretionary: 9000, emi: 5000 },
      { month: 'Apr', income: 52000, fixed: 12000, discretionary: 8500, emi: 5000 },
      { month: 'May', income: 55000, fixed: 12000, discretionary: 9500, emi: 5000 },
      { month: 'Jun', income: 58000, fixed: 12000, discretionary: 8000, emi: 5000 },
    ],
    streaks: {
      onTimePayments: 6,
      noImpulseSpend: 3,
      savings: 2,
    },
    behaviors: {
      positive: [
        "Consistent income growth of 5-7% monthly",
        "6-month on-time payment streak",
        "Discretionary spending reduced by 15% in last month"
      ],
      negative: [
        "1 EMI delayed by 5 days in April",
        "Cash buffer covers only 1.2 months of expenses",
        "High discretionary spending in March (₹9,000)"
      ]
    }
  };

  // Handle loading state
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Handle authentication
  if (!isSignedIn) {
    navigate('/login');
    return null;
  }

  const steps = [
    { id: 1, title: "Personal Information" },
    { id: 2, title: "Business Details" },
    { id: 3, title: "Document Upload" },
    { id: 4, title: "Loan Application" },
    { id: 5, title: "Review & Submit" },
  ];

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      console.log("Uploaded files:", files);
    }
  };

  const handleSubmit = () => {
    navigate("/LoanAnalysis");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3>Personal Information</h3>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="First Name" 
                className="input"
                defaultValue={user?.firstName || ''}
              />
              <input 
                type="text" 
                placeholder="Last Name" 
                className="input"
                defaultValue={user?.lastName || ''}
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="input full-width"
              defaultValue={user?.primaryEmailAddress?.emailAddress || ''}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="input full-width"
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h3>Business Details</h3>
            <input
              type="text"
              placeholder="Business Name"
              className="input full-width"
            />
            <select className="input full-width" defaultValue="">
              <option value="" disabled>
                Select Business Type
              </option>
              <option value="street-vendor">Street Vendor</option>
              <option value="food-truck">Food Truck</option>
              <option value="small-retail">Small Retail Shop</option>
              <option value="local-service">Local Service Provider</option>
              <option value="handicrafts">Handicrafts Seller</option>
              <option value="transport">Transport Business</option>
            </select>
            <input
              type="text"
              placeholder="Years in Business"
              className="input full-width"
            />
            <textarea
              placeholder="Business Description"
              className="input full-width"
            ></textarea>
          </div>
        );
      case 3:
        return (
          <div>
            <h3>Document Upload</h3>
            <div className="upload-area">
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileUpload}
                className="upload-input"
              />
            </div>
            <h2>Required Documents:</h2>
            <ul className="doc-list">
              <li>Business Registration (If available)</li>
              <li>Recent Bank Statements (If available)</li>
              <li>Proof of Business Location</li>
              <li>Any Govt. ID Proof</li>
            </ul>
          </div>
        );
      case 4:
        return (
          <div>
            <h3>Loan Application</h3>
            <select className="input full-width" defaultValue="">
              <option value="" disabled>
                Select Loan Type
              </option>
              <option value="nano-loan">Nano Business Loan</option>
              <option value="working-capital">Working Capital Loan</option>
              <option value="equipment-financing">Equipment Financing</option>
              <option value="inventory-loan">Inventory Loan</option>
              <option value="growth-loan">Growth and Expansion Loan</option>
            </select>
            <input
              type="number"
              placeholder="Requested Amount"
              className="input full-width"
            />
            <textarea
              placeholder="Loan Purpose"
              className="input full-width"
            ></textarea>
          </div>
        );
      case 5:
        return (
          <div>
            <h3>Review & Submit</h3>
            <p>Review your application before submitting.</p>
            <button className="btn" onClick={handleSubmit}>
              Submit Application
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  // PS3 Dashboard Sections
  const CreditHealthOverview = () => (
    <div className="credit-health-section">
      <h2>💰 Credit Health Overview</h2>
      
      <div className="credit-score-card">
        <div className="score-display">
          <div className="score-circle">
            <span className="score-value">{ps3Data.creditScore}</span>
            <span className="score-max">/{ps3Data.maxScore}</span>
          </div>
          <div className="score-info">
            <p className="score-label">Adaptive Credit Score</p>
            <p className="risk-band" style={{
              color: ps3Data.riskBand === 'Safe' ? '#4CAF50' : ps3Data.riskBand === 'Watch' ? '#FFC107' : '#f44336'
            }}>
              Risk Band: <strong>{ps3Data.riskBand}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="key-signals">
        <h3>Key Signals</h3>
        <div className="signals-grid">
          <div className="signal-item">
            <span className="signal-label">Income Stability</span>
            <div className="signal-bar">
              <div className="signal-fill" style={{width: `${ps3Data.keySignals.incomeStability}%`, background: '#4CAF50'}}></div>
            </div>
            <span className="signal-value">{ps3Data.keySignals.incomeStability}%</span>
          </div>
          <div className="signal-item">
            <span className="signal-label">EMI Ratio</span>
            <div className="signal-bar">
              <div className="signal-fill" style={{width: `${ps3Data.keySignals.emiRatio}%`, background: '#2196F3'}}></div>
            </div>
            <span className="signal-value">{ps3Data.keySignals.emiRatio}%</span>
          </div>
          <div className="signal-item">
            <span className="signal-label">Cash Buffer</span>
            <span className="signal-value">{ps3Data.keySignals.cashBuffer} months</span>
          </div>
          <div className="signal-item">
            <span className="signal-label">Missed Payments</span>
            <span className="signal-value">{ps3Data.keySignals.missedPayments}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const CashflowTimeline = () => (
    <div className="cashflow-section">
      <h2>📊 Cashflow & Behavior Timeline</h2>
      
      <div className="monthly-bars">
        {ps3Data.monthlyData.map((month, idx) => (
          <div key={idx} className="month-bar">
            <p className="month-label">{month.month}</p>
            <div className="bar-stack">
              <div className="bar-segment income" style={{height: `${(month.income / 60000) * 100}%`}} title={`Income: ₹${month.income}`}></div>
              <div className="bar-segment fixed" style={{height: `${(month.fixed / 60000) * 100}%`}} title={`Fixed: ₹${month.fixed}`}></div>
              <div className="bar-segment discretionary" style={{height: `${(month.discretionary / 60000) * 100}%`}} title={`Discretionary: ₹${month.discretionary}`}></div>
              <div className="bar-segment emi" style={{height: `${(month.emi / 60000) * 100}%`}} title={`EMI: ₹${month.emi}`}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="legend">
        <div><span className="legend-color income"></span> Income</div>
        <div><span className="legend-color fixed"></span> Fixed Expenses</div>
        <div><span className="legend-color discretionary"></span> Discretionary</div>
        <div><span className="legend-color emi"></span> EMI</div>
      </div>

      <div className="behavior-streaks">
        <h3>Behavior Streaks 🔥</h3>
        <div className="streaks-grid">
          <div className="streak-card">
            <span className="streak-icon">✅</span>
            <span className="streak-label">On-Time Payments</span>
            <span className="streak-count">{ps3Data.streaks.onTimePayments} months</span>
          </div>
          <div className="streak-card">
            <span className="streak-icon">🛍️</span>
            <span className="streak-label">No Impulse Spend</span>
            <span className="streak-count">{ps3Data.streaks.noImpulseSpend} months</span>
          </div>
          <div className="streak-card">
            <span className="streak-icon">💰</span>
            <span className="streak-label">Savings Streak</span>
            <span className="streak-count">{ps3Data.streaks.savings} months</span>
          </div>
        </div>
      </div>
    </div>
  );

  const RepaymentSimulation = () => {
    const [loanAmount, setLoanAmount] = useState(100000);
    const [months, setMonths] = useState(12);
    const [rate, setRate] = useState(12);

    const monthlyEMI = (loanAmount * (rate / 100 / 12)) / (1 - Math.pow(1 + (rate / 100 / 12), -months));
    const monthlyIncome = 55000;
    const dti = ((monthlyEMI / monthlyIncome) * 100).toFixed(2);

    return (
      <div className="repayment-section">
        <h2>🎯 Repayment & Simulation Panel</h2>
        
        <div className="simulation-sliders">
          <div className="slider-group">
            <label>Loan Amount: ₹{loanAmount.toLocaleString()}</label>
            <input 
              type="range" 
              min="10000" 
              max="500000" 
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseInt(e.target.value))}
              className="slider"
            />
          </div>

          <div className="slider-group">
            <label>Loan Duration: {months} months</label>
            <input 
              type="range" 
              min="6" 
              max="60" 
              step="1"
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value))}
              className="slider"
            />
          </div>

          <div className="slider-group">
            <label>Interest Rate: {rate}% p.a.</label>
            <input 
              type="range" 
              min="8" 
              max="20" 
              step="0.5"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="slider"
            />
          </div>
        </div>

        <div className="simulation-results">
          <div className="result-card">
            <span className="result-label">Monthly EMI</span>
            <span className="result-value">₹{monthlyEMI.toFixed(0)}</span>
          </div>
          <div className="result-card">
            <span className="result-label">Total Amount</span>
            <span className="result-value">₹{(monthlyEMI * months).toFixed(0)}</span>
          </div>
          <div className="result-card">
            <span className="result-label">DTI Ratio</span>
            <span className="result-value">{dti}%</span>
          </div>
          <div className="result-card">
            <span className="result-label">Approval Risk</span>
            <span className="result-value" style={{color: dti < 30 ? '#4CAF50' : dti < 50 ? '#FFC107' : '#f44336'}}>
              {dti < 30 ? 'Low' : dti < 50 ? 'Medium' : 'High'}
            </span>
          </div>
        </div>

        <div className="scenario-buttons">
          <h3>Scenario Testing</h3>
          <div className="button-group">
            <button className="scenario-btn" onClick={() => {setLoanAmount(50000); setMonths(12); setRate(12);}}>📉 Job Loss (-30% income)</button>
            <button className="scenario-btn" onClick={() => {setRate(rate + 2);}}>🏥 Medical Emergency (+2% rate)</button>
            <button className="scenario-btn" onClick={() => {setRate(rate + 1);}}>📈 Rate Hike (+1%)</button>
          </div>
        </div>
      </div>
    );
  };

  const ExplainabilityPanel = () => (
    <div className="explainability-section">
      <h2>🔍 Why is my score like this?</h2>
      
      <div className="behaviors-container">
        <div className="positive-behaviors">
          <h3>✅ Top 3 Positive Behaviors</h3>
          {ps3Data.behaviors.positive.map((behavior, idx) => (
            <div key={idx} className="behavior-item positive">
              <span className="behavior-icon">✓</span>
              <p>{behavior}</p>
            </div>
          ))}
        </div>

        <div className="negative-behaviors">
          <h3>⚠️ Top 3 Areas to Improve</h3>
          {ps3Data.behaviors.negative.map((behavior, idx) => (
            <div key={idx} className="behavior-item negative">
              <span className="behavior-icon">!</span>
              <p>{behavior}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Recommendation logic
  const recommendedGame = (() => {
    if (ps3Data.keySignals.emiRatio > 40) {
      return {
        game: "FinQUEST - Level 4: Debt Management",
        reason: "Your DTI ratio is 35% - mastering debt strategies could help reduce it.",
        type: "finquest",
        level: 4
      };
    } else if (ps3Data.monthlyData[5].discretionary > 8500) {
      return {
        game: "FinanceFrenzy - High-Interest Debt Scenario",
        reason: "Your discretionary spend is high - simulate managing unexpected expenses.",
        type: "financefrenzy",
        level: "scenario"
      };
    } else {
      return {
        game: "FinQUEST - Level 5: Investment Strategies",
        reason: "You're in good standing! Learn investing to grow your wealth.",
        type: "finquest",
        level: 5
      };
    }
  })();

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="dashboard-logo">
          Credit<i className="ri-money-rupee-circle-fill"></i>Worthy
        </div>
        <div className="dashboard-user-icon">
          {isSignedIn && <UserButton afterSignOutUrl="/login" />}
        </div>
      </nav>

      {/* View Mode Selector */}
      <div className="view-mode-selector">
        <button 
          className={`mode-btn ${viewMode === 'form' ? 'active' : ''}`}
          onClick={() => setViewMode('form')}
        >
          📋 Loan Application
        </button>
        <button 
          className={`mode-btn ${viewMode === 'analytics' ? 'active' : ''}`}
          onClick={() => setViewMode('analytics')}
        >
          📊 Credit Analytics
        </button>
        <button 
          className={`mode-btn ${viewMode === 'arcade' ? 'active' : ''}`}
          onClick={() => setViewMode('arcade')}
        >
          🎮 Financial Arcade
        </button>
      </div>

      {/* Main Content */}
      <section className="dashboard-content d-text">
        {viewMode === 'form'
          ? (
            <>
              <h1>
                AI-Driven <span>Credit Access Portal</span>
              </h1>
              <p>
                Start exploring your journey to better credit access and management.
              </p>

              {/* Steps Navigation */}
              <div className="steps-nav">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`step ${currentStep === step.id ? "active" : ""}`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <span>{step.id}</span>
                    <p>{step.title}</p>
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <div className="step-content">{renderStepContent()}</div>

              {/* Navigation Buttons */}
              <div className="step-buttons">
                <button
                  className="prev-btn"
                  disabled={currentStep === 1}
                  onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    currentStep === steps.length
                      ? handleSubmit()
                      : setCurrentStep((prev) => Math.min(prev + 1, steps.length))
                  }
                >
                  {currentStep === steps.length ? "Submit" : "Next"}
                </button>
              </div>
            </>
          )
          : viewMode === 'analytics'
          ? (
            <div className="ps3-dashboard">
              <h1>💡 Personal Finance Score System (PS3) Analytics</h1>
              
              <CreditHealthOverview />
              <CashflowTimeline />
              <RepaymentSimulation />
              <ExplainabilityPanel />
            </div>
          )
          : (
            <div className="arcade-section">
            <h1>🎮 Financial Arcade</h1>
            <p>Learn financial skills by playing interactive games and improving your financial behavior score!</p>
            
            <div className="arcade-container">
              <div className="arcade-card">
                <div className="game-icon">📚</div>
                <h3>FinQUEST</h3>
                <p>Master financial literacy through 8 challenging levels covering budgeting, investments, debt management, and more.</p>
                <button 
                  className="play-btn"
                  onClick={() => navigate('/arcade/FinQUEST')}
                >
                  🎮 Play Now
                </button>
              </div>

              <div className="arcade-card">
                <div className="game-icon">💰</div>
                <h3>FinanceFrenzy</h3>
                <p>Manage your portfolio across market scenarios and build wealth through smart trading decisions in real-time.</p>
                <button 
                  className="play-btn"
                  onClick={() => navigate('/arcade/FinanceFrenzy')}
                >
                  🎮 Play Now
                </button>
              </div>
            </div>

            <div className="arcade-stats">
              <div className="stat-card">
                <h4>Training Behavior Score</h4>
                <p className="score">750/1000</p>
                <p className="stat-detail">Based on your game progress and learning engagement</p>
              </div>
              
              <div className="stat-card">
                <h4>Games Completed</h4>
                <p className="score">2/2</p>
                <p className="stat-detail">Keep playing to unlock new challenges and improve your score</p>
              </div>

              <div className="stat-card">
                <h4>Recommended Next Step</h4>
                <p className="stat-detail">🎯 Your DTI is high—play the Debt Management level in FinQUEST to learn strategies!</p>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer/>
    </div>
  );
};