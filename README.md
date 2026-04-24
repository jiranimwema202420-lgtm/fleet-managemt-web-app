# 🚛 Opulent FleetPro

**Opulent FleetPro** is a high-fidelity, command-and-control ecosystem designed for elite transport logistics. It combines real-time asset telemetry, financial precision, and generative AI intelligence to provide an unparalleled management experience.

---

## 💎 The Opulent Experience

Opulent FleetPro is built on three pillars: **Strategic Intelligence**, **Tactical Precision**, and **Financial Integrity**.

### 🧠 Strategic Intelligence
- **AI Operational Core**: Powered by Google Gemini 2.5 and Genkit, providing deep analysis of fleet performance.
- **The Executive Briefing**: A high-profile feature that synthesizes operational data into a high-quality audio summary using advanced Text-to-Speech (TTS).
- **Onboarding Roadmap**: Intelligent "Cold Start" strategies for new nodes (empty databases).

### 🛠️ Tactical Management
- **Fleet Registry**: Detailed management of vehicle assets with integrated photo verification.
- **Personnel Directory**: Comprehensive crew tracking with automated compliance alerts for license expirations.
- **Service Logs**: Mission-critical maintenance orchestration with priority-based queuing.

### 💰 Compliance & Ledgers
- **Operating Costs**: Real-time tracking of administrative and overhead expenses.
- **Payroll Control**: Secure disbursement logs for drivers and staff.
- **Asset Protection**: Insurance policy management and carrier relationship tracking.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **Backend**: [Firebase](https://firebase.google.com/) (Firestore, Authentication, App Hosting)
- **AI Core**: [Genkit](https://github.com/firebase/genkit) & [Google Gemini 2.5 Flash](https://deepmind.google/technologies/gemini/)
- **Audio Processing**: [Wav.js](https://www.npmjs.com/package/wav) for high-fidelity briefing generation.

---

## 📂 Project Structure

- `src/app/`: Next.js App Router pages and layouts.
  - Operational routes: `/`, `/intelligence`, `/vehicles`, `/drivers`, `/maintenance`, `/finance`, `/onboarding`
- `src/ai/`: Genkit flows and AI prompt definitions.
- `src/firebase/`: Specialized Firebase hooks, providers, and non-blocking update utilities.
- `src/components/ui/`: Reusable ShadCN components.
- `docs/`: Database blueprints and operational documentation.

---

## 🛠️ Getting Started

1. **Firebase Setup**:
   - Create a project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable **Firestore** and **Anonymous Authentication**.
   - Populate `src/firebase/config.ts` with your project credentials.

2. **AI Configuration**:
   - Ensure `GOOGLE_GENAI_API_KEY` is set in your environment variables for Gemini access.

3. **Firebase Environment Variables**:
   - Add Next.js public Firebase keys: `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`, `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID`.
   - Anonymous auth is automatically initialized by `FirebaseProvider` on app load.

4. **Development**:
   ```bash
   npm install
   npm run dev
   ```

---

## ⚖️ License

Proprietary ecosystem developed for **Opulence Transporters**. Unauthorized duplication is prohibited.
