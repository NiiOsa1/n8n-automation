![Leave Automation Banner](banner-leave-automation.png)

# 🏝️ Leave & Vacation Automation Platform – Powered by n8n, PocketBase & Docker

[![Build Status](https://img.shields.io/badge/Live-Demo-Pending-lightgray?style=flat-square)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-n8n%20%2B%20PocketBase%20%2B%20Docker-blueviolet?style=flat-square)](#)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](#)

---

## 📚 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Live Workflow](#live-workflow)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Docker Usage](#docker-usage)
- [Folder Structure](#folder-structure)
- [Security & Backups](#security--backups)
- [Example Screens](#example-screens)
- [Contributing](#contributing)
- [License](#license)
- [Maintainer](#maintainer)

---

## Overview

This platform offers AI-assisted leave management automation designed for startups and enterprise teams alike — hosted via Docker and powered by:

 n8n for workflows, smart approval logic, and email handling

- PocketBase for secure data storage with real-time triggers

- Runs on AWS EC2, Docker-managed, ready for scale


What it does:

- Employees query leave balances via AI

- Conflict checks auto-run (no duplicates or ghost teams)

- Managers approve via email buttons — no logins

- All events logged, backed up, and auditable

This repo combines operational automation with real-world devops structure — making it deployable in 10 minutes with zero manual DB edits.

---

## Features

✔️ Ask AI, Not HR
Employees query their leave balance using a natural language interface powered by n8n.

✔️ Auto Conflict Checks
The system cross-validates leave requests to avoid team scheduling conflicts.

✔️ One-Click Email Approval
Managers receive emails with pre-built "Approve/Reject" buttons — no logins, no drama.

✔️ Database Magic via PocketBase
All leave data is stored and synced in PocketBase — schema-less, realtime, zero-ops.

✔️ End-to-End Logging
Every action is auditable, timestamped, and backed up daily.

✔️ Cloud or Local Ready
Runs on AWS, local machines, or internal networks with full Docker support.

✔️ Backups Without Sweat
Daily .tar.gz backups of all volumes, auto-cleaned after 7 days.

✔️ Enterprise-Friendly
Support for basic auth, webhook privacy, and security-hardened env settings.

---

## Live Workflow: How It Works (End-to-End)

1️⃣ Employee Says: "How many days of annual leave do I have left?"
→ Our n8n-powered AI agent responds in seconds.

2️⃣ Leave Form Submitted
→ Employee selects leave type, duration, and reason — stored instantly in PocketBase.

3️⃣ Automation Triggers
→ System checks for policy compliance + overlaps with team calendars.

4️⃣ Email to Manager
→ Clean "Approve" or "Reject" email lands in manager’s inbox. One tap. Done.

5️⃣ Realtime Sync
→ PocketBase updates the leave record, status, and audit logs.

6️⃣ Daily Backups
→ All leave data is backed up automatically to .tar.gz in your backups folder.


