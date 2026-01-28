import streamlit as st
import pandas as pd
import numpy as np
import json
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime
import re

# Page configuration
st.set_page_config(
    page_title="NanoFin - Complete AI Analysis",
    layout="wide",
    page_icon="🏛️",
    initial_sidebar_state="expanded"
)

# ============= UTILITY FUNCTIONS =============

def clean_date(date_str):
    """Clean date string by removing INB suffix if present"""
    return re.sub(r'INB$', '', date_str)

def prepare_transaction_data(transactions):
    df = pd.DataFrame(transactions)
    df['date'] = df['date'].apply(clean_date)
    df['date'] = pd.to_datetime(df['date'], format='%d-%m-%y')
    df['month'] = df['date'].dt.month
    df['day_of_week'] = df['date'].dt.dayofweek
    
    df['credit'] = pd.to_numeric(df['credit'], errors='coerce').fillna(0)
    df['debit'] = pd.to_numeric(df['debit'], errors='coerce').fillna(0)
    df['balance'] = pd.to_numeric(df['balance'], errors='coerce').fillna(0)
    
    return df

def categorize_transactions(description):
    """Enhanced transaction categorization"""
    categories = {
        'BUSINESS_INCOME': ['SALARY', 'INVESTMENT', 'BONUS', 'RETURNS', 'CREDIT'],
        'BUSINESS_EXPENSE': ['UTILITY', 'BILL', 'SHOPPING', 'STORE'],
        'PERSONAL_EXPENSE': ['COFFEE', 'FOOD', 'BEVERAGES'],
        'TRANSFER': ['RENT', 'TRANSFER', 'REFUND'],
        'OTHERS': []
    }
    
    description = str(description).upper()
    for category, keywords in categories.items():
        if any(keyword in description for keyword in keywords):
            return category
    return 'OTHERS'

def calculate_financial_metrics(df, summary_data):
    metrics = {}
    
    metrics['total_transactions'] = len(df)
    metrics['total_credits'] = df['credit'].sum()
    metrics['total_debits'] = df['debit'].sum()
    metrics['net_cashflow'] = metrics['total_credits'] - metrics['total_debits']
    
    metrics['opening_balance'] = float(summary_data.get('opening_balance', 0))
    metrics['closing_balance'] = float(summary_data.get('closing_balance', 0))
    metrics['avg_balance'] = df['balance'].mean()
    metrics['balance_volatility'] = df['balance'].std()
    
    metrics['avg_transaction_size'] = df['debit'][df['debit'] > 0].mean()
    metrics['transaction_frequency'] = len(df) / 30
    
    credit_txns = len(df[df['credit'] > 0])
    metrics['credit_frequency'] = credit_txns / max(len(df), 1)
    metrics['avg_credit_amount'] = df[df['credit'] > 0]['credit'].mean() if credit_txns > 0 else 0
    
    return metrics

def calculate_nano_entrepreneur_score(metrics):
    """Custom scoring for nano-entrepreneurs"""
    income_stability = min(
        metrics['credit_frequency'] * 20 +
        (metrics['avg_credit_amount'] > 10000) * 20
    , 40)
    
    business_resilience = min(
        (metrics['net_cashflow'] > 0) * 20 +
        (metrics['balance_volatility'] < metrics['avg_balance'] * 0.3) * 10
    , 30)
    
    transaction_discipline = min(
        (metrics['transaction_frequency'] > 0.5) * 10 +
        (metrics['avg_transaction_size'] < metrics['avg_credit_amount'] * 0.5) * 10
    , 20)
    
    growth_potential = min(
        (metrics['closing_balance'] > metrics['opening_balance']) * 5 +
        (metrics['total_credits'] > metrics['total_debits']) * 5
    , 10)
    
    nano_score = income_stability + business_resilience + transaction_discipline + growth_potential
    
    return {
        'score': min(max(nano_score, 0), 100),
        'breakdown': {
            'Income Stability': income_stability,
            'Business Resilience': business_resilience,
            'Transaction Discipline': transaction_discipline,
            'Growth Potential': growth_potential
        }
    }

# ============= PAGE HEADER =============

st.markdown("""
<div style='text-align: center; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 15px; margin-bottom: 30px;'>
    <h1 style='margin: 0;'>🏛️ NanoFin - Complete AI Analysis</h1>
    <p style='margin: 10px 0 0 0;'>Nano Entrepreneur Financial Analysis & Credit Improvement</p>
</div>
""", unsafe_allow_html=True)

# ============= SIDEBAR =============

