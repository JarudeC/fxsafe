## 💸 FXSafe: Smart Stablecoin Remittance Wallet Using RLUSD
FXSafe is a blockchain-based remittance wallet designed for migrant workers to send RLUSD (on-ledger stablecoin) to family back home, with automatic FX conversion into local IOUs (e.g., PHP, MYR, IDR) using XRPL's AMM and Path Payment features.

## ✅ Demo: Send 50 RLUSD → AMM swap → Receive 2,000 MYR IOU

## 🚀 Features
Feature	Purpose
RLUSD	Stablecoin to avoid volatility
Path Payment + AMM	Automatic FX conversion
IOU Tokens (e.g., MYR, PHP)	Recipient receives local currency IOUs
Escrow (Optional)	Lock funds until recipient confirms
XLS-20 NFT (Optional)	Digital proof of remittance
Multilingual UI + QR	Easy access for low-literacy users

## 🖥️ Live Demo and Screenshots
![image](https://github.com/user-attachments/assets/0d92c115-c10c-4ce0-bf63-f0ad82bc0030)
![image](https://github.com/user-attachments/assets/ad136bc8-1d58-4ba7-b4fd-6454df793da8)
![image](https://github.com/user-attachments/assets/9ee5b48d-0a92-4ec7-8f49-4a3cf7a6e5d3)
![image](https://github.com/user-attachments/assets/f21376a5-4d61-46b1-b468-3e472cd5f3a2)
![image](https://github.com/user-attachments/assets/f5895822-8147-487d-b516-20636266f4f8)
![image](https://github.com/user-attachments/assets/c2ef5d35-ff97-45e6-917f-62235428a979)

## 🔐 Key Security Features
Escrow/Hooks Support: Optionally lock funds until the recipient acknowledges receipt.

NFT Receipts (XLS-20): Mint a digital proof of remittance for each transaction.

AMM Path Payments: Fair FX rates and deep liquidity.

Wallet Connect via XUMM: Safe signing through trusted interfaces.

## 🛠️ Tech Stack
Layer	Tool	Purpose
Frontend	React + Vite + TailwindCSS	Fast UI development
Wallet	xumm-web-sdk	QR sign-in and TX signing
XRPL Integration	xrpl.js	Handle AMM & payments
Backend (optional)	Node.js + Express	Quote generation & receipts
Deployment	Vercel (frontend), Render (backend)	Easy, free deployment

## 🧩 System Flow
1. Visit Site: User lands on FXSafe web app

2. Connect Wallet:

If new: generate XRPL wallet + store encrypted seed

If existing: connect via XUMM

3. Create Session: User profile + login session created

4. Dashboard: Show wallet balance and transaction history

5. Initiate Transfer: User enters amount & selects currency

6. Quote FX Rate: Find path + display swap rate

7. Confirm & Sign: User signs transaction via XUMM

8. Swap & Send: RLUSD converted + IOU sent to family

9. Optional Receipt: Mint NFT as remittance proof
    
## 🧠 Future Plans
Offline Support: Local agent kiosks to assist users without smartphones

Multilingual Interface: For wider accessibility

Local Bank Partnerships: Enable IOU cash-out in rural regions

## 🧾 Summary
FXSafe gives migrant workers a better way to send money:

✅ Faster: On-ledger, near-instant transactions
✅ Cheaper: Transparent FX rates with minimal markups
✅ Safer: Escrow and receipt proof protect against fraud
✅ Flexible: Direct IOUs in local currencies

## 🌍 We bridge the speed and transparency of crypto with the real-world utility of local payouts.

## 📚 Learn More
🔗 ...

🔧 ....

📱 XUMM SDK
🧑‍💻 Authors
Jared, Wei Xiang, Akash, Flash & Wen Bao
→ Built at XRPL Developer Hackathon

