# Step-by-Step Setup Guide

Follow these steps exactly to get your custom tool running:

## Step 1: Navigate to the Project Folder

```bash
cd ~/Desktop
mkdir opal-custom-tool
cd opal-custom-tool
```

## Step 2: Copy the Files

Copy these 3 files into the `opal-custom-tool` folder:
- server.js
- package.json
- README.md

## Step 3: Install Dependencies

Open Terminal in this folder and run:

```bash
npm install
```

You should see a `node_modules` folder created.

## Step 4: Start the Server

```bash
npm start
```

You should see:
```
🚀 Custom Opal Tool server running on http://localhost:8000
📊 Discovery endpoint: http://localhost:8000/discovery
🔧 Tool endpoint: http://localhost:8000/tools/analyze-marketing-content
```

## Step 5: Test Locally (Optional)

Open your browser and go to:
```
http://localhost:8000
```

You should see a JSON response showing the server is running.

## Step 6: Open a NEW Terminal Window

Keep the server running! Open a second terminal window.

## Step 7: Start ngrok

In the NEW terminal window:

```bash
ngrok http 8000
```

You should see:
```
Forwarding   https://xxxx-xxxx.ngrok.io -> http://localhost:8000
```

**Copy the HTTPS URL** (e.g., https://1234-5678.ngrok.io)

## Step 8: Register in Opal

1. Go to your Opal instance
2. Navigate to "Tools Registry"
3. Click "Add Tool Registry"
4. Fill in:
   - **Registry URL**: `https://your-ngrok-url.ngrok.io/discovery`
   - **Name**: Marketing Content Analyzer
   - **Description**: Analyzes marketing content for readability and sentiment
5. Click "Save"

## Step 9: Verify

Check that your tool appears in the Opal Tools Registry!

## Troubleshooting

**"localhost refused to connect"**
- Make sure server is running (Step 4)
- Check if you see the running message in terminal

**"ngrok error 8012"**
- Make sure server is running BEFORE starting ngrok
- Check that ngrok is pointing to port 8000

**Tool not appearing in Opal**
- Verify the ngrok URL is correct
- Make sure you added `/discovery` to the end
- Check that ngrok is still running

## What to Keep Running

You need TWO terminal windows open:
1. **Terminal 1**: Running `npm start` (your server)
2. **Terminal 2**: Running `ngrok http 8000` (tunnel)

Don't close these or your tool will stop working!
