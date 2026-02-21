# 🤖 Telegram Bot Manager

A modern **Next.js 16** web application for managing Telegram bot tokens with **MongoDB** persistence and **Neo-Brutalist Tech** design aesthetics. Optimized for **Vercel** deployment.

## ✨ Features

- **Complete Bot Management**: Add, edit, delete, and toggle bot statuses
- **Secure Token Handling**: Tokens are masked by default with visibility toggle
- **MongoDB Integration**: Full database persistence with serverless API routes
- **Next.js 16 App Router**: Latest Next.js features with Server Components
- **Vercel-Ready**: Optimized for Vercel serverless deployment
- **Neo-Brutalist Tech Design**: Bold, striking aesthetics with high contrast
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant CRUD operations with optimistic UI updates

## 🎨 Design Aesthetic

The app uses a striking **Neo-Brutalist Tech** design featuring:
- Bold black borders (2-3px thickness)
- Electric blue (#0066ff) primary accents
- Vibrant pink (#ff3366) secondary accents
- JetBrains Mono (technical) + Outfit (modern) typography
- Clean card-based layouts with depth and shadow effects
- Micro-interactions and hover animations

## 💻 Technology Stack

### Frontend
- **Next.js 16** with App Router and Server Components
- **React 19** with TypeScript for type safety
- **Tailwind CSS v4** for utility-first styling

### Backend
- **Next.js API Routes** (Serverless functions)
- **MongoDB** with native driver
- **TypeScript** for type-safe API handlers

### Deployment
- **Vercel** - Zero-config deployment
- **MongoDB Atlas** - Cloud database

## 🚀 Quick Start

### Local Development

1. **Clone the repository**:
```bash
git clone https://github.com/atom-og/telegram-bot-manager.git
cd telegram-bot-manager
```

2. **Install dependencies**:
```bash
npm install
```

3. **Set up environment variables**:
```bash
cp .env.local.example .env.local
# Edit .env.local and add your MONGODB_URI
```

4. **Run development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🌐 Vercel Deployment

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
cd /a0/usr/workdir/telegram-bot-manager-nextjs
vercel
```

4. **Add environment variable**:
- MONGODB_URI: Your MongoDB connection string

5. **Deploy to production**:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. **Push to GitHub**:
```bash
git add -A
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Add `MONGODB_URI` environment variable
   - Click **Deploy**

### Option 3: One-Click Deploy with Auto-Configuration

```bash
cd /a0/usr/workdir/telegram-bot-manager-nextjs

# Initialize git if not already done
git init
git add -A
git commit -m "Initial commit - Telegram Bot Manager"

# Push to GitHub
# (Replace with your GitHub repository URL)
git remote add origin https://github.com/atom-og/telegram-bot-manager.git
git branch -M main
git push -u origin main

# Deploy to Vercel
vercel --yes --prod --env MONGODB_URI="mongodb+srv://atom:KTVysBfeQrFubxKJ@applications.lujkiji.mongodb.net/?appName=applications"
```

## 📡 API Endpoints

### Base URL
```
/api/bots
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bots` | Get all bots |
| POST | `/api/bots` | Create new bot |
| PUT | `/api/bots/[id]` | Update bot |
| DELETE | `/api/bots/[id]` | Delete bot |

### API Response Format

**Bot Object**:
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Oogway",
  "description": "Telegram Bot Token for Oogway Sanda",
  "token": "123456789:ABCdefGHIjklMNOpqrsTUVwxyz",
  "active": true,
  "createdAt": "2024-02-21T13:00:00.000Z",
  "updatedAt": "2024-02-21T13:00:00.000Z"
}
```

## 🗄️ MongoDB Schema

```javascript
{
  _id: ObjectId,
  name: String,        // Unique bot name
  description: String,  // Bot description
  token: String,        // Telegram bot token
  active: Boolean,     // Active status
  createdAt: Date,      // Creation timestamp
  updatedAt: Date       // Last update timestamp
}
```

**Indexes**: Unique index on `name` field

## 📁 Project Structure

```
telegram-bot-manager-nextjs/
├── app/
│   ├── api/
│   │   └── bots/              # API routes
│   │       ├── route.ts        # GET & POST
│   │       └── [id]/          # Dynamic routes
│   │           └── route.ts   # PUT & DELETE
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Main page
│   └── globals.css            # Global styles
├── lib/
│   ├── mongodb.ts             # MongoDB connection
│   ├── api.ts                # API client
│   └── types.ts              # TypeScript types
├── public/                   # Static assets
├── .env.local.example        # Environment template
├── vercel.json              # Vercel config
└── package.json             # Dependencies
```

## 🔐 Security

- Tokens are masked in the UI by default
- MongoDB connection uses secure SRV protocol
- Environment variables for sensitive data
- CORS enabled for API routes
- TypeScript for type safety

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🎯 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |

**Example**:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

## 🌟 Key Features

### Bot Management
- ✅ Create, Read, Update, Delete (CRUD) operations
- ✅ Toggle bot active status
- ✅ Show/hide bot tokens
- ✅ Persistent storage with MongoDB

### User Experience
- ✅ Instant real-time updates
- ✅ Optimistic UI updates
- ✅ Error handling with user-friendly messages
- ✅ Loading states and empty states
- ✅ Confirmation dialogs for destructive actions

### Design
- ✅ Neo-Brutalist Tech aesthetic
- ✅ Responsive design (mobile-friendly)
- ✅ Custom scrollbars
- ✅ Smooth animations and transitions
- ✅ High contrast for accessibility

## 🚀 Deployment on Vercel

### Prerequisites
- MongoDB Atlas account
- Vercel account (free tier works)
- GitHub repository

### Step-by-Step Deployment

1. **Push code to GitHub**:
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

2. **Deploy to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import" on your repository
   - Add environment variable:
     - Key: `MONGODB_URI`
     - Value: Your MongoDB connection string
   - Click "Deploy"

3. **Access your app**:
   Vercel will provide a URL like `https://telegram-bot-manager.vercel.app`

### Environment Variables in Vercel

**Add MongoDB URI**:
1. Go to your project Settings → Environment Variables
2. Add `MONGODB_URI` with your connection string
3. Redeploy the project

## 🎨 Neo-Brutalist Design System

### Color Palette
```css
--color-electric-blue: #0066ff;
--color-vibrant-pink: #ff3366;
--color-success: #00ff88;
--color-cream: #f5f3ee;
--color-dark: #1a1a2e;
```

### Typography
- **Display**: JetBrains Mono (technical, monospace)
- **Body**: Outfit (modern, clean)

### Design Elements
- **Borders**: 2-3px solid black
- **Shadows**: Hard shadows (4px 4px 0 0)
- **Animations**: Smooth 150ms transitions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🔗 Links

- **Next.js**: https://nextjs.org/
- **Vercel**: https://vercel.com/
- **MongoDB**: https://www.mongodb.com/
- **React**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/

---

Built with ❤️ using Next.js 16, MongoDB, and Neo-Brutalist Tech design principles
