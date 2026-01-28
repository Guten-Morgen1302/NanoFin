import streamlit as st
import pandas as pd
import numpy as np
import json
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime
import re

def clean_date(date_str):
    """Clean date string by removing INB suffix if present"""
    return re.sub(r'INB$', '', date_str)

def prepare_transaction_data(transactions):
    df = pd.DataFrame(transactions)
    
    # Clean date strings and convert to datetime
    df['date'] = df['date'].apply(clean_date)
    df['date'] = pd.to_datetime(df['date'], format='%d-%m-%y')
    df['month'] = df['date'].dt.month
    df['day_of_week'] = df['date'].dt.dayofweek
    
    # Convert amount columns to float
    df['credit'] = pd.to_numeric(df['credit'], errors='coerce').fillna(0)
    df['debit'] = pd.to_numeric(df['debit'], errors='coerce').fillna(0)
    df['balance'] = pd.to_numeric(df['balance'], errors='coerce').fillna(0)
    
    return df

def categorize_nano_entrepreneur_transactions(description):
    """Enhanced transaction categorization for nano-entrepreneurs"""
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
    
    # Basic transaction metrics
    metrics['total_transactions'] = len(df)
    metrics['total_credits'] = df['credit'].sum()
    metrics['total_debits'] = df['debit'].sum()
    metrics['net_cashflow'] = metrics['total_credits'] - metrics['total_debits']
    
    # Balance metrics
    metrics['opening_balance'] = float(summary_data.get('opening_balance', 0))
    metrics['closing_balance'] = float(summary_data.get('closing_balance', 0))
    metrics['avg_balance'] = df['balance'].mean()
    metrics['balance_volatility'] = df['balance'].std()
    
    # Transaction patterns
    metrics['avg_transaction_size'] = df['debit'][df['debit'] > 0].mean()
    metrics['transaction_frequency'] = len(df) / 30  # transactions per day
    
    # Credit patterns
    credit_txns = len(df[df['credit'] > 0])
    metrics['credit_frequency'] = credit_txns / max(len(df), 1)
    metrics['avg_credit_amount'] = df[df['credit'] > 0]['credit'].mean() if credit_txns > 0 else 0
    
    return metrics

def calculate_nano_entrepreneur_score(metrics):
    """
    Custom scoring for nano-entrepreneurs considering unique financial patterns
    """
    # Income Stability (40 points)
    income_stability = min(
        metrics['credit_frequency'] * 20 +  # Frequency of income
        (metrics['avg_credit_amount'] > 10000) * 20  # Consistent income threshold
    , 40)
    
    # Business Resilience (30 points)
    business_resilience = min(
        (metrics['net_cashflow'] > 0) * 20 +  # Positive cash flow
        (metrics['balance_volatility'] < metrics['avg_balance'] * 0.3) * 10  # Low balance fluctuation
    , 30)
    
    # Transaction Discipline (20 points)
    transaction_discipline = min(
        (metrics['transaction_frequency'] > 0.5) * 10 +  # Regular transactions
        (metrics['avg_transaction_size'] < metrics['avg_credit_amount'] * 0.5) * 10  # Controlled spending
    , 20)
    
    # Growth Potential (10 points)
    growth_potential = min(
        (metrics['closing_balance'] > metrics['opening_balance']) * 5 +
        (metrics['total_credits'] > metrics['total_debits']) * 5
    , 10)
    
    # Total Nano-Entrepreneur Score
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