with st.sidebar:
    st.header("📋 Upload Bank Statement")
    st.markdown("""
    **Supported Format**: JSON files from bank statements
    
    **What we analyze**:
    - Transaction patterns
    - Income stability  
    - Expense management
    - Business growth potential
    """)
    
    uploaded_file = st.file_uploader("Choose JSON file", type=['json'])
    
    st.markdown("---")
    st.header("💡 Financial Management Tips")
    tips = [
        "Maintain consistent income streams",
        "Control and minimize unnecessary expenses",
        "Build an emergency fund",
        "Invest in business growth",
        "Regularly review financial performance"
    ]
    for tip in tips:
        st.write(f"• {tip}")

# ============= MAIN TABS =============

if uploaded_file is not None:
    try:
        data = json.load(uploaded_file)
        
        personal_info = data.get('personal_info', {})
        account_info = data.get('account_info', {})
        transactions = data.get('transactions', [])
        summary_data = data.get('summary', {})
        
        # Prepare data
        df = prepare_transaction_data(transactions)
        metrics = calculate_financial_metrics(df, summary_data)
        nano_score = calculate_nano_entrepreneur_score(metrics)
        
        # Create tabs
        tab1, tab2, tab3, tab4, tab5, tab6 = st.tabs([
            "👤 Profile & Score",
            "📊 Financial Analysis",
            "🎯 Credit Improvement",
            "💰 Loan Marketplace",
            "🌐 Business Insights",
            "📈 Advanced Analytics"
        ])
        
        # ============= TAB 1: PROFILE & SCORE =============
        with tab1:
            col1, col2 = st.columns(2)
            
            with col1:
                st.subheader("📋 Entrepreneur Profile")
                st.write(f"**Name:** {personal_info.get('name', 'N/A')}")
                st.write(f"**Mobile:** {personal_info.get('mobile', 'N/A')}")
                st.write(f"**KYC Status:** {personal_info.get('kyc_status', 'N/A')}")
                st.write(f"**Account:** {account_info.get('account_number', 'N/A')}")
            
            with col2:
                st.subheader("🎯 Nano Entrepreneur Score")
                # Display score prominently
                score_color = "#4CAF50" if nano_score['score'] >= 80 else "#FFC107" if nano_score['score'] >= 60 else "#f44336"
                st.markdown(f"""
                <div style='text-align: center; padding: 30px; background: {score_color}; color: white; border-radius: 10px;'>
                    <h2 style='margin: 0;'>{nano_score['score']:.2f}/100</h2>
                    <p>Nano Entrepreneur Score</p>
                </div>
                """, unsafe_allow_html=True)
            
            st.markdown("---")
            
            # Score Breakdown
            st.subheader("📊 Score Breakdown")
            
            breakdown_cols = st.columns(4)
            
            metrics_data = [
                ('Income Stability', nano_score['breakdown']['Income Stability'], 40),
                ('Business Resilience', nano_score['breakdown']['Business Resilience'], 30),
                ('Transaction Discipline', nano_score['breakdown']['Transaction Discipline'], 20),
                ('Growth Potential', nano_score['breakdown']['Growth Potential'], 10)
            ]
            
            for col, (label, value, max_val) in zip(breakdown_cols, metrics_data):
                with col:
                    progress_val = value / max_val
                    color = "#4CAF50" if value >= (max_val * 0.7) else "#FFC107" if value >= (max_val * 0.4) else "#f44336"
                    st.markdown(f"""
                    <div style='text-align: center; padding: 20px; background: white; border: 2px solid #e0e0e0; border-radius: 12px; margin-bottom: 15px;'>
                        <h4 style='margin: 0 0 15px 0; font-size: 14px; font-weight: 700; color: #333;'>{label}</h4>
                        <div style='width: 100%; height: 10px; background: #e0e0e0; border-radius: 5px; overflow: hidden; margin-bottom: 12px;'>
                            <div style='width: {progress_val*100}%; height: 100%; background: {color}; border-radius: 5px;'></div>
                        </div>
                        <div style='font-weight: 700; font-size: 18px; color: {color};'>{value:.0f}<span style="font-size: 12px; color: #999;">/{max_val}</span></div>
                    </div>
                    """, unsafe_allow_html=True)
        
        # ============= TAB 2: FINANCIAL ANALYSIS =============
        with tab2:
            col1, col2, col3, col4 = st.columns(4)
            
            with col1:
                st.metric("Total Transactions", int(metrics['total_transactions']))
            with col2:
                st.metric("Total Credits", f"₹{metrics['total_credits']:,.0f}")
            with col3:
                st.metric("Total Debits", f"₹{metrics['total_debits']:,.0f}")
            with col4:
                st.metric("Net Cashflow", f"₹{metrics['net_cashflow']:,.0f}")
            
            st.markdown("---")
            
            col1, col2 = st.columns(2)
            
            with col1:
                st.subheader("💰 Income vs Expense")
                income_ratio = metrics['total_credits'] / max(metrics['total_debits'], 1)
                fig = go.Figure(data=[
                    go.Bar(x=['Credits', 'Debits'], 
                           y=[metrics['total_credits'], metrics['total_debits']],
                           marker_color=['#4CAF50', '#f44336'])
                ])
                fig.update_layout(height=400, showlegend=False)
                st.plotly_chart(fig, width='stretch')
                st.write(f"**Income to Expense Ratio:** {income_ratio:.2f}")
            
            with col2:
                st.subheader("📈 Balance Trend")
                fig = px.line(df, x='date', y='balance', 
                             title='Account Balance Over Time',
                             labels={'balance': 'Balance (₹)', 'date': 'Date'})
                fig.update_layout(height=400)
                st.plotly_chart(fig, width='stretch')
            
            st.markdown("---")
            
            col1, col2 = st.columns(2)
            
            with col1:
                st.subheader("💳 Transaction Categories")
                df['category'] = df['description'].apply(categorize_transactions)
                category_counts = df['category'].value_counts()
                fig = px.pie(values=category_counts.values, names=category_counts.index,
                            title='Transaction Distribution')
                fig.update_layout(height=400)
                st.plotly_chart(fig, width='stretch')
            
            with col2:
                st.subheader("📅 Monthly Activity")
                monthly_data = df.groupby('month').agg({
                    'credit': 'sum',
                    'debit': 'sum'
                }).reset_index()
                fig = px.bar(monthly_data, x='month', y=['credit', 'debit'],
                            title='Monthly Income & Expenses',
                            barmode='group')
                fig.update_layout(height=400)
                st.plotly_chart(fig, width='stretch')
        
        # ============= TAB 3: CREDIT IMPROVEMENT =============
        with tab3:
            st.subheader("🎯 Credit Score Improvement Strategies")
            
            income_ratio = metrics['total_credits'] / max(metrics['total_debits'], 1)
            
            strategies = []
            
            if nano_score['breakdown']['Income Stability'] < 30:
                strategies.append({
                    'title': '💼 Diversify Income Streams',
                    'description': 'Your income shows inconsistency. Consider developing multiple revenue sources.',
                    'impact': 'High Impact'
                })
            
            if nano_score['breakdown']['Business Resilience'] < 20:
                strategies.append({
                    'title': '💰 Build Emergency Fund',
                    'description': 'Establish a safety net of 3-6 months of expenses.',
                    'impact': 'High Impact'
                })
            
            if income_ratio < 1.5:
                strategies.append({
                    'title': '📉 Optimize Expenses',
                    'description': 'Your expenses are close to income. Review and reduce unnecessary costs.',
                    'impact': 'High Impact'
                })
            
            if nano_score['breakdown']['Transaction Discipline'] < 15:
                strategies.append({
                    'title': '📋 Track Transactions',
                    'description': 'Monitor spending patterns to identify cost-saving opportunities.',
                    'impact': 'Moderate Impact'
                })
            
            if nano_score['breakdown']['Growth Potential'] < 7:
                strategies.append({
                    'title': '📈 Plan for Growth',
                    'description': 'Focus on scaling your business and increasing revenues.',
                    'impact': 'Moderate Impact'
                })
            
            if not strategies:
                st.success("✅ Excellent financial health! Continue maintaining your practices.")
            else:
                for i, strategy in enumerate(strategies, 1):
                    with st.container():
                        col1, col2 = st.columns([3, 1]
)
                        with col1:
                            st.markdown(f"**{i}. {strategy['title']}**")
                            st.write(strategy['description'])
                        with col2:
                            st.write(f"**{strategy['impact']}**")
                        st.divider()
            
            st.markdown("---")
            
            st.subheader("📊 Recommendations")
            
            if nano_score['score'] > 80:
                st.success("🎉 **Excellent Candidate for Premium Loans**")
                st.write("Interest Rate: 8-10% | Max Loan: ₹5,00,000")
            elif nano_score['score'] > 60:
                st.info("✅ **Good Candidate for Standard Loans**")
                st.write("Interest Rate: 10-12% | Max Loan: ₹2,00,000")
            else:
                st.warning("⚠️ **Work on Financial Stability First**")
                st.write("Interest Rate: 12-15% | Max Loan: ₹50,000")
            
            st.markdown("---")
            
            # Recommended Learning Videos
            st.subheader("📹 Recommended Learning Videos")
            
            videos = [
                {
                    'title': 'How to improve your credit score',
                    'channel': 'Personal Finance Expert',
                    'url': 'https://www.youtube.com/results?search_query=how+to+improve+credit+score'
                },
                {
                    'title': 'How To Maintain Credit Card Score?',
                    'channel': 'Finance Channel',
                    'url': 'https://www.youtube.com/results?search_query=maintain+credit+card+score'
                },
                {
                    'title': 'What can change your credit score?',
                    'channel': 'Khan Academy',
                    'url': 'https://www.youtube.com/results?search_query=credit+score+factors'
                },
                {
                    'title': 'Improve Your Credit Score',
                    'channel': 'Understanding the Factors',
                    'url': 'https://www.youtube.com/results?search_query=credit+score+improvement+factors'
                },
                {
                    'title': 'What your credit score actually means',
                    'channel': 'Credit Education',
                    'url': 'https://www.youtube.com/results?search_query=what+is+credit+score'
                }
            ]
            
            # Display videos in 2 rows of 3 columns
            for row in range(0, len(videos), 3):
                cols = st.columns(3)
                for idx, col in enumerate(cols):
                    if row + idx < len(videos):
                        video = videos[row + idx]
                        with col:
                            st.markdown(f"""
                            <div style='border: 2px solid #ddd; border-radius: 12px; padding: 16px; background: white; height: 100%;'>
                                <div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 120px; border-radius: 8px; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 48px;'>
                                    🎬
                                </div>
                                <h4 style='margin: 0 0 8px 0; font-size: 13px; font-weight: 600; color: #333;'>{video['title']}</h4>
                                <p style='margin: 0; font-size: 11px; color: #888;'>{video['channel']}</p>
                            </div>
                            """, unsafe_allow_html=True)
                            if st.button("Watch Video", key=f"video_{row + idx}", use_container_width=True):
                                st.markdown(f'<meta http-equiv="refresh" content="0; url={video["url"]}" />', unsafe_allow_html=True)
            
            st.markdown("---")
            
            # Official Financial Resources
            st.subheader("🏛️ Official Financial Resources")
            
            col1, col2 = st.columns(2)
            
            with col1:
                st.markdown("""
                **🇮🇳 RBI Financial Literacy**
                
                Reserve Bank of India's official resources for financial education
                """)
                if st.button("Visit RBI Resources", use_container_width=True):
                    st.markdown('<meta http-equiv="refresh" content="0; url=https://www.rbi.org.in/commonman/EnglishHome.aspx" />', unsafe_allow_html=True)
            
            with col2:
                st.markdown("""
                **📊 SEBI Investor Education**
                
                Securities and Exchange Board of India's investor protection resources
                """)
                if st.button("Visit SEBI Resources", use_container_width=True):
                    st.markdown('<meta http-equiv="refresh" content="0; url=https://www.sebi.gov.in/" />', unsafe_allow_html=True)
        
        # ============= TAB 4: LOAN MARKETPLACE =============
        with tab4:
            st.subheader("💰 Loan Options Available")
            
            loan_options = [
                {
                    'name': 'PM Street Vendor AtmaNirbhar Nidhi',
                    'interest': '7.0%',
                    'amount': '₹10,000 - ₹50,000',
                    'processing': '5-7 days',
                    'fee': '0%',
                    'eligible': nano_score['score'] > 50,
                    'requirements': ['Aadhaar Card', 'Vendor Certificate']
                },
                {
                    'name': 'Business Growth Plus',
                    'interest': '10-12%',
                    'amount': '₹50,000 - ₹5,00,000',
                    'processing': '7-10 days',
                    'fee': '1-2%',
                    'eligible': nano_score['score'] > 60,
                    'requirements': ['Bank Statements', 'Business Proof', 'ID']
                },
                {
                    'name': 'Entrepreneur Micro Loan',
                    'interest': '12-15%',
                    'amount': '₹10,000 - ₹2,00,000',
                    'processing': '3-5 days',
                    'fee': '0.5%',
                    'eligible': True,
                    'requirements': ['ID Proof', 'Proof of Address']
                }
            ]
            
            for loan in loan_options:
                status = "✅ Eligible" if loan['eligible'] else "❌ Not Eligible Yet"
                status_color = "#4CAF50" if loan['eligible'] else "#f44336"
                
                with st.container():
                    st.markdown(f"""
                    <div style='padding: 20px; border: 2px solid {status_color}; border-radius: 10px; margin-bottom: 15px;'>
                        <h4>{loan['name']} - {status}</h4>
                        <p><strong>Interest Rate:</strong> {loan['interest']} p.a.</p>
                        <p><strong>Loan Amount:</strong> {loan['amount']}</p>
                        <p><strong>Processing Time:</strong> {loan['processing']}</p>
                        <p><strong>Processing Fee:</strong> {loan['fee']}</p>
                        <p><strong>Required Documents:</strong> {', '.join(loan['requirements'])}</p>
                    </div>
                    """, unsafe_allow_html=True)
        
        # ============= TAB 5: BUSINESS INSIGHTS =============
        with tab5:
            st.subheader("🌐 Business Performance Overview")
            
            col1, col2, col3 = st.columns(3)
            
            with col1:
                st.metric("Avg Transaction Size", f"₹{metrics['avg_transaction_size']:,.0f}")
            with col2:
                st.metric("Transaction Frequency", f"{metrics['transaction_frequency']:.1f}/day")
            with col3:
                st.metric("Account Health", "Good" if income_ratio > 1.5 else "Fair" if income_ratio > 1 else "Needs Work")
            
            st.markdown("---")
            
            st.subheader("📊 Business Trends")
            
            col1, col2 = st.columns(2)
            
            with col1:
                st.write("**Weekly Activity**")
                weekly_data = df.groupby('day_of_week').size()
                day_names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                fig = px.bar(x=[day_names[i] for i in weekly_data.index], y=weekly_data.values,
                            title='Transactions by Day of Week')
                st.plotly_chart(fig, width='stretch')
            
            with col2:
                st.write("**Balance Health**")
                st.metric("Avg Balance", f"₹{metrics['avg_balance']:,.0f}")
                st.metric("Opening Balance", f"₹{metrics['opening_balance']:,.0f}")
                st.metric("Closing Balance", f"₹{metrics['closing_balance']:,.0f}")
        
        # ============= TAB 6: ADVANCED ANALYTICS =============
        with tab6:
            st.subheader("📈 Advanced Financial Metrics")
            
            col1, col2, col3 = st.columns(3)
            
            with col1:
                st.write("**Balance Volatility**")
                volatility = metrics['balance_volatility']
                st.metric("Std Deviation", f"₹{volatility:,.0f}")
                if volatility < metrics['avg_balance'] * 0.3:
                    st.success("Stable balance patterns")
                else:
                    st.warning("High balance fluctuation")
            
            with col2:
                st.write("**Credit Frequency**")
                freq = metrics['credit_frequency']
                st.metric("Daily Income %", f"{freq*100:.1f}%")
                st.write(f"Income on {freq*100:.1f}% of days")
            
            with col3:
                st.write("**Balance Growth**")
                growth = metrics['closing_balance'] - metrics['opening_balance']
                st.metric("Net Growth", f"₹{growth:,.0f}")
                if growth > 0:
                    st.success("Positive balance growth")
                else:
                    st.error("Declining balance")
            
            st.markdown("---")
            
            st.subheader("📊 Detailed Transaction Analysis")
            
            # Display transaction data
            st.dataframe(
                df[['date', 'description', 'credit', 'debit', 'balance']].tail(20),
                width='stretch'
            )
    
    except Exception as e:
        st.error(f"Error processing file: {str(e)}")

else:
    st.info("📤 Please upload a JSON bank statement file to get started!")
    
    st.markdown("""
    ### 🎯 How to Use This Dashboard
    
    1. **Upload File**: Use the sidebar to upload your bank statement in JSON format
    2. **View Analysis**: See your credit score and financial metrics
    3. **Get Insights**: Review personalized recommendations
    4. **Apply for Loans**: Check available loan options based on your score
    5. **Track Progress**: Monitor improvements over time
    
    ### 📋 Sample JSON Format
    ```json
    {
      "personal_info": {
        "name": "Your Name",
        "mobile": "XXXXXXXXXX",
        "kyc_status": "Compliant"
      },
      "account_info": {
        "account_number": "XXXXX",
        "branch_name": "Branch Name",
        "available_balance": "10000"
      },
      "transactions": [
        {
          "date": "01-01-23",
          "description": "Transaction Description",
          "credit": 1000,
          "debit": 0,
          "balance": 10000
        }
      ]
    }
    ```
    """)
