# Debrief

**Validate ideas before you build.**

Debrief is a platform designed to help founders and creators validate their startup ideas through instant, honest feedback from real users. Stop guessing and start validating.

![Debrief Preview](/public/debrief-logo.svg)

## 🚀 Features

- **Idea Validation**: Post your ideas and get detailed feedback.
- **Micro-Polls**: Create quick polls to gauge user interest.
- **Pivot Tracking**: Document your journey and pivots publicly.
- **Community Backing**: Get "backed" by other users to validate demand.
- **Real-time Updates**: Live feedback and notifications.
- **Dark, Cinematic UI**: A premium, focus-driven interface.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Forms**: React Hook Form + Zod

## 🏁 Getting Started

We welcome contributions! Follow these steps to set up the project locally.

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm/yarn/pnpm
- A Supabase project (for local dev, you'll need the credentials)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/mulearn/debrief.git
    cd debrief
    ```

2.  **Install dependencies**
    ```bash
    bun install
    # or npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
    ```
    *Note: Ask the maintainers for test environment credentials if you don't have your own.*

4.  **Run the development server**
    ```bash
    bun dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

We love contributions! whether it's fixing bugs, improving documentation, or building new features.

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

Please make sure to update tests as appropriate and follow the existing coding style.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Built by the [µLearn](https://mulearn.org) community.