def generate_local_insights(df, metrics, nano_score):
    """
    Generate insights based on financial metrics without external API
    """
    income_ratio = metrics['total_credits'] / max(metrics['total_debits'], 1)
    avg_transaction = metrics['total_debits'] / max(metrics['total_transactions'], 1)
    
    insights = f"""
### 🏛️ NanoFin Financial Health Analysis

#### 💰 Income and Expense Analysis
- **Income to Expense Ratio**: {income_ratio:.2f} ({'🟢 Strong' if income_ratio > 2 else '🟡 Moderate' if income_ratio > 1 else '🔴 Needs Attention'})
- **Average Transaction Size**: ₹{avg_transaction:,.2f}
- **Net Cashflow**: ₹{metrics['net_cashflow']:,.2f} ({'✅ Positive' if metrics['net_cashflow'] > 0 else '⚠️ Negative'})
- **Transaction Frequency**: {metrics['transaction_frequency']:.1f} transactions/day

#### 📊 Credit Score Breakdown
- **Overall Score**: {nano_score['score']:.0f}/100
- **Income Stability**: {nano_score['breakdown']['Income Stability']:.0f}/40
- **Business Resilience**: {nano_score['breakdown']['Business Resilience']:.0f}/30
- **Transaction Discipline**: {nano_score['breakdown']['Transaction Discipline']:.0f}/20
- **Growth Potential**: {nano_score['breakdown']['Growth Potential']:.0f}/10

#### 💪 Strengths
"""
    
    if nano_score['breakdown']['Income Stability'] > 30:
        insights += "- ✅ **Strong Income Stability** - Consistent revenue streams\n"
    if nano_score['breakdown']['Business Resilience'] > 20:
        insights += "- ✅ **Good Business Resilience** - Healthy financial buffer\n"
    if nano_score['breakdown']['Transaction Discipline'] > 15:
        insights += "- ✅ **Excellent Transaction Management** - Disciplined spending patterns\n"
    if nano_score['breakdown']['Growth Potential'] > 7:
        insights += "- ✅ **Strong Growth Trajectory** - Positive business momentum\n"
    
    insights += "\n#### 🎯 Areas for Improvement\n"
    
    if nano_score['breakdown']['Income Stability'] < 30:
        insights += "- 🔄 **Income Diversification** - Consider multiple revenue streams\n"
    if nano_score['breakdown']['Business Resilience'] < 20:
        insights += "- 💰 **Emergency Fund Building** - Increase financial reserves\n"
    if nano_score['breakdown']['Transaction Discipline'] < 15:
        insights += "- 📋 **Expense Management** - Review and optimize spending\n"
    if nano_score['breakdown']['Growth Potential'] < 7:
        insights += "- 📈 **Growth Strategy** - Focus on business expansion opportunities\n"
    
    insights += f"""
#### 🚀 Personalized Recommendations

1. **Financial Health**: {'Maintain current practices' if income_ratio > 1.5 else 'Focus on increasing income or reducing expenses'}
2. **Savings Strategy**: {'Continue building reserves' if metrics['avg_balance'] > metrics['total_debits'] else 'Start building emergency fund'}
3. **Business Growth**: {'Explore expansion opportunities' if nano_score['score'] > 70 else 'Strengthen current operations first'}
4. **Credit Readiness**: {'Excellent loan candidate' if nano_score['score'] > 80 else 'Good potential with improvements' if nano_score['score'] > 60 else 'Focus on financial stability first'}

#### 📞 Next Steps
- **Loan Eligibility**: {'Pre-approved for loans up to ₹5,00,000' if nano_score['score'] > 80 else 'Eligible for loans up to ₹2,00,000' if nano_score['score'] > 60 else 'Start with smaller credit facilities'}
- **Interest Rate**: {'Prime rate (8-10%)' if nano_score['score'] > 80 else 'Standard rate (10-12%)' if nano_score['score'] > 60 else 'Higher rate (12-15%)'}
"""
    
    return insights

def main():
    st.set_page_config(page_title="NanoFin - Local Analysis", layout="wide", page_icon="🏛️")
    
    # Header
    st.markdown("""
    <div style='text-align: center; padding: 20px; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px; margin-bottom: 30px;'>
        <h1>🏛️ NanoFin - Nano Entrepreneur Analysis</h1>
        <p>AI-Powered Credit Assessment for Unbanked Entrepreneurs</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Sidebar
    st.sidebar.header("📋 Upload Bank Statement")
    st.sidebar.markdown("""
    **Supported Format**: JSON files from bank statements
    
    **What we analyze**:
    - Transaction patterns
    - Income stability  
    - Expense management
    - Business growth potential
    """)
    
    uploaded_file = st.sidebar.file_uploader("Choose JSON file", type=['json'])
    
    if uploaded_file is not None:
        try:
            bank_data = json.load(uploaded_file)
            
            # Process transactions
            df = prepare_transaction_data(bank_data['transactions'])
            df['category'] = df['description'].apply(categorize_nano_entrepreneur_transactions)
            
            # Calculate financial metrics
            metrics = calculate_financial_metrics(df, bank_data['summary'])
            
            # Nano Entrepreneur Score
            nano_score = calculate_nano_entrepreneur_score(metrics)
            
            # Generate Local Insights
            local_insights = generate_local_insights(df, metrics, nano_score)
            
            # Main Dashboard
            col1, col2 = st.columns([2, 1])
            
            with col1:
                st.header("📊 Financial Dashboard")
                
                # Key Metrics
                metric_col1, metric_col2, metric_col3, metric_col4 = st.columns(4)
                with metric_col1:
                    st.metric("Credit Score", f"{nano_score['score']:.0f}/100", 
                             delta=f"+{nano_score['score']-50:.0f}" if nano_score['score'] > 50 else f"{nano_score['score']-50:.0f}")
                with metric_col2:
                    st.metric("Net Cashflow", f"₹{metrics['net_cashflow']:,.0f}",
                             delta="Positive" if metrics['net_cashflow'] > 0 else "Negative")
                with metric_col3:
                    st.metric("Total Credits", f"₹{metrics['total_credits']:,.0f}")
                with metric_col4:
                    st.metric("Total Debits", f"₹{metrics['total_debits']:,.0f}")
            
            with col2:
                st.header("👤 Profile")
                st.write("**Customer ID:**", bank_data['personal_info'].get('customer_id', 'N/A'))
                st.write("**Mobile:**", bank_data['personal_info'].get('mobile', 'N/A'))
                st.write("**KYC Status:**", bank_data['personal_info'].get('kyc_status', 'N/A'))
                
                # Score Breakdown
                st.subheader("Score Breakdown")
                for category, score in nano_score['breakdown'].items():
                    max_score = 40 if 'Income' in category else 30 if 'Business' in category else 20 if 'Transaction' in category else 10
                    st.progress(score/max_score, text=f"{category}: {score:.0f}/{max_score}")
            
            # Insights Section
            st.header("🤖 AI-Powered Insights")
            st.markdown(local_insights)
            
            # Visualizations
            st.header("📈 Financial Visualizations")
            
            viz_col1, viz_col2 = st.columns(2)
            
            with viz_col1:
                # Spending by Category
                spending_by_category = df.groupby('category')['debit'].sum()
                if not spending_by_category.empty:
                    fig_category = px.pie(
                        values=spending_by_category.values,
                        names=spending_by_category.index,
                        title='💳 Spending by Category',
                        color_discrete_sequence=px.colors.qualitative.Set3
                    )
                    st.plotly_chart(fig_category, use_container_width=True)
            
            with viz_col2:
                # Income vs Expense
                income = df[df['category'] == 'BUSINESS_INCOME']['credit'].sum()
                expenses = df[df['category'].isin(['BUSINESS_EXPENSE', 'PERSONAL_EXPENSE'])]['debit'].sum()
                
                fig_income_expense = px.bar(
                    x=['Income', 'Expenses'],
                    y=[income, expenses],
                    title='💰 Income vs Expenses',
                    color=['Income', 'Expenses'],
                    color_discrete_map={'Income': '#2ecc71', 'Expenses': '#e74c3c'}
                )
                st.plotly_chart(fig_income_expense, use_container_width=True)
            
            # Balance Trend
            if len(df) > 1:
                fig_balance = px.line(
                    df.sort_values('date'), 
                    x='date', 
                    y='balance',
                    title='📊 Account Balance Trend',
                    line_shape='spline'
                )
                fig_balance.update_traces(line_color='#3498db', line_width=3)
                st.plotly_chart(fig_balance, use_container_width=True)
            
            # Transaction Details
            st.header("📝 Transaction History")
            st.dataframe(
                df[['date', 'description', 'credit', 'debit', 'balance', 'category']]
                .sort_values('date', ascending=False)
                .head(20),
                use_container_width=True
            )
            
        except Exception as e:
            st.error(f"❌ Error processing file: {str(e)}")
            st.info("Please ensure your JSON file has the correct format with 'transactions', 'summary', and 'personal_info' sections.")
    
    else:
        # Demo Section
        st.header("🎯 How It Works")
        
        demo_col1, demo_col2, demo_col3 = st.columns(3)
        
        with demo_col1:
            st.markdown("""
            ### 📤 1. Upload Data
            - Bank statement in JSON format
            - Secure local processing
            - No data stored externally
            """)
        
        with demo_col2:
            st.markdown("""
            ### 🤖 2. AI Analysis
            - Transaction categorization
            - Pattern recognition
            - Risk assessment
            """)
        
        with demo_col3:
            st.markdown("""
            ### 📊 3. Get Results
            - Credit score (0-100)
            - Detailed insights
            - Loan recommendations
            """)
        
        st.info("👆 Upload a bank statement JSON file to get started with your credit analysis!")

if __name__ == "__main__":
    main()